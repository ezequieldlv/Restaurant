import appExpress from "express";
import { getReservas, getReservaById, createReserva, updateReserva, deleteReserva, getReservasActivas, verificarActivas, getReservasByCliente } from "../services/reservas.service.js";
import Mesa from "../models/mesas.js";

const reservasRouter = appExpress.Router();

reservasRouter.get("/", async (req ,res, next) => {
    try {
        if (req.idCliente === 1) {
            const reservasAdmin = await getReservas();
            res.json(reservasAdmin);
        } else {
            const reservas = await getReservasByCliente(req.idCliente);
            res.json(reservas);
        }       
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo reservas." });
    }
});

reservasRouter.get("/active", async (req ,res, next) => {
    try {

        await verificarActivas();

        if (req.idCliente === 1) {
            const reservasAdmin = await getReservas();
            res.json(reservasAdmin);
        } else {
            const reservas = await getReservasActivas(req.idCliente);
            res.json(reservas);
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo reservas." });
    }
});

reservasRouter.get("/:id", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const reserva = await getReservaById(req.params.id);

        // envío la respuesta con el resultado de la consulta.
        res.json(reserva);
    }
    catch (error) {
        next(error);
    }
});

reservasRouter.post("/", async (req, res, next) => {
    const { idMesa, nroPersonas, fechaHora } = req.body;

    const mesa = await Mesa.findByPk(idMesa);
    if (!mesa) return res.status(404).json({ error: 'La mesa asociada al pedido no existe' });

    if(nroPersonas < 0) return res.status(409).json({error: "No puede tener un valor negativo"});
    
    if(nroPersonas >= mesa.capacidad ) return res.status(409).json({res: "La cantidad de personas supera la capacidad de la mesa"});
    
    const fechaReserva = new Date(fechaHora);
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()));
    if(fechaReserva < todayUTC) return res.status(409).json({res: "La fecha no puede ser anterior a hoy"});

    try {
        req.body.idCliente = req.idCliente;
        const reserva = await createReserva(req.body);
        res.status(201).json(reserva);
    } catch (error) {
        next(error);
    }
});

reservasRouter.put("/:id", async (req, res, next) => {
    const { idMesa, nroPersonas, fechaHora } = req.body;

    const mesa = await Mesa.findByPk(idMesa);
    if (!mesa) return res.status(404).json({ error: 'La mesa asociada al pedido no existe' });

    if(nroPersonas >= mesa.capacidad ) return res.status(409).json({res: "La cantidad de personas supera la capacidad de la mesa"});

    if(nroPersonas < 0) return res.status(409).json({error: "No puede tener un valor negativo"});

    const fechaReserva = new Date(fechaHora);
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()));
    if(fechaReserva < todayUTC) return res.status(409).json({res: "La fecha no puede ser anterior a hoy"});

    try {
        await updateReserva(req.params.id, req.body);
        res.status(200).json({res : "Reserva actualizada con exito"});
    } catch (error) {
        next(error);
    }
});


reservasRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteReserva(req.params.id);
        res.status(200).json({res : "Reserva eliminada con exito"});
    }
    catch (err) {
        next(err);
    }
});

export default reservasRouter;

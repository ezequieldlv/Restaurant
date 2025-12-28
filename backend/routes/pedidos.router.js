import appExpress from "express";
import { getPedidos, getPedidoById, createPedido, updatePedido, deletePedido, getPedidosByReserva} from "../services/pedidos.service.js";
import Reserva from "../models/reservas.js";
import Menu from "../models/menus.js";

const pedidosRouter = appExpress.Router();

pedidosRouter.get("/", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const pedidos = await getPedidos();

        // envío la respuesta con el resultado de la consulta.
        res.json(pedidos);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo pedidos." });
    }
});

pedidosRouter.get("/reserva/:id", async (req ,res, next) => {
    try {
        const pedidos = await getPedidosByReserva(req.params.id);
        res.json(pedidos);
    }
    catch (error) {
        next(error);
    }
});

pedidosRouter.get("/:id", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const pedido = await getPedidoById(req.params.id);

        // envío la respuesta con el resultado de la consulta.
        res.json(pedido);
    }
    catch (error) {
        next(error);
    }
});

pedidosRouter.post("/", async (req, res, next) => {
    const {idReserva, idMenu, cantidad} = req.body;

    if (cantidad < 0) return res.status(409).json({ error: "No puede tener un valor negativo" });

    const menu = await Menu.findByPk(idMenu);
    if (!menu) return res.status(404).json({ error: 'El menú asociado al pedido no existe' });

    const reserva = await Reserva.findByPk(idReserva);
    if(!reserva) return res.status(404).json({ error: "La reserva asociada no existe" });
        
    req.body.precioTotal = menu.precio * cantidad;

    try {
        console.log(req.body);
        const pedido = await createPedido(req.body);
        res.status(201).json(pedido);
    } catch (error) {
        next(error);
    }
});

pedidosRouter.put("/:id", async (req, res, next) => {
    const {cantidad, idMenu} = req.body;

    if (cantidad < 0) return res.status(409).json({ error: "No puede tener un valor negativo" });
        
    const menu = await Menu.findByPk(idMenu);
    if (!menu) return res.status(404).json({ error: 'El menú asociado al pedido no existe' });

    req.body.precioTotal = menu.precio * cantidad;

    try {
        await updatePedido(req.params.id, req.body);
        res.status(200).json({res : "Pedido actualizado con exito"});
    } catch (error) {
        next(error);
    }
});


pedidosRouter.delete("/:id", async (req, res, next) => {
    try {
        await deletePedido(req.params.id);
        res.status(200).json({res : "Pedido eliminado con exito"});
    }
    catch (err) {
        next(err);
    }
});

export default pedidosRouter;

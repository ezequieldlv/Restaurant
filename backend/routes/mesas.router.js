import appExpress from "express";
import { getMesas, getMesaById, createMesa, updateMesa, deleteMesa } from "../services/mesas.service.js";
const mesasRouter = appExpress.Router();

mesasRouter.get("/", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const mesas = await getMesas();

        // envío la respuesta con el resultado de la consulta.
        res.json(mesas);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo mesas." });
    }
});

mesasRouter.get("/:id", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const mesa = await getMesaById(req.params.id);

        // envío la respuesta con el resultado de la consulta.
        res.json(mesa);
    }
    catch (error) {
        next(error);
    }
});


mesasRouter.post("/", async (req, res, next) => {
    const {numero, capacidad} = req.body;
    try {

        if(numero < 0 || capacidad < 0){
            res.status(409).json({ error: "No puede tener un valor negativo" });
        } else {
            const mesa = await createMesa(req.body);
            res.status(201).json(mesa);
        }
    } catch (error) {
        next(error);
    }
});

mesasRouter.put("/:id", async (req, res, next) => {
    const {numero, capacidad} = req.body;
    try {
    
        if(numero < 0 || capacidad < 0) {
            res.status(409).json({ error: "No puede tener un valor negativo" });
        }else {

            await updateMesa(req.params.id, req.body);
            res.status(200).json({ response: "Mesa actualizada con exito"});
        }
            
    } catch (error) {
        next(error);
    }
});

mesasRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteMesa(req.params.id);
        res.status(200).json({res : "Mesa eliminada con exito"});
    }
    catch (err) {
        next(err);
    }
});

export default mesasRouter;

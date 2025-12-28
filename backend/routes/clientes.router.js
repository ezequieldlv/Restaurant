import appExpress from "express";
import { getClientes, getClienteById, updateCliente, deleteCliente } from "../services/clientes.service.js";
const clientesRouter = appExpress.Router();

clientesRouter.get("/", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const clientes = await getClientes();

        // envío la respuesta con el resultado de la consulta.
        res.json(clientes);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

clientesRouter.get("/:id", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const cliente = await getClienteById(req.params.id);

        // envío la respuesta con el resultado de la consulta.
        res.json(cliente);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

/*
usuariosRouter.put("/me", async (req, res, next) => {
    try {
        const { nombre, apellido, mail } = req.body;
        await actualizarUsuario(req.user.id, nombre, apellido, mail);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

*/

clientesRouter.put("/:id", async (req, res, next) => {
    try {
        await updateCliente(req.params.id, req.body);
        res.status(200).json({res : "Cliente actualizado con exito"});
    } catch (error) {
        next(error);
    }
});


clientesRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteCliente(req.params.id);
        res.status(200).json({res : "Cliente eliminado con exito"});
    }
    catch (err) {
        next(err);
    }
});

export default clientesRouter;

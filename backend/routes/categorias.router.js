import appExpress from "express";
import { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } from "../services/categorias.service.js";
const categoriasRouter = appExpress.Router();

categoriasRouter.get("/", async (req ,res, next) => {
    try {
        const categorias = await getCategorias();
        res.json(categorias);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo categorias." });
    }
});

categoriasRouter.get("/:id", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const categoria = await getCategoriaById(req.params.id);
        // envío la respuesta con el resultado de la consulta.
        res.json(categoria);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

categoriasRouter.post("/", async (req, res, next) => {
    try {
        const categoria = await createCategoria(req.body);
        res.status(201).json(categoria);
    } catch (error) {
        next(error);
    }
});

categoriasRouter.put("/:id", async (req, res, next) => {
    try {
        await updateCategoria(req.params.id, req.body);
        res.status(200).json({res : "Categoria actualizada con exito"});
    } catch (error) {
        next(error);
    }
});


categoriasRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteCategoria(req.params.id);
        res.status(200).json({res : "Categoria eliminada con exito"});
    }
    catch (err) {
        next(err);
    }
});

export default categoriasRouter;

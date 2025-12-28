import appExpress from "express";

const serverStatusRouter = appExpress.Router();

serverStatusRouter.get("/", (req, res) => {
    res.json({ response: "API iniciada y escuchando..." });
});

serverStatusRouter.get("/echo/:cadena", (req, res) => {
    const { cadena } = req.params;
    res.json(`{ respuesta: '${cadena} ${cadena}' }`);
});

export default serverStatusRouter;
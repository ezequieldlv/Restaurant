import appExpress from "express";
import { getClienteByMail, checkClientePassword, createCliente } from "../services/clientes.service.js";
import jwt from "jsonwebtoken";

const loginRouter = appExpress.Router();

function generarJwt(usr) {
    const payload = {
        id: usr.idCliente,
        userName: usr.mail,
        nombre: `${usr.nombre} ${usr.apellido}`,
        admin: (usr.idCliente === 1)
    };

    return jwt.sign(payload, process.env.SECRET);
};

loginRouter.post("/login", async (req, res, next) => {
    // console.log(req.body);
    const { userName, password } = req.body;

    try {
        const cliente = await checkClientePassword(userName,password);
        res.json({
            id: cliente.idCliente,
            userName: cliente.mail,
            nombre: `${cliente.nombre} ${cliente.apellido}`,
            token: generarJwt(cliente)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

loginRouter.post("/register", async (req, res, next) => {
    const { mail } = req.body;
    try {
        const usrExistente = await getClienteByMail(mail);

        if (usrExistente) {
            throw new Error("userExists");
        } 
        
        const cliente = await createCliente(req.body);
        res.status(201).json(cliente);
    }
    catch (err) {
        next(err);
    }
});

export default loginRouter;
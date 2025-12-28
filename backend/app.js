import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbInit from "./data/db-init.js";

import logger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import tokenExtractor from "./middlewares/tokenExtractor.js";

import categoriasRouter from "./routes/categorias.router.js";
import clientesRouter from "./routes/clientes.router.js";
import menusRouter from "./routes/menus.router.js";
import mesasRouter from "./routes/mesas.router.js";
import pedidosRouter from "./routes/pedidos.router.js";
import reservasRouter from "./routes/reservas.router.js";
import serverStatusRouter from "./routes/serverStatus.router.js";
import loginRouter from "./routes/login.router.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// Logs
if (process.env.LOG === "true") {
    app.use(logger);
}

app 
    .use("/status", serverStatusRouter);

app
    .use("/api", loginRouter)
    .use("/api/clientes", tokenExtractor, clientesRouter)
    .use("/api/menus", tokenExtractor, menusRouter)
    .use("/api/mesas", tokenExtractor, mesasRouter)
    .use("/api/reservas", tokenExtractor, reservasRouter)
    .use("/api/categorias", tokenExtractor, categoriasRouter)
    .use("/api/pedidos", tokenExtractor, pedidosRouter);

app
    .use(errorHandler)
    .use(notFound);

async function start() {
    const PORT = process.env.PORT || 3000;

    // Inicializar la conexión a la base de datos
    await dbInit();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
}

await start();

export default app;

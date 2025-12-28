import sequelize from "./db.js";

// Import de los Modelos
import {Menu, Categoria, Mesa, Cliente, Reserva ,Pedido} from "../models/associations.js"

// Función para sincronizar los modelos con la base de datos
async function dbInit() {
    try {
        /*await Cliente.sync();
        await Categoria.sync();
        await Mesa.sync();
        await Menu.sync();
        await Reserva.sync();
        await Pedido.sync();*/

        await sequelize.authenticate();

        await sequelize.sync();
        console.log("Modelos sincronizados con la base de datos");
    }
    catch (error) {
        console.error("Error al sincronizar modelos:", error);
    }
}

export default dbInit;

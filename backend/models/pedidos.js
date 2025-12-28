import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Pedido = sequelize.define("Pedido", {
    idPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID_PEDIDO"
    },
    idReserva: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "ID_RESERVA"
    },
    idMenu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "ID_MENU"
    },
    cantidad: {
        type: DataTypes.INTEGER,
        field: "CANTIDAD"
    },
    precioTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "PRECIO_TOTAL"
    }
},{
    timestamps: false,
    tableName: "PEDIDOS"
});

export default Pedido;
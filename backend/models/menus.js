import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Menu = sequelize.define("Menu", {
    idMenu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID_MENU"
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "ID_CATEGORIA"
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: "NOMBRE"
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "DESCRIPCION"
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "PRECIO"
    },
},{
    timestamps: false,
    tableName: "MENUS"
});

export default Menu;
import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Mesa = sequelize.define("Mesa", {
    idMesa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID_MESA"
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: "NUMERO"
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "CAPACIDAD"
    },
    ubicacion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "UBICACION"
    }/*,
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "DISPONIBLE"
    }*/
},{
    timestamps: false,
    tableName: "MESAS"
});

export default Mesa;
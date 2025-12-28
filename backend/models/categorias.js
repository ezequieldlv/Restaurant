import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Categoria = sequelize.define("Categoria", {
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    }
},{
    timestamps: false,
    tableName: "CATEGORIAS"

});

export default Categoria;
import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Cliente = sequelize.define("Cliente", {
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID_CLIENTE"
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "NOMBRE"
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "APELLIDO"
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "MAIL",
        validate: {
            isEmail: {
                msg: 'El correo electrónico no tiene un formato válido.'
            }
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "PASSWORD"
    },
    fechaHoraCreacion: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "FECHA_HORA_CREACION"
    }
},{
    timestamps: false,
    tableName: "CLIENTES"

});

export default Cliente;
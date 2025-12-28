import Cliente from "../models/clientes.js";
import bcrypt from "bcrypt";

const SALTROUNDS = 10;

export async function getClientes(){
    const clientes = await Cliente.findAll();
    return clientes;
};

export async function getClienteById(id){
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        throw new Error("cannotGet");
    }
    return cliente;
};

/*
export async function createCliente(nombre, apellido, mail, password){
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
    const cliente = await Cliente.create({
        nombre,
        apellido,
        mail,
        password: hashedPassword
    });
    return getClienteById(cliente.idCliente);
};
*/


export async function createCliente(data){
    data.password = await bcrypt.hash(data.password, SALTROUNDS);
    const cliente = await Cliente.create(data);

    return getClienteById(cliente.idCliente);
};

/*
export async function updateCliente(idCliente, nombre, apellido, mail){
    const cliente = await Cliente.findByPk(idCliente);
    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.mail = mail;
    await cliente.save();
    return cliente;
};
*/

export async function updateCliente(id, data){
    await getClienteById(id);
    
    if (data.password) data.password = await bcrypt.hash(data.password, SALTROUNDS);

    return Cliente.update(data, { where: {idCliente: id} });
};

export async function deleteCliente(id){
    await getClienteById(id);
    await Cliente.destroy({ where: {idCliente: id}});
};

export async function getClienteByMail(mail) {
    const cliente = await Cliente.findOne({
        where: { mail }
    });
    
    return cliente;
};

export async function checkClientePassword(email, password) {
    const cliente = await getClienteByMail(email);
    if(!cliente ){
        throw new Error("loginError");
    }
    const validPassword = await bcrypt.compare(password, cliente.password);
    if(!validPassword ){
        throw new Error("loginError");
    }
    
    return cliente;
};
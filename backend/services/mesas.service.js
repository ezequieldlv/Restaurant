import Mesa from "../models/mesas.js";

export async function getMesas(){
    const mesas = await Mesa.findAll();
    return mesas;
};

export async function getMesaById(id){
    const mesa = await Mesa.findByPk(id);
    if (!mesa) {
        throw new Error("cannotGet");
        };
    return mesa;
};

export async function createMesa(data){
    const mesa = await Mesa.create(data);
    return getMesaById(mesa.idMesa);
};

export async function updateMesa(id, data){
    await getMesaById(id);
    return Mesa.update(data, { where: { idMesa: id } } );
};

export async function deleteMesa(id){
    await getMesaById(id);
    return Mesa.destroy( { where: { idMesa: id } } );
};
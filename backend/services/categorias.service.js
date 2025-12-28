import Categoria from "../models/categorias.js";

export async function getCategorias(){
    const categorias = await Categoria.findAll();
    return categorias;
};

export async function getCategoriaById(id){
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
        throw new Error("cannotGet");
        };
    return categoria;
};

export async function createCategoria(data){
    const categoria = await Categoria.create(data);
    return getCategoriaById(categoria.idCategoria);
};

export async function updateCategoria(id, data){
    await getCategoriaById(id);
    return Categoria.update(data, { where: { idCategoria: id } });
};

export async function deleteCategoria(id){
    await getCategoriaById(id);
    return Categoria.destroy({ where: {idCategoria: id}});
};
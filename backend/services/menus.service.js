import Categoria from "../models/categorias.js";
import Menu from "../models/menus.js";

export async function getMenus(){
    const menus = await Menu.findAll({
        include: [
            {
                model: Categoria,
                as: "categoria",
                required: true
            }
        ]
    });
    return menus;
};

export async function getMenusFiltered(filtro){
    const menus = await Menu.findAll({
        where: {idCategoria: filtro}}
    );
    return menus;
};

export async function getMenuById(id){
    const menu = await Menu.findByPk(id, {
        include: [
            {
                model: Categoria,
                as: "categoria",
                required: true
            }
        ]
    });
    if (!menu) {
        throw new Error("cannotGet");
        };
    return menu;
};

export async function createMenu(data){
    const menu = await Menu.create(data);
    return getMenuById(menu.idMenu);
};

export async function updateMenu(id, data){
    await getMenuById(id);
    return Menu.update(data, { where: { idMenu: id } });
};

export async function deleteMenu(id){
    await getMenuById(id);
    return Menu.destroy({ where: {idMenu: id}});
};
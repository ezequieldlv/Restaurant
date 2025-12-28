import axios from "axios";
import { baseUrl } from "./baseService";

const getMenus = async () => { 
    const response = await axios.get(`${baseUrl}/menus`)
    return response.data
  };

const getMenusFiltered = async (filtro) => {
    if(!filtro){
        const response = await axios.get(`${baseUrl}/menus?filter=1`)
        return response.data
    } else {
        const responseFiltered = await axios.get(`${baseUrl}/menus?filter=${filtro}`);
        return responseFiltered.data;
    }
  };

const getMenuById = async (id) => {
    const response = await axios.get(`${baseUrl}/menus/${id}`);
    return response.data
}

const deleteMenu = async (id) => {
    const response = await axios.delete(`${baseUrl}/menus/${id}`);
    return response.data
}

const updateMenu = async (id, data) => {
    const response = await axios.put(`${baseUrl}/menus/${id}`, data);
    return response.data
}
  
const createMenu = async (data) => {
    const response = await axios.post(`${baseUrl}/menus`, data);
    return response.data
}

export default {getMenus, getMenusFiltered, getMenuById, deleteMenu, updateMenu, createMenu}
import axios from "axios";
import { baseUrl } from "./baseService";


const deleteCliente = async (id) => {
    const response = await axios.delete(`${baseUrl}/clientes/${id}`);
    return response.data
}

const updateCliente = async (id, data) => {
    const response = await axios.put(`${baseUrl}/clientes/${id}`, data);
    return response.data
}

const getClienteById = async (id) => {
    const response = await axios.get(`${baseUrl}/clientes/${id}`);
    return response.data
}

export default {getClienteById, deleteCliente, updateCliente}
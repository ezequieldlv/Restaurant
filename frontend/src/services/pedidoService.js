import axios from "axios";
import { baseUrl } from "./baseService";

const getPedidos = async () => {
    const response = await axios.get(`${baseUrl}/pedidos`)
    return response.data
}

const getPedidosByReserva = async (idReserva) => {
    const response = await axios.get(`${baseUrl}/pedidos/reserva/${idReserva}`)
    return response.data
}

const getPedidoById = async (id) => {
    const response = await axios.get(`${baseUrl}/pedidos/${id}`);
    return response.data
}

const deletePedido = async (id) => {
    const response = await axios.delete(`${baseUrl}/pedidos/${id}`);
    return response.data
}

const updatePedido = async (id, data) => {
    const response = await axios.put(`${baseUrl}/pedidos/${id}`, data);
    return response.data
}
  
const createPedido = async (data) => {
    const response = await axios.post(`${baseUrl}/pedidos`, data);
    return response.data
}

export default {getPedidos, getPedidosByReserva, getPedidoById, updatePedido, deletePedido, createPedido}
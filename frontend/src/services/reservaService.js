import axios from "axios";
import { baseUrl } from "./baseService";

const getReservas = async () => {
    // return fetch("http://localhost:3001/api/estaciones", 
    //   {
    //     headers: {"content-type": 'application/json', "Authorization": `Bearer ${token}`}
    //   }
    // ).then((response) =>
    //   response.json()
    // );
    // const response = await axios.get(`${baseUrl}/estaciones`, {
    //   headers: {"Authorization" : `Bearer ${token}`}
    // })  
    const response = await axios.get(`${baseUrl}/reservas`);
    return response.data
  };

const getReservasActivas = async () => {
    const response = await axios.get(`${baseUrl}/reservas/active`);
    return response.data
}

const getReservaById = async (id) => {
    const response = await axios.get(`${baseUrl}/reservas/${id}`);
    return response.data
}

const deleteReserva = async (id) => {
    const response = await axios.delete(`${baseUrl}/reservas/${id}`);
    return response.data
}

const updateReserva = async (id, data) => {
    const response = await axios.put(`${baseUrl}/reservas/${id}`, data);
    return response.data
}

const createReserva = async (data) => {
    const response = await axios.post(`${baseUrl}/reservas`, data);
    return response.data
}

export default {getReservas, getReservasActivas, getReservaById, updateReserva, deleteReserva, createReserva}
import axios from "axios";
import { baseUrl } from "./baseService";

const getCategorias = async () => { 
    const response = await axios.get(`${baseUrl}/categorias`)
    return response.data
  };

export default {getCategorias}
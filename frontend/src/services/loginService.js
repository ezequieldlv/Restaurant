import axiosInstance from "./axiosInstance"
import { baseUrl } from "./baseService";

const doLogin = async (login) => {
    const response = await axiosInstance.post(`${baseUrl}/login`, login)
    console.log(response.data)
    return response.data

};

export default { doLogin };

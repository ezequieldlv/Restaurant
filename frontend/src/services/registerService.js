import axiosInstance from "./axiosInstance"
import { baseUrl } from "./baseService";

const doRegister = async (newUser) => {
        const response = await axiosInstance.post(`${baseUrl}/register`, newUser)
        console.log(response.data)
        return response.data
    }

export default doRegister

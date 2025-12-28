import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// const axiosInstance = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com',
//   // other configurations
// })

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    (request) => {
        console.log('Axios'. request);
        return request;
    }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useNavigate("/login");
    }
    if(error.response && error.response.data){
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error)
  },
)

export default axiosInstance

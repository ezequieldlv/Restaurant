import axios from "axios"

export const baseUrl = 'http://localhost:3001/api'

export let token = ""

export const setToken = (newToken) => {
    token = newToken
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
}

export default { baseUrl, token, setToken }

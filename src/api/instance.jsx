import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
        timeout: 3000,
    }
})

export default instance

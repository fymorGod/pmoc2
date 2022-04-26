import axios from "axios";

export const app = axios.create({
    baseURL: "http://192.168.6.20:3001"
})
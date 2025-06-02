import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "https://contact-manager-backend-rho.vercel.app/api",
    withCredentials: true
});

API.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" && localStorage.getItem("token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default API;
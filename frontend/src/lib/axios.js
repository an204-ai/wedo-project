import axios from "axios";
import useAuthStore from "@/stores/authStore";

const baseURL = import.meta.env.MODE == "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const {accessToken} = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});


export default api;
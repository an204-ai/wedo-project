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

//Tự động cấp lại accesstoken khi hết hạn
api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    //Những api không cần check
    if (originalRequest.url.includes('/auth/signin') || 
        originalRequest.url.includes('/auth/signup') || 
        originalRequest.url.includes('/auth/refresh')){
        return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (error.response.status === 403 && originalRequest._retryCount < 5) {
    originalRequest._retryCount += 1;
    console.log(`Đang refresh token ${originalRequest._retryCount}`);
    try {
        const response = await api.post('/auth/refresh');
        const newAccessToken = response.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
    } catch (error) {
        useAuthStore.getState().clearState();
        return Promise.reject(error);
    }
    }
    return Promise.reject(error);
});


export default api;
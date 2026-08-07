import api from "@/lib/axios";

export const signOut = async () => {
    const response = await api.post("/auth/signout");
    return response.data;
};

export const signUp = async (userName, userEmail, displayName, password) => {
    const response = await api.post("/auth/signup", {
        userName,
        userEmail,
        displayName,
        password,
    });
    return response.data;
}

export const signIn = async (userName, password) => {
    const response = await api.post("/auth/signin", {
        userName,
        password,
    });
    return response.data;
}

export const refreshAccessToken = async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
}

export const fetchMe = async () => {
    const response = await api.get("/user/profile");
    return response.data;
}

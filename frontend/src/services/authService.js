import api from "@/lib/axios";

export const signOut = async () => {
    const response = await api.post("/auth/signout", {withCredentials: true});
    return response.data;
};

export const signUp = async (userName, userEmail, password, displayName) => {
    const response = await api.post("/auth/signup", {
        userName,
        userEmail,
        password,
        displayName,
    }, {withCredentials: true});
    return response.data;
}

export const signIn = async (userName, password) => {
    const response = await api.post("/auth/signin", {
        userName,
        password,
    }, {withCredentials: true});
    return response.data;
}
import api from "@/lib/axios";

export const fetchTasks = async (dateQuery = "week") => {
    const res = await api.get(`/tasks/?filter=${dateQuery}`);
    return res.data;
}

export const createTask = async (title) => {
    const res = await api.post("/tasks", { title });
    return res.data;
}

export const updateTask = async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
}

export const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
}
import { create } from "zustand";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/services/taskService";
import { toast } from "sonner";

const useTaskStore = create((set, get) => ({
    tasks: [],
    completedTaskCount: 0,
    pendingTaskCount: 0,
    dateQuery: "week",
    isLoading: false,

    setDateQuery: (dateQuery) => {
        set({ dateQuery });
        get().getTasks(dateQuery);
    },

    getTasks: async (dateQuery) => {
        const query = dateQuery || get().dateQuery;
        set({ isLoading: true });
        try {
            const data = await fetchTasks(query);
            set({
                tasks: data.tasks,
                completedTaskCount: data.completedTasks,
                pendingTaskCount: data.pendingTasks,
            });
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            toast.error("Lỗi khi truy xuất công việc");
        } finally {
            set({ isLoading: false });
        }
    },

    addTask: async (title) => {
        try {
            await createTask(title);
            toast.success("Thêm công việc thành công");
            await get().getTasks();
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi thêm công việc");
        }
    },

    editTask: async (id, data) => {
        try {
            await updateTask(id, data);
            toast.success("Sửa task thành công");
            await get().getTasks();
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi sửa task");
        }
    },

    toggleTaskStatus: async (id, currentStatus) => {
        const newStatus = currentStatus === "pending" ? "completed" : "pending";
        const completedAt = newStatus === "completed" ? new Date() : null;
        try {
            await updateTask(id, { status: newStatus, completedAt });
            const statusLabel = newStatus === "completed" ? "Hoàn thành" : "Chưa hoàn thành";
            toast.success(`Đã chuyển task thành ${statusLabel}`);
            await get().getTasks();
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi chuyển trạng thái task");
        }
    },

    removeTask: async (id) => {
        try {
            await deleteTask(id);
            toast.success("Xóa task thành công");
            await get().getTasks();
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi xóa task");
        }
    },
}));

export default useTaskStore;

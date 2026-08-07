import { create } from "zustand";
import { toast } from "sonner";
import { signUp, signIn, signOut, fetchMe, refreshAccessToken } from "@/services/authService.js";

const useAuthStore = create((set, get) => ({
    user: null,
    accessToken: null,
    isLoading: false,

    clearState: () => set({
        user: null,
        accessToken: null,
    }),

    setAccessToken: (accessToken) => {
        set({ accessToken });
    },

    signUp: async (userName, userEmail, displayName, password) => {
        set({ isLoading: true, error: null });
        try {
            //gọi api
            const res = await signUp(userName, userEmail, displayName, password);
            set({
                user: res.user,
                accessToken: res.accessToken,
            })
            toast.success("Đăng ký thành công");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            set({ isLoading: false })
        }
    },

    signIn: async (userName, password) => {
        set({ isLoading: true, error: null });
        try {
            //gọi api
            const res = await signIn(userName, password);
            get().setAccessToken(res.accessToken);
            toast.success("Chào mừng bạn đã quay lại với WeDO");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            set({ isLoading: false })
        }
    },

    signOut: async () => {
        try {
            await signOut();
            get().clearState();
            toast.success("Đăng xuất thành công");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false })
        }
    },

    fetchMe: async () => {
        try {
            const user = await fetchMe();
            set({ user });
        } catch (error) {
            console.log(error);
            set({ user: null });
            toast.error("Lỗi xảy ra khi lấy thông tin người dùng");
        } finally {
            set({ isLoading: false })
        }
    },

    refreshToken: async () => {
        set({ isLoading: true, error: null });
        try {
            const { accessToken } = await refreshAccessToken();
            get().setAccessToken(accessToken);
        } catch (error) {
            console.log(error);
            get().clearState();
        } finally {
            set({ isLoading: false })
        }
    }


}))


export default useAuthStore;

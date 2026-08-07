import { create } from "zustand";
import { toast } from "sonner";
import {signUp, signIn, signOut} from "@/services/authService.js";

const useAuthStore = create((set, get) => ({
    user: null,
    accessToken: null,
    isLoading: false, 

    clearState: () => set({
        user: null,
        accessToken: null,
    }),
    
    signUp: async (userName, userEmail, password, displayName) => {
        set({isLoading: true, error: null});
        try {
           //gọi api
           const res = await signUp(userName, userEmail, password, displayName);
           set({
            user: res.user,
            accessToken: res.accessToken,
           })
           toast.success("Đăng ký thành công");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isLoading: false})
        }
    },

    signIn: async (userName, password) => {
        set({isLoading: true, error: null});
        try {
           //gọi api
           const res = await signIn(userName, password);
           set({accessToken: res.accessToken});
           toast.success("Chào mừng bạn đã quay lại với WeDO");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isLoading: false})
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
        } finally{
            set({isLoading: false})
        }
    }
    
}))


export default useAuthStore;

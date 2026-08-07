import { Button } from "../ui/button";
import useAuthStore from "@/stores/authStore";

const Logout = () => {

  const signOut = useAuthStore((state) => state.signOut);

  const handleLogout = async () => {
    await signOut();
  };


  return (
    <Button onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
};

export default Logout;
import { Button } from '../ui/button'
import useAuthStore from "@/stores/authStore";

const Logout = () => {
  const signOut = useAuthStore((state) => state.signOut);
  return (
    <Button onClick={() => signOut()}>Đăng xuất</Button>
  )
}

export default Logout
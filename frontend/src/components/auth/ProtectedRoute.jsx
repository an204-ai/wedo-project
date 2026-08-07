import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import useAuthStore from '@/stores/authStore'
import AppSkeleton from './AppSkeleton'


const ProtectedRoute = () => {
  const { accessToken, user, isLoading, refreshToken, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  const init = async () => {

    if (!accessToken) {
      await refreshToken();
    }

    if (useAuthStore.getState().accessToken && !user) {
      await fetchMe();
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStarting(false);
  }
  useEffect(() => {
    init();
  }, [])
  if (starting || isLoading) {
    return (
    <AppSkeleton/>
    );
  }

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute
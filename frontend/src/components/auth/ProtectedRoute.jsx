import React from 'react'
import { Navigate, Outlet } from 'react-router'
import useAuthStore from '@/stores/authStore'


const ProtectedRoute = () => {
  const {accessToken, user, isLoading} = useAuthStore();
  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute
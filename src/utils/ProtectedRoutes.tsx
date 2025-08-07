import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const user = localStorage.getItem("username"); 

  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "./storage/authStorage";

function ProtectedRoute() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // Check for auth token — adjust the key to match what your app stores
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the child routes
  return <Outlet />;
}

export default ProtectedRoute;
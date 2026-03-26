import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
};

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // ✅ GET context from parent (Layout)
  const context = useOutletContext();

  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // ✅ PASS context forward
  return <Outlet context={context} />;
}

export default ProtectedRoute;
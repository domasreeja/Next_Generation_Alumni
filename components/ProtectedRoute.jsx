import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  // wait until auth loads
  if (user === null) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // normalize role comparison
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }
  


  return children;
}

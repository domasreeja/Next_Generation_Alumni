import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sidebar">

      <h2 style={{
    color: "#60a5fa",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "1px",
    textShadow: "0 0 8px rgba(96,165,250,0.8)"
  }}>Alumni Portal</h2>

      <Link to="/">Home</Link>
      <Link to="/jobs">Jobs</Link>

      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {!user && (
        <Link to="/admin/register" className="admin">
          Admin Setup
        </Link>
      )}

      {user?.role === "student" && <Link to="/student">Student</Link>}
      {user?.role === "alumni" && <Link to="/alumni">Alumni</Link>}
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}

      {user && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}

    </div>
  );
}
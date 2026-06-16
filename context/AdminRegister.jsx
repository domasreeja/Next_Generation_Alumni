import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    if (!name || !email) {
      alert("All fields are required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/register-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Admin registration failed");
      return;
    }

    alert("Admin registered successfully. Please login.");
    navigate("/login");
  };

  return (
    <div className="card">
      <h2>Admin Registration</h2>

      <input
        placeholder="Admin Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleRegister}>Register Admin</button>
    </div>
  );
}

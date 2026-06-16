import { useEffect, useState } from "react";

export default function ViewAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/alumni") // ✅ BACKEND API
      .then(res => res.json())
      .then(data => {
        setAlumni(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching alumni:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading alumni...</p>;
  }

  return (
    <div className="page-card">
      
      <h2>Alumni Directory</h2>

      {alumni.length === 0 && <p>No alumni found</p>}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {alumni.map(a => (
          <div key={a._id} className="alumni-card">
            <h3>{a.name}</h3>
            <p><b>Company:</b> {a.company}</p>
            <p><b>Role:</b> {a.role}</p>
            <p><b>Batch:</b> {a.batch}</p>
            
            <p><b>Email:</b> {a.email}</p>
            <p><b>Contact:</b> {a.contact}</p>

            <button onClick={() => window.open(a.linkedin, "_blank")}>
              Connect via LinkedIn
            </button>
            

          </div>
        ))}
      </div>
    </div>
  );
}

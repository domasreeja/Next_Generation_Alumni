import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalAlumni: 0,
    activeMentors: 0,
    jobsPosted: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadStats = async () => {
      try {

        const res = await fetch("http://localhost:5000/api/admin/stats");
        const data = await res.json();

        setStats({
          totalAlumni: data.alumni  || 0,
          activeMentors: data.mentors || 13,
          jobsPosted: data.jobs || 0
        });

      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();

  }, []);

  if (loading) {
    return (
      <div className="page-card">
        <h2>Admin Dashboard</h2>
        <p>Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="page-card">

      <h2>Admin Dashboard</h2>

      {/* ================= STATS ================= */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap"
        }}
      >

        <div className="admin-card">
          <h3 style={{ fontSize: "36px", color: "#2563eb" }}>
            {stats.totalAlumni}
          </h3>
          <p>Total Alumni</p>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: "36px", color: "#2563eb" }}>
            {stats.activeMentors}
          </h3>
          <p>Active Mentors</p>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: "36px", color: "#2563eb" }}>
            {stats.jobsPosted}
          </h3>
          <p>Jobs Posted</p>
        </div>

      </div>

      {/* ================= ACTIONS ================= */}

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap"
        }}
      >

        <div className="admin-section">
          <h3>Approvals</h3>
          <p>Pending registration requests</p>

          <button
            onClick={() => navigate("/admin/approvals")}
          >
            View Requests
          </button>
        </div>

        <div className="admin-section">
          <h3>Job Management</h3>
          <p>Approve or remove job posts</p>

          <button
            onClick={() => navigate("/admin/jobs")}
          >
            Manage Jobs
          </button>
        </div>

        <div className="admin-section">
          <h3>Mentorship Oversight</h3>
          <p>Monitor mentor–mentee activities</p>

          <button
            onClick={() => navigate("/admin/mentorship")}
          >
            View Mentorship
          </button>
        </div>

      </div>

    </div>
  );
}
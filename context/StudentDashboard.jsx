import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="page-card">
      <h2>Student Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        
        {/* Find Mentors */}
        <Link to="/student/mentors">
          <button>Find Mentors</button>
        </Link>

        {/* View Alumni */}
        <Link to="/student/alumni">
          <button>View Alumni</button>
        </Link>

        {/* My Profile (NEW) */}
        <Link to="/student/profile">
          <button>My Profile</button>
        </Link>

      </div>
    </div>
  );
}
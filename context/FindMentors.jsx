import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FindMentors() {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?._id) return;

    fetch(`http://localhost:5000/api/match-mentors/${user._id}`)
      .then(res => res.json())
      .then(data => setMentors(data))
      .catch(err => console.error("Failed to load mentors", err));
  }, [user?._id]);

  return (
    <div className="page-card">
      <h2>Find Mentors</h2>
      
{mentors.length > 0 && mentors[0].matchScore < 30 && (
  <p style={{ color: "orange" }}>
    Complete your profile to get better mentor matches
  </p>
)}
      {mentors.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No mentors available at the moment
        </p>
      )}

      <div className="mentor-grid">
        {mentors.map(m => (
          <div key={m._id} className="card">
            <h3>{m.name}</h3>

            <p><b>Company:</b> {m.company}</p>
            <p><b>Domain:</b> {m.domain || "N/A"}</p>

            {/* AI Match Score */}
            <div style={{ marginTop: "10px" }}>
              <p>
                <b>AI Match:</b>{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      m.matchScore >= 80
                        ? "green"
                        : m.matchScore >= 50
                        ? "orange"
                        : "red"
                  }}
                >
                  {m.matchScore}%
                </span>
              </p>

              {/* Progress Bar */}
              <div
                style={{
                  height: "8px",
                  background: "#e0e0e0",
                  borderRadius: "5px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${m.matchScore}%`,
                    height: "100%",
                    background:
                      m.matchScore >= 80
                        ? "green"
                        : m.matchScore >= 50
                        ? "orange"
                        : "red"
                  }}
                />
              </div>

              {/* Recommendation Badge */}
              {m.matchScore >= 80 && (
                <p style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
                  ⭐ Highly Recommended
                </p>
              )}
            </div>

            <button
              style={{ marginTop: "15px" }}
              onClick={() =>
                navigate(`/student/request-session/${m._id}`, {
                  state: { mentor: m }
                })
              }
            >
              Request Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
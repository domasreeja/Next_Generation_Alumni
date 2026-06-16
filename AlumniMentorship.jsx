import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function AlumniMentorship() {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchRequests = async () => {
      try {
        console.log("Logged in mentor ID:", user._id);

        // ✅ TRY THIS ENDPOINT (adjust if needed)
        const res = await fetch(`http://localhost:5000/api/alumni/MentorshipRequests/${user._id}`);

        const data = await res.json();

        console.log("Fetched requests:", data);

        setRequests(data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `http://localhost:5000/api/mentorship/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      // ✅ instant UI update
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-card">
      <h2>Mentorship Requests</h2>
      <p>Manage mentorship requests from students</p>

      {/* ✅ Loading */}
      {loading && <p>Loading requests...</p>}

      {/* ✅ Empty */}
      {!loading && requests.length === 0 && (
        <p>No mentorship requests yet</p>
      )}

      {/* ✅ List */}
      {requests.map((r) => (
        <div key={r._id} className="card">
          <p><b>Student:</b> {r.studentName}</p>
          <p><b>Date:</b> {r.date}</p>
          <p><b>Time:</b> {r.time}</p>
          <p><b>Message:</b> {r.message || "No message"}</p>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color:
                  r.status === "accepted"
                    ? "green"
                    : r.status === "rejected"
                    ? "red"
                    : "orange",
                fontWeight: "bold",
              }}
            >
              {r.status}
            </span>
          </p>

          {r.status === "pending" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => updateStatus(r._id, "accepted")}>
                Accept
              </button>
              <button onClick={() => updateStatus(r._id, "rejected")}>
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
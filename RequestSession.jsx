import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RequestSession() {

  const navigate = useNavigate();
  const location = useLocation();
  const mentor = location.state?.mentor;

  const user = JSON.parse(localStorage.getItem("user"));

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!mentor) {
    return <p>Mentor data not found</p>;
  }

  const sendRequest = async () => {

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("http://localhost:5000/api/mentorship/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          studentId: user._id,
          studentName: user.name,
          studentEmail: user.email,

          mentorId: mentor._id,
          mentorName: mentor.name,
          mentorEmail: mentor.email,

          date,
          time,
          message
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to send request");
        setLoading(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/student/mentors");
      }, 2000);

    } catch (err) {

      console.error(err);
      alert("Server error. Please try again.");

    }

    setLoading(false);
  };

  /* ================= SUCCESS PAGE ================= */

  if (success) {
    return (
      <div className="page-card" style={{ textAlign: "center" }}>
        <h2>✅ Request Sent Successfully</h2>

        <p>
          Your mentorship request has been sent to <b>{mentor.name}</b>.
        </p>

        <p>The mentor has been notified via email.</p>

        <p>Redirecting you back to mentors page…</p>
      </div>
    );
  }

  /* ================= MAIN PAGE ================= */

  return (
    <div className="request-container">
 <div className="request-card">

    <h2>Request Session</h2>

    <div className="mentor-info">
      <p><b>Mentor:</b> {mentor.name}</p>
      <p><b>Company:</b> {mentor.company}</p>
    </div>

    <div className="session-form">

      <div className="form-group">
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Select Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label>Message</label>
        <textarea
          placeholder="Enter your request message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

    </div>

    <div className="session-buttons">

      <button className="primary-btn" onClick={sendRequest} disabled={loading}>
        {loading ? "Sending..." : "Send Request 🚀"}
      </button>

      <button className="secondary-btn" onClick={() => navigate(-1)}>
        Cancel
      </button>

    </div>

  </div>
</div>
  );
}
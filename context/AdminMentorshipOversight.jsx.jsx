
import { useEffect, useState } from "react";

export default function AdminMentorshipOversight() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/mentorship-requests")
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);
  return (
    <div className="page-card">
      <h2>Mentorship Oversight</h2>

      {requests.length === 0 && <p>No mentorship requests</p>}

      {requests.map(r => (
        <div key={r._id} className="card">
          <p><b>Student:</b> {r.studentName}</p>
          <p><b>Mentor:</b> {r.mentorName}</p>
          <p><b>Date:</b> {r.date} | {r.time}</p>
          <p><b>Status:</b> {r.status}</p>
          

        </div>
      ))}
    </div>
  );
}

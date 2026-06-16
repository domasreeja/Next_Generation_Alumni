import { useEffect, useState } from "react";

export default function AlumniJobApplications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/alumni/job-applications/${user._id}`)
      .then(res => res.json())
      .then(data => setApplications(data));
  }, [user]);

  return (
    <div className="page-card">
      <h2>Job Applications</h2>

      {applications.length === 0 && <p>No applications yet</p>}

      {applications.map(app => (
        <div key={app._id} className="card">
          <p><b>Job:</b> {app.jobTitle}</p>
          <p><b>Company:</b> {app.company}</p>
          <p><b>Student:</b> {app.studentName}</p>
          <p><b>Email:</b> {app.studentEmail}</p>
          <p>
            <b>Applied on:</b>{" "}
            {new Date(app.appliedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

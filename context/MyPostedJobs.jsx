import { useEffect, useState } from "react";

export default function MyPostedJobs() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    fetch(`http://localhost:5000/api/alumni/my-jobs/${user._id}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, [user]);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await fetch(`http://localhost:5000/api/alumni/jobs/${id}`, {
      method: "DELETE"
    });

    setJobs(jobs.filter(j => j._id !== id));
  };

  const saveEdit = async () => {
    await fetch(`http://localhost:5000/api/alumni/jobs/${editingJob._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingJob)
    });

    setJobs(jobs.map(j => (j._id === editingJob._id ? editingJob : j)));
    setEditingJob(null);
  };

  return (
    <div className="page-card">
      <h2>My Posted Jobs</h2>

      {jobs.length === 0 && <p>No jobs posted yet</p>}

      {jobs.map(job => (
        <div key={job._id} className="job-card">
          <h3>{job.title}</h3>
          <p><b>{job.company}</b></p>
          <p>{job.location}</p>
          <p>{job.type}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setEditingJob(job)}>Edit</button>
            <button onClick={() => deleteJob(job._id)}>Delete</button>
          </div>
        </div>
      ))}

      {/* EDIT MODAL */}
      {editingJob && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Job</h3>

            <input
              value={editingJob.title}
              onChange={e =>
                setEditingJob({ ...editingJob, title: e.target.value })
              }
            />

            <input
              value={editingJob.company}
              onChange={e =>
                setEditingJob({ ...editingJob, company: e.target.value })
              }
            />

            <input
              value={editingJob.location}
              onChange={e =>
                setEditingJob({ ...editingJob, location: e.target.value })
              }
            />

            <select
              value={editingJob.type}
              onChange={e =>
                setEditingJob({ ...editingJob, type: e.target.value })
              }
            >
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>

            <textarea
              value={editingJob.description}
              onChange={e =>
                setEditingJob({ ...editingJob, description: e.target.value })
              }
            />

            <input
              value={editingJob.applyLink}
              onChange={e =>
                setEditingJob({ ...editingJob, applyLink: e.target.value })
              }
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingJob(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

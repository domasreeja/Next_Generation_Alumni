import { useEffect, useState } from "react";

export default function AdminJobManagement() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    type: "Job",
    location: "",
    description: "",
    applyLink: ""
  });

  const loadJobs = () => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const postJob = async () => {
    await fetch("http://localhost:5000/api/admin/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Job posted successfully");

    setForm({
      title: "",
      company: "",
      type: "Job",
      location: "",
      description: "",
      applyLink: ""
    });

    loadJobs();
  };

  const deleteJob = async (id) => {
    await fetch(`http://localhost:5000/api/admin/jobs/${id}`, {
      method: "DELETE"
    });
    loadJobs();
  };

  return (
    <div className="page-card">
      <h2>Job Management</h2>

      <h3>Post Job / Internship</h3>

      {/* ✅ FORM GRID */}
      <div className="job-form">

        <div className="form-group">
          <label>Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter job title"
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Enter company"
          />
        </div>

        <div className="form-group">
          <label>Job Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter job description"
          />
        </div>

        <div className="form-group full-width">
          <label>Application Link</label>
          <input
            name="applyLink"
            value={form.applyLink}
            onChange={handleChange}
            placeholder="Paste application link"
          />
        </div>

        <button className="post-btn" onClick={postJob}>
          Post Job 🚀
        </button>

      </div>

      <hr />

      <h3>Posted Jobs</h3>

      {/* ✅ JOBS GRID */}
      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job._id} className="job-card">
            <h4>{job.title}</h4>
            <p><b>{job.company}</b> | {job.type}</p>
            <p>{job.location}</p>

            <button onClick={() => deleteJob(job._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
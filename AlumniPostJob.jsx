import { useState } from "react";
import "./AlumniPostJob.css";

export default function AlumniPostJob() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    company: "",
    type: "Job",
    location: "",
    description: "",
    applyLink: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitJob = async () => {

    if (
      !form.title ||
      !form.company ||
      !form.location ||
      !form.description ||
      !form.applyLink
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/api/alumni/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,

          // Alumni details for trust
          alumniId: user._id,
          alumniName: user.name,
          alumniCompany: user.company || "",
          alumniDesignation: user.designation || "",
          alumniBatch: user.batch || ""
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to post job");
        return;
      }

      alert("Job / Internship posted successfully!");

      setForm({
        title: "",
        company: "",
        type: "Job",
        location: "",
        description: "",
        applyLink: ""
      });

    } catch (error) {
      console.error(error);
      alert("Server error while posting job");
    }
  };

  return (
    <div className="postjob-container">

      <div className="postjob-card">

        <h2>Post Job / Internship</h2>

        <div className="form-group">
          <label>Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Frontend Developer Intern"
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
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
            placeholder="Remote / Hyderabad"
          />
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe responsibilities and requirements..."
          />
        </div>

        <div className="form-group">
          <label>Application Link</label>
          <input
            name="applyLink"
            value={form.applyLink}
            onChange={handleChange}
            placeholder="https://company.com/careers"
          />
        </div>

        <button className="postjob-btn" onClick={submitJob}>
          Post Job
        </button>

      </div>

    </div>
  );
}
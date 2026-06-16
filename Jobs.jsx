import { useEffect, useState } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to load jobs", err));
  }, []);

  // Search filter
  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-card">

      <h2>Jobs & Internships</h2>

      {/* Search */}
      <input
        placeholder="Search job or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />

      {/* Job Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filteredJobs.length === 0 && <p>No jobs found</p>}

        {filteredJobs.map((job) => (

          <div key={job._id} className="job-card">

            <h3>{job.title}</h3>

            <p><b>{job.company}</b></p>

            <p>{job.location}</p>

            <p>{job.type}</p>

            {/* Alumni Info */}
            <div className="job-poster">
              <strong>Posted by:</strong> {job.alumniName || "Alumni"}

              {job.alumniDesignation && (
                <p>{job.alumniDesignation}</p>
              )}

              {job.alumniCompany && (
                <p>{job.alumniCompany}</p>
              )}

              {job.alumniBatch && (
                <p>Batch {job.alumniBatch}</p>
              )}
            </div>

            <button onClick={() => setSelectedJob(job)}>
              View Details
            </button>

          </div>
        ))}
      </div>

      {/* Job Modal */}
      {selectedJob && (
        <div className="modal-overlay">

          <div className="modal">

            <h3>{selectedJob.title}</h3>

            <p><b>Company:</b> {selectedJob.company}</p>

            <p><b>Location:</b> {selectedJob.location}</p>

            <p><b>Type:</b> {selectedJob.type}</p>

            {/* Alumni Details */}
            <div className="job-poster">
              <strong>Posted by:</strong> {selectedJob.alumniName || "Alumni"}

              {selectedJob.alumniDesignation && (
                <p>{selectedJob.alumniDesignation}</p>
              )}

              {selectedJob.alumniCompany && (
                <p>{selectedJob.alumniCompany}</p>
              )}

              {selectedJob.alumniBatch && (
                <p>Batch {selectedJob.alumniBatch}</p>
              )}
            </div>

            <p style={{ marginTop: "10px" }}>
              {selectedJob.description}
            </p>

            <button
              onClick={async () => {

                const user = JSON.parse(localStorage.getItem("user"));

                if (!user || user.role !== "student") {
                  alert("Only students can apply");
                  return;
                }

                await fetch("http://localhost:5000/api/jobs/apply", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    jobId: selectedJob._id,
                    jobTitle: selectedJob.title,
                    company: selectedJob.company,
                    studentId: user._id,
                    studentName: user.name,
                    studentEmail: user.email
                  })
                });

                window.open(selectedJob.applyLink, "_blank");
              }}
            >
              Apply
            </button>

            <button onClick={() => setSelectedJob(null)}>
              Close
            </button>

          </div>

        </div>
      )}
    </div>
  );
}
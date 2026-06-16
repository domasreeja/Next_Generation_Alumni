import { useState } from "react";

const alumniData = [
  {
    id: 1,
    name: "Ravi Kumar",
    batch: "2018",
    branch: "CSE",
    company: "Google",
    role: "Software Engineer"
  },
  {
    id: 2,
    name: "Anjali Sharma",
    batch: "2019",
    branch: "IT",
    company: "Amazon",
    role: "Cloud Engineer"
  },
  {
    id: 3,
    name: "Suresh Reddy",
    batch: "2017",
    branch: "ECE",
    company: "Infosys",
    role: "System Analyst"
  }
];

export default function AlumniDirectory() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [batch, setBatch] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const filteredAlumni = alumniData
    .filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter(a => (branch ? a.branch === branch : true))
    .filter(a => (batch ? a.batch === batch : true))
    .sort((a, b) => b.batch.localeCompare(a.batch));

  return (
    <div className="page-card">
      <h2>Alumni Directory</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Search name or company"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select onChange={e => setBranch(e.target.value)}>
          <option value="">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>

        <select onChange={e => setBatch(e.target.value)}>
          <option value="">All Batches</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
        </select>
      </div>

      {/* Alumni Cards */}
      {filteredAlumni.length === 0 && (
        <p>No alumni found</p>
      )}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filteredAlumni.map(a => (
          <div key={a.id} className="alumni-card">
            <h3>{a.name}</h3>
            <p>{a.role}</p>
            <p>{a.company}</p>
            <button onClick={() => setSelectedAlumni(a)}>
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {selectedAlumni && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedAlumni.name}</h3>
            <p><b>Batch:</b> {selectedAlumni.batch}</p>
            <p><b>Branch:</b> {selectedAlumni.branch}</p>
            <p><b>Company:</b> {selectedAlumni.company}</p>
            <p><b>Role:</b> {selectedAlumni.role}</p>

            <button>Request Mentorship</button>
            <button onClick={() => setSelectedAlumni(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

export default function AlumniProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/alumni/profile/${user._id}`)
      .then(res => res.json())
      .then(data => {
        setProfile({
          ...data,
          company: data.company || "",
          currentRole: data.currentRole || "",
          skills: data.skills || "",
          industry: data.industry || "",
          domain: data.domain || "",
          experience: data.experience || "",
          contact: data.contact || "",
          linkedin: data.linkedin || ""
        });
      });
  }, [user._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = async () => {
    await fetch(`http://localhost:5000/api/alumni/profile/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });

    alert("Profile updated successfully");
    setEditing(false);
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
  <div className="profile-container">

    <div className="profile-card">

      <h2>My Profile</h2>

      {/* HEADER */}
      <div className="profile-header">
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Batch:</b> {profile.batch}</p>
      </div>

      <hr />

      {/* FORM GRID */}
      <div className="profile-grid">

        <div className="form-group">
          <label>Company</label>
          <input name="company" value={profile.company} onChange={handleChange} disabled={!editing}/>
        </div>

        <div className="form-group">
          <label>Designation</label>
          <input name="designation" value={profile.designation} onChange={handleChange} disabled={!editing}/>
        </div>

       

        <div className="form-group">
          <label>Experience</label>
          <input name="experience" value={profile.experience} onChange={handleChange} disabled={!editing}/>
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input name="contact" value={profile.contact} onChange={handleChange} disabled={!editing}/>
        </div>

        <div className="form-group">
          <label>Skills</label>
          <input name="skills" value={profile.skills} onChange={handleChange} disabled={!editing}/>
        </div>

        <div className="form-group">
          <label>Industry</label>
          <input name="industry" value={profile.industry} onChange={handleChange} disabled={!editing}/>
        </div>

        <div className="form-group">
          <label>Domain / Expertise</label>
          <input name="domain" value={profile.domain} onChange={handleChange} disabled={!editing}/>
        </div>

        <div className="form-group full-width">
          <label>LinkedIn</label>
          <input name="linkedin" value={profile.linkedin} onChange={handleChange} disabled={!editing}/>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="profile-actions">
        {!editing ? (
          <button className="btn-primary" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <>
            <button className="btn-primary" onClick={saveProfile}>Save</button>
            <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
          </>
        )}
      </div>

    </div>
  </div>
);
}
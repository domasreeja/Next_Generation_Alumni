import { useEffect, useState } from "react";
import "./StudentProfile.css";

export default function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user?._id) return;

    fetch(`http://localhost:5000/api/student/profile/${user._id}`)
      .then(res => res.json())
      .then(data => {
        setProfile({
          ...data,
          skills: data.skills || "",
          interests: data.interests || "",
          careerGoals: data.careerGoals || ""
        });
      })
      .catch(err => {
        console.error(err);
        setProfile({});
      });
  }, [user?._id]);

  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const saveProfile = async () => {
    await fetch(`http://localhost:5000/api/student/profile/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });

    alert("Profile updated successfully");
    setEditing(false);
  };

  if (!profile) return <p>Loading...</p>;

  const calculateCompletion = () => {
    const fields = [
      profile.branch,
      profile.year,
      profile.rollNo,
      profile.skills,
      profile.interests,
      profile.careerGoals
    ];
    const filled = fields.filter(f => f && f.trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  };

  const completion = calculateCompletion();

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">
          <div className="avatar">👤</div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
        </div>

        <div className="completion-section">
          <p>Profile Completion <b>{completion}%</b></p>
          <div className="progress-bar">
            <div className="progress-fill" style={{width:`${completion}%`}}></div>
          </div>
        </div>

        <div className="form-grid">

          <div className="form-group">
            <label>Branch</label>
            <input name="branch" value={profile.branch} onChange={handleChange} disabled={!editing}/>
          </div>

          <div className="form-group">
            <label>Year</label>
            <input name="year" value={profile.year} onChange={handleChange} disabled={!editing}/>
          </div>

          <div className="form-group">
            <label>Roll No</label>
            <input name="rollNo" value={profile.rollNo} onChange={handleChange} disabled={!editing}/>
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input name="skills" value={profile.skills} onChange={handleChange} disabled={!editing}/>
          </div>

        </div>

        <div className="form-group">
          <label>Interests</label>
          <input name="interests" value={profile.interests} onChange={handleChange} disabled={!editing}/>
        </div>

        <div className="form-group">
          <label>Career Goals</label>
          <textarea name="careerGoals" value={profile.careerGoals} onChange={handleChange} disabled={!editing}/>
        </div>

        {!editing ? (
          <button className="btn-primary" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div className="btn-row">
            <button className="btn-primary" onClick={saveProfile}>Save</button>
            <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        )}

      </div>
    </div>
  );
}
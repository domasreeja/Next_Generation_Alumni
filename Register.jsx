import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [showPassword, setShowPassword] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState("");

  const [passwordMsg, setPasswordMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    rollNo: "",
    skills: [],
    customSkill: "",
    interestedIndustry: "",
    careerGoal: "",
    password: "",
    confirmPassword: "",
    company: "",
    batch: "",
    contact: "",
    linkedin: ""
  });

  const skillOptions = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "React",
    "Node.js",
    "Machine Learning",
    "Data Science",
    "SQL",
    "MongoDB",
    "Cloud Computing",
    "Cyber Security"
  ];

  /* ================= SKILL FUNCTIONS ================= */

  const addSkill = (skill) => {
    if (skill && !form.skills.includes(skill)) {
      setForm({
        ...form,
        skills: [...form.skills, skill]
      });
    }
  };

  const removeSkill = (skill) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skill)
    });
  };

  const addCustomSkill = () => {
    if (form.customSkill.trim() !== "") {
      setForm({
        ...form,
        skills: [...form.skills, form.customSkill],
        customSkill: ""
      });
    }
  };

  /* ================= PASSWORD VALIDATION ================= */

  const validatePassword = (password) => {
    const strong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return strong.test(password);
  };

  const checkStrength = (password) => {

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 1) return "Weak";
    if (strength === 2 || strength === 3) return "Medium";
    if (strength === 4) return "Strong";
  };

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === "password") {

      const strength = checkStrength(value);

      setPasswordStrength(strength);

      if (!validatePassword(value)) {

        setPasswordMsg(
          "Password must include uppercase, lowercase, number and special character"
        );

      } else {

        setPasswordMsg("Strong password ✔");

      }
    }
  };

  /* ================= REGISTER ================= */

  const handleRegister = async () => {

    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    if (role === "student") {

      if (!validatePassword(form.password)) {
        alert("Please create a stronger password");
        return;
      }

      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    try {

      const res = await fetch("http://localhost:5000/api/register", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          ...form,
          skills: form.skills.join(", "),
          role
        })

      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      alert("Registration submitted. Awaiting admin approval.");

      navigate("/login");

    } catch {

      alert("Server error. Try again later");

    }
  };

  /* ================= UI ================= */

  return (

    <div className="card">

      <h2>Register</h2>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="alumni">Alumni</option>
      </select>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      {role === "student" && (
        <>

          <input
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
          />

          <input
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
          />

          <input
            name="rollNo"
            placeholder="Roll No"
            value={form.rollNo}
            onChange={handleChange}
          />

          {/* ================= SKILLS ================= */}

          <label>Skills</label>

          <select onChange={(e) => addSkill(e.target.value)}>
            <option value="">Select Skill</option>
            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

            <input
              placeholder="Additional skills"
              value={form.customSkill}
              onChange={(e) =>
                setForm({ ...form, customSkill: e.target.value })
              }
            />

            <button type="button" onClick={addCustomSkill}>
              Add
            </button>

          </div>

          <div style={{ marginTop: "10px" }}>

            {form.skills.map((skill) => (

              <span
                key={skill}
                style={{
                  padding: "6px 10px",
                  margin: "5px",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
                onClick={() => removeSkill(skill)}
              >
                {skill} ✕
              </span>

            ))}

          </div>

          {/* ================= AREA OF INTEREST ================= */}

          <select
            name="interestedIndustry"
            value={form.interestedIndustry}
            onChange={handleChange}
          >

            <option value="">Select Area of Interest</option>

            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="Web Development">Web Development</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="DevOps">DevOps</option>
            <option value="Software Engineering">Software Engineering</option>

          </select>

          <input
            name="careerGoal"
            placeholder="Career Goal"
            value={form.careerGoal}
            onChange={handleChange}
          />

          {/* ================= PASSWORD ================= */}

          <div style={{ position: "relative" }}>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                cursor: "pointer",
                fontSize: "13px",
                color: "#2563eb"
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>

          </div>

          {passwordStrength && (

            <p
              style={{
                fontSize: "13px",
                color:
                  passwordStrength === "Weak"
                    ? "red"
                    : passwordStrength === "Medium"
                    ? "orange"
                    : "green"
              }}
            >
              Strength: {passwordStrength}
            </p>

          )}

          {passwordMsg && (
            <p style={{ fontSize: "13px", color: "#2563eb" }}>
              {passwordMsg}
            </p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

        </>
      )}

      {role === "alumni" && (
        <>

          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
          />

          <input
            name="batch"
            placeholder="Batch"
            value={form.batch}
            onChange={handleChange}
          />

          <input
            name="contact"
            placeholder="Contact"
            value={form.contact}
            onChange={handleChange}
          />

          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={handleChange}
          />

        </>
      )}

      <button onClick={handleRegister}>
        Register
      </button>

      <p style={{ fontSize: 14 }}>
        *Login allowed only after admin approval
      </p>

    </div>
  );
}
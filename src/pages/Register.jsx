// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi, loginApi } from "../api/auth";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const payload = {
      name,
      email,
      password,
      role: "USER", // backend will override if needed
    };

    try {
      console.log("STEP 1: calling /api/auth/register with", payload);
      const regRes = await registerApi(payload);
      console.log("Register OK:", regRes.data);

      console.log("STEP 2: auto login /api/auth/login");
      const loginRes = await loginApi({ email, password });
      const authData = loginRes.data;
      console.log("Login OK:", authData);

      localStorage.setItem("auth", JSON.stringify(authData));

      navigate("/users");
    } catch (err) {
      console.error("REGISTER FLOW ERROR:", err?.response?.data || err);

      const backendMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data ||
        err.message;

      setError(backendMsg || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      {/* Left side hero (same style as Login) */}
      <div className="auth-hero">
        <div className="auth-hero-badge">SkillSwap • Student Portal</div>
        <h1 className="auth-hero-title">
          Join the <span>SkillSwap</span> community.
        </h1>
        <p className="auth-hero-text">
          Create your account to explore skills, connect with peers, and
          start collaborating on real-world projects within your campus.
        </p>

        <div className="auth-hero-highlights">
          <div className="highlight-card">
            <h3>🎓 Student Friendly</h3>
            <p>Designed for college students to showcase and grow skills.</p>
          </div>
          <div className="highlight-card">
            <h3>🤝 Collaborate</h3>
            <p>Find project partners, mentors, and learning buddies.</p>
          </div>
        </div>

        <div className="auth-hero-footer">
          <div className="status-dot" />
          <span>New users joining every week</span>
        </div>
      </div>

      {/* Right side register card */}
      <div className="auth-card">
        

        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Sign up to access the SkillSwap Student Portal
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="auth-field">
            <label htmlFor="name">Full Name</label>
            <div className="auth-input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Varsha Peetam"
                className="auth-input"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="email">College Email</label>
            <div className="auth-input-wrapper">
              <span className="input-icon">@</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@college.edu"
                className="auth-input"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <div className="auth-input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                className="auth-input"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

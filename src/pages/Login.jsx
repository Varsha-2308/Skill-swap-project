// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../api/auth";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await loginApi({ email, password });
      const authData = res.data;

      localStorage.setItem("auth", JSON.stringify(authData));
      navigate("/users");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      {/* Left side hero / branding area */}
      <div className="auth-hero">
        <div className="auth-hero-badge">SkillSwap • Admin Portal</div>
        <h1 className="auth-hero-title">
          Manage users, skills & <span>collaborations</span> in one place.
        </h1>
        <p className="auth-hero-text">
          Track registrations, approve requests, and monitor activity with a clean,
          simple dashboard built just for your workflow.
        </p>

        <div className="auth-hero-highlights">
          <div className="highlight-card">
            <h3>🔐 Secure Login</h3>
            <p>JWT-based authentication to keep your data safe.</p>
          </div>
          <div className="highlight-card">
            <h3>📊 Smart Insights</h3>
            <p>Get quick stats on users, skills, and activity trends.</p>
          </div>
        </div>

        <div className="auth-hero-footer">
          <div className="status-dot" />
          <span>Server Status: <strong>Online</strong></span>
        </div>
      </div>

      {/* Right side login card */}
      <div className="auth-card">
        

        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">
          Login to continue to your SkillSwap admin dashboard
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <div className="auth-input-wrapper">
              <span className="input-icon">@</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
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
                placeholder="••••••••"
                className="auth-input"
                required
              />
            </div>
          </div>

          <div className="auth-actions-row">
            <label className="remember-me">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <button
              type="button"
              className="link-button"
              onClick={() => alert("Forgot password flow coming soon 🙂")}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-footer">
          New here?{" "}
          <Link to="/register" className="auth-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

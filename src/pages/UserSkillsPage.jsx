import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

import "../Styles/userskills.css";

export default function UserSkillsPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [form, setForm] = useState({
    skillId: "",
    type: "TEACH",
    level: "BEGINNER",
  });

  const fetchUser = () =>
    api.get(`/api/users/${userId}`).then((res) => setUser(res.data));

  const fetchSkills = () =>
    api.get("/api/skills").then((res) => setSkills(res.data));

  const fetchUserSkills = () =>
    api
      .get(`/api/user-skills/${userId}`)
      .then((res) => setUserSkills(res.data));

  useEffect(() => {
    fetchUser();
    fetchSkills();
    fetchUserSkills();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.skillId) return;

    try {
      await api.post(
        `/api/user-skills/add?userId=${userId}&skillId=${form.skillId}&type=${form.type}&level=${form.level}`
      );

      setForm({ skillId: "", type: "TEACH", level: "BEGINNER" });
      fetchUserSkills();
    } catch (err) {
      console.error("ERROR ADDING USER SKILL:", err?.response || err);

      const backendMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data ||
        err.message;

      alert(backendMsg || "Error adding user skill");
    }
  };

  return (
    <div className="skills-container">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="card-title mb-0">
              Skills for User #{userId}
              {user && ` – ${user.name}`}
            </h3>
          </div>
        </div>

        <form onSubmit={handleAdd} className="row g-2 mb-4">
          <div className="col-md-4">
            <label className="form-label">Skill</label>
            <select
              name="skillId"
              className="form-select"
              value={form.skillId}
              onChange={handleChange}
              required
            >
              <option value="">Select skill</option>
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-select"
              value={form.type}
              onChange={handleChange}
            >
              <option value="TEACH">Teach</option>
              <option value="LEARN">Learn</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Level</label>
            <select
              name="level"
              className="form-select"
              value={form.level}
              onChange={handleChange}
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>Skill</th>
                <th>Type</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {userSkills.map((us) => (
                <tr key={us.id}>
                  <td>{us.skill?.name}</td>
                  <td>{us.type}</td>
                  <td>{us.level}</td>
                </tr>
              ))}
              {userSkills.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-muted">
                    No skills yet for this user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Link to="/users" className="small">
          ← Back to users
        </Link>
      </div>
    </div>
  );
}

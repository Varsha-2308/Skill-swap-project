import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

export default function SessionsPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    teacherId: "",
    learnerId: "",
    skillId: "",
    dateTime: "",
  });

  const fetchSessions = () =>
    api.get(`/api/sessions/user/${userId}`).then((res) => setSessions(res.data));

  useEffect(() => {
    api.get(`/api/users/${userId}`).then((res) => setUser(res.data));
    fetchSessions();
    api.get("/api/skills").then((res) => setSkills(res.data));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/sessions/book", form);
      setForm({
        teacherId: "",
        learnerId: "",
        skillId: "",
        dateTime: "",
      });
      fetchSessions();
    } catch (err) {
      console.error(err);
      alert("Error booking session");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/sessions/${id}/status?status=${status}`);
      fetchSessions();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  // 🔴 DELETE Handler
  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this session?");
    if (!ok) return;

    try {
      await api.delete(`/api/sessions/${id}`);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting session");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="card-title mb-0">
            Sessions for User #{userId} {user && `– ${user.name}`}
          </h3>
        </div>

        {/* Booking Form */}
        <div className="mb-4">
          <h5>Book New Session</h5>
          <form className="row g-2" onSubmit={handleBook}>
            <div className="col-md-3">
              <label className="form-label">Teacher ID</label>
              <input
                className="form-control"
                name="teacherId"
                value={form.teacherId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Learner ID</label>
              <input
                className="form-control"
                name="learnerId"
                value={form.learnerId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Skill</label>
              <select
                className="form-select"
                name="skillId"
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
              <label className="form-label">Date & Time</label>
              <input
                className="form-control"
                type="text"
                name="dateTime"
                placeholder="2025-11-30T18:30:00"
                value={form.dateTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Book
              </button>
            </div>
          </form>
        </div>

        {/* Sessions List */}
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Teacher</th>
                <th>Learner</th>
                <th>Skill</th>
                <th>DateTime</th>
                <th>Status</th>
                <th style={{ width: "260px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>#{s.teacher?.id} {s.teacher?.name}</td>
                  <td>#{s.learner?.id} {s.learner?.name}</td>
                  <td>{s.skill?.name}</td>
                  <td>{s.dateTime}</td>
                  <td>{s.status}</td>

                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updateStatus(s.id, "CONFIRMED")}
                      >
                        Confirm
                      </button>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => updateStatus(s.id, "COMPLETED")}
                      >
                        Complete
                      </button>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => updateStatus(s.id, "CANCELLED")}
                      >
                        Cancel
                      </button>

                      {/* 🔴 DELETE BUTTON */}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {sessions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-muted">
                    No sessions yet for this user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Link to="/users" className="small">← Back to users</Link>
      </div>
    </div>
  );
}

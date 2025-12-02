import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

export default function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    if (isEdit) {
      api
        .get(`/api/users/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => {
          console.error(err);
          alert("Error fetching user");
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/api/users/${id}`, form);
      } else {
        await api.post("/api/users", form);
      }
      navigate("/users");
    } catch (err) {
      console.error(err);
      alert("Error saving user");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="card-title mb-0">
            {isEdit ? "Edit User" : "Create User"}
          </h3>
        
        </div>


        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
            
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              rows={3}
              name="bio"
              value={form.bio || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/users")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
       <div>
              <Link to="/users" className="small">
                ← Back to users
              </Link>
            </div>
    </div>
  );
}

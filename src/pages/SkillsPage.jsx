import { useEffect, useState } from "react";
import api from "../api/axios";
import "../App.css";


export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");

  const fetchSkills = async () => {
    try {
      const res = await api.get("/api/skills");
       
      const sorted = [...res.data].sort((a, b) => a.id - b.id);

      setSkills(sorted);
    } catch (err) {
      console.error(err);
      alert("Error fetching skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = async (e) => {
  e.preventDefault();
  if (!name.trim()) return;
  try {
    const res = await api.post("/api/skills", { name });
    console.log("Skill added:", res.data);
    setName("");
    fetchSkills();
  } catch (err) {
    console.error("ERROR ADDING SKILL:", err?.response || err); // 👈 shows backend error
    const backendMsg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data ||
      err.message;

    alert(backendMsg || "Error adding skill (maybe duplicate name?)");
  }
};


  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-3">Skills</h3>

        <form onSubmit={handleAdd} className="row g-2 mb-3">
          <div className="col-sm-9 col-md-10">
            <input
              className="form-control"
              placeholder="New skill name (e.g., Java, React, Guitar)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-sm-3 col-md-2 d-grid">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>

        {skills.length === 0 ? (
          <p className="text-muted">No skills yet.</p>
        ) : (
          <ul className="list-group">
            {skills.map((s) => (
              <li key={s.id} className="list-group-item d-flex">
                <span className="text-muted me-2">#{s.id}</span>
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";
import "../Styles/user.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
     <div className="users-page">
      <div className="card shadow-sm">
        <div className="card-body">


        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="card-title mb-0">Users</h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/users/new")}
          >
            + Add User
          </button>
        </div>

            
          
        {users.length === 0 ? (
          <p className="text-muted">No users found. Add one.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "5%" }}>ID</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "25%" }}>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <Link
                          to={`/users/${u.id}/skills`}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          Skills
                        </Link>
                        <Link
                          to={`/users/${u.id}/matches`}
                          className="btn btn-outline-success btn-sm"
                        >
                          Matches
                        </Link>
                        <Link
                          to={`/users/${u.id}/sessions`}
                          className="btn btn-outline-info btn-sm"
                        >
                          Sessions
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
       <div>
              <Link to="/login" className="small">
                ← Back to home
              </Link>
            </div>
            </div>
    </div>
  );
}

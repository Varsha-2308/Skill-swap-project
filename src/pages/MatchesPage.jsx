import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

export default function MatchesPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api.get(`/api/users/${userId}`).then((res) => setUser(res.data));
    api
      .get(`/api/match/${userId}`)
      .then((res) => setMatches(res.data))
      .catch((err) => {
        console.error(err);
        alert("Error fetching matches");
      });
  }, [userId]);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="card-title mb-0">
              Matches for User #{userId}
              {user && ` – ${user.name}`}
            </h3>
            
          </div>
        </div>

        {matches.length === 0 ? (
          <p className="text-muted">
            No matches yet. Make sure this user and others have Teach and Learn
            skills.
          </p>
        ) : (
          <div className="row g-3">
            {matches.map((m) => (
              <div className="col-md-6" key={m.userId}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-1">{m.userName}</h5>
                    <p className="text-muted small mb-2">
                      #{m.userId} · {m.userEmail}
                    </p>
                    <p className="mb-1">
                      <strong>They can teach you:</strong>{" "}
                      {m.skillsTheyTeachMe.join(", ")}
                    </p>
                    <p className="mb-0">
                      <strong>You can teach them:</strong>{" "}
                      {m.skillsITeachThem.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
              <Link to="/users" className="small">
                ← Back to users
              </Link>
            </div>
    </div>
  );
}

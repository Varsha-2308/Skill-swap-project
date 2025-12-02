import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm w-100 p-0 m-0">
  <div className="container-fluid p-0 m-0">
       {/* ⭐ LOGO + TEXT */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/users">
          <img
            style={{ borderRadius: "50%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhletoc2IfDF8XtlorSIaGHzf4efqKI7ovg&s"
            alt="Logo"
            height="80"
            width="80"
            className="me-2"
          />
          SkillSwap
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item">
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/skills" className="nav-link">
                Skills
              </NavLink>
            </li> */}
            <li className="nav-item">
               <NavLink to="/login" className="nav-link">Login</NavLink>
      
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

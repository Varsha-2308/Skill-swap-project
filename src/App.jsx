import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UsersPage from "./pages/UsersPage";
import UserForm from "./pages/UserForm";
import SkillsPage from "./pages/SkillsPage";
import UserSkillsPage from "./pages/UserSkillsPage";
import MatchesPage from "./pages/MatchesPage";
import SessionsPage from "./pages/SessionsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container pb-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/users/:userId/skills" element={<UserSkillsPage />} />
          <Route path="/users/:userId/matches" element={<MatchesPage />} />
          <Route path="/users/:userId/sessions" element={<SessionsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

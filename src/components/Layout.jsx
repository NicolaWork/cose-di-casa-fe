import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authService.js"; // 👉 gestisce la rimozione del token

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // rimuove token o sessione
    navigate("/"); // torna alla login
  };

  return (
    <>
      {/* 🔹 Navbar Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            🛒 SpesaApp
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gestione">
                  Gestione Oggetti
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/spesa">
                  Lista della Spesa
                </Link>
              </li>
            </ul>
            <button
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 🔸 Contenuto principale */}
      <main className="container mt-4">{children}</main>
    </>
  );
}

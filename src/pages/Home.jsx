import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../api/authService.js";

export default function Home() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4 text-primary">Benvenuto, {user?.email}</h2>
        <p className="text-center text-muted mb-4">
          Scegli un’azione per continuare:
        </p>

        <div className="d-flex flex-column align-items-center gap-3">
          <button
            className="btn btn-outline-primary w-50"
            onClick={() => navigate("/spesa")}
          >
            🛒 Gestisci Lista della Spesa
          </button>
          <button
            className="btn btn-outline-success w-50"
            onClick={() => navigate("/gestione")}
          >
            📦 Gestione Oggetti Disponibili
          </button>

          <hr className="w-75" />

          <button className="btn btn-danger w-50" onClick={handleLogout}>
            Esci
          </button>
        </div>
      </div>
    </div>
  );
}

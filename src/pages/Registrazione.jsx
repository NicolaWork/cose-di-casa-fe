import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient.js"; // chiamata POST a /utente/register

export default function Register() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 🔹 Controllo password uguali
    if (password !== password2) {
      setError("Le password non coincidono");
      return;
    }

    try {
      // 🔹 POST al backend per registrazione
      const response = await api.post("/utente/registrazione", {
        nome,
        cognome,
        email,
        password,
      });

      // Se backend restituisce 200/true → registrazione ok
      if (response.status === 200 || response.data === true) {
        setSuccess("Registrazione completata! Reindirizzamento al login...");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Errore durante la registrazione");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow"
        style={{ width: "400px" }}
      >
        <h4 className="text-center mb-3">Registrazione</h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cognome</label>
          <input
            type="text"
            className="form-control"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Conferma Password</label>
          <input
            type="password"
            className="form-control"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Registrati
        </button>
      </form>
    </div>
  );
}

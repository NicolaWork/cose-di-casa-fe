import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
try{
    const success = await login(email, password);
    if (success) {
      navigate("/home"); // ✅ redirect dopo login
    }     
  } catch (err) {
    setError(err.message);
  }

}


  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow"
        style={{ width: "320px" }}
      >
        <h4 className="text-center mb-3">Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

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

        <button type="submit" className="btn btn-primary w-100">
          Accedi
        </button>
        <p className="text-center mt-3">
          Non hai un account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}>
            Registrati
          </span>
        </p>

      </form>
    </div>
  );
}
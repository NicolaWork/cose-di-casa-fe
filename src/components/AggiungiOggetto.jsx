import { useState } from "react";

export default function AggiungiOggetto({ aggiungi, categorie }) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState(categorie[0] || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() !== "") {
      aggiungi({ nome, categoria });
      setNome("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nuovo oggetto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {categorie.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <button className="btn btn-success" type="submit">Aggiungi</button>
      </div>
    </form>
  );
}

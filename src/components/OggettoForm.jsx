import { useState, useEffect } from "react";

export default function OggettoForm({ onSave, editingOggetto, onCancel }) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (editingOggetto) {
      setNome(editingOggetto.nome);
      setCategoria(editingOggetto.categoria);
    }
  }, [editingOggetto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nome, categoria });
    setNome("");
    setCategoria("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="row g-2 align-items-center">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Nome oggetto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button type="submit" className="btn btn-primary w-100">
            {editingOggetto ? "Aggiorna" : "Aggiungi"}
          </button>
          {editingOggetto && (
            <button type="button" className="btn btn-secondary w-100" onClick={onCancel}>
              Annulla
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

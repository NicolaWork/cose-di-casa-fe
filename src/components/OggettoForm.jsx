import { useState, useEffect } from "react";
import { createProdotto } from "../api/apiClient";

export default function OggettoForm({ onSave, editingOggetto, onCancel }) {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (editingOggetto) {
      setId(editingOggetto.idProdotto);
      setNome(editingOggetto.nome);
      setCategoria(editingOggetto.categoria);
    }
  }, [editingOggetto]);

  
   const handleSubmit = async (e) => {
    e.preventDefault();

    const prodotto = { nome, categoria };

try{
 // const response = await createProdotto(prodotto);
  console.log("OggettoForm -> createProdotto ", prodotto)
  onSave(prodotto);
   setNome("");
      setCategoria("");
    } catch (error) {
      console.error("Errore durante il salvataggio del prodotto:", error);
    }
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

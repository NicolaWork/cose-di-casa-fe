import { useEffect, useState } from "react";
import { getOggetti } from "../api/mockApi.js";
import ListaSpesa from "../components/ListaSpesa.jsx";

export default function ListaSpesaPage() {
  const [oggettiDisponibili, setOggettiDisponibili] = useState([]);
  const [listaSpesa, setListaSpesa] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchOggetti();
  }, []);

  const fetchOggetti = async () => {
    try {
      const res = await getOggetti();
      setOggettiDisponibili(res.data);
    } catch (error) {
      console.error("Errore caricamento oggetti:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // 🔹 Mostra suggerimenti mentre digiti
    if (value.trim().length > 0) {
      const filtered = oggettiDisponibili.filter((o) =>
        o.nome.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // massimo 5 suggerimenti
    } else {
      setSuggestions([]);
    }
  };

  const aggiungiOggetto = (oggetto) => {
    if (!listaSpesa.find((item) => item.id === oggetto.id)) {
      setListaSpesa((prev) => [...prev, oggetto]);
    }
    setSearch("");
    setSuggestions([]);
  };

  const aggiungiOggettoManuale = () => {
    if (!search.trim()) return;

    // 🔸 Se l'oggetto digitato non esiste nella lista disponibile, crealo come "personalizzato"
    const existing = oggettiDisponibili.find(
      (o) => o.nome.toLowerCase() === search.toLowerCase()
    );
    const nuovoOggetto =
      existing || { id: Date.now(), nome: search, categoria: "Altro" };

    aggiungiOggetto(nuovoOggetto);
  };

  const rimuoviOggetto = (id) => {
    setListaSpesa((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Lista della Spesa</h2>

      {/* 🔍 Barra di ricerca centrata */}
      <div className="d-flex justify-content-center mb-4 position-relative">
        <div style={{ width: "400px" }} className="position-relative">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Cerca o aggiungi un oggetto..."
              value={search}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-success"
              onClick={aggiungiOggettoManuale}
              disabled={!search.trim()}
            >
              <i className="bi bi-cart-plus"></i> Aggiungi
            </button>
          </div>

          {/* 🔽 Dropdown suggerimenti */}
          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100 mt-1 shadow-sm"
              style={{ zIndex: 10 }}
            >
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => aggiungiOggetto(item)}
                >
                  {item.nome}{" "}
                  <small className="text-muted">({item.categoria})</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 🧾 Lista della spesa */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ListaSpesa lista={listaSpesa} onRemove={rimuoviOggetto} />
        </div>
      </div>
    </div>
  );
}

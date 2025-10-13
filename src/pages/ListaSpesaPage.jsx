import { useEffect, useState } from "react";
import { getOggetti } from "../api/mockApi.js"; // o apiClient.js se usi il BE
import ListaSpesa from "../components/ListaSpesa.jsx";

export default function ListaSpesaPage() {
  const [oggettiDisponibili, setOggettiDisponibili] = useState([]);
  const [listaSpesa, setListaSpesa] = useState([]);
  const [search, setSearch] = useState("");

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

  const aggiungiOggetto = (oggetto) => {
    // ✅ Evita duplicati
    if (!listaSpesa.find((item) => item.id === oggetto.id)) {
      setListaSpesa((prev) => [...prev, oggetto]);
    }
  };

  const rimuoviOggetto = (id) => {
    // ✅ Rimuove un oggetto dalla lista della spesa
    setListaSpesa((prev) => prev.filter((item) => item.id !== id));
  };

  const oggettiFiltrati = oggettiDisponibili.filter(
    (oggetto) => 
      oggetto.nome.toLowerCase().includes(search.toLowerCase()) ||
    oggetto.categoria.toLowerCase().includes(search.toLowerCase())
  )  

  return (
    <div>
      <h2>Lista della Spesa</h2>
      <div className="row mt-4">
        {/* Colonna sinistra: oggetti disponibili */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Oggetti Disponibili</h5>

            {/* 🔍 Barra di ricerca */}
            <div className="input-group mb-3">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text"
                className="form-control"
                placeholder="Cerca per nome o categoria"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
              </div>

            <ul className="list-group">
              {oggettiFiltrati.length > 0 ? (
              oggettiFiltrati.map((oggetto) => (
                <li
                  key={oggetto.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {oggetto.nome} {" "}
                    <em className="text-muted">({oggetto.categoria})</em>
                  </span>
                  <button
                    className="btn btn-sm btn-success d-flex align-items-center gap-1"
                    onClick={() => aggiungiOggetto(oggetto)}
                    title="Aggiungi alla lista"
                  >
                    <i className="bi bi-cart-plus"></i>
                  </button>
                </li>
              ))
              ):(
                <li className="list-group-item text-muted text-center">
                  Nessun oggetto trovato
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Colonna destra: lista della spesa */}
        <div className="col-md-6">
          <ListaSpesa lista={listaSpesa} onRemove={rimuoviOggetto} />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import OggettoForm from "../components/OggettoForm.jsx";


// 🔸 IMPORTA MOCK invece dell'API reale
// import { getOggetti, createOggetto, updateOggetto, deleteOggetto } from "../api/apiClient.js";
import { getOggetti, createOggetto, updateOggetto, deleteOggetto } from "../api/mockApi.js";


export default function GestioneOggetti() {
  const [oggetti, setOggetti] = useState([]);
  const [editingOggetto, setEditingOggetto] = useState(null);

  // 🔹 Al mount, carica la lista dal BE
  useEffect(() => {
    fetchOggetti();
  }, []);

  const fetchOggetti = async () => {
    try {
      const res = await getOggetti(); // 👈 GET /oggetti
      setOggetti(res.data);
    } catch (error) {
      console.error("Errore nel caricamento oggetti:", error);
    }
  };

  const handleSave = async (oggetto) => {
    try {
      if (editingOggetto) {
        await updateOggetto(editingOggetto.id, oggetto); // 👈 PUT /oggetti/{id}
      } else {
        await createOggetto(oggetto); // 👈 POST /oggetti
      }
      fetchOggetti();
      setEditingOggetto(null);
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOggetto(id); // 👈 DELETE /oggetti/{id}
      fetchOggetti();
    } catch (error) {
      console.error("Errore nell’eliminazione:", error);
    }
  };

  return (
    <div className="container">
      <h2>Gestione Oggetti Disponibili</h2>
      <OggettoForm
        onSave={handleSave}
        editingOggetto={editingOggetto}
        onCancel={() => setEditingOggetto(null)}
      />

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Azione</th>
          </tr>
        </thead>
        <tbody>
          {oggetti.map((oggetto) => (
            <tr key={oggetto.id}>
              <td>{oggetto.nome}</td>
              <td>{oggetto.categoria}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditingOggetto(oggetto)}
                >
                  Modifica
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(oggetto.id)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

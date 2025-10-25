export default function ListaOggetti({ oggetti, aggiungi }) {
  return (
    <div className="card mb-3 p-3">
      <h5>Prodotti disponibili</h5>
      <ul className="list-group">
        {oggetti.map((oggetto, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {oggetto.nome}
            <button className="btn btn-sm btn-primary" onClick={() => aggiungi(oggetto)}>
              Aggiungi
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

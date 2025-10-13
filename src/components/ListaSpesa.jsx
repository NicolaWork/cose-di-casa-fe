export default function ListaSpesa({ lista, onRemove }) {
  return (
    <div className="card p-3">
      <h5>La Tua Lista della Spesa</h5>

      {lista.length === 0 ? (
        <p className="text-muted">Nessun oggetto nella lista.</p>
      ) : (
        <ul className="list-group">
          {lista.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {item.nome} <em className="text-muted">({item.categoria})</em>
              </span>
              <button
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                onClick={() => onRemove(item.id)}
                title="Rimuovi"
              >
                <i className="bi bi-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useState } from "react";
import { createProdotto } from "../api/apiClient";

export default function AggiungiOggetto({ aggiungi, categorie }) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState(categorie[0] || "");
  const [errore , setErrore] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrore(null);

    if (nome.trim() === "") return;

    try{
      const response = await createProdotto({nome,categoria});
      console.log(response.data.message)
      aggiungi(response.data.data);
      setNome("");
    } catch (error){
      console.error("Error: ",error);
      throw new Error(error.response?.data?.message)
    }
  };

  return (
    <>
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
    {errore && <div classname="alert alert-danger">{errore}</div>}
</>

  );
}

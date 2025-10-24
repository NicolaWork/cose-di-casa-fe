import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;

/*
// 🔹 Oggetti Disponibili
export const getOggetti = async () => {
  // GET /oggetti
  return api.get("/oggetti");
};

export const createOggetto = async (oggetto) => {
  // POST /oggetti
  return api.post("/oggetti", oggetto);
};

export const updateOggetto = async (id, oggetto) => {
  // PUT /oggetti/{id}
  return api.put(`/oggetti/${id}`, oggetto);
};

export const deleteOggetto = async (id) => {
  // DELETE /oggetti/{id}
  return api.delete(`/oggetti/${id}`);
};

// 🔹 Categorie (se servono)
export const getCategorie = async () => {
  // GET /categorie
  return api.get("/categorie");
};
*/

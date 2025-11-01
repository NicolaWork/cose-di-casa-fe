import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config)=> {
  const token = localStorage.getItem("token");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export const createProdotto = async (prodotto) => {
  // POST /oggetti
  return api.post("/prodotto/crea", prodotto);
};

// 🔹 Oggetti Disponibili
export const getOggetti = async () => {
  // GET /oggetti
  return api.get("/prodotto/getall");
};

export const deleteOggetto = async (id) => {
  // DELETE /oggetti/{id}
  return api.delete(`/prodotto/${id}`);
};

export const updateOggetto = async (id, oggetto) => {
  // PUT /oggetti/{id}
  return api.put(`/prodotto/update/${id}`, oggetto);
};

export default api;


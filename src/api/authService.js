import api from "./apiClient"

export const login = async (email, password) => {
try {
  const response = await api.post("/utente/login", { email, password });
  
  
  const token = response.data.token;
  
  if(token){
    localStorage.setItem("token","token");
    localStorage.setItem("utenteEmail",email);
    return true;
  }else{
    throw new Error ("Credenziali non valide")
  }
} catch (error){
  console.error("Errore durante il login: ",error);
  throw new Error(
    error.response?.data?.message || "Errore durante la connessione al sever"
  );
}
};

export const logout = () => {
   localStorage.removeItem("token");
  localStorage.removeItem("utenteEmail");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUser = () => {
  const email = localStorage.getItem("utenteEmail");
  if (!email) return null;
  return { email };
};

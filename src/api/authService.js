import api from "./apiClient"

export const login = async (email, password) => {
try {
  const response = await api.post("/utente/login", { email, password });
  
  
  const success = response.data.success;
  
  if(success){
    localStorage.setItem("token",response.data.data.token);
    localStorage.setItem("utenteEmail",email);
    return true;
  }else{
    throw new Error (response.data.message)
  }
} catch (error){
  console.error("Errore durante il login: ",error);
  throw new Error(
    error.response?.data?.message || "Male, male.. qualcosa è andato storto"
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

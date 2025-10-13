export const login = async (email, password) => {
  // 🔹 Qui andrebbe la chiamata reale al backend
  // POST /auth/login con email e password
  // const res = await api.post("/auth/login", { email, password });

  // Simulazione login per ora
  if (email === "test@example.com" && password === "1234") {
    localStorage.setItem("user", JSON.stringify({ email }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!getUser();

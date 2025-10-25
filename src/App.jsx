import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import GestioneOggetti from "./pages/GestioneOggetti.jsx";
import ListaSpesaPage from "./pages/ListaSpesaPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import Registrazione from "./pages/Registrazione.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Login aperto a tutti */}
        <Route path="/" element={<Login />} />
        <Route path="/registrazione" element={<Registrazione /> } /> 

        {/* 🔒 Rotte protette */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestione"
          element={
            <ProtectedRoute>
              <Layout>
                <GestioneOggetti />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/spesa"
          element={
            <ProtectedRoute>
              <Layout>
                <ListaSpesaPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

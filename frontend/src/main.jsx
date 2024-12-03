import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Usando BrowserRouter
import Navbar from "./components/navbar/Navbar.jsx";
import Cachorros from "./pages/cachorros/cachorros.jsx";
import Login from "./pages/login/Login.jsx";
import Buscar from "./pages/buscar/Buscar.jsx";
import Cadastro from "./pages/cadastro/Cadastro.jsx";
import { AuthProvider } from "./auth/Context.jsx";
import { ToastProvider } from "./components/toast/ToastContext.jsx";
import PainelAdmin from "./pages/painel-admin/PainelAdmin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/painel-admin" element={<PainelAdmin />} />
            <Route path="/cachorros" element={<Cachorros />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);

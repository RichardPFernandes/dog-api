import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Cachorros from './pages/cachorros/cachorros.jsx'
import Login from './pages/login/Login.jsx'
import Buscar from './pages/buscar/Buscar.jsx'
import Cadastro from './pages/cadastro/Cadastro.jsx'
import { AuthProvider } from './auth/Context.jsx'
import { ToastProvider } from './components/toast/ToastContext.jsx'
import PainelAdmin from './pages/painel-admin/PainelAdmin.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/painel-admin",
    element: <PainelAdmin />,
  },
  {
    path: "/cachorros",
    element: <Cachorros />,
  },
  {
    path: "/buscar",
    element: <Buscar />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <ToastProvider>
         <Navbar />
          <RouterProvider router={router} />
        </ToastProvider>
    </AuthProvider>
  </StrictMode>
)

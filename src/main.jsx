import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Cachorros from './pages/cachorros/cachorros.jsx'

const router = createBrowserRouter([
  { 
    path: '/',
    element: <App />
  },
  {
    path: '/cachorros',
    element: <Cachorros />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </StrictMode>,
)

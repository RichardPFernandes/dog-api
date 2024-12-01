import { useContext } from 'react';
import dogLogo from '../../assets/dogLogo.jpg'
import './Navbar.css'
import { AuthContext } from '../../auth/Context';
export default function Navbar() {
  const { role, logout } = useContext(AuthContext);
  const deslogar = () => {
    logout();
    window.location.href = '/';
  }
  return (
    <nav className="navbar">
      <div className="navbar_menu">
        <div className="navbar_logo">
          <img src={dogLogo} alt="dog" />
        </div>
        <h1 className="navbar_title">DogLove</h1>
      </div>
      <div className="navbar_links">
        <a href="/" className="navbar_link">
          Home
        </a>
        {role !== null ? (
          <>
            <a href="/cachorros" className="navbar_link">
              Cachorros
            </a>
            {role === "admin" && (
              <a href="/painel-admin" className="navbar_link">
                Admin
              </a>
            )}
            <a href="/buscar" className="navbar_link">
              Buscar
            </a>
            <a onClick={deslogar} className="navbar_link navbar_button">
              Logout
            </a>
          </>
        ) : (
          <a href="/login" className="navbar_link navbar_button">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
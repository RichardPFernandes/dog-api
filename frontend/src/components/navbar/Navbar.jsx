import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import dogLogo from "../../assets/dogLogo.jpg";
import "./Navbar.css";
import { AuthContext } from "../../auth/Context";

export default function Navbar() {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const deslogar = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar_menu">
        <div className="navbar_logo">
          <img src={dogLogo} alt="dog" />
        </div>
        <h1 className="navbar_title">DogLove</h1>
      </div>
      <div className="navbar_links">
        <Link to="/" className="navbar_link">
          Home
        </Link>
        {role !== null ? (
          <>
            <Link to="/cachorros" className="navbar_link">
              Cachorros
            </Link>
            {role === "admin" && (
              <Link to="/painel-admin" className="navbar_link">
                Admin
              </Link>
            )}
            <Link to="/buscar" className="navbar_link">
              Buscar
            </Link>
            <a onClick={deslogar} className="navbar_link navbar_button">
              Logout
            </a>
          </>
        ) : (
          <Link to="/login" className="navbar_link navbar_button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

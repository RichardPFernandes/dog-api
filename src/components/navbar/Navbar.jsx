import dogLogo from '../../assets/dogLogo.jpg'
import './Navbar.css'
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar_menu">
        <div className="navbar_logo">
          <img src={dogLogo} alt="dog" />
        </div>
        <h1 className="navbar_title">DogLove</h1>
      </div>
      <div className="navbar_links">
        <a href="/" className="navbar_link">Home</a>
        <a href="/cachorros" className="navbar_link">Cachorros</a>
        <a href="/favoritos" className="navbar_link">Favoritos</a>
      </div>
    </nav>
  );
}
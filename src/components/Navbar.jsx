import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="flex items-center gap-3">
        <img
          src="/logo1.png"
          alt="Prasangi Dance Studio"
          className="w-12 h-12 rounded-full object-cover shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-110 transition duration-300"
        />

        <span className="text-xl font-bold text-white brand-title">
          Prasangi Dance Studio
        </span>
      </div>
      <ul className="nav-links">
        <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
        <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
        <li><a href="#styles" onClick={(e) => scrollToSection(e, 'styles')}>Styles</a></li>
        <li><a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')}>Gallery</a></li>
        <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
        <li><Link to="/admin/login" className="admin-nav-link">Admin</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
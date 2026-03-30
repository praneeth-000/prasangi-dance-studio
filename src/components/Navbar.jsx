import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="flex items-center gap-3">
        <Link to="/">
          <img
            src="/logo1.png"
            alt="Prasangi Dance Studio"
            className="w-12 h-12 rounded-full object-cover shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-110 transition duration-300"
          />
        </Link>
        <Link to="/">
          <span className="text-xl font-bold text-white brand-title">
            Prasangi Dance Studio
          </span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/styles">Styles</Link></li>
        <li><Link to="/masters">Masters</Link></li>
        <li><Link to="/achievements">Achievements</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/admin/login" className="admin-nav-link">Admin</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
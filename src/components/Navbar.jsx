import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking a link
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="flex items-center justify-between w-full md:w-auto gap-3">
        <div className="flex items-center gap-3">
          <Link to="/" onClick={closeMenu}>
            <img
              src="/logo1.png"
              alt="Prasangi Dance Studio"
              className="w-12 h-12 rounded-full object-cover shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-110 transition duration-300"
            />
          </Link>
          <Link to="/" onClick={closeMenu}>
            <span className="text-xl font-bold text-white brand-title">
              Prasangi Dance Studio
            </span>
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-white hover:text-red-500 focus:outline-none transition-colors relative z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Links */}
      <ul className="nav-links hidden md:flex items-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/styles">Styles</Link></li>
        <li><Link to="/masters">Masters</Link></li>
        <li><Link to="/achievements">Achievements</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/admin/login" className="admin-nav-link">Admin</Link></li>
      </ul>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-40 transition-all duration-300 md:hidden flex flex-col items-center justify-center space-y-8 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Same links but styled for mobile full-screen menu */}
        <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-white hover:text-red-500 transition-colors">Home</Link>
        <Link to="/about" onClick={closeMenu} className="text-2xl font-bold text-white hover:text-red-500 transition-colors">About</Link>
        <Link to="/styles" onClick={closeMenu} className="text-2xl font-bold text-white hover:text-red-500 transition-colors">Styles</Link>
        <Link to="/masters" onClick={closeMenu} className="text-2xl font-bold text-white hover:text-red-500 transition-colors">Masters</Link>
        <Link to="/achievements" onClick={closeMenu} className="text-2xl font-bold text-white hover:text-red-500 transition-colors">Achievements</Link>
        <Link to="/contact" onClick={closeMenu} className="text-2xl font-bold text-white hover:text-red-500 transition-colors">Contact</Link>
        <Link to="/admin/login" onClick={closeMenu} className="mt-4 px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-xl font-medium hover:bg-red-500/20 transition-colors">
          Admin Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
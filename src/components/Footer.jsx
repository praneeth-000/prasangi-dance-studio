import React from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <h2 className="gradient-text footer-brand brand-title">Prasangi</h2>
          <p className="footer-desc">
            Elevating the art of dance. Join our community and discover the rhythm within.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/prasangidancestudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/@PrasangiDanceStudio" target="_blank" rel="noopener noreferrer" className="social-link"><Youtube size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/styles">Styles</Link></li>
            <li><Link to="/masters">Masters</Link></li>
            <li><Link to="/achievements">Achievements</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Programs</h3>
          <ul className="footer-links">
            <li><a href="#">Beginner Crash Course</a></li>
            <li><a href="#">Professional Training</a></li>
            <li><a href="#">Kids Summer Camp</a></li>
            <li><a href="#">Private Lessons</a></li>
            <li><a href="#">Online Workshops</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Newsletter</h3>
          <p className="footer-desc">Subscribe to get the latest updates and offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Prasangi Dance Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <h2 className="gradient-text footer-brand">Prasangi</h2>
          <p className="footer-desc">
            Elevating the art of dance. Join our community and discover the rhythm within.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><Facebook size={20} /></a>
            <a href="#" className="social-link"><Twitter size={20} /></a>
            <a href="#" className="social-link"><Instagram size={20} /></a>
            <a href="#" className="social-link"><Youtube size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#styles">Classes</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
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

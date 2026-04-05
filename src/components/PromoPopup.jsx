import React, { useState, useEffect } from 'react';
import './PromoPopup.css';

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasSeenPromo = sessionStorage.getItem('hasSeenPromo');
    
    if (!hasSeenPromo) {
      // Small delay for better UX and to let the page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPromo', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="promo-overlay">
      <div className="promo-container">
        <button className="promo-close-btn" onClick={handleClose} aria-label="Close promotion">
          &times;
        </button>
        <img src="/images/poster1.jpg" alt="Summer Camp Promotional Poster" className="promo-image" />
      </div>
    </div>
  );
};

export default PromoPopup;

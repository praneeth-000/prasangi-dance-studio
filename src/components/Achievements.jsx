import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Achievements.css';

const images = [
  "/achievements/image1.jpg",
  "/achievements/image2.jpg",
  "/achievements/image3.jpg",
  "/achievements/image4.jpg",
  "/achievements/image5.jpg",
  "/achievements/image6.jpg",
  "/achievements/image7.jpg",
  "/achievements/image8.jpg"
];

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const closeLightbox = () => setSelectedImage(null);

  return (
    <section className="achievements-section section" id="achievements">
      <div className="container achievements-container">
        <div className="section-header">
          <motion.h2 
            className="gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            Our Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Glimpses of energy, passion, and perfection from our studio.
          </motion.p>
        </div>

        <div className="achievements-grid">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              className="achievements-item-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
              onClick={() => setSelectedImage(img)}
            >
              <div className="achievements-item">
                <img src={img} alt={`Achievement ${index + 1}`} loading="lazy" />
                <div className="achievements-overlay">
                  <span>View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
                &times;
              </button>
              <img src={selectedImage} alt="Fullscreen Preview" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;

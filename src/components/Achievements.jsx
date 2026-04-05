import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Achievements.css';

const achievementImages = [
  "/achievements/image1.jpg",
  "/achievements/image2.jpg",
  "/achievements/image3.jpg",
  "/achievements/image4.jpg",
  "/achievements/image5.jpg",
  "/achievements/image6.jpg",
  "/achievements/image7.jpg",
  "/achievements/image15.jpg",
  "/achievements/image16.jpg"

];

const newsImages = [
  "/achievements/image9.jpg",
  "/achievements/image10.jpg",
  "/achievements/image11.jpg",
  "/achievements/image12.jpg",
  "/achievements/image13.jpg",
  "/achievements/image14.jpg",
  "/achievements/image17.jpg",
  "/achievements/image18.jpg",
  "/achievements/image19.jpg",
  "/achievements/image20.jpg"


];

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('achievements');

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

  const currentGallery = activeTab === 'achievements' ? achievementImages : newsImages;

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
            Our Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Discover latest updates, events and glimpses of energy from our studio.
          </motion.p>
        </div>

        {/* Custom Tabs Slider */}
        <div className="flex justify-center items-center mb-10 w-full relative z-10 px-4">
          <div className="bg-gray-800/40 p-1 rounded-full flex gap-1 relative backdrop-blur-md border border-gray-700/50 max-w-[400px] w-full mx-auto">
            {['achievements', 'news'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 py-3 text-sm md:text-base font-semibold transition-colors z-20 rounded-full capitalize ${
                  activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all" />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="achievements-grid-wrapper w-full relative min-h-[400px] py-4">
          <div className="achievements-grid" key={activeTab}>
            {(currentGallery || []).map((img, index) => {
              if (!img) return null; // Safe check for undefined images
              return (
                <div 
                  key={img + index} 
                  className="achievements-item-wrapper animate-in fade-in zoom-in duration-500 fill-mode-both"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="achievements-item">
                    <img src={img} alt={`${activeTab} ${index + 1}`} loading="lazy" />
                    <div className="achievements-overlay">
                      <span>View</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

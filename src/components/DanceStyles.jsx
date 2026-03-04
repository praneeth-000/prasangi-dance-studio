import React from 'react';
import { motion } from 'framer-motion';
import { Music, Flame, Users, Activity } from 'lucide-react';
import './DanceStyles.css';

const styles = [
  { id: 1, title: 'Folk Dance', desc: 'Traditional and regional expressive dance.', icon: <Users size={32} color="#ff3366" /> },
  { id: 2, title: 'Western Dance', desc: 'Modern choreography with energetic moves.', icon: <Activity size={32} color="#7c4dff" /> },
  { id: 3, title: 'Break Dance', desc: 'Athletic street dance full of acrobatics.', icon: <Flame size={32} color="#ff3366" /> },
  { id: 4, title: 'Semi-Classical Dance', desc: 'A beautiful blend of classical grace and modern flow.', icon: <Music size={32} color="#7c4dff" /> },
  { id: 5, title: 'Classical Dance', desc: 'Kuchipudi & Bharatanatyam with deep tradition.', icon: <Users size={32} color="#ff3366" /> },
  { id: 6, title: 'Free Style Dance', desc: 'Improvisational moves focusing on personal expression.', icon: <Activity size={32} color="#7c4dff" /> },
  { id: 7, title: 'Hip Hop Dance', desc: 'Urban choreography emphasizing dynamic beats.', icon: <Flame size={32} color="#ff3366" /> },
  { id: 8, title: 'Cinema Dance', desc: 'Popular film-inspired upbeat routines.', icon: <Music size={32} color="#7c4dff" /> },
];

const DanceStyles = () => {
  return (
    <section className="styles-section section" id="styles">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Dance Styles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore our wide variety of classes designed for all skill levels.
          </motion.p>
        </div>

        <div className="styles-grid">
          {styles.map((style, index) => (
            <motion.div 
              key={style.id}
              className="style-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <div className="style-icon-wrapper">
                {style.icon}
              </div>
              <h3>{style.title}</h3>
              <p>{style.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DanceStyles;

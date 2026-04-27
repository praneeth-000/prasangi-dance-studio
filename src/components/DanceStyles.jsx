import React from 'react';
import { motion } from 'framer-motion';
import { Music, Flame, Users, Activity, Heart, Shield, BookOpen, Sparkles, Zap, Film, Dumbbell } from 'lucide-react';
import './DanceStyles.css';

const styles = [
  { id: 1,  title: 'Folk Dance',        desc: 'Traditional and regional expressive dance.',                          Icon: Users     },
  { id: 2,  title: 'Western Dance',     desc: 'Modern choreography with energetic moves.',                          Icon: Activity  },
  { id: 3,  title: 'Break Dance',       desc: 'Athletic street dance full of acrobatics.',                         Icon: Flame     },
  { id: 4,  title: 'Semi-Classical Dance', desc: 'A beautiful blend of classical grace and modern flow.',           Icon: Music     },
  { id: 5,  title: 'Classical Dance',   desc: 'Kuchipudi & Bharatanatyam with deep tradition.',                    Icon: BookOpen  },
  { id: 6,  title: 'Free Style Dance',  desc: 'Improvisational moves focusing on personal expression.',            Icon: Sparkles  },
  { id: 7,  title: 'Hip Hop Dance',     desc: 'Urban choreography emphasizing dynamic beats.',                     Icon: Zap       },
  { id: 8,  title: 'Cinema Dance',      desc: 'Popular film-inspired upbeat routines.',                            Icon: Film      },
  { id: 9,  title: 'Yoga',             desc: 'Mindful movement and breathwork for inner harmony and flexibility.', Icon: Heart     },
  { id: 10, title: 'Zumba',            desc: 'High-energy Latin-inspired fitness dance for all ages.',             Icon: Dumbbell  },
  { id: 11, title: 'Karate',           desc: 'Disciplined martial art combining strength, focus, and precision.',  Icon: Shield    },
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
          {styles.map((style, index) => {
            const { Icon } = style;
            return (
              <motion.div
                key={style.id}
                className="style-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div className="style-icon-wrapper">
                  <Icon size={26} color="#e5e7eb" strokeWidth={1.5} />
                </div>
                <h3>{style.title}</h3>
                <p>{style.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DanceStyles;

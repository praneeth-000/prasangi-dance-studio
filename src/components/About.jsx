import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
return ( <section className="about-section section" id="about"> <div className="container about-container">

    <motion.div 
      className="about-image-wrapper"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="about-image">
        <img 
          src="/images/poster.jpg" 
          alt="Prasangi Dance Studio Poster"
        />
      </div>

      <div className="about-shape-1"></div>
      <div className="about-shape-2"></div>
    </motion.div>

    <motion.div 
      className="about-content"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h2 className="gradient-text">
        About Prasangi Dance Studio & Fitness Center
      </h2>

      <p>
        Prasangi Dance Studio and Fitness Center is a vibrant space dedicated to nurturing talent, creativity, and confidence through dance and fitness. Located in Jammikunta, our studio offers professional training in classical and modern dance styles for students of all age groups. From the elegance of Kuchipudi and Bharatanatyam to the energy of Hip Hop and Break Dance, we blend tradition with contemporary expression.
      </p>

    </motion.div>

  </div>
</section>


);
};

export default About;

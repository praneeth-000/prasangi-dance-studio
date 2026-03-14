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
          src="/about1.jpg" 
          alt="N. Srilatha"
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
      <h2 className="text-3xl font-bold mb-2 gradient-text">
        N.Srilatha
      </h2>
      <p className="text-pink-400 font-medium mb-6">
        Director of Prasangi Dance Studio and Fitness Center
      </p>

      <p className="text-gray-200 drop-shadow-sm leading-relaxed mb-4">
        Welcome to Prasangi Dance Studio and Fitness Center. Our goal is to inspire students to discover their passion for dance while building confidence, discipline, and creativity. We provide professional training in a supportive environment where every student can grow and express themselves through movement.
      </p>

      <p className="text-gray-200 drop-shadow-sm leading-relaxed mb-6">
        At Prasangi Dance Studio, we focus on both artistic expression and physical fitness. Our team of experienced instructors works closely with students to help them develop strong dance techniques and stage confidence. We believe that dance is not just an art form but also a powerful way to stay healthy, active, and motivated.
      </p>

      <p className="mt-4 text-gray-100 drop-shadow-sm leading-relaxed">
        This dance studio is officially certified and licensed. Click the <a href="/license.jpg" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-bold hover:text-pink-400 transition-colors">License</a> to view.
      </p>

    </motion.div>

  </div>
</section>


);
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to start your dance journey? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="contact-container">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Contact Information</h3>
            <p className="contact-desc">Fill out the form and our team will get back to you within 24 hours.</p>

            <div className="info-item">
              <MapPin className="info-icon" />
              <div>
                <h4>Location</h4>
                <p>Jammikunta</p>
              </div>
            </div>

            <div className="info-item">
              <Phone className="info-icon" />
              <div>
                <h4>Phone</h4>
                <p>9573551643</p>
                <p>9573831643</p>
              </div>
            </div>

            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>prasangidancestudio@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📷</div>
              <div>
                <h4>Instagram</h4>
                <p><a href="https://www.instagram.com/prasangidancestudio" target="_blank" rel="noreferrer" style={{color: 'var(--text-muted)', textDecoration: 'none'}}>@prasangidancestudio</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">▶️</div>
              <div>
                <h4>YouTube</h4>
                <p><a href="https://youtube.com/@PrasangiDanceStudio" target="_blank" rel="noreferrer" style={{color: 'var(--text-muted)', textDecoration: 'none'}}>@PrasangiDanceStudio</a></p>
              </div>
            </div>
            
            <div className="contact-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="Class Inquiry" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Tell us how we can help..."></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

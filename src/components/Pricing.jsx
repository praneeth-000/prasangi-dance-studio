import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './Pricing.css';

const plans = [
  "Monthly Plan",
  "3 Month Plan",
  "6 Month Plan",
  "12 Month Plan"
];

const Pricing = () => {
  return (
    <section className="pricing-section section" id="pricing">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Plans Available
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Flexible plans designed to accommodate your journey and goals.
          </motion.p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan}
              className="pricing-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <h3>{plan}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="pricing-contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>For pricing details, please contact the Master.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '1.1rem', color: 'var(--primary-color)' }}>
            <span>📞 9573551643</span>
            <span>📞 9573831643</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

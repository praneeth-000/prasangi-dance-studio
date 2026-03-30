import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="loader-logo-wrapper">
        <img src="/logo1.png" alt="Prasangi Dance Studio" className="loader-logo" />
      </div>
    </motion.div>
  );
};

export default Loader;

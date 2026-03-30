import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

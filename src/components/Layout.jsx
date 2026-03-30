import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import InstagramButton from './InstagramButton';

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <div className="main-content" style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
      <Footer />
      <WhatsAppButton />
      <InstagramButton />
    </>
  );
};

export default Layout;

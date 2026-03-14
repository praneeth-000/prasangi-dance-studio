import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import InstagramButton from './InstagramButton';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="main-content" style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <Outlet />
      </div>
      <Footer />
      <WhatsAppButton />
      <InstagramButton />
    </>
  );
};

export default Layout;

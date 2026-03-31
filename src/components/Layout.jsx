import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import InstagramButton from './InstagramButton';

import ErrorBoundary from './ErrorBoundary';

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <main className="main-content w-full flex flex-col flex-1 relative min-h-screen" style={{ paddingTop: '80px', overflowX: 'hidden' }}>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <ErrorBoundary>
              <div className="page-wrapper w-full h-full pb-10">
                <Outlet />
              </div>
            </ErrorBoundary>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <InstagramButton />
    </>
  );
};

export default Layout;

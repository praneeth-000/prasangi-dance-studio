import React from 'react';
import Hero from '../components/Hero';
import PromoPopup from '../components/PromoPopup';

const Home = () => {
  return (
    <main>
      <PromoPopup />
      <Hero />
    </main>
  );
};

export default Home;

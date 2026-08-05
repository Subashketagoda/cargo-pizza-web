import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuPreview from './components/MenuPreview';
import Combos from './components/Combos';
import Reviews from './components/Reviews';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import OrderPopup from './components/OrderPopup';
import Loading from './components/Loading';
import Admin from './components/Admin';
import PromoPopup from './components/PromoPopup';
import BackgroundMusic from './components/BackgroundMusic';
import './App.css';

const MainSite = ({ isLoading, setIsLoading }) => (
  <>
    {isLoading && <Loading onLoadingComplete={() => setIsLoading(false)} />}
    <Navbar />
    <main>
      <Hero />
      <About />
      <MenuPreview />
      <Combos />
      <Reviews />
      <InstagramFeed />
    </main>
    <Footer />
    <OrderPopup />
    <PromoPopup />
    {!isLoading && <BackgroundMusic />}
  </>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router basename="/cargo-pizza-web">
      <div className="app">
        <Routes>
          <Route path="/" element={<MainSite isLoading={isLoading} setIsLoading={setIsLoading} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
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
import './App.css';

const MainSite = ({ isLoading, setIsLoading, isUserInteracted }) => (
  <>
    {isLoading && <Loading onLoadingComplete={() => setIsLoading(false)} />}
    <Navbar />
    <main>
      <Hero />
      <About audioUnlocked={!isLoading && isUserInteracted} />
      <Combos />
      <MenuPreview />
      <Reviews />
      <InstagramFeed />
    </main>
    <Footer />
    <OrderPopup />
    <PromoPopup />
  </>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  // Mobile Audio Unlocker: Capture initial user touch / click anywhere
  useEffect(() => {
    const handleUserGesture = () => {
      setIsUserInteracted(true);
      // Create and play silent buffer to unlock Web Audio / Video on iOS & Android
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          ctx.resume();
        }
      } catch (e) {}
    };

    window.addEventListener('touchstart', handleUserGesture, { once: true });
    window.addEventListener('click', handleUserGesture, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('click', handleUserGesture);
    };
  }, []);

  return (
    <Router basename="/cargo-pizza-web">
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <MainSite
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isUserInteracted={isUserInteracted}
              />
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

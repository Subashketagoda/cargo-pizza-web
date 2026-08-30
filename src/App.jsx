import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuPreview from './components/MenuPreview';
import Combos from './components/Combos';
import Reviews from './components/Reviews';
import InstagramFeed from './components/InstagramFeed';
import FAQ from './components/FAQ';
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
      <About />
      <Combos />
      <MenuPreview />
      <Reviews />
      <FAQ />
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

  // Global Video Playback & Autoplay Unlocker for all mobile & desktop browsers
  useEffect(() => {
    const playAllVideos = () => {
      document.querySelectorAll('video').forEach((video) => {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        if (video.paused) {
          video.play().catch(() => {});
        }
      });
    };

    // Run on mount
    playAllVideos();

    const handleUserInteraction = () => {
      setIsUserInteracted(true);
      playAllVideos();
    };

    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('pointerdown', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('scroll', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  // When loading finishes, ensure hero and content videos play immediately
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        document.querySelectorAll('video').forEach((v) => {
          v.muted = true;
          v.defaultMuted = true;
          if (v.paused) v.play().catch(() => {});
        });
      }, 100);
    }
  }, [isLoading]);

  const basename = window.location.pathname.startsWith('/cargo-test')
    ? '/cargo-test'
    : window.location.pathname.startsWith('/cargo-pizza-web')
    ? '/cargo-pizza-web'
    : '/';

  return (
    <Router basename={basename}>
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
          <Route
            path="*"
            element={
              <MainSite
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isUserInteracted={isUserInteracted}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

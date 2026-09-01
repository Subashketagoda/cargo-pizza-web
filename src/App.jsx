import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import PromoPopup from './components/PromoPopup';
import './App.css';

const Admin = lazy(() => import('./components/Admin'));

const MainSite = ({ isLoading, setIsLoading }) => (
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

  // Optimized Global Video Playback & Autoplay Unlocker
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

    playAllVideos();

    const handleUserInteraction = () => {
      playAllVideos();
    };

    // Attach single-trigger listeners without continuous scroll events
    window.addEventListener('touchstart', handleUserInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', handleUserInteraction, { passive: true, once: true });
    window.addEventListener('click', handleUserInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  // When loading finishes, ensure hero and content videos play immediately
  useEffect(() => {
    if (!isLoading) {
      const raf = requestAnimationFrame(() => {
        document.querySelectorAll('video').forEach((v) => {
          v.muted = true;
          v.defaultMuted = true;
          if (v.paused) v.play().catch(() => {});
        });
      });
      return () => cancelAnimationFrame(raf);
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
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#13204e', color: '#FFD700' }}>Loading Admin...</div>}>
                <Admin />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <MainSite
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

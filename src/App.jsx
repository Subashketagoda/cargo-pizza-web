import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import About from './components/About';
import Combos from './components/Combos';
import MenuPreview from './components/MenuPreview';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import OrderPopup from './components/OrderPopup';
import Loading from './components/Loading';
import Admin from './components/Admin';
import './App.css';

const MainSite = ({ isLoading, setIsLoading }) => (
  <>
    {isLoading && <Loading onLoadingComplete={() => setIsLoading(false)} />}
    <Navbar />
    <main>
      <Hero />
      <TrustBadges />
      <About />
      <Combos />
      <MenuPreview />
      <Reviews />
    </main>
    <Footer />
    <FloatingActions />
    <OrderPopup />
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

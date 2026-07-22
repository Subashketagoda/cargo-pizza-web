import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuPreview from './components/MenuPreview';
import Footer from './components/Footer';
import OrderPopup from './components/OrderPopup';
import Loading from './components/Loading';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="app">
      {isLoading && <Loading onLoadingComplete={() => setIsLoading(false)} />}
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuPreview />
      </main>
      <Footer />
      <OrderPopup />
    </div>
  );
}

export default App;

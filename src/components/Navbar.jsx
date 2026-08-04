import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Logo */}
        <a href="#" className="nav-logo" aria-label="Cargo Pizzeria Home">
          <img src={logo} alt="Cargo Pizzeria Logo" className="nav-logo__img" width="130" height="42" />
        </a>

        {/* Desktop Links */}
        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Main Navigation">
          <a href="#about" onClick={closeMenu}>About Us</a>
          <a href="#menu" onClick={closeMenu}>Menu</a>
          <a href="#combos" onClick={closeMenu}>Combos</a>
          <a href="#reviews" onClick={closeMenu}>Reviews</a>
          <a href="#location" onClick={closeMenu}>Location</a>
          
          <div className="mobile-only-cta">
            <a 
              href="https://wa.me/94778817742?text=Hi%20Cargo%20Pizzeria!%20I%20would%20like%20to%20place%20an%20order." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp"
              onClick={closeMenu}
            >
              💬 WhatsApp Order
            </a>
          </div>
        </nav>

        {/* Right Action */}
        <div className="nav-actions">
          <a 
            href="https://wa.me/94778817742?text=Hi%20Cargo%20Pizzeria!%20I%20would%20like%20to%20place%20an%20order." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-gold nav-cta"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Order Now
          </a>

          {/* Hamburger Toggle */}
          <button 
            className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React from 'react';
import './FloatingActions.css';

const FloatingActions = () => {
  return (
    <div className="floating-actions-bar" role="region" aria-label="Quick Action Controls">
      <a 
        href="https://wa.me/94778817742?text=Hi%20Cargo%20Pizzeria!%20I%20want%20to%20place%20an%20order." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="action-btn action-btn--whatsapp"
        aria-label="Order on WhatsApp"
      >
        <span className="action-btn__icon">💬</span>
        <span className="action-btn__label">WhatsApp</span>
      </a>

      <a 
        href="tel:0778817742" 
        className="action-btn action-btn--call"
        aria-label="Call Cargo Pizzeria Now"
      >
        <span className="action-btn__icon">📞</span>
        <span className="action-btn__label">Call Now</span>
      </a>

      <a 
        href="https://maps.google.com/?q=Cargo+Pizzeria,+422A+Nawala+Rd,+Sri+Jayawardenepura+Kotte" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="action-btn action-btn--map"
        aria-label="Get Google Maps Directions"
      >
        <span className="action-btn__icon">📍</span>
        <span className="action-btn__label">Location</span>
      </a>
    </div>
  );
};

export default FloatingActions;

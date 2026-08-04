import React, { useState, useEffect } from 'react';
import './OrderPopup.css';

const OrderPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating Launcher Button */}
      <button 
        className={`fab ${isOpen ? 'fab--open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label={isOpen ? "Close order menu" : "Open order menu options"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <span className="fab__icon">🍕</span>
        )}
      </button>

      {/* Order Popup Modal */}
      <div 
        className={`order-popup ${isOpen ? 'order-popup--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Order Options"
      >
        <div className="order-popup__card">
          <div className="order-popup__emoji">🍕🔥</div>
          <h3 className="order-popup__title">Craving Pizza?</h3>
          <p className="order-popup__desc">Order fast delivery or reserve a table at Cargo Pizzeria Nawala!</p>

          <a 
            href="https://wa.me/94778817742?text=Hi%20Cargo%20Pizzeria!%20I%20want%20to%20place%20an%20order." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-whatsapp order-popup__btn"
          >
            💬 Order on WhatsApp
          </a>

          <a href="tel:0778817742" className="btn btn-primary order-popup__btn">
            📞 Call 077 881 7742
          </a>

          <div className="order-popup__hours">
            <p><strong>🕐 Mon - Fri:</strong> 4.00 PM - 12.00 AM</p>
            <p><strong>🕐 Sat - Sun:</strong> 12.00 PM - 12.00 AM</p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="order-popup__backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default OrderPopup;

import React, { useState, useEffect } from 'react';
import './PromoPopup.css';
import promoImg from '../assets/bogo-promo.png';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 350);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`promo-backdrop ${isClosing ? 'promo-backdrop--closing' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        className={`promo-popup ${isClosing ? 'promo-popup--closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Special Offer: Buy One Get One Free"
      >
        {/* Close Button */}
        <button
          className="promo-popup__close"
          onClick={handleClose}
          aria-label="Close promotion"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Top Badge */}
        <div className="promo-popup__header-badge">
          🔥 SPECIAL OFFER 🍕
        </div>

        {/* Promo Image */}
        <div className="promo-popup__img-wrap">
          <img
            src={promoImg}
            alt="Buy One Get One Free - Every Tuesday & Thursday at Cargo Pizza"
            className="promo-popup__img"
          />
        </div>

        {/* Action Bar */}
        <div className="promo-popup__actions">
          <a
            href="tel:0778817742"
            className="promo-popup__btn promo-popup__btn--call"
            onClick={handleClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call to Order: 077 881 77 42
          </a>
          <button
            className="promo-popup__btn promo-popup__btn--close-text"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoPopup;

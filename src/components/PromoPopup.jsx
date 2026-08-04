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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Promo Image */}
        <div className="promo-popup__img-wrap">
          <img
            src={promoImg}
            alt="Buy One Get One Free - Every Tuesday & Thursday at Cargo Pizza"
            className="promo-popup__img"
          />
        </div>

        {/* CTA Buttons */}
        <div className="promo-popup__actions">
          <a
            href="tel:0778817742"
            className="promo-popup__btn promo-popup__btn--primary"
            onClick={handleClose}
          >
            📞 Order Now — 077 881 77 42
          </a>
          <button
            className="promo-popup__btn promo-popup__btn--ghost"
            onClick={handleClose}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoPopup;

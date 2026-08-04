import React, { useState } from 'react';
import './OrderPopup.css';

const OrderPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button className={`fab ${isOpen ? 'fab--open' : ''}`} onClick={() => setIsOpen(!isOpen)} aria-label="Order Now">
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        )}
      </button>

      {/* Popup Card */}
      <div className={`order-popup ${isOpen ? 'order-popup--open' : ''}`}>
        <div className="order-popup__card">
          <div className="order-popup__emoji">🍕</div>
          <h3 className="order-popup__title">Ready to Order?</h3>
          <p className="order-popup__desc">Call us now or visit us at our location!</p>
          <a href="tel:0778817742" className="order-popup__phone">
            <span className="order-popup__phone-icon">📞</span>
            <span className="order-popup__phone-number">077 881 77 42</span>
          </a>
          <div className="order-popup__hours">
            <p>🕐 Mon-Fri: 4.00 PM - 12.00 AM</p>
            <p>🕐 Sat-Sun: 12.00 PM - 12.00 AM</p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <div className="order-popup__backdrop" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default OrderPopup;

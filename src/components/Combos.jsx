import React from 'react';
import './Combos.css';
import bogoImg from '../assets/bogo-promo.png';

const Combos = () => {
  return (
    <section id="combos" className="bogo-section">
      <div className="container">
        <div className="bogo-card">
          <div className="bogo-card__inner">
            {/* Left Content */}
            <div className="bogo-card__content">
              <div className="bogo-tag">
                <span className="bogo-tag__fire">🔥</span>
                <span>EXCLUSIVE WEEKLY OFFER</span>
              </div>

              <span className="bogo-eyebrow">TUES. THURS. CARGO. REPEAT...</span>
              
              <h2 className="bogo-title">
                BUY ONE<br />
                <span className="bogo-title__highlight">GET ONE FREE!</span>
              </h2>

              <p className="bogo-subtitle">
                Every Tuesday & Thursday • 4.00 PM - MIDNIGHT
              </p>

              <p className="bogo-desc">
                Double the pizza, double the joy! Order your favorite handcrafted pizza every Tuesday & Thursday and get another one absolutely FREE.
              </p>

              <div className="bogo-actions">
                <a href="tel:0778817742" className="btn btn-primary bogo-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>CALL TO ORDER: 077 881 7742</span>
                </a>
              </div>
            </div>

            {/* Right Poster Visual */}
            <div className="bogo-card__visual">
              <div className="bogo-poster-frame">
                <img
                  src={bogoImg}
                  alt="Cargo Pizza Buy One Get One Free Pizza Deal in Nawala Colombo - Every Tuesday and Thursday"
                  className="bogo-poster-img"
                  loading="lazy"
                  decoding="async"
                  width="500"
                  height="600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Combos;

import React, { useEffect } from 'react';
import './InstagramFeed.css';

const InstagramFeed = () => {
  useEffect(() => {
    // Load Elfsight platform script
    const existingScript = document.querySelector('script[src*="elfsight.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="instagram" className="insta-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center insta-header">
          <span className="insta-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Follow Us on Instagram
          </span>
          <h2 className="section-title" style={{ color: 'var(--blue-dark)' }}>
            Fresh From <span style={{ color: 'var(--red)' }}>@cargopizzeria</span>
          </h2>
          <p className="section-subtitle">
            Stay updated with our latest creations, behind-the-scenes, and special offers. Follow the flavor! 🍕
          </p>
        </div>

        {/* Elfsight Instagram Widget Embed */}
        <div className="insta-widget-container">
          {/* 
            TO ACTIVATE REAL-TIME INSTAGRAM FEED:
            1. Go to https://elfsight.com/instagram-feed-widget/
            2. Create a FREE account
            3. Create a new Instagram widget → connect @cargopizzeria
            4. Copy the widget ID from the embed code
            5. Replace "WIDGET_ID_HERE" below with your actual widget ID
               Example: elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
          */}
          <div className="elfsight-app-WIDGET_ID_HERE" data-elfsight-app-lazy></div>
        </div>

        {/* Instagram Profile CTA Strip */}
        <div className="insta-cta-strip">
          <div className="insta-cta-left">
            <div className="insta-profile-avatar">
              <span>🍕</span>
            </div>
            <div className="insta-profile-info">
              <h4>@cargopizzeria</h4>
              <p>Cargo Pizzeria • Sri Jayawardenepura Kotte</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/cargopizzeria/"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-follow-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;

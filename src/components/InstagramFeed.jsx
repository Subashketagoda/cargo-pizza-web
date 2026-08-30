import React, { useEffect } from 'react';
import './InstagramFeed.css';

const InstagramFeed = () => {
  const widgetId = import.meta.env.VITE_ELFSIGHT_WIDGET_ID || '805ec206-6bb3-4f81-b42d-19552ec60ec5';

  useEffect(() => {
    if (!widgetId) return undefined;

    // Load Elfsight platform script
    const existingScript = document.querySelector('script[src*="elfsightcdn.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [widgetId]);

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

        {/* Elfsight syncs new Instagram posts automatically once the widget is connected. */}
        <div className={`insta-widget-container ${widgetId ? '' : 'insta-widget-container--fallback'}`}>
          {widgetId ? (
            <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy></div>
          ) : (
            <a href="https://www.instagram.com/cargopizzeria/" target="_blank" rel="noopener noreferrer">
              Open @cargopizzeria on Instagram
            </a>
          )}
        </div>

        {/* Instagram Profile CTA Strip */}
        <div className="insta-cta-strip">
          <div className="insta-cta-left">
            <div className="insta-profile-avatar">
              <span>🍕</span>
            </div>
            <div className="insta-profile-info">
              <h4>@cargopizzeria</h4>
              <p>Cargo Pizzeria • Nawala</p>
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

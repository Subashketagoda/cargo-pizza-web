import React from 'react';
import './Footer.css';
import logo from '../assets/mascot.png';

const Footer = () => {
  return (
    <footer id="location" className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-col footer-col--brand">
              <img src={logo} alt="Cargo" className="footer__logo" />
              <p className="footer__tagline">Big Heat, Small Bill 🍕🔥</p>
              <div className="footer__socials">
                <a href="https://www.facebook.com/cargorestaurantbar/" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/cargo_restaurant/" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://wa.me/94778817742" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col__title">Quick Links</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#menu">Our Menu</a></li>
                <li><a href="#location">Location</a></li>
              </ul>
            </div>

            {/* Contact & Location Map */}
            <div className="footer-col">
              <h4 className="footer-col__title">Location & Contact</h4>
              <ul>
                <li>📞 077 881 77 42</li>
                <li>
                  <a href="https://share.google/nEqIZkVHYV0SUUj1M" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    📍 Cargo Pizzeria, 422A Nawala Rd, Sri Jayawardenepura Kotte 10107
                  </a>
                </li>
                <li>📧 info@cargorestaurant.com.au</li>
              </ul>
              
              {/* Google Maps Embed */}
              <div style={{ marginTop: '1.5rem' }}>
                <iframe 
                  src="https://maps.google.com/maps?q=Cargo+Pizzeria,+422A+Nawala+Rd,+Sri+Jayawardenepura+Kotte+10107&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="180" 
                  style={{ border: 0, borderRadius: '12px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cargo Restaurant Location"
                ></iframe>
              </div>
            </div>

            {/* Hours */}
            <div className="footer-col">
              <h4 className="footer-col__title">Hours</h4>
              <ul>
                <li><strong>Mon - Fri:</strong> 4.00 PM - 12.00 AM</li>
                <li><strong>Sat - Sun:</strong> 12.00 PM - 12.00 AM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Cargo Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

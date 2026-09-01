import React, { useState } from 'react';
import './InstagramFeed.css';

// 100% Authentic Assets from Cargo Pizzeria WhatsApp Collection
import promoVideo from '../assets/promo-video.mp4';
import cargoFreshBaked from '../assets/cargo-fresh-baked.jpg';
import cargoOutdoorDining from '../assets/cargo-outdoor-dining.jpg';
import cargoPizzaSlices from '../assets/cargo-pizza-slices.jpg';
import cargoOvenSlide from '../assets/cargo-oven-slide.jpg';
import cargoTakeawayBox from '../assets/cargo-takeaway-box.jpg';
import cargoHotdogs from '../assets/cargo-hotdogs.jpg';
import cargoOvenDuo from '../assets/cargo-oven-duo.jpg';
import cargoPizzaPoster from '../assets/cargo-pizza-poster.jpg';
import cargoOvenArch from '../assets/cargo-oven-arch.jpg';

const instaPosts = [
  {
    id: 'reel-1',
    type: 'video',
    src: promoVideo,
    poster: cargoOvenArch,
    title: 'Stone Oven in Action 🔥',
    caption: 'Nothing beats the aroma of freshly kneaded dough baking at 400°C inside our high-heat stone oven! Watch that crust rise to crispy perfection. 🍕🔥 #cargopizzeria #nawala #woodfiredpizza',
    likes: '1,480',
    comments: '88',
    tag: 'REEL 🎥',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-1',
    type: 'image',
    src: cargoFreshBaked,
    title: 'Fresh From 400°C Stone Hearth 🍕',
    caption: 'Piping hot, loaded with premium toppings, and baked with real hardwood fire right before your eyes at Nawala! Big Heat, Small Bill. 🍕🔥 #cargopizzeria #freshbaked #nawala',
    likes: '1,620',
    comments: '142',
    tag: 'STONE BAKED 🔥',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-2',
    type: 'image',
    src: cargoOutdoorDining,
    title: 'Open-Air Garden Dining Vibes 🌿',
    caption: 'Come hang out with your crew! Cozy cane seating, chilled drinks, and sizzling woodfired pizza under the open sky at 422A Nawala Road. ✨🍕 #cargopizza #hangout #nawalafood',
    likes: '1,390',
    comments: '110',
    tag: 'DINE-IN VIBES 🌿',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-3',
    type: 'image',
    src: cargoPizzaSlices,
    title: 'Artisan Slices With Sweet Basil 🍃',
    caption: 'Hand-stretched fresh morning dough, rich herb tomato sauce, 100% real mozzarella, and aromatic fresh basil leaves. Slice perfection every single time! 🤤🍕',
    likes: '1,510',
    comments: '97',
    tag: 'ARTISAN SLICE 🍕',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-4',
    type: 'image',
    src: cargoOvenSlide,
    title: 'Master Chef Live Peel Action 👨‍🍳',
    caption: 'Precision baking on the 400°C stone floor. Our master pizzaiolos ensure that perfect golden leopard-spotted crust on every single pie! 🔥',
    likes: '1,250',
    comments: '76',
    tag: 'LIVE OVEN 🔥',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-5',
    type: 'image',
    src: cargoTakeawayBox,
    title: 'Signature Cargo Boxed To Go 📦',
    caption: 'Freshly sliced straight from the stone hearth into our custom Cargo takeaway boxes. Piping hot pickup ready for family, parties, and late-night cravings! 🚗🍕',
    likes: '1,180',
    comments: '64',
    tag: 'TAKEAWAY 🚗',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-6',
    type: 'image',
    src: cargoHotdogs,
    title: 'Loaded Artisan Hotdogs: Lamb & Special 🌭',
    caption: 'Not just pizzas! Treat yourself to our signature Lamb Dog, Classic Hotdog, and Cargo Special Dog loaded with melted cheese and sauces. Starting from Rs. 850! 🌭🔥',
    likes: '1,090',
    comments: '52',
    tag: 'HOT DOGS 🌭',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-7',
    type: 'image',
    src: cargoOvenDuo,
    title: 'Side-by-Side Stone Hearth Baking 🪵',
    caption: 'Double the heat, double the flavor! Baking classic Pepperoni and signature pies side-by-side beside glowing hardwood logs. Real fire, real taste! 🔥🍕',
    likes: '1,430',
    comments: '83',
    tag: 'WOODFIRE 🪵',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-8',
    type: 'image',
    src: cargoPizzaPoster,
    title: 'Big Heat, Small Bill — Cargo Pizza ❤️',
    caption: 'Over 20+ woodfired varieties crafted daily in Nawala. Buy One Get One Free every Tuesday & Thursday! Call 077 881 7742 to order now. 🍕📞',
    likes: '1,750',
    comments: '165',
    tag: 'BOGO DEALS ⭐',
    link: 'https://www.instagram.com/cargopizzeria/'
  }
];

const InstagramFeed = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="instagram" className="insta-section" aria-label="Cargo Pizzeria Instagram Photos and Videos">
      <div className="container">
        {/* Section Header */}
        <div className="text-center insta-header">
          <span className="badge-glow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            LIVE FROM @CARGOPIZZERIA
          </span>
          <h2 className="section-title">
            Fresh Slices & <span style={{ color: 'var(--yellow)' }}>Woodfire Moments</span>
          </h2>
          <p className="section-subtitle">
            Every photo and video is 100% authentic from our stone oven in Nawala. Click any post to view details and open on Instagram! 🍕📸
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="insta-grid">
          {instaPosts.map((post) => (
            <div
              key={post.id}
              className={`insta-card ${post.type === 'video' ? 'insta-card--video' : ''}`}
              onClick={() => setSelectedPost(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedPost(post)}
              aria-label={`View Instagram post: ${post.title}`}
            >
              {/* Media Container */}
              <div className="insta-card__media">
                {post.type === 'video' ? (
                  <div className="insta-video-wrapper">
                    <img
                      src={post.poster || cargoOvenArch}
                      alt={`Cargo Pizzeria Instagram Reel - ${post.title}`}
                      className="insta-card__img"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="400"
                    />
                    <div className="insta-card__video-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      <span>REEL</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={post.src}
                    alt={`Cargo Pizzeria Instagram - ${post.title}`}
                    className="insta-card__img"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                  />
                )}

                {/* Tag */}
                <span className="insta-card__tag">{post.tag}</span>

                {/* Hover Overlay */}
                <div className="insta-card__overlay">
                  <div className="insta-card__metrics">
                    <div className="insta-metric">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="insta-metric">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <span className="insta-card__view-btn">View Post ↗</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="insta-card__footer">
                <div className="insta-card__user">
                  <div className="insta-user-avatar">🍕</div>
                  <span className="insta-user-name">cargopizzeria</span>
                </div>
                <p className="insta-card__caption-preview">{post.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Profile CTA Strip */}
        <div className="insta-cta-strip">
          <div className="insta-cta-left">
            <div className="insta-profile-avatar">
              <span>🍕</span>
            </div>
            <div className="insta-profile-info">
              <h4>@cargopizzeria</h4>
              <p>Cargo Pizzeria • 422A Nawala Rd, Nawala • 160+ Posts</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/cargopizzeria/"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-follow-btn"
            aria-label="Follow Cargo Pizzeria on Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            <span>Follow on Instagram</span>
          </a>
        </div>

        {/* Interactive Post Modal / Lightbox */}
        {selectedPost && (
          <div
            className="insta-modal-backdrop"
            onClick={() => setSelectedPost(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Instagram Post Details"
          >
            <div
              className="insta-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="insta-modal-close"
                onClick={() => setSelectedPost(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="insta-modal-body">
                <div className="insta-modal-media">
                  {selectedPost.type === 'video' ? (
                    <div className="insta-modal-video-box">
                      <video
                        src={selectedPost.src}
                        controls
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        className="insta-modal-video-player"
                      />
                    </div>
                  ) : (
                    <img
                      src={selectedPost.src}
                      alt={selectedPost.title}
                      className="insta-modal-img"
                    />
                  )}
                </div>

                <div className="insta-modal-details">
                  <div className="insta-modal-user-bar">
                    <div className="insta-modal-avatar">🍕</div>
                    <div>
                      <div className="insta-modal-username">
                        <strong>cargopizzeria</strong>
                        <span className="insta-verified-badge" title="Official Profile">✓</span>
                      </div>
                      <span className="insta-modal-loc">Cargo Pizzeria, Nawala</span>
                    </div>
                  </div>

                  <div className="insta-modal-caption-area">
                    <p>
                      <strong>cargopizzeria</strong> {selectedPost.caption}
                    </p>
                  </div>

                  <div className="insta-modal-actions-bar">
                    <div className="insta-modal-icons">
                      <span className="modal-icon">❤️ {selectedPost.likes} Likes</span>
                      <span className="modal-icon">💬 {selectedPost.comments} Comments</span>
                    </div>
                    <a
                      href={selectedPost.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="insta-modal-open-link"
                    >
                      Open on Instagram ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;

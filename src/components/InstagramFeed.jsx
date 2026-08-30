import React, { useState } from 'react';
import './InstagramFeed.css';

// Real authentic assets from Cargo Pizzeria
import promoVideo from '../assets/promo-video.mp4';
import bogoPromo from '../assets/bogo-promo.png';
import realDevilledChicken from '../assets/real-devilled-chicken.jpg';
import realOvenFire from '../assets/real-oven-fire.jpg';
import realTakeawayBoxes from '../assets/real-takeaway-boxes.jpg';
import realOvenPeel from '../assets/real-oven-peel.jpg';
import restaurantInterior from '../assets/restaurant-interior.png';

const instaPosts = [
  {
    id: 'reel-1',
    type: 'video',
    src: promoVideo,
    title: 'Woodfired Stone Oven in Action 🔥',
    caption: 'Nothing beats the aroma of freshly kneaded dough baking at 400°C inside our high-heat stone oven! Watch that crust rise to crispy perfection. 🍕🔥 #cargopizzeria #nawala #woodfiredpizza',
    likes: '782',
    comments: '46',
    tag: 'REEL 🎥',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-1',
    type: 'image',
    src: realDevilledChicken,
    title: 'Sri Lankan Devilled Chicken Pizza 🔥',
    caption: 'Our signature Devilled Chicken Pizza! Spicy marinated chicken chunks, crunchy capsicum, onion rings, and 100% real melted mozzarella on our artisan crust. Big Heat, Small Bill starting at Rs. 2,100! 🌶️🍕',
    likes: '942',
    comments: '88',
    tag: 'TOP FAVORITE ⭐',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-2',
    type: 'image',
    src: realOvenFire,
    title: 'Baking with Real Hardwood Fire 🪵',
    caption: 'No gas, no shortcuts. Just real woodfire flames, stone heat, and authentic artisanal craftsmanship in every single slice. Dine in with us at 422A Nawala Road! ✨',
    likes: '815',
    comments: '53',
    tag: 'STONE OVEN 🔥',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-3',
    type: 'image',
    src: realTakeawayBoxes,
    title: 'Fresh Hot Takeaway Ready to Go! 🚗',
    caption: 'Piping hot, freshly sliced, and boxed straight from our woodfire oven. Grab your favorite pizzas for friends & family on the way home! 🍕📦',
    likes: '690',
    comments: '39',
    tag: 'TAKEAWAY 🍕',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-4',
    type: 'image',
    src: realOvenPeel,
    title: 'Mastering the Pizza Peel 👨‍🍳',
    caption: 'Freshly stretched dough loaded with gourmet toppings sliding smoothly into the blazing stone hearth. Listen to that crackle! 🔥🍕',
    likes: '625',
    comments: '31',
    tag: 'HANDCRAFTED',
    link: 'https://www.instagram.com/cargopizzeria/'
  },
  {
    id: 'post-5',
    type: 'image',
    src: bogoPromo,
    title: 'Buy 1 Get 1 Free Every Tue & Thu 🏷️',
    caption: 'Double the pizza, double the joy! 🍕🍕 Buy 1 Get 1 FREE every Tuesday & Thursday from 4:00 PM to Midnight. Tag your pizza buddy who is joining you today!',
    likes: '1,120',
    comments: '164',
    tag: 'BOGO OFFER 🏷️',
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
            Directly from our stone oven in Nawala. Follow along for daily oven action, new menu releases, and weekly deals! 🍕📸
          </p>
        </div>

        {/* Instagram Grid of Real Photos & Videos */}
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
                    <video
                      src={post.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="insta-card__video"
                      aria-label="Cargo Pizza Stone Oven Video"
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

              {/* Card Footer / Caption summary */}
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
              {/* Close Button */}
              <button
                type="button"
                className="insta-modal-close"
                onClick={() => setSelectedPost(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="insta-modal-body">
                {/* Media Side */}
                <div className="insta-modal-media">
                  {selectedPost.type === 'video' ? (
                    <div className="insta-modal-video-box">
                      <video
                        src={selectedPost.src}
                        controls
                        autoPlay
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

                {/* Details Side */}
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

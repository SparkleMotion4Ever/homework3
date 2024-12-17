import React from 'react';

const Header = ({ ads, hideAds }) => {
  if (hideAds) return null; // Don't display ads if hideAds is true

  return (
    <header className="header">
      <div id="adsSectionTop" className="ads-section">
        {ads && ads.length > 0 ? (
          <div className="ads-banner">
            <img
              src={ads[0].image || 'default-ad.png'}
              alt={ads[0].title || 'Ad'}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <p>{ads[0].title || 'Advertisement'}</p>
            <a
              href={ads[0].link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'hotpink' }}
            >
              Learn More
            </a>
          </div>
        ) : (
          <div className="ads-banner">No ads available</div>
        )}
      </div>
    </header>
  );
};

export default Header;

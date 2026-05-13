'use client';

import { useState } from 'react';

export function DownloadButton() {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <button onClick={handleClick} style={{ background: 'transparent', border: '1px solid #FFEB43', color: '#FFEB43', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
        📱 Download for Mobile
      </button>
      {showInfo && (
        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: '#1a1a1a', border: '1px solid #FFEB43', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem', zIndex: 1000, minWidth: '250px' }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#FFEB43' }}>Install App</h4>
          <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}><strong>iPhone:</strong> Tap Share → "Add to Home Screen"</p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}><strong>Android:</strong> Tap ⋮ → "Install App"</p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: '#888' }}>Or search in your app store</p>
        </div>
      )}
    </div>
  );
}

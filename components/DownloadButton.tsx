'use client';

import { useState } from 'react';

export function DownloadButton() {
  const [showInfo, setShowInfo] = useState(false);

  const handleAndroid = () => {
    // Go to Play Store search
    window.open('https://play.google.com/store/apps/details?id=com.centralalbertamarkets', '_blank');
  };

  const handleiOS = () => {
    // Go to App Store - need actual app ID
    window.open('https://apps.apple.com/app/central-alberta-markets/id000000000', '_blank');
  };

  const handleMac = () => {
    window.open('https://apps.apple.com/ca/app/central-alberta-markets/id000000000', '_blank');
  };

  const handleWindows = () => {
    window.open('https://play.google.com/store/apps/details?id=com.centralalbertamarkets', '_blank');
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <button 
        onClick={() => setShowInfo(!showInfo)} 
        style={{ 
          background: 'transparent', 
          border: '1px solid #FFEB43', 
          color: '#FFEB43', 
          padding: '8px 16px', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontSize: '0.9rem' 
        }}
      >
        📱 Download for Mobile
      </button>
      {showInfo && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          background: '#1a1a1a', 
          border: '1px solid #FFEB43', 
          borderRadius: '8px', 
          padding: '1rem', 
          marginTop: '0.5rem', 
          zIndex: 1000, 
          minWidth: '220px',
          textAlign: 'center'
        }}>
          <button onClick={handleAndroid} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '10px', background: '#22c55e', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            📱 Android
          </button>
          <button onClick={handleiOS} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '10px', background: '#666', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            🍎 iPhone/iPad
          </button>
          <button onClick={handleMac} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '10px', background: '#007AFF', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            💻 Mac
          </button>
        </div>
      )}
    </div>
  );
}

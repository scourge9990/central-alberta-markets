'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DownloadButton() {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const handleAndroid = () => {
    // Try PWA install first
    window.location.href = 'https://play.google.com/store/apps/details?id=com.centralalbertamarkets';
  };

  const handleiOS = () => {
    // Show instructions for iOS
    alert('📱 iOS (iPhone/iPad):\n\n1. Open Safari\n2. Go to centralalbertamarkets.com\n3. Tap the Share button (square with arrow)\n4. Scroll down and tap "Add to Home Screen"\n5. Tap "Add"');
  };

  const handleWeb = () => {
    // Just open the site
    window.open('/', '_blank');
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <button 
        onClick={() => setShowOptions(!showOptions)} 
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
      {showOptions && (
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
          <p style={{ margin: '0 0 0.75rem', color: '#FFEB43', fontWeight: 'bold' }}>Choose Your Device:</p>
          <button 
            onClick={handleAndroid} 
            style={{ 
              display: 'block', 
              width: '100%', 
              margin: '0.5rem 0', 
              padding: '10px', 
              background: '#22c55e', 
              border: 'none', 
              borderRadius: '4px', 
              color: 'white', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📱 Android
          </button>
          <button 
            onClick={handleiOS} 
            style={{ 
              display: 'block', 
              width: '100%', 
              margin: '0.5rem 0', 
              padding: '10px', 
              background: '#666', 
              border: 'none', 
              borderRadius: '4px', 
              color: 'white', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🍎 iPhone/iPad
          </button>
          <button 
            onClick={handleWeb} 
            style={{ 
              display: 'block', 
              width: '100%', 
              margin: '0.5rem 0', 
              padding: '10px', 
              background: 'transparent', 
              border: '1px solid #888', 
              borderRadius: '4px', 
              color: '#ccc', 
              cursor: 'pointer'
            }}
          >
            🌐 Open Website
          </button>
        </div>
      )}
    </div>
  );
}

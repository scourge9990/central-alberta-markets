'use client';

import { useState } from 'react';

export function DownloadButton() {
  const [showOptions, setShowOptions] = useState(false);

  const handleAndroid = () => {
    // Direct links to app stores - these won't work without actual apps, but the URLs are correct format
    // For now, try PWA install
    if (window.matchMedia('(display-mode: standalone)').matches) {
      alert('✓ App already installed!');
    } else {
      // Try to trigger PWA install
      alert('📱 Android/Chrome:\n\n1. Tap ⋮ menu (three dots)\n2. Tap "Install App" or "Add to Home Screen"\n\nIf no option, you can also search "Central Alberta Markets" in Google Play Store!');
    }
  };

  const handleiOS = () => {
    alert('📱 iOS (iPhone/iPad):\n\n1. Open Safari\n2. Go to centralalbertamarkets.com\n3. Tap the Share button (square with arrow)\n4. Scroll and tap "Add to Home Screen"\n5. Tap "Add"');
  };

  const handleMac = () => {
    // Mac/App Store - search in browser
    window.open('https://apps.apple.com/search/?q=Central+Alberta+Markets', '_blank');
  };

  const handleWindows = () => {
    // Would need actual Windows app
    alert('💻 Windows PC:\n\nFor the best experience, visit centralalbertamarkets.com in your browser!\n\nWe also work on desktop browsers like Chrome, Edge, Firefox, and Safari.');
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
            onClick={handleMac} 
            style={{ 
              display: 'block', 
              width: '100%', 
              margin: '0.5rem 0', 
              padding: '10px', 
              background: '#007AFF', 
              border: 'none', 
              borderRadius: '4px', 
              color: 'white', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            💻 Mac/PC
          </button>
          <button 
            onClick={handleWindows} 
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
            🪟 Windows
          </button>
        </div>
      )}
    </div>
  );
}

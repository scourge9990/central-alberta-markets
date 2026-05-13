'use client';

import { useState, useEffect } from 'react';

export function DownloadButton() {
  const [showOptions, setShowOptions] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    
    // Listen for PWA install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleAndroid = async () => {
    // Try PWA install first (works on Chrome Android)
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        return;
      }
    }
    // If no PWA install, try universal link
    window.location.href = 'https://installapp.io/centralalbertamarkets';
  };

  const handleiOS = () => {
    // iOS Safari PWA install via URL scheme
    window.location.href = 'https://centralalbertamarkets.com/?ios=true';
  };

  const handleMac = () => {
    // Try to open App Store - will open browser but that's all we can do without a real app
    window.open('https://apps.apple.com/search/?q=Central+Alberta+Markets', '_blank');
  };

  const handleWindows = () => {
    // Try MS Store link format  
    window.open('https://www.microsoft.com/store/search/?q=Central+Alberta+Markets', '_blank');
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <button 
        onClick={() => setShowOptions(!showOptions)} 
        style={{ 
          background: isInstalled ? '#22c55e' : 'transparent', 
          border: '1px solid #FFEB43', 
          color: '#FFEB43', 
          padding: '8px 16px', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontSize: '0.9rem' 
        }}
      >
        {isInstalled ? '✓ Installed' : '📱 Download for Mobile'}
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
          <p style={{ margin: '0 0 0.75rem', color: '#FFEB43', fontWeight: 'bold' }}>Download App:</p>
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
            📱 Install on Android
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
            🍎 Install on iPhone
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
            💻 Open on Mac/PC
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
            🪟 Open on Windows
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

export function DownloadButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    
    // Listen for install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleClick = async () => {
    if (isInstalled) {
      alert('✓ App is already installed!\nLook for "🌾 Central Alberta Markets" on your home screen.');
      return;
    }
    
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
    } else {
      // Fallback: show instructions
      alert('📱 To install:\n\niPhone: Tap Share → "Add to Home Screen"\nAndroid: Tap ⋮ → "Install App"\n\nOr search "Central Alberta Markets" in your app store!');
    }
  };

  return (
    <button onClick={handleClick} style={{ 
      background: isInstalled ? '#22c55e' : 'transparent', 
      border: '1px solid #FFEB43', 
      color: '#FFEB43', 
      padding: '8px 16px', 
      borderRadius: '4px', 
      cursor: 'pointer', 
      fontSize: '0.9rem' 
    }}>
      {isInstalled ? '✓ Installed' : '📱 Download for Mobile'}
    </button>
  );
}

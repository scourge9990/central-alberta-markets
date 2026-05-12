'use client';

import { useState } from 'react';

export function DownloadButton() {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    // Detect iOS vs Android
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      // Link to App Store search (no direct link without exact app)
      window.open('https://apps.apple.com/search?search=Central+Alberta+Markets', '_blank');
    } else if (isAndroid) {
      window.open('https://play.google.com/store/search?search=Central+Alberta+Markets', '_blank');
    } else {
      // Desktop - just show the search links
      window.open('https://play.google.com/store/search?search=Central+Alberta+Markets', '_blank');
    }
  };

  return (
    <button onClick={handleClick} style={{ background: 'transparent', border: '1px solid #FFEB43', color: '#FFEB43', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
      📱 Download for Mobile
    </button>
  );
}

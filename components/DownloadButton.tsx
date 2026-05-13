'use client';

import { useState } from 'react';

type Platform = 'android' | 'mac' | null;

export function DownloadButton() {
  const [showPlatform, setShowPlatform] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(null);

  const handleAndroid = () => {
    setSelectedPlatform('android');
  };

  const handleMac = () => {
    setSelectedPlatform('mac');
  };

  const handleInstall = () => {
    if (selectedPlatform === 'android') {
      window.open('https://play.google.com/store/apps/details?id=com.centralalbertamarkets', '_blank');
    } else if (selectedPlatform === 'mac') {
      window.open('https://apps.apple.com/ca/app/central-alberta-markets/id000000000', '_blank');
    }
    setShowPlatform(false);
    setSelectedPlatform(null);
  };

  const handleCancel = () => {
    setSelectedPlatform(null);
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <button 
        onClick={() => {
          setShowPlatform(!showPlatform);
          setSelectedPlatform(null);
        }} 
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
      {showPlatform && !selectedPlatform && (
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
          <p style={{ margin: '0 0 0.75rem 0', color: '#FFEB43', fontWeight: 'bold' }}>Choose Platform</p>
          <button onClick={handleAndroid} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '10px', background: '#22c55e', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            🤖 Android
          </button>
          <button onClick={handleMac} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '10px', background: '#007AFF', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            🍎 Mac
          </button>
        </div>
      )}
      {showPlatform && selectedPlatform && (
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
          <p style={{ margin: '0 0 0.75rem 0', color: '#FFEB43', fontWeight: 'bold' }}>
            {selectedPlatform === 'android' ? '🤖 Android' : '🍎 Mac'} — Ready to Install?
          </p>
          <button onClick={handleInstall} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '10px', background: '#22c55e', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            ✅ Install
          </button>
          <button onClick={handleCancel} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '10px', background: '#ef4444', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            ❌ Cancel
          </button>
        </div>
      )}
    </div>
  );
}

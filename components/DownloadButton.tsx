'use client';

export function DownloadButton() {
  return (
    <button onClick={() => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        alert('App already installed! Look for 🌾 Central Alberta Markets on your home screen.');
      } else if ('standalone' in window || 'navigator' in window) {
        alert('To install: Tap ⋮ menu → "Add to Home Screen" or "Install App"');
      } else {
        alert('To install: Tap ⋮ menu → "Add to Home Screen"');
      }
    }} style={{ background: 'transparent', border: '1px solid #666', color: '#888', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
      📱 Download for Mobile
    </button>
  );
}
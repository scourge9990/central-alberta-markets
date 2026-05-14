import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { InstagramModal } from '@/components/InstagramModal';

export const metadata: Metadata = {
  title: 'CentralAlbertaMarkets.com - Fresh Local Markets',
  description: 'Find the best farmers markets in Central Alberta. Whats fresh this weekend, interactive map, and vendor alerts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#FFEB43" />
        <link href="https://fonts.googleapis.com/css2?family=Impact&family=Oswald:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>
        <div className="app">
          <header className="header">
            <div className="header-content">
              <Link href="/" className="logo">
                🌾 Central Alberta Markets
              </Link>
              <nav className="nav" style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link href="/" style={{ fontSize: '1.875rem' }}>Markets</Link>
                  <Link href="/map" style={{ fontSize: '1.875rem' }}>Map</Link>
                  <Link href="/fresh" style={{ fontSize: '1.875rem' }}>Whats Fresh</Link>
                  <Link href="/vendors" style={{ fontSize: '1.875rem' }}>Vendors</Link>
                  <Link href="/vendor-signup" style={{ fontSize: '1.875rem' }}>Become a Vendor</Link>
                  <Link href="/register" style={{ fontSize: '1.875rem' }}>Register Table</Link>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link href="/events" style={{ fontSize: '1.875rem' }}>📅 Events</Link>
                  <Link href="/bands" style={{ fontSize: '1.875rem' }}>🎸 Bands</Link>
                  <Link href="/subscribe" className="btn-primary" style={{ fontSize: '1.875rem' }}>Get Market Max</Link>
                  <Link href="/login" className="btn-secondary" style={{ fontSize: '1.875rem' }}>Login</Link>
                </div>
              </nav>
            </div>
          </header>
          <main className="main">
            {/* Left Ad Frames */}
            <div className="ad-container ad-left">
              <div className="ad-frame">
                <img 
                  src="/advertisement.jpg" 
                  alt="Advertisement" 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
              <div className="ad-frame">
                <a href="/ad-bottom.jpg" target="_blank" rel="noopener">
                  <img 
                    src="/ad-bottom.jpg" 
                    alt="Click to enlarge" 
                    style={{ width: '100%', borderRadius: '8px', cursor: 'pointer' }}
                  />
                </a>
              </div>
            </div>
            
            <div className="main-with-ads">
              <div className="main-content">{children}</div>
            </div>
            
            {/* Right Ad Frames */}
            <div className="ad-container ad-right">
              <div className="ad-frame">
                <img 
                  src="/ad-right-top.jpg" 
                  alt="Advertisement" 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
              <div className="ad-frame">
                <h4>Advertise Here</h4>
                <p className="ad-placeholder">Your ad could be here!</p>
              </div>
            </div>
          </main>
          <footer className="footer">
            <div className="footer-content">
              <Link href="/admin">Vendor Login</Link>
              <span className="separator">|</span>
              <a href="https://centralalbertaafterdark.com/" target="_blank" rel="noopener">
                Find a First Date Spot 🌙
              </a>
            </div>
            <p className="copyright">© 2025 CentralAlbertaMarkets.ca</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
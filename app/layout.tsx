import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CentralAlbertaMarkets.ca - Fresh Local Markets',
  description: 'Find the best farmers markets in Central Alberta. Whats fresh this weekend, interactive map, and vendor alerts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
              <nav className="nav">
                <Link href="/">Markets</Link>
                <Link href="/map">Map</Link>
                <Link href="/fresh">Whats Fresh</Link>
                <Link href="/vendor-signup">Vendors</Link>
                <Link href="/register">Register Table</Link>
                <Link href="/subscribe" className="btn-primary">Go Premium</Link>
                <Link href="/login" className="btn-secondary">Login</Link>
              </nav>
            </div>
          </header>
          <main className="main">
            {/* Left Ad Frame */}
            <div className="ad-container ad-left">
              <div className="ad-frame">
                <h4>Advertise Here</h4>
                <p className="ad-placeholder">Your ad could be here!</p>
              </div>
            </div>
            
            <div className="main-with-ads">
              <div className="main-content">{children}</div>
            </div>
            
            {/* Right Ad Frame */}
            <div className="ad-container ad-right">
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
              <a href="https://central-alberta-after-dark.vercel.app" target="_blank" rel="noopener">
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
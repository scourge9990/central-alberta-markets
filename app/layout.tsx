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
                <Link href="/subscribe" className="btn-primary">Go Premium</Link>
                <Link href="/login" className="btn-secondary">Login</Link>
              </nav>
            </div>
          </header>
          <main className="main">{children}</main>
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
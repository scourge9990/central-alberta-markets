import Link from 'next/link';
import { fallbackMarkets, freshItems } from '@/lib/db';

export const revalidate = 60;

export default async function Home() {
  // Using fallback data for now (matches your Central Alberta After Dark setup)
  // Database integration ready when you connect PostgreSQL
  
  const displayMarkets = fallbackMarkets;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">🌾 Central Alberta Farmers Markets</h1>
        <p className="hero-subtitle">Fresh local produce, artisan goods, and community connection</p>
        <div className="hero-buttons">
          <Link href="/map" className="btn-primary">🗺️ View Map</Link>
          <Link href="/subscribe" className="btn-secondary">⭐ Go Premium</Link>
        </div>
        <Link href="https://central-alberta-after-dark.vercel.app" target="_blank" rel="noopener" className="dating-link">
          🌙 Looking for love? Find a First Date Spot →
        </Link>
      </section>

      {/* Markets Grid */}
      <section>
        <h2 className="section-title">All Central Alberta Markets</h2>
        <div className="markets-grid">
          {displayMarkets.map((market: any) => (
            <Link href={`/market/${market.slug}`} key={market.id} className="market-card">
              <h3>{market.name}</h3>
              <div className="location">📍 {market.address || market.city}, AB</div>
              <div className="schedule">
                {(market.schedule || []).map((s: any, i: number) => (
                  <div key={i} className="schedule-item">
                    <span className="day">{s.day}</span>
                    <span className="time">{s.startTime} - {s.endTime}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What's Fresh This Weekend */}
      <section style={{ marginTop: '3rem' }}>
        <h2 className="section-title">🍅 Whats Fresh This Weekend</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Sign up for premium to get daily alerts when your favorite vendors have fresh items!
        </p>
        <div className="fresh-grid">
          {freshItems.map((item, i) => (
            <div key={i} className="fresh-card">
              <div style={{ background: 'var(--primary)', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                {item.emoji}
              </div>
              <div className="content">
                <h4>{item.name}</h4>
                <div className="meta">{item.vendor} • {item.market}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const heroStyles = `
  .hero {
    text-align: center;
    padding: 4rem 1.5rem;
    background: linear-gradient(180deg, rgba(255,235,67,0.1) 0%, transparent 100%);
    border-bottom: 3px solid var(--primary);
    margin-bottom: 4rem;
  }
  .hero-title {
    font-family: 'Impact', 'Oswald', sans-serif;
    font-size: clamp(2rem, 5vw, 4rem);
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 1.5rem;
  }
  .hero-subtitle {
    font-size: 1.4rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
  }
  .hero-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .dating-link {
    color: var(--primary);
    font-size: 1.1rem;
    text-decoration: none;
  }
  .dating-link:hover {
    text-decoration: underline;
  }
`;
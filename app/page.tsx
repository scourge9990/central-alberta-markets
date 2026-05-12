import Link from 'next/link';
import { fallbackMarkets, freshItems } from '@/lib/db';
import { DownloadButton } from '@/components/DownloadButton';

export const revalidate = 60;

export default async function Home() {
  // Using fallback data for now (matches your Central Alberta After Dark setup)
  // Database integration ready when you connect PostgreSQL
  
  const displayMarkets = fallbackMarkets;

  return (
    <div>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#FFEB43', marginBottom: '1rem' }}>
          🌾 Central Alberta Markets
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.25rem', color: '#CCCCCC', marginBottom: '1.5rem' }}>
          Fresh local produce, artisan goods, makers, classic car parts, and community connection
        </p>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Link href="/map" style={{ display: 'inline-block', background: '#FFEB43', color: '#003594', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', marginRight: '20px' }}>
            🗺️ View Map
          </Link>
          <Link href="/subscribe" style={{ display: 'inline-block', border: '2px solid #FFEB43', color: '#FFEB43', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
            ⭐ Get Market Max
          </Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', padding: '1rem' }}>
          <a href="https://centralalbertaafterdark.com/" target="_blank" style={{ fontSize: '1.2rem', color: '#FFEB43', fontWeight: 'bold' }}>
            🌙 Looking for love? Find a First Date Spot →
          </a>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <DownloadButton />
        </div>
      </div>

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
    padding: 4rem 2rem;
    background: linear-gradient(180deg, rgba(255,235,67,0.1) 0%, transparent 100%);
    border-bottom: 3px solid var(--primary);
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .hero-title {
    font-family: 'Impact', 'Oswald', sans-serif;
    font-size: clamp(2rem, 5vw, 4rem);
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 4px;
  }
  .hero-subtitle {
    font-size: 1.4rem;
    color: var(--text-muted);
  }
  .hero-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
  .dating-link {
    color: var(--primary);
    font-size: 1.1rem;
    text-decoration: none;
    margin-top: 0.5rem;
  }
  .dating-link:hover {
    text-decoration: underline;
  }
`;
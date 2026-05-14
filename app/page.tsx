import Link from 'next/link';
import { fallbackMarkets, freshItems } from '@/lib/db';
import { DownloadButton } from '@/components/DownloadButton';
import { LiveTicker } from '@/components/LiveTicker';

export const revalidate = 30;

async function getAllReservations() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || ''}/api/registrations/all`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.reservations || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  // Fetch registrations from DB
  const reservations = await getAllReservations();
  
  // Group by market
  const byMarket = reservations.reduce((acc: any, r: any) => {
    if (!acc[r.marketId]) acc[r.marketId] = [];
    acc[r.marketId].push(r);
    return acc;
  }, {});

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
          <a href="https://centralalbertaafterdark.com/" target="_blank">
            🌙 Looking for love? Find a First Date Spot → https://centralalbertaafterdark.com/
          </a>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <DownloadButton />
        </div>
      </div>

      <LiveTicker />

      {/* Markets Grid */}
      <section>
        <h2 className="section-title">All Central Alberta Markets</h2>
        <div className="markets-grid">
          {fallbackMarkets.filter((m: any) => !m.isBands).map((market: any) => {
            const count = byMarket[market.id]?.length || 0;
            const vendors = byMarket[market.id] || [];
            return (
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
                {count > 0 && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(255,235,67,0.15)', borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#FFEB43' }}>📋 Registered Vendors ({count})</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {vendors.slice(0, 3).map((v: any, i: number) => (
                        <div key={i} style={{ color: 'var(--text-muted)' }}>• {v.vendorName}</div>
                      ))}
                      {count > 3 && <div style={{ color: 'var(--text-muted)' }}>+{count - 3} more</div>}
                    </div>
                  </div>
                )}
                {count === 0 && (
                  <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    No vendors registered yet - be the first!
                  </div>
                )}
              </Link>
            );
          })}
          {/* Bands card */}
          <Link href="/bands-listing" key="bands" className="market-card bands-card">
            <h3>🎸 Find a Band</h3>
            <div className="band-preview">Browse available bands →</div>
          </Link>
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
  .bands-card {
    background: linear-gradient(135deg, #6b21a8 0%, #9333ea 100%) !important;
    border: 2px solid #c084fc !important;
  }
  .bands-card:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(147, 51, 234, 0.4);
  }
  .band-preview {
    color: #c084fc;
    font-size: 0.9rem;
    margin: 0.25rem 0 0.5rem;
  }
`;
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const revalidate = 60;

async function getMarkets() {
  try {
    return await prisma.market.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      include: { items: { where: { available: true }, take: 5 } },
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const markets = await getMarkets();

  // Fallback data if no DB
  const fallbackMarkets = [
    { id: 1, name: 'Red Deer Farmers Market', city: 'Red Deer', address: '43rd St & 48th Ave', schedule: [{ day: 'Saturday', startTime: '8:00 AM', endTime: '12:30 PM' }], lat: 52.2697, lng: -113.8021, slug: 'red-deer' },
    { id: 2, name: 'Lacombe Farmers Market', city: 'Lacombe', address: '5020 C&E Trail', schedule: [{ day: 'Saturday', startTime: '10:00 AM', endTime: '1:00 PM' }], lat: 52.4500, lng: -113.7300, slug: 'lacombe' },
    { id: 3, name: 'Sylvan Lake Farmers Market', city: 'Sylvan Lake', address: '5002 Lakeside Dr', schedule: [{ day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }], lat: 52.2960, lng: -114.0900, slug: 'sylvan-lake' },
    { id: 4, name: 'Innisfail Growers Market', city: 'Innisfail', address: 'Hwy 2A', schedule: [{ day: 'Thursday', startTime: '3:30 PM', endTime: '6:30 PM' }, { day: 'Saturday', startTime: '8:00 AM', endTime: '12:30 PM' }], lat: 52.0303, lng: -114.3269, slug: 'innisfail' },
    { id: 5, name: 'Olds Farmers Market', city: 'Olds', address: '5612 Highway 27', schedule: [{ day: 'Saturday', startTime: '10:00 AM', endTime: '2:00 PM' }], lat: 51.7892, lng: -114.1066, slug: 'olds' },
    { id: 6, name: 'Bentley Farmers Market', city: 'Bentley', address: '5002 Range Rd 20', schedule: [{ day: 'Saturday', startTime: '10:00 AM', endTime: '2:00 PM' }], lat: 52.4638, lng: -114.2598, slug: 'bentley' },
    { id: 7, name: 'Wetaskiwin Farmers Market', city: 'Wetaskiwin', address: '5204 Hwy 2A', schedule: [{ day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }], lat: 52.9685, lng: -113.3807, slug: 'wetaskiwin' },
    { id: 8, name: 'Stettler Farmers Market', city: 'Stettler', address: 'Stettner Rec Centre', schedule: [{ day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }], lat: 52.3192, lng: -112.9658, slug: 'stettler' },
    { id: 9, name: 'Sundre Farmers Market', city: 'Sundre', address: 'Mountain View County', schedule: [{ day: 'Friday', startTime: '4:00 PM', endTime: '7:00 PM' }], lat: 51.7983, lng: -114.6394, slug: 'sundre' },
    { id: 10, name: 'Blackfalds Community Market', city: 'Blackfalds', address: 'Blackfalds Community Centre', schedule: [{ day: 'Wednesday', startTime: '3:00 PM', endTime: '7:30 PM' }], lat: 52.3989, lng: -113.8021, slug: 'blackfalds' },
  ];

  const displayMarkets = markets.length > 0 ? markets : fallbackMarkets;

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
          {[
            { name: 'Fresh Garden Vegetables', vendor: 'Innisfail Growers', market: 'Innisfail', type: 'produce' },
            { name: 'Artisan Sourdough Bread', vendor: 'Mountain Oven Bakery', market: 'Red Deer', type: 'baked' },
            { name: 'Free-Range Eggs', vendor: 'Sunny Side Farm', market: 'Lacombe', type: 'dairy' },
            { name: 'Local Honey', vendor: 'Bee Happy Apiaries', market: 'Sylvan Lake', type: 'pantry' },
            { name: 'Handmade Goat Cheese', vendor: 'Rocky Mountain Dairy', market: 'Olds', type: 'dairy' },
            { name: 'Fresh Berries', vendor: 'Eagle Lake Berry Farm', market: 'Bentley', type: 'produce' },
          ].map((item, i) => (
            <div key={i} className="fresh-card">
              <div style={{ background: 'var(--primary)', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                {item.type === 'produce' ? '🥬' : item.type === 'baked' ? '🍞' : item.type === 'dairy' ? '🧀' : '🍯'}
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
    padding: 3rem 1rem;
    background: linear-gradient(180deg, rgba(255,235,67,0.1) 0%, transparent 100%);
    border-bottom: 3px solid var(--primary);
    margin-bottom: 3rem;
  }
  .hero-title {
    font-family: 'Impact', 'Oswald', sans-serif;
    font-size: clamp(2rem, 5vw, 4rem);
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 1rem;
  }
  .hero-subtitle {
    font-size: 1.3rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
  }
  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;
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
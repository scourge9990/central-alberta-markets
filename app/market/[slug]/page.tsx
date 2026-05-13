import Link from 'next/link';
import { notFound } from 'next/navigation';

const marketsData: Record<string, any> = {
  'red-deer': {
    id: 1,
    name: 'Red Deer Farmers Market',
    city: 'Red Deer',
    address: '43rd St & 48th Ave, Red Deer, AB',
    lat: 52.2697,
    lng: -113.8021,
    schedule: [
      { day: 'Saturday', startTime: '8:00 AM', endTime: '12:30 PM', startDate: 'May', endDate: 'October' }
    ],
    vendors: [
      { id: 1, name: 'Mountain Oven Bakery', description: 'Artisan sourdough breads', types: ['baked'] },
      { id: 2, name: 'Sunny Side Farm', description: 'Free-range eggs & poultry', types: ['dairy', 'produce'] },
      { id: 3, name: 'Bee Happy Apiaries', description: 'Local honey & beeswax', types: ['pantry'] },
      { id: 4, name: 'Green Acres Garden', description: 'Fresh vegetables', types: ['produce'] },
    ],
    description: 'The longest-running farmers market in Central Alberta, featuring 40+ vendors with fresh produce, artisan goods, and local crafts.',
  },
  'innisfail': {
    id: 4,
    name: 'Innisfail Growers Market',
    city: 'Innisfail',
    address: 'Hwy 2A, Innisfail, AB',
    lat: 52.0303,
    lng: -114.3269,
    schedule: [
      { day: 'Thursday', startTime: '3:30 PM', endTime: '6:30 PM', startDate: 'June', endDate: 'September' },
      { day: 'Saturday', startTime: '8:00 AM', endTime: '12:30 PM', startDate: 'May', endDate: 'October' }
    ],
    vendors: [
      { id: 1, name: 'Innisfail Growers', description: 'Fresh garden vegetables', types: ['produce'] },
      { id: 2, name: 'Rocky Mountain Dairy', description: 'Goat cheese & dairy', types: ['dairy'] },
    ],
    description: 'Year-round market with locally grown produce and artisan goods. Open multiple days per week.',
  },
  'lacombe': {
    id: 2,
    name: 'Lacombe Farmers Market',
    city: 'Lacombe',
    address: '5020 C&E Trail, Lacombe, AB',
    lat: 52.4500,
    lng: -113.7300,
    schedule: [
      { day: 'Saturday', startTime: '10:00 AM', endTime: '1:00 PM', startDate: 'May', endDate: 'September' }
    ],
    vendors: [],
    description: 'Community-focused market in the heart of Lacombe.',
  },
  'sylvan-lake': {
    id: 3,
    name: 'Sylvan Lake Farmers Market',
    city: 'Sylvan Lake',
    address: '5002 Lakeside Dr, Sylvan Lake, AB',
    lat: 52.2960,
    lng: -114.0900,
    schedule: [
      { day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM', startDate: 'June', endDate: 'September' }
    ],
    vendors: [
      { id: 1, name: 'Bee Happy Apiaries', description: 'Local honey', types: ['pantry'] },
    ],
    description: 'Lakeside market with local vendors and artisans.',
  },
};

// Default market for unknown slugs
const defaultMarket = {
  id: 0,
  name: 'Central Alberta Market',
  city: '',
  address: '',
  lat: 52.35,
  lng: -113.85,
  schedule: [{ day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }],
  vendors: [],
  description: 'Your local farmers market.',
};

export function generateStaticParams() {
  return [
    { slug: 'red-deer' },
    { slug: 'innisfail' },
    { slug: 'lacombe' },
    { slug: 'sylvan-lake' },
    { slug: 'olds' },
    { slug: 'bentley' },
    { slug: 'wetaskiwin' },
    { slug: 'stettler' },
    { slug: 'sundre' },
    { slug: 'blackfalds' },
  ];
}

export default async function MarketPage({ params }: { params: { slug: string } }) {
  const market = marketsData[params.slug] || { ...defaultMarket, slug: params.slug };

  if (!market) {
    notFound();
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>← All Markets</Link>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', fontFamily: "'Impact', 'Oswald', sans-serif", fontSize: '2.5rem', textTransform: 'uppercase' }}>
          {market.name}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          📍 {market.address}
        </p>
        <p style={{ marginTop: '1rem' }}>{market.description}</p>
      </div>

      {/* Schedule */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>📅 Schedule</h2>
        <div style={{ marginTop: '1rem' }}>
          {market.schedule?.map((s: any, i: number) => (
            <div key={i} style={{ padding: '1rem', background: 'var(--surface-light)', borderRadius: '8px', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{s.day}</div>
              <div>{s.startTime} - {s.endTime}</div>
              {s.startDate && <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.startDate} - {s.endDate}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Vendors */}
      <div className="card">
        <h2>🏪 Vendors ({market.vendors?.length || 0})</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          🌙 Premium members can view real-time availability for these vendors!
        </p>
        
        {market.vendors?.length > 0 ? (
          <div className="markets-grid" style={{ marginTop: '1rem' }}>
            {market.vendors.map((vendor: any) => (
              <div key={vendor.id} className="market-card">
                <h3>{vendor.name}</h3>
                <p>{vendor.description}</p>
                <div style={{ marginTop: '0.5rem' }}>
                  {vendor.types?.map((t: string) => (
                    <span key={t} style={{ background: 'var(--surface-light)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', marginRight: '0.5rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>Vendors coming soon. Check back for updates!</p>
        )}
      </div>

      {/* Premium CTA */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link href="/subscribe" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
          ⭐ Get Premium for Vendor Alerts
        </Link>
      </div>
    </div>
  );
}
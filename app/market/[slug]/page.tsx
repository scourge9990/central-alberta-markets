'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Vendor {
  id: number;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  description: string | null;
  markets: string | null;
}

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
    searchName: 'Saturday Morning Market - Red Deer',
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
    searchName: 'Saturday Morning Market - Red Deer',
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
    searchName: 'Sunday Farmers Market - Lacombe',
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
    searchName: 'Saturday Morning Market - Red Deer',
  },
  'olds': {
    id: 5,
    name: 'Olds Farmers Market',
    city: 'Olds',
    address: '5612 Highway 27, Olds, AB',
    lat: 51.7892,
    lng: -114.1066,
    schedule: [
      { day: 'Saturday', startTime: '10:00 AM', endTime: '2:00 PM' }
    ],
    vendors: [],
    description: 'Mountain view market with local artisans.',
    searchName: 'Saturday Morning Market - Red Deer',
  },
  'bentley': {
    id: 6,
    name: 'Bentley Farmers Market',
    city: 'Bentley',
    address: '5002 Range Rd 20, Bentley, AB',
    lat: 52.4638,
    lng: -114.2598,
    schedule: [
      { day: 'Saturday', startTime: '10:00 AM', endTime: '2:00 PM' }
    ],
    vendors: [],
    description: 'Small town market with fresh produce.',
    searchName: 'Saturday Morning Market - Red Deer',
  },
  'wetaskiwin': {
    id: 7,
    name: 'Wetaskiwin Farmers Market',
    city: 'Wetaskiwin',
    address: '5204 Hwy 2A, Wetaskiwin, AB',
    lat: 52.9685,
    lng: -113.3807,
    schedule: [
      { day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }
    ],
    vendors: [],
    description: 'Regional market with artisan goods.',
    searchName: 'Friday Market - Wetaskiwin',
  },
  'stettler': {
    id: 8,
    name: 'Stettler Farmers Market',
    city: 'Stettler',
    address: 'Stettner Rec Centre, Stettler, AB',
    lat: 52.3192,
    lng: -112.9658,
    schedule: [
      { day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }
    ],
    vendors: [],
    description: 'Community market in Stettler.',
    searchName: 'Saturday Morning Market - Red Deer',
  },
  'sundre': {
    id: 9,
    name: 'Sundre Farmers Market',
    city: 'Sundre',
    address: 'Mountain View County, Sundre, AB',
    lat: 51.7983,
    lng: -114.6394,
    schedule: [
      { day: 'Friday', startTime: '4:00 PM', endTime: '7:00 PM' }
    ],
    vendors: [],
    description: 'Evening market in the mountains.',
    searchName: 'Wednesday Night Market - Ponoka',
  },
  'blackfalds': {
    id: 10,
    name: 'Blackfalds Community Market',
    city: 'Blackfalds',
    address: 'Blackfalds Community Centre, Blackfalds, AB',
    lat: 52.3989,
    lng: -113.8021,
    schedule: [
      { day: 'Wednesday', startTime: '3:00 PM', endTime: '7:30 PM' }
    ],
    vendors: [],
    description: 'Mid-week community market.',
    searchName: 'Wednesday Night Market - Ponoka',
  },
};

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
  searchName: 'Saturday Morning Market - Red Deer',
};

export default function MarketPage({ params }: { params: { slug: string } }) {
  const [dbVendors, setDbVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null);

  const market = marketsData[params.slug] || { ...defaultMarket, slug: params.slug };

  useEffect(() => {
    fetch(`/api/vendor-signup?market=${encodeURIComponent(JSON.stringify([market.searchName]))}`)
      .then(res => res.json())
      .then(data => {
        setDbVendors(data.vendors || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [market.searchName]);

  const allVendors = [
    ...(market.vendors || []).map((v: any) => ({ ...v, isStatic: true })),
    ...dbVendors.map((v: Vendor) => ({ ...v, isDb: true }))
  ];

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

      {/* Vendors - including database vendors */}
      <div className="card">
        <h2>🏪 Vendors ({allVendors.length})</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          🌙 Premium members can view real-time availability for these vendors!
        </p>
        
        {loading ? (
          <p>Loading vendors...</p>
        ) : allVendors.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            {allVendors.map((vendor: any) => (
              <div 
                key={vendor.id} 
                className="market-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3>{vendor.name}</h3>
                    <p>{vendor.description}</p>
                    {vendor.types && (
                      <div style={{ marginTop: '0.5rem' }}>
                        {vendor.types?.map((t: string) => (
                          <span key={t} style={{ background: 'var(--surface-light)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', marginRight: '0.5rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {vendor.isDb && (
                    <span style={{ background: 'var(--success)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                      NEW
                    </span>
                  )}
                </div>

                {/* Expanded vendor details */}
                {expandedVendor === vendor.id && vendor.isDb && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--surface)', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.95rem' }}>
                      <p><strong>👤 Contact:</strong> {vendor.contactName}</p>
                      <p><strong>📧 Email:</strong> {vendor.email}</p>
                      {vendor.phone && <p><strong>📞 Phone:</strong> {vendor.phone}</p>}
                      {vendor.description && <p><strong>🥕 Products:</strong> {vendor.description}</p>}
                    </div>
                    <a 
                      href={`mailto:${vendor.email}`}
                      className="btn-primary"
                      style={{ display: 'inline-block', marginTop: '1rem' }}
                    >
                      📧 Contact Vendor
                    </a>
                  </div>
                )}
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
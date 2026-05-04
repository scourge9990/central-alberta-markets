'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Map = dynamic(() => import('@/components/Map'), { ssr: false, loading: () => <div style={{ height: '500px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🗺️ Loading map...</div> });

const markets = [
  { id: 1, name: 'Red Deer Farmers Market', city: 'Red Deer', address: '43rd St & 48th Ave', lat: 52.2697, lng: -113.8021, schedule: 'Sat 8AM-12:30PM', slug: 'red-deer' },
  { id: 2, name: 'Lacombe Farmers Market', city: 'Lacombe', address: '5020 C&E Trail', lat: 52.4500, lng: -113.7300, schedule: 'Sat 10AM-1PM', slug: 'lacombe' },
  { id: 3, name: 'Sylvan Lake Farmers Market', city: 'Sylvan Lake', address: '5002 Lakeside Dr', lat: 52.2960, lng: -114.0900, schedule: 'Sat 9AM-1PM', slug: 'sylvan-lake' },
  { id: 4, name: 'Innisfail Growers Market', city: 'Innisfail', address: 'Hwy 2A', lat: 52.0303, lng: -114.3269, schedule: 'Thu 3:30-6:30PM, Sat 8AM-12:30PM', slug: 'innisfail' },
  { id: 5, name: 'Olds Farmers Market', city: 'Olds', address: '5612 Highway 27', lat: 51.7892, lng: -114.1066, schedule: 'Sat 10AM-2PM', slug: 'olds' },
  { id: 6, name: 'Bentley Farmers Market', city: 'Bentley', address: '5002 Range Rd 20', lat: 52.4638, lng: -114.2598, schedule: 'Sat 10AM-2PM', slug: 'bentley' },
  { id: 7, name: 'Wetaskiwin Farmers Market', city: 'Wetaskiwin', address: '5204 Hwy 2A', lat: 52.9685, lng: -113.3807, schedule: 'Sat 9AM-1PM', slug: 'wetaskiwin' },
  { id: 8, name: 'Stettler Farmers Market', city: 'Stettler', address: 'Stettner Rec Centre', lat: 52.3192, lng: -112.9658, schedule: 'Sat 9AM-1PM', slug: 'stettler' },
  { id: 9, name: 'Sundre Farmers Market', city: 'Sundre', address: 'Mountain View County', lat: 51.7983, lng: -114.6394, schedule: 'Fri 4-7PM', slug: 'sundre' },
  { id: 10, name: 'Blackfalds Community Market', city: 'Blackfalds', address: 'Blackfalds Community Centre', lat: 52.3989, lng: -113.8021, schedule: 'Wed 3-7:30PM', slug: 'blackfalds' },
];

export default function MapPage() {
  const [center, setCenter] = useState<[number, number]>([52.35, -113.85]);
  const [selectedMarket, setSelectedMarket] = useState<typeof markets[0] | null>(null);

  return (
    <div>
      <h1 className="section-title">🗺️ Interactive Market Map</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Click a marker to see market details. Premium users get private layers with vendor info!
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1rem' }}>
        <div className="map-container" style={{ height: '600px' }}>
          <Map markets={markets} center={center} onSelectMarket={setSelectedMarket} />
        </div>
        
        <div className="card">
          <h3>Markets</h3>
          <div style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '1rem' }}>
            {markets.map(m => (
              <button
                key={m.id}
                onClick={() => { setCenter([m.lat, m.lng]); setSelectedMarket(m); }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem',
                  background: selectedMarket?.id === m.id ? 'var(--primary)' : 'var(--surface-light)',
                  color: selectedMarket?.id === m.id ? 'var(--secondary)' : 'var(--text)',
                  border: 'none',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{m.name}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{m.schedule}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedMarket && (
        <Link href={`/market/${selectedMarket.slug}`} className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          View {selectedMarket.name} →
        </Link>
      )}

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Link href="/subscribe" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
          ⭐ Upgrade for Private Map Layers
        </Link>
      </div>
    </div>
  );
}
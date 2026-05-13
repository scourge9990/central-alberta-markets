'use client';

import Link from 'next/link';

const events = [
  {
    id: 1,
    name: 'Red Deer Farmers Market',
    location: 'Red Deer - Bower Public Parking',
    dates: 'Every Saturday, Year-round',
    time: '8:00 AM - 12:00 PM',
    description: 'The oldest and largest outdoor farmers market in Central Alberta. Over 80 vendors.',
    website: 'https://reddeerfarmersmarket.com'
  },
  {
    id: 2,
    name: 'Lacombe Farmers Market',
    location: 'Lacombe - Michener Park',
    dates: 'Every Sunday',
    time: '10:00 AM - 2:00 PM',
    description: 'Community-focused market with local produce, crafts, and baked goods.',
    website: ''
  },
  {
    id: 3,
    name: 'Ponoka Wednesday Night Market',
    location: 'Ponoka - Downtown',
    dates: 'Every Wednesday',
    time: '4:00 PM - 8:00 PM',
    description: 'Evening market perfect for after-work shopping.',
    website: ''
  },
  {
    id: 4,
    name: 'Wetaskiwin Friday Market',
    location: 'Wetaskiwin - Main Street',
    dates: 'Every Friday',
    time: '3:00 PM - 7:00 PM',
    description: 'Family-friendly market with fresh local goods.',
    website: ''
  },
  {
    id: 5,
    name: 'Alberta Farm Youth Expo',
    location: 'Red Deer - Westerner Park',
    dates: 'March 2027',
    time: 'All Day',
    description: 'Annual event showcasing agricultural education and youth involvement in farming.',
    website: 'https://westernerpark.ca'
  },
  {
    id: 6,
    name: 'Ponoka Stampede',
    location: 'Ponoka - Ponoka Stampede Grounds',
    dates: 'June 2027',
    time: 'All Day',
    description: 'One of Alberta\'s oldest stampedes with rodeo, concerts, and carnival.',
    website: 'https://ponokastampede.com'
  },
  {
    id: 7,
    name: 'Alberta Beer & BBQ Festival',
    location: 'Red Deer - Westerner Park',
    dates: 'July 2027',
    time: 'All Day',
    description: 'Craft beer, BBQ competition, and live music.',
    website: 'https://abbeerfest.com'
  },
  {
    id: 8,
    name: 'Lacombe Sunflower Festival',
    location: 'Lacombe - Various Farms',
    dates: 'August 2027',
    time: 'All Day',
    description: 'Pick your own sunflowers and enjoy family activities at local farms.',
    website: ''
  },
  {
    id: 9,
    name: 'Central Alberta Fall Fair',
    location: 'Red Deer - Westerner Park',
    dates: 'September 2027',
    time: 'All Day',
    description: 'Agricultural fair with exhibitions, animals, and carnival rides.',
    website: 'https://westernerpark.ca'
  },
  {
    id: 10,
    name: 'Christmas in November',
    location: 'Red Deer - Westerner Park',
    dates: 'November 2027',
    time: '10:00 AM - 6:00 PM',
    description: 'Christmas gift market with vendors, crafters, and holiday treats.',
    website: ''
  },
];

export default function EventsPage() {
  return (
    <div>
      <h1 className="section-title">📅 Regional Events Calendar</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Reference these events when planning your market schedule
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
        gap: '1.5rem', 
        padding: '0 1rem' 
      }}>
        {events.map((event) => (
          <div key={event.id} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{event.name}</h3>
              {event.website && (
                <a 
                  href={event.website} 
                  target="_blank" 
                  rel="noopener"
                  style={{ color: 'var(--primary)', fontSize: '0.85rem' }}
                >
                  Website →
                </a>
              )}
            </div>
            
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              📍 {event.location}
            </p>
            
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              📅 {event.dates}
            </p>
            
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              ⏰ {event.time}
            </p>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
              {event.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1rem' }}>
        <Link href="/vendor-signup" className="btn-primary">
          Register as a Vendor
        </Link>
      </div>
    </div>
  );
}
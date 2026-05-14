'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const freshItems = [
  { name: 'Garden Fresh Lettuce', vendor: 'Innisfail Growers', market: 'Innisfail', category: 'produce', image: '🥬' },
  { name: 'Artisan Sourdough', vendor: 'Mountain Oven Bakery', market: 'Red Deer', category: 'baked', image: '🍞' },
  { name: 'Free-Range Eggs', vendor: 'Sunny Side Farm', market: 'Lacombe', category: 'dairy', image: '🥚' },
  { name: 'Local Wildflower Honey', vendor: 'Bee Happy Apiaries', market: 'Sylvan Lake', category: 'pantry', image: '🍯' },
  { name: 'Fresh Strawberries', vendor: 'Eagle Lake Berry Farm', market: 'Bentley', category: 'produce', image: '🍓' },
  { name: 'Handmade Goat Cheese', vendor: 'Rocky Mountain Dairy', market: 'Olds', category: 'dairy', image: '🧀' },
  { name: 'Heirloom Tomatoes', vendor: 'Green Acres Garden', market: 'Red Deer', category: 'produce', image: '🍅' },
  { name: 'Fresh HerbsBundle', vendor: 'Innisfail Growers', market: 'Innisfail', category: 'produce', image: '🌿' },
  { name: 'Beef Patties', vendor: 'Mountain View Ranch', market: 'Wetaskiwin', category: 'meat', image: '🥩' },
  { name: 'Pickled Vegetables', vendor: 'The Pickle Lady', market: 'Stettler', category: 'pantry', image: '🥒' },
];

export default function WhatsFreshPage() {
  const [user, setUser] = useState<any>(null);
  const [alerts, setAlerts] = useState<number[]>([]);
  const hasSubscription = user?.subscription?.status === 'active';

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) setUser(JSON.parse(session));
  }, []);

  const handleSetAlert = (itemName: string, index: number) => {
    if (!user) {
      alert('Please login to set alerts');
      return;
    }
    if (!hasSubscription) {
      alert('Daily alerts are a premium feature. Upgrade to Market Max!');
      return;
    }
    if (!alerts.includes(index)) {
      setAlerts([...alerts, index]);
      alert(`Alert set for ${itemName}! You'll be notified when available.`);
    } else {
      setAlerts(alerts.filter(i => i !== index));
      alert(`Alert removed for ${itemName}`);
    }
  };
  return (
    <div>
      <h1 className="section-title">🍅 Whats Fresh This Weekend</h1>
      
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Fresh from Central Alberta farms — updated every Friday! 🌙 Premium members get daily alerts.
      </p>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['All', 'Produce', 'Baked', 'Dairy', 'Pantry', 'Meat'].map(cat => (
          <button
            key={cat}
            style={{
              padding: '0.5rem 1rem',
              background: cat === 'All' ? 'var(--primary)' : 'var(--surface)',
              color: cat === 'All' ? 'var(--secondary)' : 'var(--text)',
              border: '2px solid var(--primary)',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Fresh Items Grid */}
      <div className="fresh-grid">
        {freshItems.map((item, i) => (
          <div key={i} className="fresh-card">
            <div style={{ 
              height: '150px', 
              background: 'linear-gradient(135deg, var(--primary), var(--gold))',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '4rem' 
            }}>
              {item.image}
            </div>
            <div className="content">
              <h4 style={{ color: 'var(--primary)' }}>{item.name}</h4>
              <div className="meta">
                <strong>{item.vendor}</strong> • {item.market} Market
              </div>
              <div style={{ 
                display: 'inline-block', 
                marginTop: '0.5rem', 
                padding: '2px 8px', 
                background: 'var(--surface-light)', 
                borderRadius: '4px',
                fontSize: '0.8rem' 
              }}>
                {item.category}
              </div>
              {hasSubscription ? (
                <button
                  onClick={() => handleSetAlert(item.name, i)}
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    background: alerts.includes(i) ? 'var(--gold)' : 'var(--surface)',
                    color: alerts.includes(i) ? 'var(--secondary)' : 'var(--text)',
                    border: '1px solid var(--primary)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {alerts.includes(i) ? '✅ Alert On' : '🔔 Set Alert'}
                </button>
              ) : (
                <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--surface-light)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  🔒 Item alerts - Premium
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Premium CTA */}
      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        background: 'var(--surface)', 
        border: '3px solid var(--primary)',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>🌙 Get Daily Alerts!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Subscribe to premium ($20/month) to get email/text alerts when your favorite vendors have fresh items.
        </p>
        <Link href="/subscribe" className="btn-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
          ⭐ Upgrade to Premium
        </Link>
      </div>
    </div>
  );
}
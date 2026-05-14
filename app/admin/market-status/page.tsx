'use client';

import { useState, useEffect } from 'react';
import { fallbackMarkets } from '@/lib/db';

interface MarketDate {
  id?: number;
  marketId: number;
  date: string;
  status: string;
  newTime?: string;
  newDate?: string;
  notes?: string;
}

const markets = fallbackMarkets.filter((m: any) => !m.isBands);

export default function MarketStatusPage() {
  const [user, setUser] = useState<any>(null);
  const [marketDates, setMarketDates] = useState<MarketDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const userData = JSON.parse(session);
      // For now, allow any logged-in user to manage (in production, check for admin role)
      setUser(userData);
      loadMarketDates();
    }
  }, []);

  const loadMarketDates = async () => {
    try {
      const res = await fetch('/api/market-date');
      const data = await res.json();
      setMarketDates(data.dates || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const updateMarketDate = async (marketId: number, date: string, status: string, newTime?: string, newDate?: string, notes?: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/market-date', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marketId,
          date,
          status,
          newTime,
          newDate,
          notes,
          email: user?.email
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          loadMarketDates();
        }
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 className="section-title">🔐 Login Required</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
          Please login to manage market status.
        </p>
      </div>
    );
  }

  // Generate next 8 Saturdays for each market
  const getUpcomingSaturdays = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 16; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + (6 - today.getDay() + 7 * i));
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  const upcomingDates = getUpcomingSaturdays();

  return (
    <div>
      <h1 className="section-title">📢 Market Status Manager</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Update market dates - mark as cancelled, rescheduled, or confirmed
      </p>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
        {markets.slice(0, 6).map((market: any) => (
          <div key={market.id} className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{market.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              📍 {market.address || market.city}, AB
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {upcomingDates.slice(0, 8).map((dateStr) => {
                const existing = marketDates.find((md) => md.marketId === market.id && md.date === dateStr);
                const status = existing?.status || 'scheduled';
                
                return (
                  <div
                    key={dateStr}
                    style={{
                      padding: '0.75rem',
                      background: status === 'cancelled' ? 'rgba(239,68,68,0.2)' : 
                                status === 'rescheduled' ? 'rgba(251,191,36,0.2)' : 
                                'var(--surface-light)',
                      border: `2px solid ${status === 'cancelled' ? '#ef4444' : 
                                          status === 'rescheduled' ? '#fbbf24' : 
                                          'var(--surface)'}`,
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {new Date(dateStr).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => updateMarketDate(market.id, dateStr, 'scheduled')}
                        disabled={saving}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.7rem',
                          background: status === 'scheduled' ? '#22c55e' : 'transparent',
                          color: status === 'scheduled' ? 'white' : '#22c55e',
                          border: '1px solid #22c55e',
                          borderRadius: '4px',
                          cursor: saving ? 'not-allowed' : 'pointer',
                        }}
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => updateMarketDate(market.id, dateStr, 'cancelled')}
                        disabled={saving}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.7rem',
                          background: status === 'cancelled' ? '#ef4444' : 'transparent',
                          color: status === 'cancelled' ? 'white' : '#ef4444',
                          border: '1px solid #ef4444',
                          borderRadius: '4px',
                          cursor: saving ? 'not-allowed' : 'pointer',
                        }}
                      >
                        ❌
                      </button>
                      <button
                        onClick={() => updateMarketDate(market.id, dateStr, 'rescheduled')}
                        disabled={saving}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.7rem',
                          background: status === 'rescheduled' ? '#fbbf24' : 'transparent',
                          color: status === 'rescheduled' ? 'black' : '#fbbf24',
                          border: '1px solid #fbbf24',
                          borderRadius: '4px',
                          cursor: saving ? 'not-allowed' : 'pointer',
                        }}
                      >
                        🔄
                      </button>
                    </div>
                    
                    {existing?.notes && (
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                        {existing.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,235,59,0.1)', border: '2px solid var(--primary)', borderRadius: '8px', maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <strong>💡 Updates here</strong> immediately reflect on the homepage for all members to see!
        </p>
      </div>
    </div>
  );
}
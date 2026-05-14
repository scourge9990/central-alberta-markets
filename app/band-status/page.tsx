'use client';

import { useState, useEffect } from 'react';

interface Band {
  id: number;
  bandName: string;
  contactName: string;
  email: string;
  phone: string;
  genre: string;
  description: string;
  fee: string;
  markets: string;
  status: string;
  bandStatus: string;
  notes: string;
}

export default function BandStatusPage() {
  const [user, setUser] = useState<any>(null);
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
      loadBands(userData.email);
    }
  }, []);

  const loadBands = async (email: string) => {
    try {
      const res = await fetch(`/api/band-status?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setBands(data.bands || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const updateStatus = async (bandId: number, newStatus: string, notes?: string) => {
    if (!user?.email) return;
    setUpdating(bandId);

    try {
      const res = await fetch('/api/band-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bandId,
          bandStatus: newStatus,
          notes: notes || '',
          email: user.email
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          loadBands(user.email);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setUpdating(null);
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 className="section-title">🔐 Login Required</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
          Please login to manage your band status.
        </p>
      </div>
    );
  }

  const statusOptions = [
    { value: 'available', label: '✅ Available', color: '#22c55e' },
    { value: 'unavailable', label: '❌ Unavailable', color: '#ef4444' },
    { value: 'booked', label: '🎸 Booked', color: '#8b5cf6' },
  ];

  return (
    <div>
      <h1 className="section-title">🎸 My Band Status</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Update your availability for market performances
      </p>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : bands.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--surface-light)', borderRadius: '12px', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            You haven't registered your band yet.
          </p>
          <a href="/bands" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Register Band →
          </a>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          {bands.map((band) => (
            <div key={band.id} className="card" style={{ marginBottom: '1rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    🎸 {band.bandName}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {band.genre} • {band.markets}
                  </p>
                  {band.bandStatus === 'unavailable' && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                      ❌ YOU MARKED: Unavailable
                    </p>
                  )}
                  {band.bandStatus === 'booked' && (
                    <p style={{ color: '#8b5cf6', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                      🎸 YOU MARKED: Booked
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateStatus(band.id, opt.value)}
                      disabled={updating === band.id}
                      style={{
                        padding: '0.5rem 1rem',
                        background: band.bandStatus === opt.value ? opt.color : 'var(--surface-light)',
                        color: band.bandStatus === opt.value ? 'white' : 'var(--text)',
                        border: `2px solid ${opt.color}`,
                        borderRadius: '6px',
                        cursor: updating === band.id ? 'not-allowed' : 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: band.bandStatus === opt.value ? 'bold' : 'normal',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--surface)' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Notes (visible to members):
                </label>
                <textarea
                  value={band.notes || ''}
                  onChange={(e) => {
                    if (e.target.value !== band.notes) {
                      updateStatus(band.id, band.bandStatus, e.target.value);
                    }
                  }}
                  placeholder="Update members on your availability, new songs, changes, etc."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--surface-light)',
                    border: '2px solid var(--surface)',
                    borderRadius: '8px',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    minHeight: '80px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,235,59,0.1)', border: '2px solid var(--primary)', borderRadius: '8px', maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <strong>💡 Tip:</strong> Updating your status here automatically updates the bands listing in real-time for market organizers to see!
        </p>
      </div>
    </div>
  );
}
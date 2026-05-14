'use client';

import { useState, useEffect } from 'react';

interface Reservation {
  id: number;
  marketId: number;
  date: string;
  tableType: string;
  vendorName: string;
  email: string;
  requirements: string;
  status: string;
  vendorStatus: string;
  notes: string;
}

const marketNames: Record<number, string> = {
  1: 'Saturday Morning Market - Red Deer',
  2: 'Sunday Farmers Market - Lacombe',
  3: 'Wednesday Night Market - Ponoka',
  4: 'Friday Market - Wetaskiwin'
};

export default function VendorStatusPage() {
  const [user, setUser] = useState<any>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
      loadReservations(userData.email);
    }
  }, []);

  const loadReservations = async (email: string) => {
    try {
      const res = await fetch(`/api/vendor-status?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setReservations(data.reservations || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const updateStatus = async (reservationId: number, newStatus: string, notes?: string) => {
    if (!user?.email) return;
    setUpdating(reservationId);

    try {
      const res = await fetch('/api/vendor-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId,
          vendorStatus: newStatus,
          notes: notes || '',
          email: user.email
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          loadReservations(user.email);
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
          Please login to manage your vendor status.
        </p>
      </div>
    );
  }

  const statusOptions = [
    { value: 'attending', label: '✅ Attending', color: '#22c55e' },
    { value: 'not-attending', label: '❌ Not Attending', color: '#ef4444' },
    { value: 'virtual', label: '💻 Virtual Only', color: '#8b5cf6' },
  ];

  return (
    <div>
      <h1 className="section-title">📋 My Vendor Status</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Update your status for upcoming market dates
      </p>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : reservations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--surface-light)', borderRadius: '12px', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            You haven't posted any tables yet.
          </a>
          <a href="/register" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Post a Table →
          </a>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          {reservations.map((res) => (
            <div key={res.id} className="card" style={{ marginBottom: '1rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    {marketNames[res.marketId] || `Market #${res.marketId}`}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    📅 {res.date} • 🪑 {res.tableType}
                  </p>
                  {res.vendorStatus === 'not-attending' && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                      ❌ YOU MARKED: Not Attending
                    </p>
                  )}
                  {res.vendorStatus === 'virtual' && (
                    <p style={{ color: '#8b5cf6', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                      💻 YOU MARKED: Virtual Only
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateStatus(res.id, opt.value)}
                      disabled={updating === res.id}
                      style={{
                        padding: '0.5rem 1rem',
                        background: res.vendorStatus === opt.value ? opt.color : 'var(--surface-light)',
                        color: res.vendorStatus === opt.value ? 'white' : 'var(--text)',
                        border: `2px solid ${opt.color}`,
                        borderRadius: '6px',
                        cursor: updating === res.id ? 'not-allowed' : 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: res.vendorStatus === opt.value ? 'bold' : 'normal',
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
                  value={res.notes || ''}
                  onChange={(e) => {
                    // Save on blur - simplest approach
                    if (e.target.value !== res.notes) {
                      updateStatus(res.id, res.vendorStatus, e.target.value);
                    }
                  }}
                  placeholder="Update users on what's new, what you'll have, changes, etc."
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
          <strong>💡 Tip:</strong> Updating your status here automatically updates the market cards in real-time for all members to see!
        </p>
      </div>
    </div>
  );
}
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
}

export default function BandsPage() {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bands')
      .then(res => res.json())
      .then(data => {
        setBands(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">🎸 Available Bands</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Live music at Central Alberta Markets - Book a band for your next event!
      </p>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading bands...</p>
      ) : bands.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No bands registered yet.</p>
          <p style={{ marginTop: '1rem' }}>
            Are you a musician? <a href="/bands" style={{ color: 'var(--primary)' }}>Register here</a>
          </p>
        </div>
      ) : (
        <div className="bands-grid">
          {bands.map((band) => (
            <div key={band.id} className="band-card">
              <h3>🎸 {band.bandName}</h3>
              <div className="band-genre">🎵 {band.genre}</div>
              <div className="band-info">
                <p><strong>Contact:</strong> {band.contactName}</p>
                <p><strong>Fee:</strong> {band.fee}</p>
                <p><strong>Markets:</strong> {band.markets}</p>
                {band.description && <p className="band-description">{band.description}</p>}
              </div>
              <a href={`mailto:${band.email}`} className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                📧 Contact {band.contactName}
              </a>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'rgba(255,235,67,0.1)', borderRadius: '8px' }}>
        <h3>Are you a band?</h3>
        <p style={{ margin: '1rem 0' }}>Want to play at Central Alberta Markets?</p>
        <a href="/bands" className="btn-secondary">Register as a Band</a>
      </div>

      <style>{`
        .bands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .band-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.5rem;
        }
        .band-card h3 {
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        .band-genre {
          color: #c084fc;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .band-info p {
          margin: 0.5rem 0;
          color: var(--text);
        }
        .band-description {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
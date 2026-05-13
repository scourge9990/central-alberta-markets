'use client';

import { useState, useEffect } from 'react';

interface VendorApplication {
  id: number;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  description: string | null;
  markets: string | null;
  status: string;
  createdAt: string;
}

export default function VendorApplicationsPage() {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vendor-signup')
      .then(res => res.json())
      .then(data => {
        setApplications(data.applications || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleApprove = async (id: number) => {
    await fetch(`/api/vendor-signup/${id}`, { method: 'PATCH' });
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'approved' } : app
    ));
  };

  const handleReject = async (id: number) => {
    await fetch(`/api/vendor-signup/${id}`, { method: 'DELETE' });
    setApplications(applications.filter(app => app.id !== id));
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1 className="section-title">🏪 Vendor Applications</h1>
      
      {applications.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          No vendor applications yet. Share the vendor signup link to attract sellers!
        </p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {applications.map(app => (
            <div key={app.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.3rem' }}>{app.businessName}</h3>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  background: app.status === 'approved' ? 'var(--success)' : 'var(--primary)',
                  color: 'var(--bg)'
                }}>
                  {app.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.95rem' }}>
                <p><strong>👤 Contact:</strong> {app.contactName}</p>
                <p><strong>📧 Email:</strong> {app.email}</p>
                {app.phone && <p><strong>📞 Phone:</strong> {app.phone}</p>}
                {app.description && <p><strong>🥕 Products:</strong> {app.description}</p>}
                {app.markets && (
                  <p><strong>📍 Markets:</strong> {JSON.parse(app.markets).join(', ')}</p>
                )}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Submitted: {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              {app.status === 'pending' && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button 
                    onClick={() => handleApprove(app.id)}
                    className="btn-primary"
                    style={{ flex: 1, background: 'var(--success)' }}
                  >
                    ✅ Approve
                  </button>
                  <button 
                    onClick={() => handleReject(app.id)}
                    className="btn-primary"
                    style={{ flex: 1, background: 'var(--error)' }}
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <p style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="/admin" className="btn-primary">← Back to Admin Dashboard</a>
      </p>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      market: formData.get('market'),
      date: formData.get('date'),
      tableType: formData.get('tableType'),
      vendorName: formData.get('vendorName'),
      email: formData.get('email'),
      setupNeeds: formData.get('setupNeeds'),
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div>
        <h1 className="section-title">✅ Table Reserved!</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Thank you! We'll confirm your reservation soon.
        </p>
        <Link href="/" className="btn-primary" style={{ display: 'block', width: '200px', margin: '2rem auto', textAlign: 'center' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">🪑 Register a Table</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Reserve a table or booth at your local market
      </p>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Select Market *</label>
            <select name="market" required>
              <option value="">Choose a market...</option>
              <option>Saturday Morning Market - Red Deer</option>
              <option>Sunday Farmers Market - Lacombe</option>
              <option>Wednesday Night Market - Ponoka</option>
              <option>Friday Market - Wetaskiwin</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Select Date *</label>
            <input type="date" name="date" required />
          </div>
          
          <div className="form-group">
            <label>Table Type *</label>
            <select name="tableType" required>
              <option value="">Choose table type...</option>
              <option>Single Table ($25)</option>
              <option>Double Table ($45)</option>
              <option>10x10 Booth ($75)</option>
              <option>20x20 Booth ($150)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Vendor Name *</label>
            <input type="text" name="vendorName" required placeholder="Your business name" />
          </div>
          
          <div className="form-group">
            <label>Contact Email *</label>
            <input type="email" name="email" required placeholder="you@example.com" />
          </div>
          
          <div className="form-group">
            <label>Table Setup Needs</label>
            <textarea name="setupNeeds" rows={3} placeholder="Any special requirements? (electrical, tent, loading dock, etc.)" style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-light)', border: '2px solid var(--surface)', borderRadius: '8px', color: 'var(--text)', fontSize: '1rem' }} />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>
            {loading ? 'Submitting...' : 'Reserve My Table →'}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,235,59,0.1)', border: '2px solid var(--primary)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
            <strong>📢 Disclaimer:</strong> This website is for advertising and coordinating purposes only. 
            Registering a table through this site is for marketing and coordination purposes only. 
            You must still register directly with the market organizers at the actual event location to secure your spot. 
            This site does not process table reservations for the real events.
          </p>
        </div>
      </div>
    </div>
  );
}
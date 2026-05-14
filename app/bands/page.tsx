'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BandsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      bandName: formData.get('bandName'),
      contactName: formData.get('contactName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      genre: formData.get('genre'),
      description: formData.get('description'),
      fee: formData.get('fee'),
      markets: Array.from(document.querySelectorAll('select[name="markets"] option:checked')).map((o: any) => o.value),
    };

    try {
      const res = await fetch('/api/bands', {
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
        <h1 className="section-title">🎸 Application Submitted!</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Thanks! We'll be in touch to confirm your booking.
        </p>
        <Link href="/" className="btn-primary" style={{ display: 'block', width: '200px', margin: '2rem auto', textAlign: 'center' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">🎸 Central Alberta Bands</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Register your band to perform at markets and events
      </p>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Band Name *</label>
            <input type="text" name="bandName" required placeholder="e.g., The Haymakers" />
          </div>
          
          <div className="form-group">
            <label>Contact Name *</label>
            <input type="text" name="contactName" required placeholder="Your name" />
          </div>
          
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" required placeholder="you@example.com" />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="(780) 555-1234" />
          </div>
          
          <div className="form-group">
            <label>Music Genre *</label>
            <select name="genre" required>
              <option value="">Select genre...</option>
              <option>Country & Folk</option>
              <option>Rock</option>
              <option>Blues</option>
              <option>Jazz</option>
              <option>Acoustic/Singer-Songwriter</option>
              <option>Bluegrass</option>
              <option>Classic Rock</option>
              <option>Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>About Your Band *</label>
            <textarea name="description" required rows={3} placeholder="Tell us about your band, number of members, equipment, etc." />
          </div>
          
          <div className="form-group">
            <label>Booking Fee</label>
            <input type="text" name="fee" placeholder="e.g., $200 for 2 sets" />
          </div>
          
          <div className="form-group">
            <label>Which markets are you interested in?</label>
            <select name="markets" multiple style={{ height: '120px' }}>
              <option>Saturday Morning Market - Red Deer</option>
              <option>Sunday Farmers Market - Lacombe</option>
              <option>Wednesday Night Market - Ponoka</option>
              <option>Friday Market - Wetaskiwin</option>
            </select>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Hold Ctrl/Cmd to select multiple
            </p>
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>
            {loading ? 'Submitting...' : 'Submit Band Application →'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Questions? <a href="mailto: bands@centralalbertamarkets.com" style={{ color: 'var(--primary)' }}>Email us</a>
        </p>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,235,59,0.1)', border: '2px solid var(--primary)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
            <strong>📢 Disclaimer:</strong> This website provides a platform for connecting bands with market organizers. 
            Registering your band here adds you to our directory for marketing purposes. To book a band for your market, 
            you must contact them directly. We do not process actual bookings - this site is for connections and marketing only.
          </p>
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VendorSignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const hasSubscription = user?.subscription?.status === 'active';

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) setUser(JSON.parse(session));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      businessName: formData.get('businessName'),
      contactName: formData.get('contactName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      products: formData.get('products'),
      markets: Array.from(document.querySelectorAll('select[name="markets"] option:checked')).map((o: any) => o.value),
    };

    try {
      const res = await fetch('/api/vendor-signup', {
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
        <h1 className="section-title">✅ Application Submitted!</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Thank you! We'll be in touch soon.
        </p>
        <Link href="/" className="btn-primary" style={{ display: 'block', width: '200px', margin: '2rem auto', textAlign: 'center' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">🏪 Vendor Registration</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Register your business to sell at Central Alberta Markets
        {hasSubscription && <span style={{ display: 'block', color: 'var(--primary)', marginTop: '0.5rem' }}>🎉 Early Access Enabled - Your applications get priority review!</span>}
      </p>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Business Name *</label>
            <input type="text" name="businessName" required placeholder="e.g., Sunny Acres Farm" />
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
            <label>What do you sell? *</label>
            <input type="text" name="products" required placeholder="e.g., Fresh vegetables, Baked goods, Crafts" />
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
            {loading ? 'Submitting...' : hasSubscription ? '🚀 Submit - Priority Review!' : 'Submit Vendor Application →'}
          </button>
        </form>
        
        {!hasSubscription && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--surface-light)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              🔒 Want early access to vendor spots?
            </p>
            <Link href="/subscribe" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
              Upgrade to Market Max →
            </Link>
          </div>
        )}
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Questions? <a href="mailto: vendors@centralalbertamarkets.com" style={{ color: 'var(--primary)' }}>Email us</a>
        </p>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const handleSubscribe = async () => {
    if (!user) {
      alert('Please login first');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: user.email,
          userId: user.id
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Error creating checkout');
      }
    } catch (e) {
      alert('Error');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="section-title">⭐ Premium Subscription</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Get daily alerts and exclusive features for just $20/month
      </p>

      <div className="pricing-grid">
        {/* Free Tier */}
        <div className="pricing-card">
          <h3>🌿 Free</h3>
          <div className="price">$0<span>/month</span></div>
          <ul>
            <li>View all market schedules</li>
            <li>Basic interactive map</li>
            <li>Weekly "Whats Fresh" section</li>
            <li>Market locations & times</li>
            <li>🔒 Private layers (locked)</li>
            <li>🔒 Email alerts (locked)</li>
            <li>🔒 Early vendor access (locked)</li>
          </ul>
          <Link href="/" className="btn-secondary" style={{ display: 'block' }}>
            Current Plan
          </Link>
        </div>

        {/* Premium Tier */}
        <div className="pricing-card featured">
          <div style={{ position: 'absolute', top: '-12px', right: '20px', background: 'var(--gold)', color: 'var(--secondary)', padding: '4px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem' }}>
            ⭐ BEST VALUE
          </div>
          <h3>🌾 Market Max</h3>
          <div className="price">$20<span>/month</span></div>
          <ul>
            <li>Everything in Free</li>
            <li><strong>Daily email/text alerts</strong> for your favorite vendors</li>
            <li><strong>Item-specific alerts</strong> (fresh berries, bread, etc.)</li>
            <li><strong>Private map layers</strong> with vendor inventory</li>
            <li><strong>Early access</strong> to vendor deals & specials</li>
            <li><strong>Real-time "whats available now"</strong> updates</li>
            <li><strong>Vendor dashboard access</strong> to update your items</li>
            <li>Priority support</li>
          </ul>
          <button 
            className="btn-primary" 
            style={{ display: 'block', width: '100%', fontSize: '1.1rem', cursor: loading ? 'wait' : 'pointer' }}
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? 'Loading...' : user ? 'Subscribe with Stripe →' : 'Login to Subscribe'}
          </button>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          🔒 Secure payments powered by Stripe. Cancel anytime.
        </p>
        <Link href="/admin" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
          Vendor Login →
        </Link>
      </div>
    </div>
  );
}
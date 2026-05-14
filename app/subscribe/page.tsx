'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SubscribeContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const isSuccess = searchParams.get('success') === 'true';
  const isCanceled = searchParams.get('canceled') === 'true';

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
      setSubscriptionStatus(userData.subscription?.status || null);
    }
  }, []);

  // Handle success from Stripe
  useEffect(() => {
    if (isSuccess && user) {
      // Refresh subscription status from server
      fetch(`/api/auth/account?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.user?.subscription) {
            setSubscriptionStatus(data.user.subscription.status);
            // Update localStorage
            const updatedUser = { ...user, subscription: data.user.subscription };
            localStorage.setItem('userSession', JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        })
        .catch(console.error);
    }
  }, [isSuccess, user]);

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
      {isSuccess && (
        <div style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid #22c55e', color: '#22c55e', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
          ✅ Payment successful! Welcome to Market Max! <br />
          <br />
          <strong>Your subscription is now active.</strong><br />
          <Link href="/account" className="btn-primary" style={{ display: 'inline-block', marginTop: '0.5rem' }}>
            View My Account →
          </Link>
        </div>
      )}
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Get daily alerts and exclusive features for just $20/month
      </p>

      <div className="pricing-grid">
        {/* Free Tier */}
        <div className="pricing-card" style={{ opacity: subscriptionStatus === 'active' ? 0.5 : 1 }}>
          <h3>🌿 Free</h3>
          <div className="price">$0<span>/month</span></div>
          <ul>
            <li>✅ View all market schedules</li>
            <li>✅ Basic interactive map</li>
            <li>✅ Weekly "Whats Fresh" section</li>
            <li>✅ Market locations & times</li>
            <li>🔒 Daily alerts (upgrade to unlock)</li>
            <li>🔒 Item alerts (upgrade to unlock)</li>
            <li>🔒 Private map layers (upgrade to unlock)</li>
            <li>🔒 Early vendor access (upgrade to unlock)</li>
          </ul>
          <span className="btn-secondary" style={{ display: 'block', opacity: subscriptionStatus !== 'active' ? 1 : 0.5 }}>
            {subscriptionStatus === 'active' ? '⭐ Active' : 'Current Plan'}
          </span>
        </div>

        {/* Premium Tier */}
        <div className="pricing-card featured" style={{ display: subscriptionStatus === 'active' ? 'none' : 'block' }}>
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
            disabled={loading || isSuccess}
          >
            {isSuccess ? '✅ SUBSCRIBED!' : loading ? 'Loading...' : user ? 'Subscribe with Stripe →' : 'Login to Subscribe'}
          </button>
        </div>

        {/* Show active subscription status */}
        {subscriptionStatus === 'active' && (
          <div className="pricing-card featured" style={{ display: 'block' }}>
            <div style={{ position: 'absolute', top: '-12px', right: '20px', background: 'var(--gold)', color: 'var(--secondary)', padding: '4px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem' }}>
              ⭐ ACTIVE
            </div>
            <h3>🌾 Market Max</h3>
            <div className="price">$20<span>/month</span></div>
            <p style={{ color: 'var(--success)', marginBottom: '1rem' }}>✅ You're subscribed!</p>
            <ul>
              <li>✅ Everything unlocked</li>
              <li>✅ Daily alerts enabled</li>
              <li>✅ Private map layers unlocked</li>
              <li>✅ Early access enabled</li>
              <li>✅ Priority support</li>
            </ul>
            <Link href="/account" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              Manage Account →
            </Link>
          </div>
        )}
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

export default function SubscribePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscribeContent />
    </Suspense>
  );
}
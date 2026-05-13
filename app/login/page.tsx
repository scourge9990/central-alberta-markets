'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  // Check session on load
  useEffect(() => {
    if (localStorage.getItem('userSession')) setLoggedIn(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      localStorage.setItem('userSession', JSON.stringify(data.user));
      setLoggedIn(true);
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setLoggedIn(false);
  };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ color: 'var(--primary)', textAlign: 'center', marginBottom: '1.5rem' }}>
          {isLogin ? '🔐 Login' : '📝 Create Account'}
        </h2>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid var(--error)', color: 'var(--error)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                placeholder="3-20 characters"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Min 8 characters"
              required
            />
          </div>

          <button type={loggedIn ? "button" : "submit"} onClick={loggedIn ? handleLogout : undefined} className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Please wait...' : (loggedIn ? 'Logout' : isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link href="/subscribe" style={{ color: 'var(--primary)' }}>
            ⭐ Get Market Max
          </Link>
        </p>
      </div>
    </div>
  );
}
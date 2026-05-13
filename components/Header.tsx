'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check for session in localStorage
    const session = localStorage.getItem('userSession');
    if (session) {
      const user = JSON.parse(session);
      setIsLoggedIn(true);
      setUserEmail(user.email || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    setUserEmail('');
    router.push('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          🌾 Central Alberta Markets
        </Link>
        <nav className="nav">
          <Link href="/">Markets</Link>
          <Link href="/map">Map</Link>
          <Link href="/fresh">Whats Fresh</Link>
          <Link href="/vendor-signup">Vendors</Link>
          <Link href="/register">Register Table</Link>
          <Link href="/bands">🎸 Bands</Link>
          <Link href="/subscribe" className="btn-primary">Get Market Max</Link>
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="btn-secondary"
              style={{ background: 'var(--error)', border: 'none' }}
            >
              Logout ({userEmail})
            </button>
          ) : (
            <Link href="/login" className="btn-secondary">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
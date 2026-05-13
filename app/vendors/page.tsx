'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Vendor {
  id: number;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  description: string;
  markets: string;
  status: string;
  createdAt: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vendor-signup')
      .then(res => res.json())
      .then(data => {
        setVendors(data.applications?.filter((v: Vendor) => v.status === 'approved') || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="section-title">🏪 Our Vendors</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Meet the local vendors at Central Alberta Markets
      </p>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : vendors.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No vendors yet. Be the first to join!</p>
          <Link href="/vendor-signup" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Become a Vendor
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', padding: '0 1rem' }}>
          {vendors.map((vendor) => (
            <div key={vendor.id} className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{vendor.businessName}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Contact: {vendor.contactName}</p>
              {vendor.phone && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>📞 {vendor.phone}</p>}
              {vendor.description && (
                <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>{vendor.description}</p>
              )}
              {vendor.markets && (
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--primary)' }}>
                  📍 {typeof vendor.markets === 'string' ? JSON.parse(vendor.markets).join(', ') : vendor.markets}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
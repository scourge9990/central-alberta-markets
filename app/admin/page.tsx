'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const mockVendorItems = [
  { id: 1, name: 'Fresh Lettuce', category: 'Produce', price: '$4.99', unit: 'per bunch', available: true },
  { id: 2, name: 'Tomatoes', category: 'Produce', price: '$3.99', unit: 'per lb', available: true },
  { id: 3, name: 'Cucumbers', category: 'Produce', price: '$2.99', unit: 'each', available: true },
  { id: 4, name: 'Zucchini', category: 'Produce', price: '$2.49', unit: 'per lb', available: false },
  { id: 5, name: 'Bell Peppers', category: 'Produce', price: '$4.49', unit: 'per lb', available: true },
  { id: 6, name: 'Carrots', category: 'Produce', price: '$2.99', unit: 'per bunch', available: true },
  { id: 7, name: 'Radishes', category: 'Produce', price: '$2.49', unit: 'per bunch', available: true },
  { id: 8, name: 'Kale', category: 'Produce', price: '$3.99', unit: 'per bunch', available: true },
];

export default function VendorDashboard() {
  const router = useRouter();
  const [items, setItems] = useState(mockVendorItems);
  const [activeTab, setActiveTab] = useState('items');
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [user, setUser] = useState<any>(null);
  const hasSubscription = user?.subscription?.status === 'active';

  // Check login
  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      router.push('/login');
      return;
    }
    const userData = JSON.parse(session);
    setUser(userData);
  }, [router]);

  // Fetch applications when tab is selected
  useEffect(() => {
    if (activeTab === 'applications') {
      setLoadingApps(true);
      fetch('/api/vendor-signup')
        .then(res => res.json())
        .then(data => {
          setApplications(data.applications || []);
          setLoadingApps(false);
        })
        .catch(() => setLoadingApps(false));
    }
  }, [activeTab]);

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

  const toggleAvailability = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const availableCount = items.filter(i => i.available).length;

  // Show upgrade screen if not premium
  if (user && !hasSubscription) {
    return (
      <div>
        <h1 className="section-title">🔒 Vendor Dashboard - Premium Required</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '16px', border: '2px solid var(--primary)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Upgrade to Market Max</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              The vendor dashboard is a premium feature. Upgrade to manage your items and get real-time updates!
            </p>
            <ul style={{ textAlign: 'left', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
              <li>📦 Update items in real-time</li>
              <li>🔔 Send alerts to subscribers</li>
              <li>💰 Early access to vendor deals</li>
              <li>📊 Sales analytics</li>
              <li>Priority support</li>
            </ul>
            <a href="/subscribe" className="btn-primary" style={{ display: 'inline-block', padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
              ⭐ Upgrade Now - $20/month
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">👨‍🌾 Vendor Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="sidebar">
          <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '2px solid var(--surface-light)' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Innisfail Growers</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Innisfail Farmers Market</div>
          </div>
          
          <ul>
            <li className={activeTab === 'items' ? 'active' : ''} onClick={() => setActiveTab('items')}>
              📦 Today's Items ({availableCount})
            </li>
            <li className={activeTab === 'applications' ? 'active' : ''} onClick={() => setActiveTab('applications')}>
              🏪 Vendor Applications
            </li>
            <li className={activeTab === 'alerts' ? 'active' : ''} onClick={() => setActiveTab('alerts')}>
              🔔 Customer Alerts
            </li>
            <li className={activeTab === 'schedule' ? 'active' : ''} onClick={() => setActiveTab('schedule')}>
              📅 Schedule
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              ⚙️ Settings
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="dashboard-content">
          {activeTab === 'items' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>📦 Manage Available Items</h2>
                <button className="btn-primary">+ Add New Item</button>
              </div>

              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Toggle items to mark them as available today. These update in real-time for premium users!
              </p>

              <div className="item-list">
                {items.map(item => (
                  <div key={item.id} className={`item-card ${item.available ? 'available' : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: item.available ? 'var(--success)' : 'var(--text-muted)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {item.category}
                        </div>
                        <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          {item.price} {item.unit}
                        </div>
                      </div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={item.available}
                          onChange={() => toggleAvailability(item.id)}
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.85rem', color: item.available ? 'var(--success)' : 'var(--text-muted)' }}>
                          {item.available ? '✓ Available' : 'Unavailable'}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--surface-light)', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>💡 Quick Tips</div>
                <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.25rem' }}>
                  <li>Items marked available show up in "Whats Fresh This Weekend"</li>
                  <li>Premium users get real-time alerts when you update items</li>
                  <li>Add your social media links to attract more customers</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h2>🏪 Vendor Applications</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Review and approve vendor applications to sell at your market.
              </p>
              
              {loadingApps ? (
                <p>Loading...</p>
              ) : applications.length === 0 ? (
                <div style={{ background: 'var(--surface-light)', padding: '2rem', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No vendor applications yet. Share the vendor signup page to attract sellers!
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {applications.map(app => (
                    <div key={app.id} className="item-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>{app.businessName}</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            👤 {app.contactName} • 📧 {app.email}
                            {app.phone && ` • 📞 ${app.phone}`}
                          </div>
                          {app.description && (
                            <div style={{ marginTop: '0.5rem' }}>🥕 {app.description}</div>
                          )}
                          {app.markets && (
                            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                              📍 {JSON.parse(app.markets).join(', ')}
                            </div>
                          )}
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Submitted: {new Date(app.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          background: app.status === 'approved' ? 'var(--success)' : 'var(--primary)',
                          color: 'var(--bg)'
                        }}>
                          {app.status}
                        </span>
                      </div>
                      
                      {app.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                          <button 
                            onClick={() => handleApprove(app.id)}
                            className="btn-primary"
                            style={{ flex: 1, background: 'var(--success)', cursor: 'pointer' }}
                          >
                            ✅ Approve
                          </button>
                          <button 
                            onClick={() => handleReject(app.id)}
                            className="btn-primary"
                            style={{ flex: 1, background: 'var(--error)', cursor: 'pointer' }}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'alerts' && (
            <div>
              <h2>🔔 Customer Alerts</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Users who have subscribed to alerts for your vendor:
              </p>
              <div style={{ background: 'var(--surface-light)', padding: '1rem', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No active alerts yet. Share your vendor page to get subscribers!
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h2>📅 Market Schedule</h2>
              <div className="item-list">
                <div className="item-card available">
                  <div style={{ fontWeight: 'bold' }}>Innisfail Farmers Market</div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Thursday: 3:30 PM - 6:30 PM<br />
                    Saturday: 8:00 AM - 12:30 PM
                  </div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--success)' }}>
                    ✓ Active
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2>⚙️ Vendor Settings</h2>
              <div className="form-group">
                <label>Vendor Name</label>
                <input type="text" defaultValue="Innisfail Growers" />
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input type="email" placeholder="vendor@example.com" />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input type="url" placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Facebook</label>
                <input type="url" placeholder="https://facebook.com/..." />
              </div>
              <button className="btn-primary">Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
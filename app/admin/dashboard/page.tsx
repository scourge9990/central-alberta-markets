'use client';

import { useState } from 'react';

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
  const [items, setItems] = useState(mockVendorItems);
  const [activeTab, setActiveTab] = useState('items');

  const toggleAvailability = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const availableCount = items.filter(i => i.available).length;

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
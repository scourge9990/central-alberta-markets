import Link from 'next/link';

export const metadata = {
  title: 'Register a Table - Central Alberta Markets',
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="section-title">🪑 Register a Table</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Reserve a table or booth at your local market
      </p>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Select Market *</label>
            <select required>
              <option value="">Choose a market...</option>
              <option>Saturday Morning Market - Red Deer</option>
              <option>Sunday Farmers Market - Lacombe</option>
              <option>Wednesday Night Market - Ponoka</option>
              <option>Friday Market - Wetaskiwin</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Select Date *</label>
            <input type="date" required />
          </div>
          
          <div className="form-group">
            <label>Table Type *</label>
            <select required>
              <option value="">Choose table type...</option>
              <option>Single Table ($25)</option>
              <option>Double Table ($45)</option>
              <option>10x10 Booth ($75)</option>
              <option>20x20 Booth ($150)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Vendor Name *</label>
            <input type="text" required placeholder="Your business name" />
          </div>
          
          <div className="form-group">
            <label>Contact Email *</label>
            <input type="email" required placeholder="you@example.com" />
          </div>
          
          <div className="form-group">
            <label>Table Setup Needs</label>
            <textarea rows={3} placeholder="Any special requirements? (electrical, tent, loading dock, etc.)" style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-light)', border: '2px solid var(--surface)', borderRadius: '8px', color: 'var(--text)', fontSize: '1rem' }} />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', cursor: 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>
            Reserve My Table →
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--surface-light)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>💰 Table Pricing</h3>
          <ul style={{ color: 'var(--text-muted)', marginLeft: '1.5rem' }}>
            <li>Single Table: $25</li>
            <li>Double Table: $45</li>
            <li>10x10 Booth: $75</li>
            <li>20x20 Booth: $150</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
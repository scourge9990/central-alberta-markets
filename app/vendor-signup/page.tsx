import Link from 'next/link';

export const metadata = {
  title: 'Vendor Sign Up - Central Alberta Markets',
};

export default function VendorSignupPage() {
  return (
    <div>
      <h1 className="section-title">🏪 Vendor Registration</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Register your business to sell at Central Alberta Markets
      </p>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Business Name *</label>
            <input type="text" required placeholder="e.g., Sunny Acres Farm" />
          </div>
          
          <div className="form-group">
            <label>Contact Name *</label>
            <input type="text" required placeholder="Your name" />
          </div>
          
          <div className="form-group">
            <label>Email *</label>
            <input type="email" required placeholder="you@example.com" />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="(780) 555-1234" />
          </div>
          
          <div className="form-group">
            <label>What do you sell? *</label>
            <input type="text" required placeholder="e.g., Fresh vegetables, Baked goods, Crafts" />
          </div>
          
          <div className="form-group">
            <label>Which markets are you interested in?</label>
            <select multiple style={{ height: '120px' }}>
              <option>Saturday Morning Market - Red Deer</option>
              <option>Sunday Farmers Market - Lacombe</option>
              <option>Wednesday Night Market - Ponoka</option>
              <option>Friday Market - Wetaskiwin</option>
            </select>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Hold Ctrl/Cmd to select multiple
            </p>
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', cursor: 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>
            Submit Vendor Application →
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Questions? <a href="mailto: vendors@centralalbertamarkets.ca" style={{ color: 'var(--primary)' }}>Email us</a>
        </p>
      </div>
    </div>
  );
}
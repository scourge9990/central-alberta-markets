'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    imageData: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({ ...prev, imageData: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({ ...prev, imageData: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      router.push('/login');
      return;
    }
    const userData = JSON.parse(session);
    setUser(userData);
    // Load saved image from localStorage
    const savedImage = localStorage.getItem('userImage');
    setFormData(prev => ({ ...prev, name: userData.name || '', imageData: savedImage || '' }));
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/auth/account?userId=${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: formData.name,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to update profile');
        return;
      }

      setSuccess('Profile updated successfully!');
      
      // Save image to localStorage if uploaded
      if (formData.imageData) {
        localStorage.setItem('userImage', formData.imageData);
      }
      
      const updatedUser = { ...user, ...data.user };
      localStorage.setItem('userSession', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Clear sensitive fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      return;
    }
    if (!confirm('Really delete? All your data will be lost forever.')) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/account?userId=${user.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        localStorage.removeItem('userSession');
        router.push('/');
      } else {
        setError('Failed to delete account');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div>
      <h1 className="section-title">👤 My Account</h1>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Profile Info */}
        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--surface-light)', borderRadius: '8px', textAlign: 'center' }}>
          {(formData.imageData || localStorage.getItem('userImage')) ? (
            <img src={formData.imageData || localStorage.getItem('userImage')} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.5rem' }} />
          ) : (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--surface)', margin: '0 auto 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>👤</div>
          )}
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{user.name || 'No name set'}</h3>
          <p style={{ color: 'var(--text-muted)' }}>Email: {user.email}</p>
          <p style={{ color: 'var(--text-muted)' }}>Role: {user.role}</p>
          <p style={{ color: 'var(--text-muted)' }}>
            {user.isAdmin && '⭐ Admin '}
            {user.isVendor && '🏪 Vendor '}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid var(--error)', color: 'var(--error)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid #22c55e', color: '#22c55e', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label>Profile Picture (drag & drop or click to upload)</label>
            <div
              onDrop={handleImageDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onClick={() => document.getElementById('imageInput')?.click()}
              style={{
                border: '2px dashed var(--surface)',
                borderRadius: '8px',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: formData.imageData ? 'transparent' : 'var(--surface-light)',
              }}
            >
              {formData.imageData ? (
                <img src={formData.imageData} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>📷 Drop image here</p>
              )}
            </div>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your display name"
            />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--surface)', margin: '1.5rem 0' }} />

          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Change Password</h3>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
              placeholder="Min 8 characters"
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <hr style={{ border: 'none', borderTop: '1px solid var(--surface)', margin: '1.5rem 0' }} />

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: 'var(--error)', marginBottom: '1rem' }}>Danger Zone</h3>
          <button 
            onClick={handleDeleteAccount}
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              background: 'transparent', 
              border: '2px solid var(--error)', 
              color: 'var(--error)', 
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            Delete My Account
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/subscribe" style={{ color: 'var(--primary)' }}>
          ⭐ Manage Subscription
        </Link>
      </div>
    </div>
  );
}
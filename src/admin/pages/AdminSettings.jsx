import { useState } from 'react';
import { useAdminAuth } from '../AdminAuthContext';
import {
  FaUserShield,
  FaKey,
  FaCheck,
  FaShieldHalved,
  FaCircleInfo
} from 'react-icons/fa6';
import './AdminPages.css';

export default function AdminSettings() {
  const { adminUser, updateCredentials } = useAdminAuth();

  const [username, setUsername] = useState(adminUser?.username || 'admin');
  const [displayName, setDisplayName] = useState(adminUser?.name || 'Foundation Administrator');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleUpdate = (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    if (!username.trim()) {
      setStatusMessage({ type: 'error', text: 'Username cannot be empty.' });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    const payload = {
      username: username.trim(),
      name: displayName.trim()
    };

    if (newPassword) {
      payload.password = newPassword;
    }

    const res = updateCredentials(payload);
    if (res.success) {
      setStatusMessage({ type: 'success', text: 'Admin profile updated successfully! Use your new credentials on next sign in.' });
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Admin Account & Security Settings</h1>
          <p>Customize administrative login credentials, foundation identity, and workstation preferences.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Profile / Credentials Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <FaUserShield style={{ color: '#10b981' }} />
              Admin Credentials
            </h3>
          </div>

          <form onSubmit={handleUpdate} className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {statusMessage.text && (
              <div
                className={`admin-badge ${statusMessage.type === 'success' ? 'admin-badge-emerald' : 'admin-badge-amber'}`}
                style={{ padding: '10px 14px', fontSize: '13px', width: '100%', boxSizing: 'border-box' }}
              >
                {statusMessage.text}
              </div>
            )}

            <div className="admin-field">
              <label>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

            <div className="admin-field">
              <label>Admin Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="admin-field">
              <label>New Password (Leave blank to keep unchanged)</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {newPassword && (
              <div className="admin-field">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <div style={{ marginTop: '8px' }}>
              <button type="submit" className="admin-btn admin-btn-primary">
                <FaCheck />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Security & System Info Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <FaShieldHalved style={{ color: '#60a5fa' }} />
              Workstation & Session Overview
            </h3>
          </div>

          <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(2, 6, 23, 0.6)', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Current User Role:</span>
                <span className="admin-badge admin-badge-emerald">{adminUser?.role || 'Super Admin'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Active Username:</span>
                <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{adminUser?.username}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Login Session:</span>
                <span style={{ color: '#cbd5e1' }}>Encrypted Local Storage</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Portal Version:</span>
                <span style={{ color: '#cbd5e1' }}>PMF Admin v1.0.0</span>
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', fontSize: '12.5px', color: '#93c5fd', lineHeight: '1.5' }}>
              <strong>Administrator Tip:</strong> Keep your administrative password protected. If you need to revert to default credentials, you can always use <code>admin</code> / <code>Password#2026</code> after clearing your browser storage.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

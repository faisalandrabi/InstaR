import React, { useState, useEffect } from 'react';
import { X, UserPlus, UserCheck } from 'lucide-react';

export const UserModal = ({ isOpen, onClose, onSave, user, roles }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setRoleId(user.roleId ? String(user.roleId) : roles[0]?.id ? String(roles[0].id) : '');
      setPassword('');
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      setRoleId(roles[0]?.id ? String(roles[0].id) : '');
    }
  }, [user, isOpen, roles]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !roleId) return;

    setLoading(true);
    try {
      if (user) {
        await onSave({ username, email, roleId: parseInt(roleId, 10) });
      } else {
        await onSave({ username, email, password: password || 'DefaultPass123!', roleId: parseInt(roleId, 10) });
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {user ? <UserCheck size={20} style={{ color: 'var(--accent-primary)' }} /> : <UserPlus size={20} style={{ color: 'var(--accent-primary)' }} />}
            <h3 className="modal-title">{user ? 'Edit User' : 'Add New User'}</h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. alex_smith"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-input"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!user && (
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Assign Role *</label>
            <select
              className="form-select"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
            >
              <option value="" disabled>Select Role...</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} {r.description ? `(${r.description})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

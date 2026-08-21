import React from 'react';
import { Plus, ShieldCheck, Edit2, Trash2, Users } from 'lucide-react';

export const RolesView = ({ roles, users, onAddRole, onEditRole, onDeleteRole }) => {
  const getUserCountForRole = (roleId) => {
    return users.filter((u) => u.roleId === roleId).length;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Role Management</h2>
          <p className="page-subtitle">Configure system access levels and permissions</p>
        </div>
        <button className="btn btn-primary" onClick={onAddRole}>
          <Plus size={16} />
          Create New Role
        </button>
      </div>

      <div className="stats-grid">
        {roles.map((role) => {
          const count = getUserCountForRole(role.id);
          return (
            <div key={role.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div className="stat-icon-wrapper pink">
                    <ShieldCheck size={24} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button className="btn-icon" title="Edit Role" onClick={() => onEditRole(role)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon delete" title="Delete Role" onClick={() => onDeleteRole(role.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.4rem' }}>{role.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', minHeight: '40px' }}>
                  {role.description || 'No description provided.'}
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Role ID: #{role.id}</span>
                <span className="badge badge-secondary" style={{ gap: '0.35rem' }}>
                  <Users size={12} />
                  {count} {count === 1 ? 'user' : 'users'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

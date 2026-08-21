import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, User } from 'lucide-react';

export const UsersView = ({ users, roles, onAddUser, onEditUser, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.username.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      (u.roleName && u.roleName.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Users Directory</h2>
          <p className="page-subtitle">Manage system users, assign roles, and perform account operations</p>
        </div>
        <button className="btn btn-primary" onClick={onAddUser}>
          <Plus size={16} />
          Add New User
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="search-box">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            className="search-input"
            placeholder="Search users by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing {filteredUsers.length} of {users.length} users
        </span>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No users found matching your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: '600', color: 'var(--text-muted)' }}>#{u.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div className="brand-icon" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                        <User size={16} />
                      </div>
                      <span style={{ fontWeight: '600' }}>{u.username}</span>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className="badge badge-primary">
                      {u.roleName || 'Unassigned'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="btn-icon" title="Edit User" onClick={() => onEditUser(u)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon delete" title="Delete User" onClick={() => onDeleteUser(u.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

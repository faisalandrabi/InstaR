import React from 'react';
import { LayoutDashboard, Users, ShieldCheck } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, userCount, roleCount }) => {
  return (
    <aside className="sidebar">
      <div
        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
        onClick={() => setActiveTab('dashboard')}
      >
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </div>

      <div
        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
        onClick={() => setActiveTab('users')}
      >
        <Users size={18} />
        <span>Manage Users</span>
        <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>
          {userCount}
        </span>
      </div>

      <div
        className={`nav-item ${activeTab === 'roles' ? 'active' : ''}`}
        onClick={() => setActiveTab('roles')}
      >
        <ShieldCheck size={18} />
        <span>Manage Roles</span>
        <span className="badge badge-secondary" style={{ marginLeft: 'auto' }}>
          {roleCount}
        </span>
      </div>
    </aside>
  );
};

import React from 'react';
import { Users, ShieldCheck, Activity, Radio, Plus, CheckCircle2, ArrowRight } from 'lucide-react';

export const DashboardView = ({
  userCount,
  roleCount,
  signalRStatus,
  apiConnected,
  activityLogs,
  setActiveTab,
  onAddUser,
  onAddRole
}) => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard Overview</h2>
          <p className="page-subtitle">Real-time system telemetry and quick management operations</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper indigo">
            <Users size={24} />
          </div>
          <div>
            <div className="stat-label">Total Users</div>
            <div className="stat-value">{userCount}</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper pink">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="stat-label">Defined Roles</div>
            <div className="stat-value">{roleCount}</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper emerald">
            <Radio size={24} />
          </div>
          <div>
            <div className="stat-label">SignalR Hub</div>
            <div className="stat-value" style={{ fontSize: '1.2rem', textTransform: 'capitalize' }}>
              {signalRStatus}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Real-time Activity Feed */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} className="text-emerald-400" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Live SignalR Activity Stream</h3>
            </div>
            <span className="badge badge-primary">Real-Time</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '320px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {activityLogs.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Waiting for real-time SignalR notifications...
              </div>
            ) : (
              activityLogs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'rgba(15, 23, 42, 0.5)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-success)' }} />
                    <span style={{ fontSize: '0.88rem' }}>{log.text}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{log.time}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={onAddUser}>
                <Plus size={18} />
                Create User
              </button>

              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={onAddRole}>
                <Plus size={18} />
                Create Role
              </button>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: '0.85rem' }}
              onClick={() => setActiveTab('users')}
            >
              View All Users <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

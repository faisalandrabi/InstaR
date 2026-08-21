import React from 'react';
import { Activity, Radio, ExternalLink, Database } from 'lucide-react';

export const Navbar = ({ signalRStatus, apiConnected }) => {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Database size={22} />
        </div>
        <div>
          <h1 className="brand-title">InstaR Admin Console</h1>
        </div>
      </div>

      <div className="nav-badges">
        {/* API Status */}
        <div className="status-badge">
          <span className={`status-dot ${apiConnected ? 'connected' : 'disconnected'}`}></span>
          <span>API: {apiConnected ? 'Online' : 'Offline'}</span>
        </div>

        {/* SignalR Status */}
        <div className="status-badge">
          <Radio size={14} className={signalRStatus === 'connected' ? 'text-emerald-400' : 'text-amber-400'} />
          <span className={`status-dot ${signalRStatus}`}></span>
          <span>SignalR: {signalRStatus}</span>
        </div>

        {/* Swagger Link */}
        <a
          href="http://localhost:5200/swagger"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          <ExternalLink size={14} />
          Swagger API Docs
        </a>
      </div>
    </header>
  );
};

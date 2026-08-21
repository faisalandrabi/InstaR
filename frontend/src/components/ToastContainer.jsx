import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle size={18} className="text-rose-400" />}
          {toast.type === 'info' && <Info size={18} className="text-indigo-400" />}
          <span>{toast.message}</span>
          <button className="btn-icon" onClick={() => removeToast(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

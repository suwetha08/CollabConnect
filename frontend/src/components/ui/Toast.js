import React, { useEffect } from 'react';

const CONFIG = {
  success: { bg: 'bg-emerald-500', icon: '✓' },
  error:   { bg: 'bg-red-500',     icon: '✕' },
  info:    { bg: 'bg-indigo-500',  icon: 'ℹ' },
  warning: { bg: 'bg-amber-500',   icon: '⚠' },
};

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const { bg, icon } = CONFIG[type] || CONFIG.info;

  return (
    <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3.5 ${bg} text-white rounded-2xl shadow-2xl animate-slide-in max-w-sm`}>
      <span className="text-lg font-bold">{icon}</span>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100 transition-opacity text-lg leading-none">
        ×
      </button>
    </div>
  );
};

export default Toast;

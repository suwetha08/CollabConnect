import React from 'react';

const Input = ({ label, error, icon, className = '', ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          {icon}
        </div>
      )}
      <input
        className={`input-base ${icon ? 'pl-10' : ''} ${error ? '!border-red-400 focus:!ring-red-100 dark:focus:!ring-red-900/40' : ''} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
  </div>
);

export default Input;

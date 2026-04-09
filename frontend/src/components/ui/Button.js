import React from 'react';

const VARIANTS = {
  primary:  'btn-primary',
  secondary:'btn-secondary',
  ghost:    'btn-ghost',
  outline:  'btn-outline-white',
  danger:   'inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
};

const SIZES = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
};

const Spinner = () => (
  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const Button = ({ children, variant = 'primary', size = 'md', className = '', icon, loading = false, ...props }) => (
  <button
    className={`${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading ? <><Spinner />Loading...</> : <>{icon && <span>{icon}</span>}{children}</>}
  </button>
);

export default Button;

import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const hoverClass = hover ? 'hover:shadow-2xl hover:-translate-y-2' : '';
  
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg transition-all duration-300 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

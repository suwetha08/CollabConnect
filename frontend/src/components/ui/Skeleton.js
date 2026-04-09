import React from 'react';

const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full',
  };

  return (
    <div className={`skeleton rounded-lg ${variants[variant]} ${className}`}></div>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-2/3" />
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
};

export default Skeleton;

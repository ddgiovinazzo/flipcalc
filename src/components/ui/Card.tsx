import type { HTMLAttributes } from 'react';

export function Card({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

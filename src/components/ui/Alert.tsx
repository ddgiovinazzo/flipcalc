import type { HTMLAttributes } from 'react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status: 'success' | 'warning' | 'error' | 'info';
}

export function Alert({
  status,
  className = '',
  children,
  ...props
}: AlertProps) {
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div
      className={`px-4 py-2 rounded-lg font-semibold text-center outline-1 outline-solid ${variants[status]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

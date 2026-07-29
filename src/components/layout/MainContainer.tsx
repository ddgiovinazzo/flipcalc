import { ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">{children}</main>
    </div>
  );
}

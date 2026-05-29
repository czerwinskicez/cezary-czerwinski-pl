import type { ReactNode } from 'react';
import { ConsentManager } from './ConsentManager';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({
  children
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
      <ConsentManager />
    </div>
  );
}
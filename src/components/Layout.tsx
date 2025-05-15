import React from 'react';
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({
  children
}: LayoutProps) {
  return <div className="min-h-screen bg-black text-white">{children}</div>;
}
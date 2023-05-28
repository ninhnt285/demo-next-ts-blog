import React from 'react';
import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode,
  className?: string,
}

export default function Layout({children, className}: LayoutProps) {
  return (
    <>
      <Navbar />
      
      <main className={`container mx-auto ${className ?? ''}`}>
        {children}
      </main>
    </>
  );
}

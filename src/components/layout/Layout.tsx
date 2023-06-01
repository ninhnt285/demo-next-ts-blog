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
      
      <main className={`container px-4 max-w-4xl mx-auto ${className ?? ''}`}>
        {children}
      </main>
    </>
  );
}

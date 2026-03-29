'use client';

import { useEffect, useState } from 'react';
import { useMode } from './ModeContext';

export default function XRayCursor() {
  const { mode } = useMode();
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (mode !== 'engineer') return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mode]);

  if (mode !== 'engineer') return null;

  return (
    <>
      {/* Spotlight Effect overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 mix-blend-screen opacity-60"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`
        }}
      />
      
      {/* Custom Crosshair Cursor */}
      <div 
        className="pointer-events-none fixed z-[9999] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 flex items-center justify-center mix-blend-screen"
        style={{
          left: position.x,
          top: position.y,
          transition: 'width 0.2s, height 0.2s'
        }}
      >
        <div className="w-1 h-1 bg-accent rounded-full" />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-[1px] bg-accent/50" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-[1px] bg-accent/50" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-2 bg-accent/50" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1px] h-2 bg-accent/50" />
      </div>
      
      {/* Floating Coordinate Display */}
      <div 
        className="pointer-events-none fixed z-[9999] text-[9px] font-mono text-accent/70 mt-4 ml-4"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        X:{position.x} Y:{position.y}
      </div>
    </>
  );
}

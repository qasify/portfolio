'use client';

import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`
        rounded-xl border border-border-subtle bg-bg-card backdrop-blur-sm
        p-5 transition-all duration-300
        ${hover ? 'hover:border-border-glow hover:bg-bg-card-hover hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

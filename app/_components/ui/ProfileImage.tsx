'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const ORBIT_TAGS = ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'];

export default function ProfileImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Main image container with 3D tilt */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative group cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Animated gradient ring */}
          <div
            className={`absolute -inset-[3px] rounded-2xl transition-opacity duration-500 animate-gradient
              ${isHovered ? 'opacity-100' : 'opacity-60'}`}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #34d399, #a78bfa, #06b6d4)',
              backgroundSize: '300% 300%',
            }}
          />

          {/* Image frame */}
          <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-bg-primary">
            <Image
              src="/profile.jpeg"
              alt="Muhammad Qasim — Senior Frontend Engineer"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 256px, 288px"
              priority
            />

            {/* Overlay gradient — subtle darkening at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Floating "status" chip */}
          {/* <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10
            px-4 py-1.5 rounded-full bg-bg-card/90 backdrop-blur-md border border-border-glow
            text-xs font-mono text-emerald flex items-center gap-2 shadow-lg shadow-accent/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            Open to work
          </div> */}
        </div>

        {/* Corner accents — technical detail */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent/40 rounded-tl-lg
          transition-all duration-300 group-hover:border-accent group-hover:-top-3 group-hover:-left-3" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-accent/40 rounded-tr-lg
          transition-all duration-300 group-hover:border-accent group-hover:-top-3 group-hover:-right-3" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent/40 rounded-bl-lg
          transition-all duration-300 group-hover:border-accent group-hover:-bottom-3 group-hover:-left-3" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent/40 rounded-br-lg
          transition-all duration-300 group-hover:border-accent group-hover:-bottom-3 group-hover:-right-3" />
      </div>
    </div>
  );
}

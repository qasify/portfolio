'use client';

import { useEffect, useState } from 'react';

const ROLES = [
  'Senior Frontend Engineer',
  'React & Next.js Specialist',
  'Scalable System Builder',
  'Performance Optimizer',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, displayed.length + 1));
      }, 60);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple/5 rounded-full blur-3xl animate-float [animation-delay:3s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
          bg-gradient-radial from-accent/3 via-transparent to-transparent rounded-full" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-glow bg-accent/5
          text-sm text-accent mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse-glow" />
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary mb-4 animate-fade-in-up
          [animation-delay:200ms] leading-tight">
          Muhammad{' '}
          <span className="bg-gradient-to-r from-accent via-accent-light to-emerald bg-clip-text text-transparent">
            Qasim
          </span>
        </h1>

        {/* Typing role */}
        <div className="h-10 flex items-center justify-center mb-6 animate-fade-in-up [animation-delay:400ms]">
          <span className="text-xl md:text-2xl text-text-secondary font-mono">
            {displayed}
            <span className="inline-block w-0.5 h-6 bg-accent ml-0.5 animate-blink align-middle" />
          </span>
        </div>

        {/* Tagline */}
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up
          [animation-delay:600ms] leading-relaxed">
          Building scalable frontend systems that serve millions.
          Not just pages — platforms that perform.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:800ms]">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
              bg-gradient-to-r from-accent to-emerald text-bg-primary font-semibold
              hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            View Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
              border border-border-glow text-text-primary font-semibold
              hover:bg-accent/5 hover:border-accent/40 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

      </div>

      {/* Scroll indicator — outside content div, pinned to section bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in [animation-delay:1200ms]">
        <div className="w-6 h-10 rounded-full border-2 border-text-dim flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 rounded-full bg-accent animate-[slide-up_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}

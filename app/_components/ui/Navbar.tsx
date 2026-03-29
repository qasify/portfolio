'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useMode } from './ModeContext';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const order: Array<'system' | 'light' | 'dark'> = ['system', 'light', 'dark'];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  };

  const label = theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark';

  return (
    <button
      onClick={cycle}
      className="relative p-2 rounded-lg text-text-secondary hover:text-accent
        hover:bg-accent/5 transition-colors group"
      aria-label={`Theme: ${label}. Click to switch.`}
      title={`Theme: ${label}`}
    >
      {/* Sun icon */}
      <svg
        className={`w-[18px] h-[18px] transition-all duration-300 absolute inset-0 m-auto
          ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>

      {/* Moon icon */}
      <svg
        className={`w-[18px] h-[18px] transition-all duration-300 absolute inset-0 m-auto
          ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>

      {/* System icon (monitor) */}
      <svg
        className={`w-[18px] h-[18px] transition-all duration-300
          ${theme === 'system' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    </button>
  );
}


function ModeToggle() {
  const { mode, setMode } = useMode();
  return (
    <button
      onClick={() => setMode(mode === 'recruiter' ? 'engineer' : 'recruiter')}
      className="relative flex items-center h-8 w-24 rounded-full bg-bg-secondary p-1 border border-border-subtle overflow-hidden"
      aria-label="Toggle persona mode"
    >
      <div
        className={`absolute inset-y-1 left-1 w-[42px] border rounded-full transition-all duration-300 shadow-sm
        ${mode === 'engineer' ? 'translate-x-[46px] bg-accent border-accent shadow-accent/20' : 'translate-x-0 bg-bg-card border-border-glow'}`}
      />
      <div
        className={`relative flex-1 flex justify-center z-10 text-[10px] font-mono tracking-wide transition-colors duration-300 ${mode === 'recruiter' ? 'text-text-primary font-medium' : 'text-text-muted'}`}
        title="Recruiter Mode: Clean, metric-focused portfolio"
      >
        REC
      </div>
      <div
        className={`relative flex-1 flex justify-center z-10 text-[10px] font-mono tracking-wide transition-colors duration-300 ${mode === 'engineer' ? 'text-bg-primary font-bold' : 'text-text-primary'}`}
        title="Engineer Mode: Technical X-Ray blueprint overlay"
      >
        ENG
      </div>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-black/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-emerald flex items-center justify-center
              text-bg-primary font-bold text-sm group-hover:shadow-lg group-hover:shadow-accent/20 transition-shadow">
              Q
            </div>
            <span className="font-semibold text-text-primary hidden sm:block">
              Qasim<span className="text-accent">.dev</span>
            </span>
          </a>

          {/* Desktop links + theme toggle */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-text-secondary hover:text-accent transition-colors
                  rounded-lg hover:bg-accent/5"
              >
                {link.label}
              </a>
            ))}
            {/* Optional Mode Toggle */}
            <div className="hidden lg:flex ml-2 pl-4 border-l border-border-subtle items-center gap-2">
              <ModeToggle />
              <div className="hidden xl:flex items-center gap-2 ml-2 px-2 py-1 bg-bg-secondary rounded border border-border-subtle text-[10px] font-mono text-text-muted cursor-default" title="Command Palette">
                <span className="text-[14px]">⌘</span>K
              </div>
            </div>

            <div className="ml-2 pl-2 border-l border-border-subtle">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: mode/theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle navigation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-text-secondary hover:text-accent
                  hover:bg-accent/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

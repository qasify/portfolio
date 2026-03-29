'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolved: 'light' | 'dark';
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  resolved: 'dark',
  setTheme: () => { },
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem('theme') as Theme | null;
  if (saved && ['light', 'dark', 'system'].includes(saved)) return saved;
  return 'system';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolved, setResolved] = useState<'light' | 'dark'>('dark');

  // Mount + load saved theme (single effect to avoid double render)
  useEffect(() => {
    const saved = getInitialTheme();
    setThemeState(saved);
    setMounted(true);
  }, []);

  // Resolve actual theme and apply class
  useEffect(() => {
    if (!mounted) return;

    const actual = theme === 'system' ? getSystemTheme() : theme;
    setResolved(actual);

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(actual);
  }, [theme, mounted]);

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const actual = mq.matches ? 'dark' : 'light';
      setResolved(actual);
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(actual);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme, mounted]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Inline script to apply theme class BEFORE React hydration.
 * Put this in layout.tsx inside <head> to prevent flash.
 */
export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('theme');var s=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';var r=t==='light'?'light':t==='dark'?'dark':s;document.documentElement.classList.add(r)}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

type InteractionMode = 'recruiter' | 'engineer';

interface ModeContextValue {
  mode: InteractionMode;
  setMode: (m: InteractionMode) => void;
}

const ModeContext = createContext<ModeContextValue>({
  mode: 'recruiter',
  setMode: () => {},
});

export const useMode = () => useContext(ModeContext);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<InteractionMode>('recruiter');
  const [isAnimating, setIsAnimating] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // When engineer mode is active, add tracking class to html root
    // This allows pure-CSS architectural overlays that override utilities
    const root = document.documentElement;
    if (mode === 'engineer') {
      root.classList.add('engineer-mode');
    } else {
      root.classList.remove('engineer-mode');
    }

    // Skip the sweep animation on initial page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Trigger sweep animation
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {isAnimating && <div className="scan-wipe-element" />}
      {children}
    </ModeContext.Provider>
  );
}

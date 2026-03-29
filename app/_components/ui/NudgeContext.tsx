'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

interface NudgeContextValue {
  activeNudge: string | null;
  triggerNudge: (nudgeText: string, timeoutMs?: number) => void;
  clearNudge: () => void;
}

const NudgeContext = createContext<NudgeContextValue>({
  activeNudge: null,
  triggerNudge: () => {},
  clearNudge: () => {},
});

export const useNudge = () => useContext(NudgeContext);

export function NudgeProvider({ children }: { children: ReactNode }) {
  const [activeNudge, setActiveNudge] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track seen nudges so we don't spam the user
  const seenNudges = useRef<Set<string>>(new Set());

  const triggerNudge = (nudgeText: string, timeoutMs: number = 8000) => {
    if (seenNudges.current.has(nudgeText)) return;
    
    seenNudges.current.add(nudgeText);
    setActiveNudge(nudgeText);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Auto-hide nudge after a few seconds
    timeoutRef.current = setTimeout(() => {
      setActiveNudge(null);
    }, timeoutMs);
  };

  const clearNudge = () => {
    setActiveNudge(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <NudgeContext.Provider value={{ activeNudge, triggerNudge, clearNudge }}>
      {children}
    </NudgeContext.Provider>
  );
}

// Hook to drop into sections that triggers a nudge after dwelling
export function useSectionNudge(nudgeText: string, dwellTimeMs: number = 5000) {
  const { triggerNudge } = useNudge();
  const ref = useRef<HTMLElement | null>(null);
  const dwellTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start dwell timer
          dwellTimeoutRef.current = setTimeout(() => {
            triggerNudge(nudgeText);
          }, dwellTimeMs);
        } else {
          // Cancel if they leave before dwell time is up
          if (dwellTimeoutRef.current) clearTimeout(dwellTimeoutRef.current);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (dwellTimeoutRef.current) clearTimeout(dwellTimeoutRef.current);
    };
  }, [nudgeText, triggerNudge, dwellTimeMs]);

  return ref;
}

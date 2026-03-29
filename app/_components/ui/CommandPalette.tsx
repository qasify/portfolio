'use client';

import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { useMode } from './ModeContext';
import { useTheme } from './ThemeProvider';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useMode();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    command();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm z-[100]"
        onClick={() => setOpen(false)}
      />
      
      {/* Palette */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] z-[101] animate-scale-in">
        <Command
          className="bg-bg-card border border-border-glow rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm"
          loop
        >
          <div className="flex items-center px-4 border-b border-border-subtle text-accent">
            <span className="mr-2">~</span>
            <Command.Input 
              autoFocus
              className="flex-1 bg-transparent py-4 outline-none placeholder:text-text-dim text-text-primary"
              placeholder="Type a command or search..." 
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-accent/20">
            <Command.Empty className="py-6 text-center text-text-dim">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-text-muted text-xs p-1">
              <Command.Item
                onSelect={() => runCommand(() => window.location.hash = '#about')}
                className="flex items-center px-3 py-2 mt-1 rounded-md text-text-secondary aria-selected:bg-accent/10 aria-selected:text-accent cursor-pointer transition-colors"
              >
                cd ~/about
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.location.hash = '#experience')}
                className="flex items-center px-3 py-2 rounded-md text-text-secondary aria-selected:bg-accent/10 aria-selected:text-accent cursor-pointer transition-colors"
              >
                cd ~/experience
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.location.hash = '#projects')}
                className="flex items-center px-3 py-2 rounded-md text-text-secondary aria-selected:bg-accent/10 aria-selected:text-accent cursor-pointer transition-colors"
              >
                cd ~/projects
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Preferences" className="text-text-muted text-xs p-1 mt-2 border-t border-border-subtle pt-3">
              <Command.Item
                onSelect={() => runCommand(() => setMode(mode === 'recruiter' ? 'engineer' : 'recruiter'))}
                className="flex items-center px-3 py-2 mt-1 rounded-md text-text-secondary aria-selected:bg-accent/10 aria-selected:text-accent cursor-pointer transition-colors"
              >
                toggle --mode={mode === 'recruiter' ? 'engineer' : 'recruiter'}
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
                className="flex items-center px-3 py-2 rounded-md text-text-secondary aria-selected:bg-accent/10 aria-selected:text-accent cursor-pointer transition-colors"
              >
                toggle --theme={theme === 'dark' ? 'light' : 'dark'}
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions" className="text-text-muted text-xs p-1 mt-2 border-t border-border-subtle pt-3">
              <Command.Item
                onSelect={() => runCommand(() => window.open('https://wa.me/923017705367?text=Hi%20Qasim%2C%20I%20saw%20your%20portfolio...', '_blank'))}
                className="flex items-center px-3 py-2 mt-1 rounded-md text-emerald aria-selected:bg-emerald/10 cursor-pointer transition-colors"
              >
                ./execute hire_qasim.sh <span className="ml-auto text-text-dim text-xs">WhatsApp</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.open('mailto:qasimwork0@gmail.com', '_blank'))}
                className="flex items-center px-3 py-2 rounded-md text-text-secondary aria-selected:bg-accent/10 aria-selected:text-accent cursor-pointer transition-colors"
              >
                mailto qasimwork0@gmail.com
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </>
  );
}

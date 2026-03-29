'use client';

import { useState, type KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState('');

  function handleSend() {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue('');
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-end gap-2 p-3 border-t border-border-subtle bg-bg-primary/50">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={disabled ? 'Thinking...' : 'Ask about experience, projects, skills...'}
        rows={1}
        className="flex-1 resize-none bg-bg-secondary border border-border-subtle rounded-xl px-4 py-2.5
          text-sm text-text-primary placeholder:text-text-dim outline-none
          focus:border-accent/40 transition-colors disabled:opacity-50
          max-h-24 overflow-y-auto"
        id="chat-input"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-r from-accent to-emerald
          flex items-center justify-center text-bg-primary
          hover:shadow-lg hover:shadow-accent/20 transition-all
          disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
        aria-label="Send message"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  );
}

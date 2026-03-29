'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { ChatMessage as ChatMessageType, ChatResponse } from '@/types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useNudge } from '../ui/NudgeContext';

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  content: "I'm Qasim. I've indexed my project history and technical stack here so you can skip the resume-reading. What can I clarify about my work or impact?",
  timestamp: Date.now(),
};

const SUGGESTIONS = [
  'What are you working on right now?',
  'Show me your top Next.js projects',
  'How do you handle front-end architecture?',
  'Why are you the right fit for my team?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Proactive Nudge State
  const { activeNudge, clearNudge } = useNudge();

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, dynamicSuggestions]);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.filter((m) => m.id !== 'welcome'),
        }),
      });

      const data: ChatResponse = await res.json();

      const assistantMsg: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.error
          ? `Sorry, something went wrong: ${data.error}`
          : data.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Set dynamic suggestions from API response
      if (data.suggestions && data.suggestions.length > 0) {
        setDynamicSuggestions(data.suggestions);
      } else {
        setDynamicSuggestions([]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'Connection error. Please try again.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Active Nudge Bubble */}
      {!isOpen && activeNudge && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsOpen(true);
            sendMessage(activeNudge);
            clearNudge();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(true);
              sendMessage(activeNudge);
              clearNudge();
            }
          }}
          className="mb-4 relative animate-fade-in-up bg-bg-card border border-border-glow 
            px-4 py-3 rounded-2xl rounded-br-sm shadow-xl shadow-accent/10 max-w-[280px]
            text-sm text-text-primary text-left hover:border-accent/40 transition-colors group cursor-pointer"
        >
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 shrink-0 rounded bg-gradient-to-br from-accent to-emerald flex items-center justify-center text-bg-primary text-[10px] font-bold mt-0.5">
              Q
            </div>
            <div>
              <p className="text-text-secondary text-xs font-mono mb-1">Incoming Message...</p>
              <p className="leading-snug">{activeNudge}</p>
              <p className="text-accent text-[10px] font-mono mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to ask</p>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); clearNudge(); }}
            className="absolute top-2 right-2 text-text-muted hover:text-text-primary"
            aria-label="Dismiss"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) clearNudge(); }}
        className={`w-14 h-14 rounded-full
          bg-gradient-to-r from-accent to-emerald text-bg-primary
          flex items-center justify-center shadow-lg shadow-accent/25
          hover:shadow-xl hover:shadow-accent/30 hover:scale-105
          transition-all duration-300 ${isOpen ? 'rotate-0' : 'animate-pulse-glow'}`}
        aria-label={isOpen ? 'Close chat' : 'Open AI assistant'}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-2rem)]
          h-[520px] max-h-[60vh] rounded-2xl
          bg-bg-primary/95 backdrop-blur-xl border border-border-subtle
          shadow-2xl shadow-black/40 flex flex-col overflow-hidden
          animate-scale-in origin-bottom-right"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle bg-bg-secondary/50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-emerald
              flex items-center justify-center text-bg-primary font-bold text-xs">
              Q
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-text-primary text-sm font-semibold">QasimAI</h3>
              <p className="text-text-dim text-[11px] font-mono">Powered by Gemini • Portfolio Assistant</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald" />
              <span className="text-[10px] font-mono text-emerald">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Suggestion chips — show initial suggestions OR dynamic ones from API */}
            {!loading && (() => {
              const chips = messages.length === 1 ? SUGGESTIONS : dynamicSuggestions;
              if (chips.length === 0) return null;
              return (
                <div className="flex flex-wrap gap-2 mt-3 animate-fade-in">
                  {chips.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 text-xs font-mono rounded-lg
                        border border-border-glow bg-accent/5 text-accent
                        hover:bg-accent/10 hover:border-accent/30 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              );
            })()}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-bg-secondary border border-border-subtle rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
      )}
    </div>
  );
}

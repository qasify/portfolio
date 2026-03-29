'use client';

import type { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div
        className={`
          max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
          ${isUser
            ? 'bg-gradient-to-r from-accent to-accent-light text-bg-primary rounded-br-md'
            : 'bg-bg-secondary border border-border-subtle text-text-primary rounded-bl-md'
          }
        `}
      >
        {!isUser && (
          <span className="text-[10px] font-mono text-accent block mb-1 uppercase tracking-wider">
            QasimAI
          </span>
        )}
        <div className="whitespace-pre-wrap [&_strong]:font-semibold [&_strong]:text-accent-light
          [&_code]:bg-black/20 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono">
          {renderContent(message.content)}
        </div>
      </div>
    </div>
  );
}

function renderContent(text: string): React.ReactNode {
  // Simple markdown: bold and inline code
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

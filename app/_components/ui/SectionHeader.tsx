'use client';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ label, title, description, align = 'center' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      <span className="text-accent font-mono text-sm tracking-widest uppercase">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-emerald rounded-full mt-1" />
    </div>
  );
}

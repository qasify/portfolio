interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'accent' | 'emerald' | 'purple' | 'amber';
}

const VARIANT_CLASSES: Record<string, string> = {
  default: 'bg-bg-secondary text-text-secondary border-border-subtle hover:text-accent hover:border-border-glow',
  accent: 'bg-accent/10 text-accent border-accent/20',
  emerald: 'bg-emerald/10 text-emerald border-emerald/20',
  purple: 'bg-purple/10 text-purple border-purple/20',
  amber: 'bg-amber/10 text-amber border-amber/20',
};

export default function TechBadge({ name, variant = 'default' }: TechBadgeProps) {
  return (
    <span
      className={`
        inline-flex px-2.5 py-1 text-xs font-mono rounded-md border
        transition-colors duration-200 ${VARIANT_CLASSES[variant]}
      `}
    >
      {name}
    </span>
  );
}

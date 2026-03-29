'use client';

import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import ScrollReveal from '../ui/ScrollReveal';
import { getWorkExperience, formatDateRange } from '@/data/resume';
import { useSectionNudge } from '../ui/NudgeContext';

export default function Experience() {
  const work = getWorkExperience();

  // Proactive Nudge
  const expRef = useSectionNudge("I led the frontend architecture for the Seeker Hiring Hub, increasing conversion by 70%. Want to know the tech stack?", 8000);

  return (
    <section id="experience" ref={expRef as any} className="py-24 px-4 sm:px-6 bg-bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label="Career"
            title="Work Experience"
            description="From intern to senior engineer — a career built on shipping real systems."
          />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border-glow to-transparent
            md:-translate-x-px" />

          {work.map((role, index) => {
            const isLeft = index % 2 === 0;
            const isCurrent = !role.endDate;
            const dateRange = formatDateRange(role.startDate, role.endDate);

            return (
              <div
                key={`${role.company}-${role.startDate}`}
                className={`relative mb-12 md:mb-16 pl-8 md:pl-0 ${
                  isLeft ? 'md:pr-[52%]' : 'md:pl-[52%]'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-6 w-3 h-3 rounded-full border-2 border-accent bg-bg-primary
                  left-0 md:left-1/2 md:-translate-x-1.5 z-10 ${isCurrent ? 'animate-pulse-glow' : ''}`} />

              <ScrollReveal direction={isLeft ? 'left' : 'right'} delay={index * 100}>
                <GlassCard>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {role.position}
                      </h3>
                      <p className="text-accent text-sm font-medium">
                        {role.company}
                        {role.website && (
                          <a
                            href={role.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-accent ml-1.5 transition-colors"
                          >
                            ↗
                          </a>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono
                          text-emerald border border-emerald/20 bg-emerald/5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                          Current
                        </span>
                      )}
                      <span className="text-xs font-mono text-text-muted">{dateRange}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <p className="text-xs font-mono text-text-dim mb-4">📍 {role.location}</p>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {role.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
                        <span className="text-accent mt-1 shrink-0">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

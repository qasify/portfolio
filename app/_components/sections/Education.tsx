'use client';

import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import ScrollReveal from '../ui/ScrollReveal';
import { getEducation, formatDateRange } from '@/data/resume';

export default function Education() {
  const education = getEducation();

  return (
    <section id="education" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label="Background"
            title="Education"
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((entry, index) => {
            const dateRange = formatDateRange(entry.startDate, entry.endDate);

            return (
              <ScrollReveal delay={index * 150} key={entry.institution} className="h-full">
                <GlassCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-purple/15
                    flex items-center justify-center shrink-0 border border-accent/10">
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-text-primary font-semibold text-base leading-tight">
                        {entry.studyType} in {entry.area}
                      </h3>
                      <p className="text-accent text-sm mt-0.5">{entry.institution}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-mono text-text-dim">📍 {entry.location}</span>
                        <span className="text-xs font-mono text-text-dim">{dateRange}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

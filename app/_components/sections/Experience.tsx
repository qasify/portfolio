'use client';

import { useState, useCallback } from 'react';

import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import ScrollReveal from '../ui/ScrollReveal';
import { getWorkExperience, formatDateRange, getSectionHeader, getNudge } from '@/data/resume';
import { useSectionNudge } from '../ui/NudgeContext';

export default function Experience() {
  const work = getWorkExperience();
  const header = getSectionHeader('experience');
  const nudgeMessage = getNudge('experience');

  // Proactive Nudge
  const expRef = useSectionNudge(nudgeMessage, 8000);

  // Geo restriction popup state
  const [geoPopup, setGeoPopup] = useState<{ message: string; url: string } | null>(null);

  const handleVisitSite = useCallback((url: string, geoRestriction?: { message: string; regions: string[] } | null) => {
    if (geoRestriction) {
      setGeoPopup({ message: geoRestriction.message, url });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <section id="experience" ref={expRef as any} className="py-24 px-4 sm:px-6 bg-bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label={header.label}
            title={header.title}
            description={header.description}
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
                className={`relative mb-12 md:mb-16 pl-8 md:pl-0 ${isLeft ? 'md:pr-[52%]' : 'md:pl-[52%]'
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
                            <button
                              type="button"
                              onClick={() => handleVisitSite(role.website!, role.geoRestriction)}
                              className="text-text-muted hover:text-accent ml-1.5 transition-colors cursor-pointer"
                            >
                              ↗
                            </button>
                          )}
                        </p>
                      </div>
                      <div className="flex sm:flex-col-reverse justify-between sm:justify-center items-center sm:items-end gap-1.5 shrink-0 mt-1">
                        <span className="text-xs font-mono text-text-muted">{dateRange}</span>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono
                          text-emerald border border-emerald/20 bg-emerald/5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                            Current
                          </span>
                        )}
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

        {/* Geo Restriction Popup */}
        {geoPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setGeoPopup(null)}>
            <div className="bg-bg-card border border-border-glow rounded-2xl p-6 max-w-sm mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-text-primary font-semibold">Region Restricted</h3>
              </div>
              <p className="text-text-secondary text-sm mb-5 leading-relaxed">{geoPopup.message}</p>
              <div className="flex gap-3">
                <button onClick={() => setGeoPopup(null)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border-subtle text-text-muted text-sm
                    hover:bg-bg-secondary transition-colors">Cancel</button>
                <a href={geoPopup.url} target="_blank" rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 rounded-lg bg-accent text-bg-primary text-sm font-medium text-center
                    hover:bg-accent-light transition-colors"
                  onClick={() => setGeoPopup(null)}>Visit Anyway</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import { getCertifications } from '@/data/resume';

export default function Certifications() {
  const certifications = getCertifications();

  // Don't render section if no certifications yet
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          description="Validated expertise across domains."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <GlassCard key={cert.title}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-emerald/15
                  flex items-center justify-center shrink-0 border border-accent/10">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-text-primary font-semibold text-base leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-accent text-sm mt-0.5">{cert.issuer}</p>
                  <div className="flex items-center gap-3 mt-2">
                    {cert.category && (
                      <span className="text-xs font-mono text-text-dim px-2 py-0.5 rounded-md
                        bg-bg-secondary border border-border-subtle">
                        {cert.category}
                      </span>
                    )}
                    {cert.date && (
                      <span className="text-xs font-mono text-text-dim">{cert.date}</span>
                    )}
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline mt-2 inline-block"
                    >
                      View Certificate ↗
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

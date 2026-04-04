'use client';

import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import { getBasics, getSectionHeader, getContactContent } from '@/data/resume';

export default function Contact() {
  const basics = getBasics();
  const header = getSectionHeader('contact');
  const contactData = getContactContent();

  // Format phone for WhatsApp — strip spaces and '+' for the wa.me link
  const waNumber = basics.phone.replace(/[\s+\-()]/g, '');
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(contactData.whatsappMessage)}`;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 bg-bg-secondary/30">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeader
            label={header.label}
            title={header.title}
            description={header.description}
          />
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {/* Email */}
            <a
              href={`mailto:${basics.email}`}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-border-subtle
                bg-bg-card hover:border-border-glow hover:bg-bg-card-hover transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center
                group-hover:bg-accent/20 transition-colors">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-text-dim text-xs font-mono">Email</p>
                <p className="text-text-primary text-sm font-medium">{basics.email}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-border-subtle
                bg-bg-card hover:border-border-glow hover:bg-bg-card-hover transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center
                group-hover:bg-emerald/20 transition-colors">
                {/* WhatsApp icon */}
                <svg className="w-5 h-5 text-emerald" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-text-dim text-xs font-mono">WhatsApp</p>
                <p className="text-text-primary text-sm font-medium">{basics.phone}</p>
              </div>
            </a>

            {/* LinkedIn */}
            {basics.linkedin && (
              <a
                href={basics.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-border-subtle
                  bg-bg-card hover:border-border-glow hover:bg-bg-card-hover transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0077b5]/10 flex items-center justify-center
                  group-hover:bg-[#0077b5]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#0077b5]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-text-dim text-xs font-mono">LinkedIn</p>
                  <p className="text-text-primary text-sm font-medium">Muhammad Qasim</p>
                </div>
              </a>
            )}

            {/* GitHub */}
            {basics.github && (
              <a
                href={basics.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-border-subtle
                  bg-bg-card hover:border-border-glow hover:bg-bg-card-hover transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-text-primary/10 flex items-center justify-center
                  group-hover:bg-text-primary/20 transition-colors">
                  <svg className="w-5 h-5 text-text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.08.38-1.96 1-2.66-.1-.25-.44-1.26.1-2.62 0 0 .81-.26 2.67 1a9.23 9.23 0 0 1 4.86 0c1.86-1.26 2.67-1 2.67-1 .54 1.36.2 2.37.1 2.62.62.7 1 1.58 1 2.66 0 3.82-2.34 4.66-4.57 4.9.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-text-dim text-xs font-mono">GitHub</p>
                  <p className="text-text-primary text-sm font-medium">@qasify</p>
                </div>
              </a>
            )}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={300}>
          <div className="inline-flex flex-col items-center gap-2">
            <a
              href={`mailto:${basics.email}?subject=Let's%20work%20together`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                bg-gradient-to-r from-accent to-emerald text-bg-primary font-semibold text-lg
                hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start a Conversation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <p className="text-text-dim text-xs font-mono mt-2">
              Or open the AI assistant to learn more about me →
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

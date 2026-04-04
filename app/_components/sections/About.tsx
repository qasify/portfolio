'use client';

import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import ProfileImage from '../ui/ProfileImage';
import { getYearsOfExperience, getAbout, getSectionHeader } from '@/data/resume';

/** Parse simple markup tags in bio strings */
function renderBio(text: string) {
  // Replace <highlight>...</highlight> with accent span
  // Replace <stat>...</stat> with emerald span
  const parts = text.split(/(<highlight>.*?<\/highlight>|<stat>.*?<\/stat>)/g);
  return parts.map((part, i) => {
    const highlightMatch = part.match(/^<highlight>(.*)<\/highlight>$/);
    if (highlightMatch) {
      return <span key={i} className="text-accent font-medium">{highlightMatch[1]}</span>;
    }
    const statMatch = part.match(/^<stat>(.*)<\/stat>$/);
    if (statMatch) {
      return <span key={i} className="text-emerald font-medium">{statMatch[1]}</span>;
    }
    return part;
  });
}

export default function About() {
  const years = getYearsOfExperience();
  const about = getAbout();
  const header = getSectionHeader('about');

  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label={header.label}
            title={header.title}
            description={header.description}
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left: Text + Stats */}
          <div className="space-y-10">
            <ScrollReveal direction="left">
              <div className="space-y-5 text-text-secondary leading-relaxed">
                {about.bio.map((paragraph, i) => (
                  <p key={i}>{renderBio(paragraph)}</p>
                ))}
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal direction="left" delay={200}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border-subtle bg-bg-card p-5 text-center
                    hover:border-border-glow transition-colors">
                    <AnimatedCounter
                      end={stat.dynamic === 'yearsOfExperience' ? years : stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      staticText={stat.static}
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Profile Image */}
          <ScrollReveal direction="right" delay={300}>
            <div className="flex justify-center lg:justify-end">
              <ProfileImage />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

'use client';

import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import ProfileImage from '../ui/ProfileImage';
import { getYearsOfExperience } from '@/data/resume';

export default function About() {
  const years = getYearsOfExperience();

  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label="Introduction"
            title="About Me"
            description="I design and build scalable frontend systems using React and Next.js, with a focus on performance and maintainability."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left: Text + Stats */}
          <div className="space-y-10">
            <ScrollReveal direction="left">
              <div className="space-y-5 text-text-secondary leading-relaxed">
                <p>
                  I am a Senior Frontend Engineer currently building large-scale microfrontend architectures
                  at <span className="text-accent font-medium">Care.com</span> — serving millions of users
                  across the platform.
                </p>
                <p>
                  My work focuses on systems that make a measurable difference: optimizing search from seconds
                  to sub-second performance, driving a <span className="text-emerald font-medium">70% increase
                  in hiring conversions</span>, and shipping AI-assisted features that improve the user experience.
                </p>
                <p>
                  Beyond writing code, I contribute to architectural decisions, mentor engineers, and run
                  A/B tests to validate every decision with data — not assumptions.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal direction="left" delay={200}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-border-subtle bg-bg-card p-5 text-center
                  hover:border-border-glow transition-colors">
                  <AnimatedCounter end={years} suffix="+" label="Years Exp" />
                </div>
                <div className="rounded-xl border border-border-subtle bg-bg-card p-5 text-center
                  hover:border-border-glow transition-colors">
                  <AnimatedCounter end={6} suffix="+" label="Projects" />
                </div>
                <div className="rounded-xl border border-border-subtle bg-bg-card p-5 text-center
                  hover:border-border-glow transition-colors">
                  <AnimatedCounter end={70} suffix="%" label="Conv ↑" />
                </div>
                <div className="rounded-xl border border-border-subtle bg-bg-card p-5 text-center
                  hover:border-border-glow transition-colors">
                  <AnimatedCounter end={30} suffix="+" label="Tech" />
                </div>
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

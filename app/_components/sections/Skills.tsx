'use client';

import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import { getSkills } from '@/data/resume';
import PhysicsSkills from '../ui/PhysicsSkills';

const LEVEL_PERCENT: Record<string, number> = {
  Advanced: 90,
  Intermediate: 70,
  Beginner: 45,
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  Frontend: 'from-accent to-accent-light',
  Backend: 'from-emerald to-accent',
  'Databases and Caching': 'from-purple to-accent',
  'DevOps and Tooling': 'from-amber to-accent',
  'Testing and Analytics': 'from-rose to-accent',
};

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: '🎨',
  Backend: '⚙️',
  'Databases and Caching': '🗄️',
  'DevOps and Tooling': '🔧',
  'Testing and Analytics': '📊',
};

export default function Skills() {
  const skills = getSkills();
  
  // Flatten keywords for the physics engine
  const allSkillKeywords = skills.flatMap(s => s.keywords || []).map(k => ({ name: k, level: 1 }));

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 bg-bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label="Capabilities"
            title="Technical Skills"
            description="Not buzzwords — daily tools used across production systems serving millions."
          />
        </ScrollReveal>

        {/* Physics Engine Interactive Skills Cloud */}
        <ScrollReveal delay={100}>
          <div className="mb-12 mt-6">
            <PhysicsSkills skills={allSkillKeywords} />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((category, index) => {
            const gradient = CATEGORY_GRADIENTS[category.name] || 'from-accent to-emerald';
            const icon = CATEGORY_ICONS[category.name] || '💡';
            const percent = LEVEL_PERCENT[category.level] || 70;

            return (
              <ScrollReveal delay={index * 100} key={category.name}>
                <div
                  className="rounded-xl border border-border-subtle bg-bg-card p-5
                  hover:border-border-glow hover:bg-bg-card-hover transition-all duration-300 group"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{icon}</span>
                      <h3 className="text-text-primary font-semibold text-sm">{category.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider
                    px-2 py-0.5 rounded-full border border-border-subtle">
                      {category.level}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-bg-secondary mb-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${gradient}
                      transition-all duration-1000 ease-out group-hover:shadow-sm
                      group-hover:shadow-accent/20`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 text-[11px] font-mono rounded-md
                        bg-bg-secondary text-text-muted border border-border-subtle
                        group-hover:text-text-secondary transition-colors"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

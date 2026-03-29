'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import TechBadge from '../ui/TechBadge';
import ScrollReveal from '../ui/ScrollReveal';
import ProjectModal from './ProjectModal';
import GeoPopup from './GeoPopup';
import { getProjects, getProjectFilterTags } from '@/data/resume';
import { useSectionNudge } from '../ui/NudgeContext';
import type { CVProject } from '@/data/resume';

export default function Projects() {
  const projects = getProjects();
  const filterTags = getProjectFilterTags();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<CVProject | null>(null);
  const [geoPopup, setGeoPopup] = useState<{ message: string; url: string } | null>(null);

  // Proactive Nudge for the entire Projects section
  const projectsRef = useSectionNudge("I noticed you're looking at my projects. Want a quick summary of my biggest technical achievement?", 6000);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) =>
      p.filterTags?.some((t) => t === activeFilter)
    );
  }, [projects, activeFilter]);

  const handleVisitSite = useCallback((project: CVProject) => {
    if (!project.url) return;

    // Check geo restriction
    if (project.geoRestriction) {
      setGeoPopup({
        message: project.geoRestriction.message,
        url: project.url,
      });
    } else {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <section id="projects" ref={projectsRef as any} className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label="Portfolio"
            title="Featured Projects"
            description="Each project solves a different class of problem — from enterprise platforms to real-time systems."
          />
        </ScrollReveal>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 text-sm font-mono rounded-lg border transition-all duration-200
              ${activeFilter === 'all'
                ? 'bg-accent/15 text-accent border-accent/30'
                : 'bg-transparent text-text-muted border-border-subtle hover:text-text-secondary hover:border-border-glow'
              }`}
          >
            All
          </button>
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-1.5 text-sm font-mono rounded-lg border transition-all duration-200
                ${activeFilter === tag
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'bg-transparent text-text-muted border-border-subtle hover:text-text-secondary hover:border-border-glow'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const keywords = project.keywords.filter((k): k is string => k !== null);

            return (
              <div
                key={project.name}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer group"
              >
                <GlassCard className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-emerald/20
                      flex items-center justify-center shrink-0 border border-accent/10
                      group-hover:from-accent/30 group-hover:to-emerald/30 transition-all">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-text-primary font-semibold text-base leading-tight
                        group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                    </div>
                    {/* External link indicator */}
                    {project.url && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVisitSite(project);
                        }}
                        className="shrink-0 w-8 h-8 rounded-lg border border-border-subtle
                          flex items-center justify-center text-text-dim
                          hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all"
                        aria-label={`Visit ${project.name}`}
                        title="Visit live site"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Bottom row: tech tags + view details hint */}
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {keywords.slice(0, 4).map((keyword) => (
                        <TechBadge key={keyword} name={keyword} />
                      ))}
                      {keywords.length > 4 && (
                        <span className="px-2 py-1 text-[11px] font-mono text-text-dim">
                          +{keywords.length - 4}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-text-dim group-hover:text-accent
                      transition-colors shrink-0">
                      View details →
                    </span>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onVisitSite={handleVisitSite}
      />

      {/* Geo Restriction Popup */}
      {geoPopup && (
        <GeoPopup
          isOpen={!!geoPopup}
          onClose={() => setGeoPopup(null)}
          message={geoPopup.message}
          url={geoPopup.url}
        />
      )}
    </section>
  );
}

'use client';

import type { CVProject } from '@/data/resume';
import Modal from '../ui/Modal';
import TechBadge from '../ui/TechBadge';

interface ProjectModalProps {
  project: CVProject | null;
  isOpen: boolean;
  onClose: () => void;
  onVisitSite: (project: CVProject) => void;
}

export default function ProjectModal({ project, isOpen, onClose, onVisitSite }: ProjectModalProps) {
  if (!project) return null;

  const keywords = project.keywords.filter((k): k is string => k !== null);
  const hasMedia =
    (project.media?.screenshots?.length ?? 0) > 0 ||
    (project.media?.recordings?.length ?? 0) > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-emerald/20
            flex items-center justify-center shrink-0 border border-accent/10">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="text-text-primary font-bold text-xl leading-tight">
              {project.name}
            </h2>
            <p className="text-text-muted text-sm mt-1">{project.description}</p>
          </div>
        </div>

        {/* Extended details */}
        {project.details && (
          <div className="mb-6">
            <h3 className="text-text-primary font-semibold text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-accent" />
              About This Project
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {project.details}
            </p>
          </div>
        )}

        {/* Media gallery */}
        {hasMedia && (
          <div className="mb-6">
            <h3 className="text-text-primary font-semibold text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-emerald" />
              Media
            </h3>

            {/* Screenshots */}
            {(project.media?.screenshots?.length ?? 0) > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-3">
                {project.media!.screenshots.map((src, i) => (
                  <div key={i} className="rounded-lg border border-border-subtle overflow-hidden
                    hover:border-border-glow transition-colors cursor-pointer">
                    <img
                      src={src}
                      alt={`${project.name} screenshot ${i + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Recordings */}
            {(project.media?.recordings?.length ?? 0) > 0 && (
              <div className="space-y-3">
                {project.media!.recordings.map((src, i) => (
                  <div key={i} className="rounded-lg border border-border-subtle overflow-hidden">
                    <video
                      src={src}
                      controls
                      className="w-full"
                      preload="metadata"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* If no media yet, show placeholder */}
        {!hasMedia && (
          <div className="mb-6 rounded-xl border border-dashed border-border-subtle
            bg-bg-secondary/30 p-6 text-center">
            <svg className="w-8 h-8 text-text-dim mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="text-text-dim text-xs font-mono">Screenshots & recordings coming soon</p>
          </div>
        )}

        {/* Tech stack */}
        <div className="mb-6">
          <h3 className="text-text-primary font-semibold text-sm mb-2 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-purple" />
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <TechBadge key={keyword} name={keyword} variant="accent" />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        {project.url && (
          <div className="pt-4 border-t border-border-subtle">
            <button
              onClick={() => onVisitSite(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-accent to-emerald text-bg-primary font-semibold text-sm
                hover:shadow-lg hover:shadow-accent/25 transition-all hover:-translate-y-0.5"
            >
              Visit Live Site
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

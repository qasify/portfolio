// =============================================================================
// CV Data — Typed access to resume.json
// =============================================================================

import resumeData from '@/resume.json';

// Types
export interface CVBasics {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
}

export interface CVWork {
  company: string;
  location: string;
  position: string;
  website: string | null;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

export interface CVSkillCategory {
  name: string;
  level: string;
  keywords: string[];
}

export interface CVGeoRestriction {
  message: string;
  regions: string[];
}

export interface CVProjectMedia {
  screenshots: string[];
  recordings: string[];
}

export interface CVProject {
  name: string;
  description: string;
  url: string | null;
  keywords: (string | null)[];
  filterTags?: string[];
  geoRestriction?: CVGeoRestriction | null;
  media?: CVProjectMedia;
  details?: string;
}

export interface CVAward {
  title: string;
  date: string | null;
  awarder: string;
  summary: string;
}

export interface CVEducation {
  institution: string;
  location: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa: string | null;
}

export interface CVCertification {
  title: string;
  issuer: string;
  date: string | null;
  url: string | null;
  category: string;
}

interface CVData {
  basics: CVBasics;
  work: CVWork[];
  skills: CVSkillCategory[];
  projects: CVProject[];
  awards: CVAward[];
  education: CVEducation[];
  certifications: CVCertification[];
}

const cv = resumeData as unknown as CVData;

export function getBasics(): CVBasics { return cv.basics; }
export function getWorkExperience(): CVWork[] { return cv.work; }
export function getProjects(): CVProject[] { return cv.projects; }
export function getSkills(): CVSkillCategory[] { return cv.skills; }
export function getEducation(): CVEducation[] { return cv.education; }
export function getAwards(): CVAward[] { return cv.awards; }
export function getCertifications(): CVCertification[] { return cv.certifications || []; }

export function formatDateRange(start: string, end: string | null): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return end ? `${fmt(start)} — ${fmt(end)}` : `${fmt(start)} — Present`;
}

export function getYearsOfExperience(): number {
  const earliest = cv.work.reduce((min, w) => {
    const d = new Date(w.startDate).getTime();
    return d < min ? d : min;
  }, Date.now());
  return Math.floor((Date.now() - earliest) / (365.25 * 24 * 60 * 60 * 1000));
}

/** Get all unique filter tags from projects */
export function getProjectFilterTags(): string[] {
  const all = cv.projects.flatMap((p) => p.filterTags || []);
  return [...new Set(all)];
}

/** Full CV as a string for Gemini context */
export function getCVAsText(): string {
  return JSON.stringify(resumeData, null, 2);
}

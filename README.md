# Muhammad Qasim | Interactive Developer Portfolio

🚀 **[Live Deployment: muhammadqasim-portfolio.vercel.app](https://muhammadqasim-portfolio.vercel.app/)**

An immersive, highly interactive portfolio engineered to demonstrate systems-thinking and frontend mastery. Built with a focus on polished UI, dynamic interactivity, and non-linear exploration.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Custom Theme Variables, CSS Animations)
- **Physics Engine**: Matter.js
- **Icons**: Lucide React

## ✨ Key Features

### Dual-Persona Architecture
The portfolio features two distinct modes, triggered via the global navigation toggle, to tailor the experience to different audiences:
- **Recruiter Mode**: A sleek, polished, and metric-focused presentation highlighting business impact and high-level progression.
- **Engineer Mode**: A technical "X-Ray Blueprint" overlay. Turning this on strips away the polish, revealing the underlying DOM bounding boxes, React component tags (`<Section />`), and replaces the OS cursor with a custom hardware reticle tracking real-time X/Y DOM coordinates. It even includes a CRT-style scanner sweep animation upon toggling.

### Interactive Physics Sandboxes
Standard grid lists are replaced with interactive physics environments. The **Skills Cloud** uses `matter-js` to render technologies as physical entities that react to gravity and mouse dragging, providing a satisfying, tactile interaction model.

### Proactive AI Context Nudges
Integrated custom hooks (`useSectionNudge`) utilizing `IntersectionObserver` to track user dwell time on specific sections (like Experience or Projects). If a user spends time evaluating a complex section, a non-intrusive AI chat bubble proactively appears, offering deeper context or technical explanations relevant to that exact section.

### Developer Tooling
- **Command Palette**: Hit `Cmd + K` to open a spotlight-style command palette, allowing rapid keyboard navigation across the entire portfolio, simulating an IDE command center.
- **Theme Toggle**: Full system-aware Light/Dark mode transitions with seamless icon morphing.

## 📦 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📐 Architecture Notes

- Content logic is heavily abstracted to `data/resume.ts`, acting as a central JSON-like store for all portfolio content. Update this singular file to instantly propagate changes across all UI components globally.
- Global styles and animations (`@keyframes`, `engineer-mode`) are strictly modularized in `globals.css` using modern CSS variables for high-performance GPU compositing.

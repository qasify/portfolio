import Hero from './_components/sections/Hero';
import About from './_components/sections/About';
import Experience from './_components/sections/Experience';
import Projects from './_components/sections/Projects';
import Skills from './_components/sections/Skills';
import Education from './_components/sections/Education';
import Certifications from './_components/sections/Certifications';
import Contact from './_components/sections/Contact';
import ChatWidget from './_components/chat/ChatWidget';
import Navbar from './_components/ui/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border-subtle text-center">
        <p className="text-text-dim text-sm font-mono">
          © {new Date().getFullYear()} Muhammad Qasim. All rights reserved.
        </p>
      </footer>

      {/* AI Chatbot */}
      <ChatWidget />
    </>
  );
}

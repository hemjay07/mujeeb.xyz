'use client';

import { useRef } from 'react';
import { Project, getNextProject } from '@/data/projects';

interface CaseStudyViewProps {
  project: Project;
  isVisible: boolean;
  onClose: () => void;
}

export default function CaseStudyView({ project, isVisible, onClose }: CaseStudyViewProps) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const nextProject = getNextProject(project.id);
  const projectIndex = ['predictkit', 'truthbounty', 'foresight', 'idealme', 'signalhive', 'veilpass', 'x402arcade', 'bountynet'].indexOf(project.id) + 1;

  const handleScrollIndicatorClick = () => {
    contentWrapperRef.current?.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Case Study UI - Hero overlay */}
      <div
        className={`case-ui fixed inset-0 pointer-events-none transition-opacity duration-400 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
      >
        {/* Back button - terminal style */}
        <button
          onClick={onClose}
          className="fixed top-9 left-12 font-mono text-xs tracking-wider cursor-pointer flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors pointer-events-auto"
        >
          <span>←</span> cd ..
        </button>

        {/* Project number - large */}
        <div className="fixed left-20 top-1/2 -translate-y-1/2">
          <div className="font-mono text-8xl font-bold text-cyan-400/20">
            {String(projectIndex).padStart(2, '0')}
          </div>
          <h1 className="font-display text-6xl font-bold text-white -mt-4">
            {project.title}
          </h1>

          {/* Build time - prominent */}
          <div className="mt-6 flex items-center gap-4">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              build_time:
            </span>
            <span className="font-mono text-2xl font-bold text-cyan-400">
              {project.buildTime === 'TBD' ? '---' : project.buildTime}
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={handleScrollIndicatorClick}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto group"
        >
          <span className="font-mono text-xs text-zinc-500 group-hover:text-cyan-400 transition-colors">
            scroll
          </span>
          <div className="w-px h-8 bg-zinc-700 group-hover:bg-cyan-400 transition-colors" />
        </button>
      </div>

      {/* Scrollable content */}
      <div
        ref={contentWrapperRef}
        className={`case-content-wrapper fixed inset-0 overflow-y-auto transition-opacity duration-400 ${
          isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Hero spacer */}
        <div className="h-screen" />

        {/* Content section - dark themed */}
        <div className="bg-[#0f0f14] text-zinc-200 px-20 py-24 min-h-screen border-t border-zinc-800">
          <div className="max-w-[1000px] mx-auto">
            {/* Content grid */}
            <div className="grid grid-cols-[1.6fr_1fr] gap-16">
              {/* Left column - Main content */}
              <div>
                <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4">
                  # about
                </div>
                <h2 className="font-display text-3xl font-bold leading-tight mb-8 text-white">
                  {project.heading}
                </h2>
                <p className="text-base leading-relaxed text-zinc-400 mb-8">
                  {project.summary}
                </p>

                {/* Challenge & Solution - terminal style */}
                <div className="mt-12 space-y-8">
                  <div className="p-6 border border-zinc-800 rounded">
                    <div className="font-mono text-xs text-amber-400 mb-3">
                      {'>'} challenge
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {project.challenge}
                    </p>
                  </div>
                  <div className="p-6 border border-zinc-800 rounded">
                    <div className="font-mono text-xs text-green-400 mb-3">
                      {'>'} solution
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Links */}
                <div className="mt-12 flex gap-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-cta"
                    >
                      live_demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-cta"
                    >
                      source_code ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right column - Meta info */}
              <div className="border-l border-zinc-800 pl-12">
                <div className="space-y-8">
                  {/* Role */}
                  <div>
                    <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider mb-2">
                      role
                    </div>
                    <div className="text-sm text-zinc-300">{project.role}</div>
                  </div>

                  {/* Category */}
                  <div>
                    <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider mb-2">
                      category
                    </div>
                    <div className="text-sm text-zinc-300">{project.category}</div>
                  </div>

                  {/* Year */}
                  <div>
                    <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider mb-2">
                      year
                    </div>
                    <div className="text-sm text-zinc-300">{project.year}</div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider mb-3">
                      stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshots section */}
            <div className="mt-24">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-8">
                # screenshots
              </div>

              <div className="space-y-8">
                <div className="screenshot-container aspect-video w-full bg-zinc-900">
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-sm">
                    [screenshot_01.png]
                  </div>
                </div>

                <div className="screenshot-container aspect-video w-full bg-zinc-900">
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-sm">
                    [screenshot_02.png]
                  </div>
                </div>
              </div>
            </div>

            {/* Next project navigation */}
            <div className="mt-32 pt-12 border-t border-zinc-800">
              <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider mb-4">
                next_project
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                <h3 className="font-display text-3xl font-bold text-zinc-400 group-hover:text-white transition-colors">
                  {nextProject.title}
                </h3>
                <span className="text-2xl text-zinc-600 group-hover:text-cyan-400 transition-colors">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer/Contact - terminal style */}
        <div className="bg-[#0a0a0f] text-white px-20 py-20 border-t border-zinc-800">
          <div className="max-w-[1000px] mx-auto">
            <div className="font-mono text-xs text-zinc-600 mb-6">
              {'>'} contact
            </div>
            <h2 className="font-display text-4xl font-bold mb-8">
              Let's build something<span className="text-cyan-400 blink">_</span>
            </h2>
            <div className="flex gap-8 mb-12">
              <a
                href="https://twitter.com/mujeeb"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                twitter
              </a>
              <a
                href="https://github.com/mujeeb"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                github
              </a>
              <a
                href="mailto:hello@mujeeb.dev"
                className="font-mono text-sm text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                email
              </a>
            </div>
            <p className="font-mono text-xs text-zinc-700">
              © 2026 mujeeb.dev — vibe_engineer
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

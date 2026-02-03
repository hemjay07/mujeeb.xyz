'use client';

import Link from 'next/link';
import { Project } from '@/data/projects';

interface GalleryUIProps {
  project: Project;
  currentIndex: number;
  totalProjects: number;
  isVisible: boolean;
  onOpenCaseStudy: () => void;
  onDotClick: (index: number) => void;
}

export default function GalleryUI({
  project,
  currentIndex,
  totalProjects,
  isVisible,
  onOpenCaseStudy,
  onDotClick,
}: GalleryUIProps) {
  const projectNumber = String((currentIndex ?? 0) + 1).padStart(2, '0');
  const totalNumber = String(totalProjects || 7).padStart(2, '0');

  return (
    <>
      {/* Main gallery UI - left side */}
      <div
        className={`gallery-ui fixed top-0 left-0 w-[45%] h-full p-12 flex flex-col justify-center pointer-events-none ${
          !isVisible ? 'fade-out' : ''
        }`}
      >
        {/* Nav logo - terminal style with velocity stat */}
        <div className="absolute top-9 left-12">
          <div className="flex items-center gap-3">
            <div className="status-dot" />
            <span className="font-mono text-xs text-zinc-500 tracking-wider">
              mujeeb.xyz
            </span>
          </div>
          <div className="mt-1.5 ml-5 font-mono text-xs text-zinc-600 tracking-wide">
            13 projects · 3 months
          </div>
        </div>

        {/* Project counter */}
        <div className="font-mono text-6xl font-bold mb-6 pointer-events-auto">
          <span className="text-accent">{projectNumber}</span>
          <span className="text-zinc-600 text-2xl mx-2">/</span>
          <span className="text-zinc-600 text-2xl">{totalNumber}</span>
        </div>

        {/* Project title - cleaner, modern */}
        <h1 className="font-display text-5xl font-bold mb-4 leading-tight tracking-tight text-white pointer-events-auto">
          {project.title}
        </h1>

        {/* Category tag */}
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-6">
          {project.category}
        </div>

        {/* Project tagline */}
        <p className="text-base leading-relaxed text-zinc-400 max-w-[400px] mb-8 pointer-events-auto">
          {project.tagline}
        </p>

        {/* Terminal-style CTA */}
        <button
          onClick={onOpenCaseStudy}
          className="terminal-cta pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded"
        >
          view_project<span className="blink">_</span>
        </button>

        {/* Stats bar at bottom */}
        <div className="absolute bottom-12 left-12 stats-bar">
          <div>
            stack: <span>{project.techStack.slice(0, 3).join(', ')}</span>
          </div>
          <div>
            year: <span>{project.year}</span>
          </div>
        </div>
      </div>

      {/* Navigation indicators - right side, vertical bars instead of dots */}
      <div
        className={`nav-indicators fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 ${
          !isVisible ? 'fade-out' : ''
        }`}
      >
        {Array.from({ length: totalProjects }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={`w-1 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm ${
              i === currentIndex
                ? 'h-8 bg-accent'
                : 'h-4 bg-zinc-700 hover:bg-zinc-500'
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* About button - top right (hidden on mobile, GalleryCarousel has its own) */}
      <Link
        href="/about"
        className={`hidden md:block fixed top-9 right-12 font-mono text-xs tracking-wider uppercase cursor-pointer transition-colors duration-300 z-[500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded px-2 py-1 ${
          isVisible ? 'text-zinc-500 hover:text-accent' : 'text-zinc-700'
        }`}
      >
        /about
      </Link>
    </>
  );
}

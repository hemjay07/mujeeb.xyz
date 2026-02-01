'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Project, getNextProject } from '@/data/projects';

interface CaseStudyViewProps {
  project: Project;
  isVisible: boolean;
  onClose: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export default function CaseStudyView({
  project,
  isVisible,
  onClose,
  onNavigateToProject
}: CaseStudyViewProps) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProject = getNextProject(project.id);
  const projectIndex = ['predictkit', 'truthbounty', 'foresight', 'idealme', 'signalhive', 'veilpass', 'payshield', 'mantlecred'].indexOf(project.id) + 1;

  // Reset scroll position when project changes
  useEffect(() => {
    if (isVisible && contentWrapperRef.current) {
      contentWrapperRef.current.scrollTop = 0;
      setHeroOpacity(1);
      setScrollProgress(0);
      setScreenshotIndex(0);
      setImagesLoaded({});
    }
  }, [isVisible, project.id]);

  // Auto-rotate carousel every 4 seconds
  const displayedScreenshots = project.screenshots.slice(1, 4);
  useEffect(() => {
    if (!isVisible || displayedScreenshots.length <= 1) return;

    const interval = setInterval(() => {
      setScreenshotIndex((prev) => (prev + 1) % displayedScreenshots.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, displayedScreenshots.length]);

  // Handle scroll for hero fade effect and progress
  const handleScroll = useCallback(() => {
    if (!contentWrapperRef.current) return;
    const scrollTop = contentWrapperRef.current.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = contentWrapperRef.current.scrollHeight - windowHeight;

    const opacity = Math.max(0, 1 - scrollTop / (windowHeight * 0.5));
    setHeroOpacity(opacity);
    setScrollProgress(scrollTop / scrollHeight);
  }, []);

  useEffect(() => {
    const wrapper = contentWrapperRef.current;
    if (wrapper && isVisible) {
      wrapper.addEventListener('scroll', handleScroll);
      return () => wrapper.removeEventListener('scroll', handleScroll);
    }
  }, [isVisible, handleScroll]);

  // Progressive reveal with Intersection Observer
  useEffect(() => {
    if (!isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
      reveals.forEach((el) => observer.observe(el));
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isVisible, project.id]);

  const handleScrollIndicatorClick = () => {
    contentWrapperRef.current?.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleNextProject = () => {
    if (onNavigateToProject && !isTransitioning) {
      // Start transition animation
      setIsTransitioning(true);

      // After fade out, navigate to new project
      setTimeout(() => {
        onNavigateToProject(nextProject.id);
        // Scroll to top
        if (contentWrapperRef.current) {
          contentWrapperRef.current.scrollTop = 0;
        }
        // Reset transition state after navigation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 400);
    }
  };

  const handleImageLoad = (key: string) => {
    setImagesLoaded(prev => ({ ...prev, [key]: true }));
  };

  // Mobile screenshots for phone showcase
  const mobileScreenshots = project.mobileScreenshots || [];
  const displayedFeatures = (project.features || []).slice(0, 3);
  const displayedTechs = (project.technicalHighlights || []).slice(0, 3);
  const displayedAchievements = (project.achievements || []).slice(0, 2);

  // Extract stats from project
  const stats = [
    { label: 'Timeline', value: project.buildTime, highlight: true },
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role },
  ];

  return (
    <>
      {/* Fixed Hero UI Layer */}
      <div
        className={`case-ui fixed inset-0 pointer-events-none transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 25, transitionDelay: isVisible ? '0.3s' : '0s' }}
      >
        {/* Back button */}
        <button
          onClick={onClose}
          className="fixed top-10 left-12 md:left-16 font-mono text-sm tracking-wider cursor-pointer flex items-center gap-2 text-zinc-500 hover:text-white transition-colors pointer-events-auto group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>cd</span>
          <span className="text-accent">..</span>
        </button>

        {/* Scroll progress bar */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-900 pointer-events-none">
          <div
            className="h-full bg-accent transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Project info - bottom left */}
        <div
          className="fixed left-12 md:left-16 bottom-32 pointer-events-none max-w-lg transition-all duration-500"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${(1 - heroOpacity) * 20}px)`
          }}
        >
          <div className="font-mono text-sm text-zinc-600 mb-8">
            <span className="text-accent font-semibold text-2xl">{String(projectIndex).padStart(2, '0')}</span>
            <span className="text-zinc-700 mx-2">/</span>
            <span className="text-zinc-700">08</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            {project.title}
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-md">
            {project.tagline}
          </p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={handleScrollIndicatorClick}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer pointer-events-auto group transition-all duration-500"
          style={{
            opacity: heroOpacity,
            transform: `translateX(-50%) translateY(${(1 - heroOpacity) * 20}px)`
          }}
        >
          <span className="font-mono text-xs text-zinc-600 group-hover:text-accent transition-colors">
            scroll to explore
          </span>
          <div className="w-px h-16 bg-accent/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 animate-scroll-hint" />
          </div>
        </button>
      </div>

      {/* Transition Overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 15, 0.95) 100%)`,
            animation: 'fadeIn 0.4s ease-out forwards',
          }}
        />
      )}

      {/* Scrollable Content */}
      <div
        ref={contentWrapperRef}
        className={`case-content-wrapper fixed inset-0 overflow-y-auto overflow-x-hidden transition-all duration-400 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${isTransitioning ? 'opacity-0 translate-y-[-30px]' : ''}`}
        style={{ zIndex: 22, transitionDelay: isVisible && !isTransitioning ? '0.3s' : '0s', backgroundColor: 'transparent' }}
      >
        {/* Hero spacer */}
        <div className="h-screen" />

        {/* Main Content Area */}
        <div className={`bg-${project.id}-content relative w-full`}>
          {/* Gradient fade from hero */}
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#0a0a0f]/80 to-[#0a0a0f] -translate-y-full pointer-events-none" />

          {/* ============================================
              HERO IMAGE - Full Width Screenshot
              ============================================ */}
          {displayedScreenshots.length > 0 && (
            <section className="relative h-[60vh] md:h-[70vh] overflow-hidden border-b border-zinc-800">
              <div className="h-full relative">
                {/* Debug: show path if image fails */}
                <img
                  src={displayedScreenshots[screenshotIndex]}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    console.error('Image failed to load:', displayedScreenshots[screenshotIndex]);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              {/* Screenshot navigation dots */}
              {displayedScreenshots.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                  {displayedScreenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setScreenshotIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === screenshotIndex
                          ? 'bg-accent w-8'
                          : 'bg-white/50 hover:bg-white/80 w-2'
                      }`}
                      aria-label={`View screenshot ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ============================================
              OPENING - Concise Summary + Stats
              ============================================ */}
          <section className="relative py-24 md:py-32">
            <div className="max-w-5xl mx-auto px-8 md:px-16">
              <div className="reveal mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.2] mb-6">
                  {project.heading}
                </h2>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl">
                  {project.summary.split('.').slice(0, 2).join('.')}
                </p>
              </div>

              {/* Stats Row */}
              <div className="reveal reveal-delay-1 grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-zinc-800">
                {stats.map((stat, i) => (
                  <StatItem key={i} {...stat} delay={i * 0.1} />
                ))}
              </div>

              {/* Links */}
              <div className="reveal reveal-delay-2 flex flex-wrap gap-4 mt-12">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-5 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 rounded-lg transition-all"
                  >
                    <span className="font-mono text-xs text-accent">Live Demo</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-5 py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-all"
                  >
                    <span className="font-mono text-xs text-zinc-300">Code</span>
                    <span className="text-zinc-400 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* ============================================
              CHALLENGE & SOLUTION - Compact Cards
              ============================================ */}
          <section className="relative py-24 md:py-32">
            <div className="max-w-5xl mx-auto px-8 md:px-16">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Challenge */}
                <div className="reveal">
                  <div className="bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/20 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-sm font-bold">!</span>
                      <h3 className="font-mono text-xs text-amber-400 uppercase tracking-wider">Challenge</h3>
                    </div>
                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed line-clamp-3">
                      {project.challenge}
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="reveal">
                  <div className="bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm">✓</span>
                      <h3 className="font-mono text-xs text-emerald-400 uppercase tracking-wider">Solution</h3>
                    </div>
                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed line-clamp-3">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              FEATURES GALLERY - Screenshots + Descriptions
              ============================================ */}
          {displayedFeatures.length > 0 && (
            <section className="relative py-24 md:py-32">
              <div className="max-w-5xl mx-auto px-8 md:px-16">
                <div className="reveal mb-12">
                  <span className="font-mono text-xs text-accent uppercase tracking-[0.3em]">
                    Key Features
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mt-3">
                    What Makes It Work
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {displayedFeatures.map((feature, i) => (
                    <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                      <div className="h-full bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-6 hover:border-accent/20 transition-all group">
                        <div className="font-mono text-2xl text-accent/40 group-hover:text-accent/60 transition-colors mb-3">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <h4 className="font-medium text-base text-zinc-100 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ============================================
              MOBILE SHOWCASE - Phone Mockups
              ============================================ */}
          {mobileScreenshots.length > 0 && (
            <section className="relative py-24 md:py-32 overflow-hidden">
              <div className="max-w-6xl mx-auto px-8 md:px-16">
                <div className="reveal mb-12 text-center">
                  <span className="font-mono text-xs text-accent uppercase tracking-[0.3em]">
                    Mobile Experience
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mt-3">
                    Fully Responsive
                  </h2>
                </div>

                {/* Phone mockups grid */}
                <div className="reveal flex flex-wrap justify-center gap-6 md:gap-10">
                  {mobileScreenshots.map((screenshot, i) => (
                    <div
                      key={i}
                      className="relative group"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      {/* Phone frame */}
                      <div className="relative w-[200px] md:w-[240px] bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl shadow-black/50 border border-zinc-700/50 group-hover:border-accent/30 transition-all duration-300">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-b-2xl z-10" />
                        {/* Screen */}
                        <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-[9/19.5]">
                          <img
                            src={screenshot}
                            alt={`${project.title} mobile view ${i + 1}`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-600 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ============================================
              TECHNICAL HIGHLIGHTS - Terminal Style
              ============================================ */}
          {displayedTechs.length > 0 && (
            <section className="relative py-24 md:py-32">
              <div className="max-w-5xl mx-auto px-8 md:px-16">
                <div className="reveal mb-12">
                  <span className="font-mono text-xs text-accent uppercase tracking-[0.3em]">
                    Technical Highlights
                  </span>
                </div>

                <div className="reveal reveal-scale">
                  <div className="bg-[#0d0d12] border border-zinc-800 rounded-lg overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center gap-3 px-5 py-3 bg-[#12121a] border-b border-zinc-800">
                      <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500/70" />
                        <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                        <span className="w-2 h-2 rounded-full bg-green-500/70" />
                      </div>
                      <span className="font-mono text-xs text-zinc-600">tech-stack</span>
                    </div>

                    <div className="p-5 md:p-6 space-y-4">
                      {displayedTechs.map((highlight, i) => (
                        <div key={i} className="flex gap-3 items-start group">
                          <span className="font-mono text-xs text-accent/50 select-none mt-0.5 group-hover:text-accent transition-colors flex-shrink-0">→</span>
                          <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ============================================
              ACHIEVEMENTS - Compact Badges
              ============================================ */}
          {displayedAchievements.length > 0 && (
            <section className="relative py-24">
              <div className="max-w-5xl mx-auto px-8 md:px-16">
                <div className="reveal flex flex-wrap gap-3">
                  {displayedAchievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="reveal inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      <span className="text-accent text-sm">⭐</span>
                      <span className="text-xs md:text-sm text-zinc-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ============================================
              TECH STACK - Minimal Display
              ============================================ */}
          <section className="relative py-24">
            <div className="max-w-5xl mx-auto px-8 md:px-16">
              <div className="reveal">
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-wider block mb-4">
                  Built with
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 8).map((tech, i) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-md font-mono text-xs text-zinc-400 hover:border-accent/30 hover:text-accent transition-all"
                      style={{ transitionDelay: `${i * 0.03}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 8 && (
                    <span className="px-3 py-1.5 font-mono text-xs text-zinc-600">
                      +{project.techStack.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              NEXT PROJECT
              ============================================ */}
          <section className="relative py-32 md:py-40">
            <div className="max-w-5xl mx-auto px-8 md:px-16">
              <div className="reveal">
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-wider block mb-8">
                  Next Project
                </span>
                <button
                  onClick={handleNextProject}
                  className="w-full flex items-center justify-between group cursor-pointer py-6 border-t border-zinc-800 hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-sm text-zinc-600">
                      {String(['predictkit', 'truthbounty', 'foresight', 'idealme', 'signalhive', 'veilpass', 'payshield', 'mantlecred'].indexOf(nextProject.id) + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-zinc-700 group-hover:text-white transition-colors duration-300">
                      {nextProject.title}
                    </h3>
                  </div>
                  <span className="text-3xl text-zinc-700 group-hover:text-accent group-hover:translate-x-3 transition-all duration-300">
                    →
                  </span>
                </button>
                <p className="text-zinc-500 mt-3 text-sm md:text-base">
                  {nextProject.tagline}
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-zinc-800/50">
            <div className="max-w-5xl mx-auto px-8 md:px-16 py-16 md:py-20">
              <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                  <span className="font-mono text-xs text-zinc-600 uppercase tracking-wider block mb-4">
                    Let's Connect
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-zinc-100">
                    Build something<span className="text-accent blink">_</span>
                  </h2>
                </div>
                <div className="flex gap-6">
                  <FooterLink href="https://twitter.com/AyoOpadele">Twitter</FooterLink>
                  <FooterLink href="https://github.com/hemjay07">GitHub</FooterLink>
                  <FooterLink href="mailto:opabodemujeeb@gmail.com">Email</FooterLink>
                </div>
              </div>
              <p className="font-mono text-xs text-zinc-700 mt-12">
                © 2025 mujeeb.dev — Built with Next.js & Three.js
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

// ============================================
// Sub-components
// ============================================

function StatItem({
  label,
  value,
  highlight,
  delay = 0
}: {
  label: string;
  value: string;
  highlight?: boolean;
  delay?: number;
}) {
  return (
    <div className="text-center md:text-left">
      <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className={`text-2xl md:text-3xl font-bold ${highlight ? 'text-accent' : 'text-zinc-100'}`}>
        {value}
      </div>
    </div>
  );
}

function FeatureCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <div className="h-full bg-zinc-900/30 p-8 border border-zinc-800/50 rounded-xl hover:border-accent/20 transition-all group">
      <div className="flex items-start gap-5">
        <span className="font-mono text-3xl text-accent/30 font-bold group-hover:text-accent/60 transition-colors">
          {String(index).padStart(2, '0')}
        </span>
        <div>
          <h4 className="font-medium text-lg text-zinc-100 mb-3">
            {title}
          </h4>
          <p className="text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-sm text-zinc-500 hover:text-accent transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
    </a>
  );
}

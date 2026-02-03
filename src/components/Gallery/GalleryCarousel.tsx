'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/projects';

interface GalleryCarouselProps {
  projects: Project[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onOpenCaseStudy: () => void;
}

export default function GalleryCarousel({
  projects,
  currentIndex,
  onIndexChange,
  onOpenCaseStudy,
}: GalleryCarouselProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const currentProject = projects[currentIndex];

  // Minimum swipe distance to trigger navigation
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < projects.length - 1) {
      goToNext();
    } else if (isRightSwipe && currentIndex > 0) {
      goToPrev();
    }
  };

  const goToNext = useCallback(() => {
    if (isAnimating || currentIndex >= projects.length - 1) return;
    setIsAnimating(true);
    setSlideDirection('left');
    setTimeout(() => {
      onIndexChange(currentIndex + 1);
      setSlideDirection(null);
      setIsAnimating(false);
    }, 300);
  }, [currentIndex, isAnimating, onIndexChange, projects.length]);

  const goToPrev = useCallback(() => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setSlideDirection('right');
    setTimeout(() => {
      onIndexChange(currentIndex - 1);
      setSlideDirection(null);
      setIsAnimating(false);
    }, 300);
  }, [currentIndex, isAnimating, onIndexChange]);

  const goToProject = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setSlideDirection(index > currentIndex ? 'left' : 'right');
    setTimeout(() => {
      onIndexChange(index);
      setSlideDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Enter') onOpenCaseStudy();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, onOpenCaseStudy]);

  // Progress percentage
  const progress = ((currentIndex + 1) / projects.length) * 100;

  return (
    <div className="fixed inset-0 z-20 flex flex-col bg-[#0a0a0f]">
      {/* Minimal Header - 48px */}
      <header className="flex items-center justify-between px-4 h-12 z-30">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-xs text-zinc-500">mujeeb.xyz</span>
          </div>
          <div className="font-mono text-[11px] text-zinc-600 ml-3.5">
            13 projects · 3 months
          </div>
        </div>
        <Link href="/about" className="font-mono text-xs text-zinc-500 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 rounded px-2 py-1">
          /about
        </Link>
      </header>

      {/* Full-Bleed Image Area - ~80% of viewport */}
      <div
        className="flex-1 relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onOpenCaseStudy}
      >
        {/* Main Image */}
        <div
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            slideDirection === 'left' ? '-translate-x-full opacity-0' :
            slideDirection === 'right' ? 'translate-x-full opacity-0' :
            'translate-x-0 opacity-100'
          }`}
        >
          <Image
            src={currentProject.mobileScreenshots?.[0] || currentProject.screenshots[0] || currentProject.heroImage}
            alt={currentProject.title}
            fill
            className="object-cover object-top"
            priority={currentIndex === 0}
            sizes="100vw"
          />

          {/* Gradient overlay for bottom content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
        </div>

        {/* Swipe hint overlay - only shows briefly */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-8 text-white/20">
            {currentIndex > 0 && <span className="text-2xl">‹</span>}
            <span className="font-mono text-xs">tap to view</span>
            {currentIndex < projects.length - 1 && <span className="text-2xl">›</span>}
          </div>
        </div>
      </div>

      {/* Progress Bar + Counter - 32px */}
      <div className="h-8 px-4 flex items-center gap-3">
        {/* Progress bar */}
        <div className="flex-1 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Counter */}
        <span className="font-mono text-xs text-zinc-500">
          <span className="text-accent font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="mx-1">/</span>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </span>
      </div>

      {/* Bottom Sheet - Project Info ~90px */}
      <div className="bg-[#0a0a0f] border-t border-zinc-800/50 px-4 py-3">
        {/* Category */}
        <div className="font-mono text-xs text-accent/70 uppercase tracking-wider mb-1">
          {currentProject.category}
        </div>

        {/* Title */}
        <h2 className="font-display text-lg font-bold text-white leading-tight mb-1">
          {currentProject.title}
        </h2>

        {/* Tagline */}
        <p className="text-xs text-zinc-400 line-clamp-1 mb-3">
          {currentProject.tagline}
        </p>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenCaseStudy();
          }}
          className="w-full py-3 bg-accent/10 border border-accent/30 rounded-lg font-mono text-xs text-accent hover:bg-accent/20 transition-all flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          <span>view_project</span>
          <span>→</span>
        </button>
      </div>

      {/* Dot Navigation - 44px touch targets for accessibility */}
      <div className="flex justify-center items-center gap-0 py-2 pb-4">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goToProject(i)}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full"
            aria-label={`Go to project ${i + 1}`}
          >
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-6 bg-accent' : 'w-1.5 bg-zinc-700'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}

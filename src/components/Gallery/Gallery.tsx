'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { featuredProjects } from '@/data/projects';
import { useThreeGallery, GalleryControls } from '@/hooks/useThreeGallery';
import { useIsMobile } from '@/hooks/useIsMobile';
import GalleryUI from './GalleryUI';
import GalleryCarousel from './GalleryCarousel';
import ArchiveSection from './ArchiveSection';
import CaseStudyView from '../CaseStudy/CaseStudyView';
import { AnimationConfig, defaultConfig } from '../Debug/AnimationControls';

export default function Gallery() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { isMobile, isHydrated } = useIsMobile();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [showCaseUI, setShowCaseUI] = useState(false);
  const [showGalleryUI, setShowGalleryUI] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [config] = useState<AnimationConfig>(defaultConfig);
  const galleryControlsRef = useRef<GalleryControls | null>(null);

  // Use featured projects for main gallery
  const currentProject = featuredProjects[currentIndex];

  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleCaseStudyOpen = useCallback(() => {
    // Prevent double-triggering during transition
    if (isTransitioning) return;

    // Start transition - this triggers:
    // 1. Canvas fades out (via .transitioning class)
    // 2. Gallery background fades out (via .fade-out class)
    // 3. Hero background fades in (via .fade-in class)
    // 4. Reveal curtain expands
    setIsTransitioning(true);
    setShowGalleryUI(false);
    setIsCaseStudyOpen(true); // This triggers background class changes

    // After transition completes (700ms), show case study UI
    setTimeout(() => {
      setShowCaseUI(true);
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning]);

  const galleryControls = useThreeGallery({
    projects: featuredProjects,
    containerRef: canvasContainerRef,
    onIndexChange: handleIndexChange,
    onCaseStudyOpen: handleCaseStudyOpen,
    isCaseStudyOpen,
    config,
  });

  useEffect(() => {
    galleryControlsRef.current = galleryControls;
  }, [galleryControls]);

  const handleCloseCaseStudy = useCallback(() => {
    // Prevent double-triggering during transition
    if (isTransitioning) return;

    // Start transition back to gallery
    setIsTransitioning(true);
    setShowCaseUI(false);
    setIsCaseStudyOpen(false); // This triggers background class changes

    // Only call Three.js close on desktop
    if (!isMobile) {
      galleryControls.closeCaseStudy();
    }

    // After transition completes (700ms), show gallery UI
    setTimeout(() => {
      setShowGalleryUI(true);
      setIsTransitioning(false);
    }, 700);
  }, [galleryControls, isTransitioning, isMobile]);

  const handleDotClick = useCallback((index: number) => {
    galleryControls.goToProject(index);
  }, [galleryControls]);

  const handleOpenCaseStudy = useCallback(() => {
    galleryControls.openCaseStudy();
  }, [galleryControls]);

  const handleNavigateToProject = useCallback((projectId: string) => {
    const featuredIndex = featuredProjects.findIndex(p => p.id === projectId);
    if (featuredIndex !== -1) {
      // On desktop, swap visible card in Three.js
      if (!isMobile && galleryControlsRef.current) {
        galleryControlsRef.current.goToProjectInCaseStudy(featuredIndex);
      }
      setCurrentIndex(featuredIndex);
      // Scroll to top when navigating to new project
      window.scrollTo(0, 0);
    }
  }, [isMobile]);


  // Theme class for dynamic accent colors
  const themeClass = `theme-${currentProject.id}`;

  // Project-specific background classes for dual-layer system
  const galleryBgClass = `bg-${currentProject.id}-gallery`;
  const heroBgClass = `bg-${currentProject.id}-hero`;

  return (
    <div className={`${themeClass} theme-transition`}>
      {/* DUAL BACKGROUND SYSTEM:
          Both backgrounds are always rendered, we toggle opacity to transition smoothly.
          This avoids the flash caused by class-swapping complex CSS gradients. */}

      {/* Gallery Background - fades out when case study opens */}
      <div
        className={`bg-gallery ${galleryBgClass} hero-vignette ${
          isCaseStudyOpen ? 'fade-out' : ''
        }`}
      />

      {/* Hero Background - fades in when case study opens */}
      <div
        className={`bg-hero ${heroBgClass} ${
          isCaseStudyOpen ? 'fade-in' : ''
        }`}
      />

      {/* Three.js canvas container - always rendered, hidden on mobile via CSS */}
      <div
        ref={canvasContainerRef}
        id="canvas-container"
        className={isMobile ? 'hidden' : ''}
      />

      {/* Reveal curtain for transitions - dark themed */}
      <div
        className={`reveal-curtain ${isCaseStudyOpen ? 'expanding' : ''}`}
        style={{ backgroundColor: '#0f0f14' }}
      />

      {/* Desktop Gallery UI - only on home page */}
      {isHomePage && (
        <GalleryUI
          project={currentProject}
          currentIndex={currentIndex}
          totalProjects={featuredProjects.length}
          isVisible={showGalleryUI && !isMobile}
          onOpenCaseStudy={handleOpenCaseStudy}
          onDotClick={handleDotClick}
        />
      )}

      {/* Mobile: Carousel Gallery - only on home page */}
      {isHomePage && isHydrated && isMobile && !isCaseStudyOpen && (
        <GalleryCarousel
          projects={featuredProjects}
          currentIndex={currentIndex}
          onIndexChange={handleIndexChange}
          onOpenCaseStudy={handleCaseStudyOpen}
        />
      )}

      {/* Case Study View (works on both platforms) - only on home page */}
      {isHomePage && (
        <CaseStudyView
          project={currentProject}
          isVisible={showCaseUI}
          onClose={handleCloseCaseStudy}
          onNavigateToProject={handleNavigateToProject}
        />
      )}

      {/* Archive Section - only on home page, not in case study */}
      {isHomePage && !isCaseStudyOpen && (
        <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
          <ArchiveSection />
        </div>
      )}
    </div>
  );
}

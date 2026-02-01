'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { projects } from '@/data/projects';
import { useThreeGallery, GalleryControls } from '@/hooks/useThreeGallery';
import GalleryUI from './GalleryUI';
import CaseStudyView from '../CaseStudy/CaseStudyView';
import { AnimationConfig, defaultConfig } from '../Debug/AnimationControls';

export default function Gallery() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [showCaseUI, setShowCaseUI] = useState(false);
  const [showGalleryUI, setShowGalleryUI] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [config] = useState<AnimationConfig>(defaultConfig);
  const galleryControlsRef = useRef<GalleryControls | null>(null);

  const currentProject = projects[currentIndex];

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
    projects,
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
    galleryControls.closeCaseStudy();

    // After transition completes (700ms), show gallery UI
    setTimeout(() => {
      setShowGalleryUI(true);
      setIsTransitioning(false);
    }, 700);
  }, [galleryControls, isTransitioning]);

  const handleDotClick = useCallback((index: number) => {
    galleryControls.goToProject(index);
  }, [galleryControls]);

  const handleOpenCaseStudy = useCallback(() => {
    galleryControls.openCaseStudy();
  }, [galleryControls]);

  const handleNavigateToProject = useCallback((projectId: string) => {
    const newIndex = projects.findIndex(p => p.id === projectId);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
      // Scroll to top when navigating to new project
      window.scrollTo(0, 0);
    }
  }, []);


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

      {/* Three.js canvas container - stays visible, card animates */}
      <div
        ref={canvasContainerRef}
        id="canvas-container"
      />

      {/* Reveal curtain for transitions - dark themed */}
      <div
        className={`reveal-curtain ${isCaseStudyOpen ? 'expanding' : ''}`}
        style={{ backgroundColor: '#0f0f14' }}
      />

      {/* Gallery UI */}
      <GalleryUI
        project={currentProject}
        currentIndex={currentIndex}
        totalProjects={projects.length}
        isVisible={showGalleryUI}
        onOpenCaseStudy={handleOpenCaseStudy}
        onDotClick={handleDotClick}
      />

      {/* Case Study View */}
      <CaseStudyView
        project={currentProject}
        isVisible={showCaseUI}
        onClose={handleCloseCaseStudy}
        onNavigateToProject={handleNavigateToProject}
      />
    </div>
  );
}

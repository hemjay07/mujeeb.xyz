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
  const [config] = useState<AnimationConfig>(defaultConfig);
  const galleryControlsRef = useRef<GalleryControls | null>(null);

  const currentProject = projects[currentIndex];

  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleCaseStudyOpen = useCallback(() => {
    setShowGalleryUI(false);
    setTimeout(() => {
      setIsCaseStudyOpen(true);
      setShowCaseUI(true);
    }, 700);
  }, []);

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
    setShowCaseUI(false);
    setIsCaseStudyOpen(false);
    galleryControls.closeCaseStudy();

    setTimeout(() => {
      setShowGalleryUI(true);
    }, 700);
  }, [galleryControls]);

  const handleDotClick = useCallback((index: number) => {
    galleryControls.goToProject(index);
  }, [galleryControls]);

  const handleOpenCaseStudy = useCallback(() => {
    galleryControls.openCaseStudy();
  }, [galleryControls]);


  // Dark background with subtle color tint from project
  const bgColor = `color-mix(in srgb, ${currentProject.color} 15%, #0a0a0f 85%)`;

  return (
    <>
      {/* Background layer - dark with subtle project color tint */}
      <div
        className="bg-layer grid-bg"
        style={{ backgroundColor: bgColor }}
      />

      {/* Three.js canvas container */}
      <div ref={canvasContainerRef} id="canvas-container" />

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
      />

    </>
  );
}

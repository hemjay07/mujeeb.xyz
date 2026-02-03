'use client';

import { useState, useEffect, useRef } from 'react';
import { featuredProjects } from '@/data/projects';

interface PreloaderProps {
  onComplete: () => void;
}

// Minimum display time so visitors can read the content
const MIN_DISPLAY_TIME = 2000;

// Priority images (gallery hero images)
const PRIORITY_IMAGES = featuredProjects.map(p => p.heroImage);

// Secondary images (loaded in background after preloader)
const SECONDARY_IMAGES = featuredProjects.flatMap(p => [
  ...p.screenshots.slice(1),
  ...(p.mobileScreenshots || []),
]);

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'fadeout'>('loading');
  const [showCursor, setShowCursor] = useState(true);
  const startTimeRef = useRef(Date.now());
  const hasCalledComplete = useRef(false);

  const totalImages = PRIORITY_IMAGES.length;
  const progress = Math.round((loadedCount / totalImages) * 100);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Preload images - runs once on mount
  useEffect(() => {
    let mounted = true;
    let loaded = 0;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = img.onerror = () => {
          if (mounted) {
            loaded++;
            setLoadedCount(loaded);
          }
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(PRIORITY_IMAGES.map(preloadImage)).then(() => {
      if (!mounted) return;

      // Calculate remaining time to meet minimum display
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsed);

      // Wait for minimum time, then show "ready"
      setTimeout(() => {
        if (mounted) setPhase('ready');
      }, remainingTime);
    });

    return () => { mounted = false; };
  }, []); // Empty deps - only run once

  // Handle phase transitions
  useEffect(() => {
    if (phase === 'ready') {
      // Show "ready" for 600ms, then start fade
      const timer = setTimeout(() => setPhase('fadeout'), 600);
      return () => clearTimeout(timer);
    }

    if (phase === 'fadeout') {
      // After fade animation (400ms), complete
      const timer = setTimeout(() => {
        if (!hasCalledComplete.current) {
          hasCalledComplete.current = true;
          onComplete();
          // Load secondary images in background
          SECONDARY_IMAGES.forEach(src => { new Image().src = src; });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const getProgressBar = (pct: number) => {
    const filled = Math.min(20, Math.floor(pct / 5));
    return '█'.repeat(filled) + '░'.repeat(20 - filled);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center transition-opacity duration-400 ${
        phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.04) 0%, transparent 50%)',
        }}
      />

      <div className="relative font-mono">
        {/* Domain */}
        <div className="text-2xl mb-6">
          <span className="text-cyan-400 font-semibold">mujeeb</span>
          <span className="text-zinc-600">.xyz</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-zinc-500">loading</span>
          <span className="text-cyan-400/70 tracking-tighter">{getProgressBar(progress)}</span>
          <span className="text-zinc-400 w-12 text-right">{loadedCount}/{totalImages}</span>
        </div>

        {/* Ready state */}
        <div
          className={`mt-8 flex items-center transition-all duration-300 ${
            phase !== 'loading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span className="text-cyan-400 text-lg">{'>'}</span>
          <span className="text-white text-lg font-medium ml-2">ready</span>
          <span className={`text-cyan-400 ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 font-mono text-xs text-zinc-700">2026</div>
    </div>
  );
}

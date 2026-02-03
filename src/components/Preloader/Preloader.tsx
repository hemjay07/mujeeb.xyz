'use client';

import { useState, useEffect, useCallback } from 'react';
import { featuredProjects } from '@/data/projects';

interface PreloaderProps {
  onComplete: () => void;
}

// Get the 7 priority images (gallery hero images)
const PRIORITY_IMAGES = featuredProjects.map(p => p.heroImage);

// Get secondary images (case study screenshots, mobile, etc.)
const SECONDARY_IMAGES = featuredProjects.flatMap(p => [
  ...p.screenshots.slice(1), // Skip hero, already in priority
  ...(p.mobileScreenshots || []),
]);

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [showReady, setShowReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const totalImages = PRIORITY_IMAGES.length;
  const progress = Math.round((loadedCount / totalImages) * 100);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Preload priority images
  useEffect(() => {
    let mounted = true;
    let loaded = 0;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (mounted) {
            loaded++;
            setLoadedCount(loaded);
          }
          resolve();
        };
        img.onerror = () => {
          // Still count as loaded to not block
          if (mounted) {
            loaded++;
            setLoadedCount(loaded);
          }
          resolve();
        };
        img.src = src;
      });
    };

    // Load all priority images in parallel
    Promise.all(PRIORITY_IMAGES.map(preloadImage)).then(() => {
      if (mounted) {
        setShowReady(true);
        // Short pause to show "ready" then fade out
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onComplete();
            // Start loading secondary images in background
            loadSecondaryImages();
          }, 400);
        }, 500);
      }
    });

    return () => {
      mounted = false;
    };
  }, [onComplete]);

  // Background load secondary images
  const loadSecondaryImages = useCallback(() => {
    SECONDARY_IMAGES.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const getProgressBar = (pct: number) => {
    const filled = Math.min(20, Math.floor(pct / 5));
    const empty = Math.max(0, 20 - filled);
    return '█'.repeat(filled) + '░'.repeat(empty);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center transition-opacity duration-400 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-100"
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

        {/* Loading progress */}
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-zinc-500">loading</span>
            <span className="text-cyan-400/70 tracking-tighter">{getProgressBar(progress)}</span>
            <span className="text-zinc-400 w-12 text-right">{loadedCount}/{totalImages}</span>
          </div>
        </div>

        {/* Ready state */}
        <div
          className={`mt-8 flex items-center transition-all duration-300 ${
            showReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span className="text-cyan-400 text-lg">{'>'}</span>
          <span className="text-white text-lg font-medium ml-2">ready</span>
          <span
            className={`text-cyan-400 ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          >
            _
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-6 right-6 font-mono text-xs text-zinc-700">
        2026
      </div>
    </div>
  );
}

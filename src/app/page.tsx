'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/components/Preloader/Preloader';

// Dynamic import to avoid SSR issues with Three.js
const Gallery = dynamic(() => import('@/components/Gallery/Gallery'), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setShowGallery(true);
    // Small delay before hiding preloader completely
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  return (
    <main className="overflow-hidden">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {showGallery && <Gallery />}
    </main>
  );
}

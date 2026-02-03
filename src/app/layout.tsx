'use client';

import './globals.css';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Preloader from '@/components/Preloader/Preloader';

// Dynamic import to avoid SSR issues with Three.js
const Gallery = dynamic(() => import('@/components/Gallery/Gallery'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [showPreloader, setShowPreloader] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [galleryMounted, setGalleryMounted] = useState(false);

  // Check if first visit on mount
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('portfolio-visited');
    if (hasVisited) {
      // Returning visitor - skip preloader, mount gallery immediately
      setIsFirstVisit(false);
      setShowPreloader(false);
      setGalleryMounted(true);
    }
  }, []);

  // Memoized to prevent unnecessary re-renders in Preloader
  const handlePreloaderComplete = useCallback(() => {
    sessionStorage.setItem('portfolio-visited', 'true');
    setShowPreloader(false);
    // Mount gallery AFTER preloader is fully gone
    // This ensures Three.js initializes fresh and animation plays from start
    setTimeout(() => setGalleryMounted(true), 50);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Mujeeb | Vibe Engineer</title>
        <meta
          name="description"
          content="I build projects in record time. Shipping fast, shipping quality."
        />
        <meta
          name="keywords"
          content="Developer, Portfolio, Full Stack, Software Engineer, Vibe Coding"
        />
        <meta name="author" content="Mujeeb" />

        {/* Favicon - v2 cache bust */}
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0f" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://mujeeb.xyz${pathname === '/' ? '' : pathname}`} />

        {/* Open Graph */}
        <meta property="og:title" content="Mujeeb | Vibe Engineer" />
        <meta
          property="og:description"
          content="I build projects in record time. Shipping fast, shipping quality."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mujeeb.xyz" />
        <meta property="og:image" content="https://mujeeb.xyz/og-image.png" />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mujeeb | Vibe Engineer" />
        <meta
          name="twitter:description"
          content="I build projects in record time. Shipping fast, shipping quality."
        />
        <meta name="twitter:image" content="https://mujeeb.xyz/og-image.png" />
        <meta name="twitter:site" content="@__mujeeb__" />

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mujeeb",
              "url": "https://mujeeb.xyz",
              "image": "https://mujeeb.xyz/mujeeb.png",
              "jobTitle": "Vibe Engineer",
              "description": "I build projects in record time. Shipping fast, shipping quality.",
              "sameAs": [
                "https://x.com/__mujeeb__",
                "https://github.com/hemjay07"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased bg-[#0a0a0f]">
        {/* Preloader - only on first visit */}
        {showPreloader && isFirstVisit && <Preloader onComplete={handlePreloaderComplete} />}

        {/* Gallery - only mount after preloader completes (or immediately for returning visitors)
            This ensures Three.js initializes fresh and the entry animation plays fully */}
        {galleryMounted && (
          <main className="overflow-hidden">
            <Gallery />
          </main>
        )}

        {/* Other pages layer on top with fade */}
        {!isHomePage && (
          <div data-page-wrapper className="fixed inset-0 z-[60] bg-[#0a0a0f] page-enter overflow-auto">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}

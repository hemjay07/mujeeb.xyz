'use client';

import './globals.css';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

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

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0f" />

        {/* Open Graph */}
        <meta property="og:title" content="Mujeeb | Vibe Engineer" />
        <meta
          property="og:description"
          content="I build projects in record time. Shipping fast, shipping quality."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mujeeb.xyz" />
        <meta property="og:image" content="https://mujeeb.xyz/og-image.png" />
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
      </head>
      <body className="antialiased bg-[#0a0a0f]">
        {/* Preloader */}
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

        {/* Gallery always mounted - stays underneath other pages */}
        <main className={`overflow-hidden ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <Gallery />
        </main>

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

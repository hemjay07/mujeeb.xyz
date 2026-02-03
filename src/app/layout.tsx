'use client';

import './globals.css';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

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

  return (
    <html lang="en">
      <head>
        <title>Mujeeb | Vibe Engineer — 8 Web3 Projects</title>
        <meta
          name="description"
          content="I build Web3 projects in record time. PredictKit, TruthBounty, Foresight, IdealMe, SignalHive, VeilPass, x402 Arcade, BountyNet."
        />
        <meta
          name="keywords"
          content="Web3, Solana, Developer, Portfolio, DeFi, Full Stack, Blockchain"
        />
        <meta name="author" content="Mujeeb" />
        <meta property="og:title" content="Mujeeb | Vibe Engineer" />
        <meta
          property="og:description"
          content="I build Web3 projects in record time. Here are 8 of them."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mujeeb | Vibe Engineer" />
        <meta
          name="twitter:description"
          content="I build Web3 projects in record time. Here are 8 of them."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className="antialiased bg-[#0a0a0f]">
        {/* Gallery always mounted - stays underneath other pages */}
        <main className="overflow-hidden">
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

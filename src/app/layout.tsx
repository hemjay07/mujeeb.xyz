import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mujeeb | Vibe Engineer — 8 Web3 Projects',
  description:
    'I build Web3 projects in record time. PredictKit, TruthBounty, Foresight, IdealMe, SignalHive, VeilPass, x402 Arcade, BountyNet.',
  keywords: [
    'Web3',
    'Solana',
    'Developer',
    'Portfolio',
    'DeFi',
    'Full Stack',
    'Blockchain',
  ],
  authors: [{ name: 'Mujeeb' }],
  openGraph: {
    title: 'Mujeeb | Vibe Engineer',
    description: 'I build Web3 projects in record time. Here are 8 of them.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mujeeb | Vibe Engineer',
    description: 'I build Web3 projects in record time. Here are 8 of them.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

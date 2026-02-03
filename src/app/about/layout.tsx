import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Mujeeb - Vibe Engineer',
  description: 'I build 13 projects in 3 months. Research-driven development, rapid execution, shipping quality.',
  openGraph: {
    title: 'About | Mujeeb - Vibe Engineer',
    description: 'I build 13 projects in 3 months. Research-driven development, rapid execution, shipping quality.',
    url: 'https://mujeeb.xyz/about',
  },
  twitter: {
    title: 'About | Mujeeb - Vibe Engineer',
    description: 'I build 13 projects in 3 months. Research-driven development, rapid execution, shipping quality.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

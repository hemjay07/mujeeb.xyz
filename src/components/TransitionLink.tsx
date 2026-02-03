'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Find the page wrapper and trigger exit animation
    const pageWrapper = document.querySelector('[data-page-wrapper]');
    if (pageWrapper) {
      // Add exit class (don't remove enter - it's already done animating)
      pageWrapper.classList.add('page-exit');

      // Navigate after animation completes
      setTimeout(() => {
        router.push(href);
      }, 250);
    } else {
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

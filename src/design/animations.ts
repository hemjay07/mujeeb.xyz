/**
 * Animation System & Utilities
 *
 * Centralized animation definitions following the design system guidelines:
 * - Entry animations: 800-1200ms with easeOutQuint
 * - Scroll animations: Purposeful, fade/movement only
 * - Transitions: 200-300ms for hover states
 * - Stagger: 100-150ms between elements
 *
 * All timing and easing functions follow CLAUDE.md specifications
 */

import { baseTokens } from './tokens';

// ============================================================================
// ANIMATION TIMING CONSTANTS
// ============================================================================

export const animationTiming = {
  // Fast interactions (hover, micro-interactions)
  fast: 200,        // ms
  fastTrans: '200ms',

  // Base transitions (standard interactions)
  base: 300,
  baseTrans: '300ms',

  // Slow animations (entrance, exit)
  slow: 500,
  slowTrans: '500ms',

  // Slower animations (page transitions, large movements)
  slower: 700,
  slowerTrans: '700ms',

  // Slowest (hero entrance, major layout shifts)
  slowest: 1000,
  slowestTrans: '1000ms',

  // Stagger delays
  staggerSmall: 80,
  staggerBase: 100,
  staggerMedium: 120,
  staggerLarge: 150,
} as const;

// ============================================================================
// EASING FUNCTIONS
// ============================================================================

export const easing = {
  // Linear
  linear: 'linear',

  // Standard
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Specialized (from CLAUDE.md)
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',  // Bouncy, natural feel
  easeInQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

  // Sharp (common in Web3 UI)
  sharp: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
} as const;

// ============================================================================
// PRESET ANIMATIONS (CSS KeyFrames)
// ============================================================================

/**
 * Animation definitions for use in CSS or Tailwind extend
 * These are registered in globals.css
 */
export const keyframes = {
  // Fade animations
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },

  // Slide animations
  slideInUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  slideInDown: {
    '0%': { opacity: '0', transform: 'translateY(-20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  slideInLeft: {
    '0%': { opacity: '0', transform: 'translateX(-20px)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
  slideInRight: {
    '0%': { opacity: '0', transform: 'translateX(20px)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },

  slideOutUp: {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-20px)' },
  },
  slideOutDown: {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(20px)' },
  },

  // Scale animations
  scaleIn: {
    '0%': { opacity: '0', transform: 'scale(0.95)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  scaleOut: {
    '0%': { opacity: '1', transform: 'scale(1)' },
    '100%': { opacity: '0', transform: 'scale(0.95)' },
  },

  // Glow/pulse
  glow: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
  glowStrong: {
    '0%, 100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.15)' },
    '50%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' },
  },

  // Blink (terminal cursor)
  blink: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0' },
  },

  // Scroll hint indicator
  scrollHint: {
    '0%': { transform: 'translateY(-100%)', opacity: '0' },
    '50%': { opacity: '1' },
    '100%': { transform: 'translateY(200%)', opacity: '0' },
  },

  // Reveal curtain (left-to-right wipe)
  revealCurtain: {
    '0%': { width: '0%' },
    '100%': { width: '100%' },
  },
  revealCurtainOut: {
    '0%': { width: '100%' },
    '100%': { width: '0%' },
  },

  // Text appearance (letter by letter feel)
  textReveal: {
    '0%': { opacity: '0', clipPath: 'inset(0 100% 0 0)' },
    '100%': { opacity: '1', clipPath: 'inset(0 0% 0 0)' },
  },

  // Shimmer loading effect
  shimmer: {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' },
  },

  // Color shift (for theme transitions)
  colorShift: {
    '0%': { color: 'var(--accent-old, currentColor)' },
    '100%': { color: 'var(--accent-new, currentColor)' },
  },

  // Float up (hero content fade out during scroll)
  heroFloat: {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-40px)' },
  },
} as const;

// ============================================================================
// ANIMATION UTILITIES FOR COMPONENTS
// ============================================================================

/**
 * Entry animation variants for elements
 * Used with Tailwind's `animate-` prefix or CSS
 */
export const animationVariants = {
  // Standard entrance (800ms, easeOutQuint)
  entrance: {
    duration: animationTiming.slowest,
    easing: easing.easeOutQuint,
    animation: 'slideInUp',
  },

  // Fade entrance (only opacity)
  fadeEntrance: {
    duration: animationTiming.slower,
    easing: easing.easeOut,
    animation: 'fadeIn',
  },

  // Quick entrance (300ms)
  quickEntrance: {
    duration: animationTiming.base,
    easing: easing.easeOut,
    animation: 'slideInUp',
  },

  // Hover state (200ms)
  hover: {
    duration: animationTiming.fast,
    easing: easing.easeOut,
  },

  // Loading shimmer
  loading: {
    duration: 2000,
    easing: easing.linear,
    animation: 'shimmer',
  },

  // Scroll hint (1500ms infinite)
  scrollHint: {
    duration: 1500,
    easing: easing.easeInOut,
    animation: 'scrollHint',
    iterationCount: 'infinite',
  },
} as const;

// ============================================================================
// GSAP ANIMATION PRESETS
// ============================================================================

/**
 * GSAP timeline presets for complex animations
 * These are used in hooks and interactive components
 */
export const gsapPresets = {
  // Page transition curtain reveal
  pageTransitionReveal: {
    duration: 0.7,
    ease: easing.sharp,
    paused: false,
  },

  // Card entrance stagger
  cardStagger: {
    stagger: animationTiming.staggerBase / 1000, // Convert to seconds
    duration: animationTiming.slower / 1000,
    ease: easing.easeOutQuint,
  },

  // Scroll fade (hero content)
  scrollFade: {
    duration: 0.5,
    ease: easing.easeOut,
  },

  // Gallery card rotation
  galleryRotate: {
    duration: 1.2,
    ease: easing.easeOutQuint,
  },

  // Case study content slide up
  caseContentSlide: {
    duration: 1.0,
    ease: easing.easeOutQuint,
  },
} as const;

// ============================================================================
// ANIMATION HELPERS
// ============================================================================

/**
 * Stagger delay calculator
 * Returns the delay for the nth item in a sequence
 *
 * Usage:
 * ```tsx
 * <div style={{ transitionDelay: getStaggerDelay(0) }}>
 * ```
 */
export function getStaggerDelay(
  index: number,
  staggerMs: number = animationTiming.staggerBase
): string {
  return `${index * staggerMs}ms`;
}

/**
 * Generate CSS transition string
 *
 * Usage:
 * ```tsx
 * style={{ transition: getTransition(['opacity', 'color'], 'base') }}
 * ```
 */
export function getTransition(
  properties: string[] = ['all'],
  speed: 'fast' | 'base' | 'slow' | 'slower' = 'base'
): string {
  const timingMap = {
    fast: animationTiming.fastTrans,
    base: animationTiming.baseTrans,
    slow: animationTiming.slowTrans,
    slower: animationTiming.slowerTrans,
  };

  return properties
    .map(prop => `${prop} ${timingMap[speed]} ${easing.easeOut}`)
    .join(', ');
}

/**
 * Generate animation shorthand
 *
 * Usage:
 * ```tsx
 * style={{ animation: getAnimation('slideInUp', 'entrance') }}
 * ```
 */
export function getAnimation(
  name: keyof typeof keyframes,
  variant: keyof typeof animationVariants = 'entrance',
  iterationCount: string = '1'
): string {
  const v = animationVariants[variant];
  return `${name} ${v.duration}ms ${v.easing} ${iterationCount}`;
}

// ============================================================================
// TAILWIND CONFIG HELPERS
// ============================================================================

/**
 * Export animation definitions for Tailwind v4 extend
 * Add to tailwind.config.ts or globals.css @theme block
 */
export function getTailwindAnimationConfig() {
  return {
    keyframes,
    animation: {
      fadeIn: 'fadeIn 500ms ease-out',
      fadeOut: 'fadeOut 500ms ease-out',
      slideInUp: 'slideInUp 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
      slideInDown: 'slideInDown 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
      slideInLeft: 'slideInLeft 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
      slideInRight: 'slideInRight 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
      scaleIn: 'scaleIn 500ms cubic-bezier(0.22, 1, 0.36, 1)',
      glowStrong: 'glowStrong 2000ms ease-in-out infinite',
      blink: 'blink 1000ms step-end infinite',
      scrollHint: 'scrollHint 1500ms ease-in-out infinite',
      shimmer: 'shimmer 2000ms linear infinite',
      heroFloat: 'heroFloat 800ms ease-out',
    },
  };
}

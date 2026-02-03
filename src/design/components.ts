/**
 * Component Design Patterns & Themes
 *
 * This file defines reusable component patterns that follow the design system.
 * Each pattern includes:
 * - TypeScript interface for props
 * - Base styles (always applied)
 * - Variant styles (conditional)
 * - Theme-aware styles (project-specific colors)
 *
 * Components use these patterns for consistency across the portfolio.
 */

import { semanticTokens } from './tokens';
import { ProjectTheme } from './themes';

// ============================================================================
// COMPONENT STYLE PATTERNS
// ============================================================================

/**
 * Button component pattern
 * Supports size, variant, and theme variants
 */
export const buttonPattern = {
  baseClasses:
    'inline-flex items-center justify-center gap-2 font-mono transition-all duration-200',

  sizes: {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  },

  variants: {
    // Primary action with project accent
    primary: {
      base: 'bg-transparent border border-current text-cyan-400 hover:text-cyan-300 hover:border-cyan-300',
      themeAware: (color: string) =>
        `bg-transparent border border-current text-[${color}] hover:text-[${color}] hover:border-[${color}]`,
    },

    // Secondary - more subtle
    secondary: {
      base: 'bg-transparent text-zinc-500 hover:text-white transition-colors',
      themeAware: (color: string) =>
        `bg-transparent text-zinc-500 hover:text-[${color}] transition-colors`,
    },

    // Ghost - minimal
    ghost: {
      base: 'text-zinc-400 hover:text-white',
      themeAware: (color: string) =>
        `text-zinc-400 hover:text-[${color}]`,
    },

    // Terminal-style CTA
    terminal: {
      base: 'font-mono text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1',
      before: "before:content-['>'] before:mr-1 before:opacity-50",
      themeAware: (color: string) =>
        `font-mono text-xs text-[${color}] hover:opacity-80`,
    },
  },

  // Disabled state (shared)
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',

  // Accessible focus
  focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
} as const;

/**
 * Card component pattern
 * Base elevated surface with theme integration
 */
export const cardPattern = {
  baseClasses:
    'p-6 bg-zinc-900/30 border border-zinc-800 rounded-sm transition-all duration-200',

  variants: {
    // Standard card
    default: 'hover:border-zinc-700 hover:bg-zinc-900/50',

    // Interactive card (clickable)
    interactive: 'cursor-pointer hover:border-cyan-400/50 hover:bg-zinc-900/70 hover:shadow-lg hover:shadow-cyan-400/5',

    // Challenge card (amber accent)
    challenge: {
      bg: 'bg-amber-500/5 border-amber-500/20',
      hover: 'hover:bg-amber-500/10 hover:border-amber-500/40',
    },

    // Solution card (green accent)
    solution: {
      bg: 'bg-emerald-500/5 border-emerald-500/20',
      hover: 'hover:bg-emerald-500/10 hover:border-emerald-500/40',
    },

    // Featured card (cyan glow)
    featured: 'border-cyan-400/30 shadow-lg shadow-cyan-400/10 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-400/20',
  },
} as const;

/**
 * Tag/Badge pattern
 * Used for tech stack, categories, labels
 */
export const tagPattern = {
  baseClasses:
    'inline-block px-3 py-1.5 font-mono text-xs bg-transparent border border-zinc-800 text-zinc-500 rounded-xs transition-all duration-200',

  variants: {
    // Default tag
    default: 'hover:border-zinc-600 hover:text-zinc-400',

    // Active/selected
    active: 'border-cyan-400 text-cyan-400 bg-cyan-400/5',

    // Success tag (green)
    success: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',

    // Warning tag (amber)
    warning: 'border-amber-500/30 text-amber-400 bg-amber-500/5',

    // Tech stack (specific styling)
    tech: 'border-zinc-700 text-zinc-400 hover:border-cyan-400/50 hover:text-cyan-400',
  },

  // With theme color variant
  themeAware: (color: string) =>
    `border-[${color}]/30 text-[${color}] bg-[${color}]/5 hover:border-[${color}]/50`,
} as const;

/**
 * Input/Form pattern
 * Text inputs, textareas, selects
 */
export const inputPattern = {
  baseClasses:
    'w-full px-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-xs text-white font-mono text-sm focus:outline-none transition-all duration-200',

  focus: 'focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30',

  error: 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30',

  disabled: 'opacity-50 cursor-not-allowed bg-zinc-900/20',

  placeholder: 'placeholder:text-zinc-600',
} as const;

/**
 * Section header pattern
 * Terminal-style comment headers (# label)
 */
export const sectionHeaderPattern = {
  label: 'font-mono text-xs text-cyan-400 uppercase tracking-widest',
  labelBefore: "before:content-['//'] before:mr-2 before:opacity-50",
  divider: 'flex-1 h-px bg-zinc-800',
  container: 'flex items-center gap-4 mb-8',
} as const;

/**
 * Meta item pattern
 * Label: Value display (used in case studies)
 */
export const metaItemPattern = {
  label: 'font-mono text-xs text-zinc-600 uppercase tracking-wider mb-2',
  value: 'text-sm text-white',
  valueMono: 'font-mono',
  valueHighlight: 'text-cyan-400',
} as const;

/**
 * Feature card pattern
 * Used in features grid within case studies
 */
export const featureCardPattern = {
  container: 'p-6 bg-zinc-900/30 border border-zinc-800 rounded-xs',
  number: 'font-mono text-lg text-cyan-500/60',
  title: 'font-mono text-sm text-zinc-200 font-medium',
  description: 'text-zinc-500 text-sm leading-relaxed',
} as const;

/**
 * Stats display pattern
 * Large number + label (e.g., "2 weeks build time")
 */
export const statsPattern = {
  container: 'font-mono',
  number: 'text-4xl font-bold text-cyan-400',
  unit: 'text-sm text-zinc-500 ml-1',
  label: 'text-xs text-zinc-600 uppercase mt-2',
} as const;

/**
 * Link pattern
 * Styled links with underline animation
 */
export const linkPattern = {
  baseClasses: 'text-cyan-400 hover:text-cyan-300 transition-colors duration-200 relative',
  underline: 'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 hover:after:w-full',
  external: 'inline-flex items-center gap-1 after:content-["_→"]',
} as const;

// ============================================================================
// THEME-AWARE COMPONENT BUILDERS
// ============================================================================

/**
 * Generate theme-aware button classes
 * Replaces cyan with project accent color
 */
export function getButtonClasses(
  theme: ProjectTheme,
  size: 'sm' | 'md' | 'lg' = 'md',
  variant: 'primary' | 'secondary' | 'ghost' | 'terminal' = 'primary'
): string {
  const sizeClasses = buttonPattern.sizes[size];
  const variantClasses = buttonPattern.variants[variant].base;
  return `${buttonPattern.baseClasses} ${sizeClasses} ${variantClasses}`;
}

/**
 * Generate theme-aware tag classes
 */
export function getTagClasses(
  theme: ProjectTheme,
  variant: 'default' | 'active' | 'tech' = 'default'
): string {
  if (variant === 'active') {
    // Replace cyan with theme color
    return `inline-block px-3 py-1.5 font-mono text-xs bg-transparent border text-white rounded-xs transition-all duration-200 border-[${theme.accentPrimary}] bg-[${theme.accentPrimary}]/5`;
  }
  return `${tagPattern.baseClasses} ${tagPattern.variants[variant]}`;
}

/**
 * Generate theme-aware card classes
 * For interactive cards that respond to project theme
 */
export function getCardClasses(
  theme: ProjectTheme,
  variant: 'default' | 'interactive' | 'featured' = 'default'
): string {
  if (variant === 'interactive') {
    return `${cardPattern.baseClasses} cursor-pointer hover:border-[${theme.accentPrimary}]/50 hover:bg-zinc-900/70 hover:shadow-lg hover:shadow-[${theme.accentPrimary}]/5`;
  }
  return `${cardPattern.baseClasses} ${cardPattern.variants[variant]}`;
}

// ============================================================================
// COMPONENT STYLE OBJECTS (For Inline Usage)
// ============================================================================

/**
 * Inline style objects for conditional styling
 * Used when className composition isn't sufficient
 */
export const componentStyles = {
  // Transition all properties
  transitionAll: {
    transition: 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
  },

  // Smooth color transition
  colorTransition: {
    transition: 'color 300ms ease-out, border-color 300ms ease-out',
  },

  // Smooth opacity transition
  opacityTransition: {
    transition: 'opacity 300ms ease-out',
  },

  // Glow effect
  glowEffect: {
    boxShadow: '0 0 20px rgba(34, 211, 238, 0.15)',
  },

  // Subtle border glow
  borderGlow: {
    boxShadow: 'inset 0 0 20px rgba(34, 211, 238, 0.05)',
  },

  // Accessibility: Reduced motion
  reduceMotion: {
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
      transition: 'none',
    },
  },
} as const;

// ============================================================================
// LAYOUT PATTERNS
// ============================================================================

/**
 * Case study content wrapper spacing
 * Ensures consistent max-width and padding across all projects
 */
export const caseStudyLayout = {
  container: 'max-w-4xl mx-auto px-8 md:px-12 py-24',
  contentMaxWidth: 'max-w-2xl',
  sectionGap: 'mb-20',
  gridGap: 'gap-6',
  smallGap: 'gap-4',
} as const;

/**
 * Gallery card dimensions
 * Maintains aspect ratio and sizing
 */
export const galleryCardLayout = {
  width: 'w-full',
  height: 'h-96',
  aspectRatio: 'aspect-square',
  responsive: {
    mobile: 'w-full h-64',
    tablet: 'w-1/2 h-80',
    desktop: 'h-96',
  },
} as const;

/**
 * Navigation spacing
 * Consistent positioning for headers and navigation
 */
export const navigationLayout = {
  headerHeight: 'h-20',
  padding: 'px-8 md:px-12 py-4',
  gap: 'gap-4',
} as const;

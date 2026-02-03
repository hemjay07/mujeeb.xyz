/**
 * Design Tokens - Foundation Layer
 *
 * This file defines all design tokens used across the portfolio.
 * Organized in a three-tier system:
 * 1. Base tokens (primitive values)
 * 2. Semantic tokens (contextual usage)
 * 3. Component tokens (specific to component types)
 *
 * All values follow the design system in CLAUDE.md
 */

// ============================================================================
// TIER 1: BASE TOKENS (Primitive Values)
// ============================================================================

export const baseTokens = {
  // Spacing scale (based on 4px base unit)
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
    '5xl': '5rem',    // 80px
  },

  // Border radius (minimal rounded corners per design)
  borderRadius: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
  },

  // Font sizes
  fontSize: {
    xs: '0.7rem',     // 11px - labels, meta
    sm: '0.8rem',     // 13px - UI text
    base: '1rem',     // 16px - body text
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },

  // Font weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.1em',
  },

  // Z-index scale
  zIndex: {
    bg: 1,
    content: 10,
    overlay: 20,
    modal: 100,
  },

  // Transitions
  transition: {
    fast: '200ms',
    base: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Easing functions
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const;

// ============================================================================
// TIER 2: SEMANTIC TOKENS (Contextual Usage)
// ============================================================================

export const semanticTokens = {
  // Core color palette
  colors: {
    // Backgrounds (Terminal-dark aesthetic)
    bg: {
      base: '#0a0a0f',        // Main background
      surface: '#12121a',      // Cards, elevated surfaces
      elevated: '#1a1a24',     // Hover states, active
      overlay: '#0a0a0fcc',    // Semi-transparent overlay
    },

    // Text
    text: {
      primary: '#e4e4e7',      // Main text
      muted: '#71717a',        // Secondary text
      dimmed: '#3f3f46',       // Tertiary, labels
      inverse: '#0a0a0f',      // Text on light backgrounds
    },

    // Primary Accent (Cyan - core brand)
    accent: {
      base: '#22d3ee',         // Primary cyan
      hover: '#06b6d4',        // Darker cyan
      light: '#67e8f9',        // Lighter cyan
      subtle: '#22d3ee1a',     // Very light bg
    },

    // Secondary Accents
    success: '#4ade80',        // Green - success, solution
    warning: '#fbbf24',        // Amber - highlights, challenges
    error: '#ef4444',          // Red - errors, critical
    info: '#3b82f6',           // Blue - informational

    // Borders
    border: {
      subtle: '#1f1f2e',       // Default borders
      hover: '#27272a',        // Hover state
      active: '#22d3ee',       // Active state (cyan)
    },
  },

  // Shadows
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(34, 211, 238, 0.15)',
  },

  // Opacity scale
  opacity: {
    disabled: 0.5,
    subtle: 0.25,
    medium: 0.5,
    prominent: 0.75,
  },
} as const;

// ============================================================================
// TIER 3: COMPONENT TOKENS (Specific Component Usage)
// ============================================================================

export const componentTokens = {
  // Button sizing
  button: {
    sm: {
      height: '2rem',
      padding: '0.35rem 0.75rem',
      fontSize: baseTokens.fontSize.xs,
    },
    md: {
      height: '2.5rem',
      padding: '0.5rem 1rem',
      fontSize: baseTokens.fontSize.sm,
    },
    lg: {
      height: '3rem',
      padding: '0.75rem 1.5rem',
      fontSize: baseTokens.fontSize.base,
    },
  },

  // Card spacing
  card: {
    padding: baseTokens.spacing.lg,
    border: `1px solid ${semanticTokens.colors.border.subtle}`,
    borderRadius: baseTokens.borderRadius.sm,
    bg: semanticTokens.colors.bg.surface,
  },

  // Input/Form
  input: {
    height: '2.5rem',
    padding: `${baseTokens.spacing.sm} ${baseTokens.spacing.md}`,
    fontSize: baseTokens.fontSize.base,
    border: `1px solid ${semanticTokens.colors.border.subtle}`,
    borderRadius: baseTokens.borderRadius.xs,
  },

  // Tag/Badge
  tag: {
    padding: '0.35rem 0.75rem',
    fontSize: baseTokens.fontSize.xs,
    border: `1px solid ${semanticTokens.colors.border.subtle}`,
    borderRadius: baseTokens.borderRadius.xs,
  },

  // Section spacing
  section: {
    gap: baseTokens.spacing['3xl'],
    padding: {
      vertical: baseTokens.spacing['3xl'],
      horizontal: baseTokens.spacing.lg,
    },
  },

  // Case study specifics
  caseStudy: {
    heroMinHeight: '100vh',
    contentMaxWidth: '56rem',  // max-w-4xl
    headerHeight: '5rem',
    sectionGap: baseTokens.spacing['3xl'],
    textLineLength: 65,  // chars before wrapping
  },
} as const;

// ============================================================================
// HELPER EXPORTS
// ============================================================================

/**
 * Get CSS variable declarations for use in Tailwind theme or globals.css
 * Usage: Apply these to :root or component-specific selectors
 */
export function getCSSVariables() {
  return {
    '--bg-base': semanticTokens.colors.bg.base,
    '--bg-surface': semanticTokens.colors.bg.surface,
    '--bg-elevated': semanticTokens.colors.bg.elevated,
    '--text-primary': semanticTokens.colors.text.primary,
    '--text-muted': semanticTokens.colors.text.muted,
    '--text-dimmed': semanticTokens.colors.text.dimmed,
    '--accent': semanticTokens.colors.accent.base,
    '--accent-hover': semanticTokens.colors.accent.hover,
    '--accent-green': semanticTokens.colors.success,
    '--accent-amber': semanticTokens.colors.warning,
    '--border': semanticTokens.colors.border.subtle,
  } as const;
}

/**
 * Type exports for strict typing in components
 */
export type BaseTokens = typeof baseTokens;
export type SemanticTokens = typeof semanticTokens;
export type ComponentTokens = typeof componentTokens;

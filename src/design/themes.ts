/**
 * Project Theme System
 *
 * Each of the 8 Web3 projects has a unique visual identity while maintaining
 * the Terminal-Meets-Editorial aesthetic baseline.
 *
 * Structure:
 * - Base theme (shared foundation)
 * - Per-project overrides (colors, accents)
 * - Dynamic CSS variables for seamless transitions
 *
 * How it works:
 * 1. Each project defines primary and secondary accent colors
 * 2. These override the base cyan accent throughout the UI
 * 3. The 3D card maintains its project-specific color
 * 4. Case study pages fade to the project theme
 */

import { semanticTokens } from './tokens';

// ============================================================================
// BASE THEME (Shared by all projects)
// ============================================================================

export const baseTheme = {
  // Core palette from CLAUDE.md
  bg: {
    base: '#0a0a0f',
    surface: '#12121a',
    elevated: '#1a1a24',
  },
  text: {
    primary: '#e4e4e7',
    muted: '#71717a',
    dimmed: '#3f3f46',
  },
  border: {
    subtle: '#1f1f2e',
    hover: '#27272a',
  },
  // Accent will be overridden per project
  accent: '#22d3ee', // Default cyan
} as const;

// ============================================================================
// PROJECT THEMES (Mapped from projects.ts)
// ============================================================================

export interface ProjectTheme {
  id: string;
  name: string;
  accentPrimary: string;    // Main accent (replaces cyan)
  accentSecondary: string;  // Optional secondary color
  galleryBg: string;        // 3D card background
  caseBgLight: string;      // Case study light variant
  // Semantic use
  accentUse: 'tech' | 'defi' | 'social' | 'privacy' | 'productivity' | 'rwa' | 'mixed';
}

export const projectThemes: Record<string, ProjectTheme> = {
  // 1. PredictKit - Blue SDK/Infrastructure
  // Source: Light theme, clean documentation style, blue CTAs
  predictkit: {
    id: 'predictkit',
    name: 'PredictKit',
    accentPrimary: '#3b82f6',    // Blue (from "Get Started" button)
    accentSecondary: '#2563eb',  // Deeper blue
    galleryBg: '#1a2f4a',        // Dark blue
    caseBgLight: '#f8fafc',      // Near white (light theme)
    accentUse: 'tech',
  },

  // 2. PrivKit - Teal/Privacy Developer Tools
  // Source: Solana privacy CLI, terminal aesthetic
  privkit: {
    id: 'privkit',
    name: 'PrivKit',
    accentPrimary: '#14b8a6',    // Teal (privacy + Solana vibes)
    accentSecondary: '#0d9488',  // Deeper teal
    galleryBg: '#0a1f1c',        // Dark teal
    caseBgLight: '#0a1f1c',      // Dark theme (CLI tool)
    accentUse: 'privacy',
  },

  // 3. TruthBounty - Blue + Amber/Reputation
  // Source: Dark crypto aesthetic, blue "Verified", amber "Valuable"
  truthbounty: {
    id: 'truthbounty',
    name: 'TruthBounty',
    accentPrimary: '#3b82f6',    // Blue (buttons, "Verified")
    accentSecondary: '#f59e0b',  // Amber ("Valuable", badge icon)
    galleryBg: '#0f172a',        // Deep navy
    caseBgLight: '#0f172a',      // Dark theme (no light variant)
    accentUse: 'defi',
  },

  // 3. Foresight - Amber/Orange Gaming
  // Source: Dark gaming theme, orange logo and badges
  foresight: {
    id: 'foresight',
    name: 'Foresight',
    accentPrimary: '#f59e0b',    // Amber (logo, "Arena" badge)
    accentSecondary: '#22c55e',  // Green (checkmarks)
    galleryBg: '#1a1a1a',        // Dark charcoal
    caseBgLight: '#1a1a1a',      // Dark theme
    accentUse: 'social',
  },

  // 4. IdealMe - Orange/Productivity (Desktop app - no live site)
  // Based on category and productivity tools aesthetic
  idealme: {
    id: 'idealme',
    name: 'IdealMe',
    accentPrimary: '#f97316',    // Orange
    accentSecondary: '#fb923c',  // Lighter orange
    galleryBg: '#3d2314',        // Dark orange-brown
    caseBgLight: '#18181b',      // Dark theme (Electron app)
    accentUse: 'productivity',
  },

  // 5. SignalHive - Pink + Cyan/Futuristic Trading
  // Source: Vibrant dark theme, pink headlines, cyan accents
  signalhive: {
    id: 'signalhive',
    name: 'SignalHive',
    accentPrimary: '#ec4899',    // Hot pink ("Autonomous Trading Agent")
    accentSecondary: '#22d3ee',  // Cyan (logo, secondary accents)
    galleryBg: '#0a0a1a',        // Very dark with mesh pattern
    caseBgLight: '#0a0a1a',      // Dark theme
    accentUse: 'defi',
  },

  // 6. VeilPass - Indigo + Pink Gradient/Privacy
  // Source: Light theme, indigo buttons, pink gradient text
  veilpass: {
    id: 'veilpass',
    name: 'VeilPass',
    accentPrimary: '#6366f1',    // Indigo (buttons, logo)
    accentSecondary: '#ec4899',  // Pink (gradient text accent)
    galleryBg: '#1f1f2e',        // Dark neutral
    caseBgLight: '#f8fafc',      // Light theme
    accentUse: 'privacy',
  },

  // 7. PayShield - Emerald/Privacy Payments
  // Source: Dark privacy theme, emerald green accents
  payshield: {
    id: 'payshield',
    name: 'PayShield',
    accentPrimary: '#10b981',    // Emerald ("Onchain Economy", icons)
    accentSecondary: '#6366f1',  // Indigo (button background)
    galleryBg: '#0d0d0d',        // Very dark
    caseBgLight: '#0d0d0d',      // Dark theme
    accentUse: 'privacy',
  },

  // 8. MantleCred - Orange/RWA DeFi
  // Source: Dark fintech theme, orange buttons and icons
  mantlecred: {
    id: 'mantlecred',
    name: 'MantleCred',
    accentPrimary: '#f97316',    // Orange (buttons, home icon)
    accentSecondary: '#fbbf24',  // Amber (warning badges)
    galleryBg: '#0a0a0a',        // Near black with grid
    caseBgLight: '#0a0a0a',      // Dark theme
    accentUse: 'rwa',
  },
};

// ============================================================================
// THEME CONTEXT & APPLICATION
// ============================================================================

/**
 * Apply project theme to document
 * Sets CSS variables that cascade through the entire app
 *
 * Usage:
 * ```tsx
 * useEffect(() => {
 *   applyProjectTheme(projectId);
 * }, [projectId]);
 * ```
 */
export function applyProjectTheme(projectId: string) {
  const theme = projectThemes[projectId];
  if (!theme) return;

  const root = document.documentElement;

  // Core accent color (replaces cyan throughout)
  root.style.setProperty('--accent-primary', theme.accentPrimary);
  root.style.setProperty('--accent-secondary', theme.accentSecondary);

  // For backwards compatibility with existing classes
  root.style.setProperty('--color-accent', theme.accentPrimary);
}

/**
 * Generate Tailwind class overrides for a project theme
 * Returns CSS that can be scoped to a container
 *
 * Usage in globals.css:
 * ```css
 * .theme-predictkit { ... generate these ... }
 * ```
 */
export function generateThemeCSS(projectId: string): string {
  const theme = projectThemes[projectId];
  if (!theme) return '';

  return `
    .theme-${projectId} {
      --accent-primary: ${theme.accentPrimary};
      --accent-secondary: ${theme.accentSecondary};
      --color-accent: ${theme.accentPrimary};
    }

    .theme-${projectId} .text-cyan-400,
    .theme-${projectId} .text-cyan-500 {
      color: ${theme.accentPrimary};
    }

    .theme-${projectId} .border-cyan-400,
    .theme-${projectId} .border-cyan-500 {
      border-color: ${theme.accentPrimary};
    }

    .theme-${projectId} .bg-cyan-400/10,
    .theme-${projectId} .bg-cyan-500/10 {
      background-color: ${theme.accentPrimary}15;
    }

    .theme-${projectId} .hover\:text-cyan-300:hover,
    .theme-${projectId} .hover\:text-cyan-400:hover {
      color: ${theme.accentSecondary};
    }

    .theme-${projectId} .hover\:border-cyan-400:hover {
      border-color: ${theme.accentSecondary};
    }
  `;
}

// ============================================================================
// COLOR MAPPING UTILITIES
// ============================================================================

/**
 * Map semantic color roles to theme colors
 * Helps maintain consistency across components
 */
export interface ThemeColorMap {
  primary: string;     // Main action/accent
  secondary: string;   // Secondary accent
  success: string;     // Success state (green)
  warning: string;     // Warning state (amber)
  error: string;       // Error state (red)
  info: string;        // Info state (blue)
}

export function getThemeColorMap(projectId: string): ThemeColorMap {
  const theme = projectThemes[projectId];
  if (!theme) throw new Error(`Unknown project: ${projectId}`);

  return {
    primary: theme.accentPrimary,
    secondary: theme.accentSecondary,
    success: '#4ade80',      // Green always
    warning: '#fbbf24',      // Amber always
    error: '#ef4444',        // Red always
    info: theme.accentSecondary, // Use secondary for info
  };
}

// ============================================================================
// PRESET THEME GENERATION
// ============================================================================

/**
 * Generate all theme CSS at build time
 * This is used in globals.css to register all theme classes
 *
 * Usage in build script:
 * ```ts
 * const allThemesCSS = Object.keys(projectThemes)
 *   .map(id => generateThemeCSS(id))
 *   .join('\n');
 * ```
 */
export function generateAllThemesCSS(): string {
  return Object.keys(projectThemes)
    .map(id => generateThemeCSS(id))
    .join('\n');
}

// Type exports
export type ProjectThemeKey = keyof typeof projectThemes;

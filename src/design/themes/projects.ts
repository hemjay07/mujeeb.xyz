/**
 * Project Theme Definitions
 *
 * All 8 project themes with complete visual specifications
 * Based on each project's unique identity and branding
 */

import type { ProjectTheme } from './types';

/**
 * Base/default theme used as fallback
 * Provides sane defaults for all required properties
 */
export const baseTheme: ProjectTheme = {
  id: 'base',
  name: 'Base',
  accentPrimary: '#22d3ee',     // Cyan
  accentSecondary: '#06b6d4',   // Darker cyan
  success: '#4ade80',           // Green
  warning: '#fbbf24',           // Amber
  error: '#ef4444',             // Red
  galleryBg: '#1a1a1a',         // Dark
  caseBgLight: '#0a0a0f',       // Very dark
  borderStyle: 'solid',
  borderOpacity: 1,
  glowIntensity: 'medium',
  shadowDepth: 'medium',
  transitionSpeed: 'normal',
  accentUse: 'tech',
};

/**
 * All project themes keyed by project ID
 * Each theme extends the base with project-specific colors and effects
 */
export const projectThemes: Record<string, ProjectTheme> = {
  // ============================================================================
  // 1. PREDICTKIT - Blue SDK/Infrastructure
  // ============================================================================
  // Blue represents technical foundation, SDKs, infrastructure
  // Source: Clean documentation style, blue "Get Started" buttons
  predictkit: {
    id: 'predictkit',
    name: 'PredictKit',
    accentPrimary: '#3b82f6',       // Blue (SDK/technical)
    accentSecondary: '#2563eb',     // Darker blue
    success: '#4ade80',             // Green (success predictions)
    warning: '#fbbf24',             // Amber (market warnings)
    error: '#ef4444',               // Red (failed predictions)
    galleryBg: '#1a2f4a',           // Dark blue
    caseBgLight: '#f8fafc',         // Near white (light theme)
    glowColor: 'rgba(59, 130, 246, 0.5)',
    glowIntensity: 'medium',
    shadowDepth: 'medium',
    borderStyle: 'solid',
    transitionSpeed: 'normal',
    accentUse: 'tech',
  },

  // ============================================================================
  // 2. TRUTHBOUNTY - Blue + Amber/Reputation
  // ============================================================================
  // Blue for verification, Amber for valuable reputation scores
  // Source: Dark crypto aesthetic, multi-color accent system
  truthbounty: {
    id: 'truthbounty',
    name: 'TruthBounty',
    accentPrimary: '#3b82f6',       // Blue (verified, trustworthy)
    accentSecondary: '#f59e0b',     // Amber (valuable, premium reputation)
    success: '#4ade80',             // Green (correct predictions)
    warning: '#f59e0b',             // Amber (reputation scores)
    error: '#ef4444',               // Red (failed predictions)
    galleryBg: '#0f172a',           // Deep navy
    caseBgLight: '#0f172a',         // Dark theme (no light variant)
    glowColor: 'rgba(59, 130, 246, 0.5)',
    glowIntensity: 'medium',
    shadowDepth: 'medium',
    borderStyle: 'solid',
    transitionSpeed: 'normal',
    accentUse: 'defi',
  },

  // ============================================================================
  // 3. FORESIGHT - Amber/Orange Gaming
  // ============================================================================
  // Orange/Amber for gaming, competitive, social gaming aesthetic
  // Source: Dark gaming theme, orange logo and badges
  foresight: {
    id: 'foresight',
    name: 'Foresight',
    accentPrimary: '#f59e0b',       // Amber (gaming, competitive)
    accentSecondary: '#22c55e',     // Green (wins, success)
    success: '#22c55e',             // Green (winning predictions)
    warning: '#f59e0b',             // Amber (tie, neutral outcome)
    error: '#ef4444',               // Red (losing predictions)
    galleryBg: '#1a1a1a',           // Dark charcoal
    caseBgLight: '#1a1a1a',         // Dark theme
    glowColor: 'rgba(245, 158, 11, 0.5)',
    glowIntensity: 'strong',        // Gaming has strong glow
    shadowDepth: 'deep',            // More prominent shadows
    borderStyle: 'solid',
    transitionSpeed: 'fast',        // Faster transitions for gaming feel
    accentUse: 'social',
  },

  // ============================================================================
  // 4. IDEALME - Orange/Productivity
  // ============================================================================
  // Orange represents action, productivity, workflow
  // Source: Desktop app, productivity tools aesthetic
  idealme: {
    id: 'idealme',
    name: 'IdealMe',
    accentPrimary: '#f97316',       // Orange (action, start, productive)
    accentSecondary: '#fb923c',     // Light orange (secondary actions)
    success: '#4ade80',             // Green (completed tasks)
    warning: '#fbbf24',             // Amber (urgent deadlines)
    error: '#ef4444',               // Red (overdue)
    galleryBg: '#3d2314',           // Dark orange-brown
    caseBgLight: '#18181b',         // Dark theme (Electron app)
    glowColor: 'rgba(249, 115, 22, 0.5)',
    glowIntensity: 'subtle',        // Productivity is subtle
    shadowDepth: 'shallow',         // Minimal shadow
    borderStyle: 'solid',
    transitionSpeed: 'normal',
    accentUse: 'productivity',
  },

  // ============================================================================
  // 5. SIGNALHIVE - Pink + Cyan/Futuristic Trading
  // ============================================================================
  // Pink for primary attention, Cyan for secondary tech
  // Source: Vibrant dark theme, pink headlines, cyan accents
  signalhive: {
    id: 'signalhive',
    name: 'SignalHive',
    accentPrimary: '#ec4899',       // Hot pink (attention, signals)
    accentSecondary: '#22d3ee',     // Cyan (tech, secondary)
    success: '#4ade80',             // Green (profitable trades)
    warning: '#fbbf24',             // Amber (risky signals)
    error: '#ef4444',               // Red (losses)
    galleryBg: '#0a0a1a',           // Very dark with subtle mesh
    caseBgLight: '#0a0a1a',         // Dark theme
    glowColor: 'rgba(236, 72, 153, 0.5)',
    glowIntensity: 'strong',        // Vibrant/futuristic glow
    shadowDepth: 'deep',            // Prominent shadows for depth
    borderStyle: 'solid',
    transitionSpeed: 'fast',        // Reactive trading UI
    accentUse: 'defi',
  },

  // ============================================================================
  // 6. VEILPASS - Indigo + Pink/Privacy
  // ============================================================================
  // Indigo for trustworthy compliance, Pink for modern/premium
  // Source: Light theme, indigo buttons, pink gradient accents
  veilpass: {
    id: 'veilpass',
    name: 'VeilPass',
    accentPrimary: '#6366f1',       // Indigo (trust, compliance, privacy)
    accentSecondary: '#ec4899',     // Pink (modern, premium)
    success: '#4ade80',             // Green (verified, passed)
    warning: '#fbbf24',             // Amber (pending verification)
    error: '#ef4444',               // Red (failed verification)
    galleryBg: '#1f1f2e',           // Dark neutral
    caseBgLight: '#f8fafc',         // Light theme (trust/compliance feel)
    glowColor: 'rgba(99, 102, 241, 0.5)',
    glowIntensity: 'subtle',        // Privacy is subtle, not flashy
    shadowDepth: 'medium',
    borderStyle: 'solid',
    transitionSpeed: 'normal',
    accentUse: 'privacy',
  },

  // ============================================================================
  // 7. PAYSHIELD - Emerald/Privacy Payments
  // ============================================================================
  // Emerald green for financial growth and privacy
  // Source: Dark privacy theme, emerald green accents
  payshield: {
    id: 'payshield',
    name: 'PayShield',
    accentPrimary: '#10b981',       // Emerald (privacy, secure, growth)
    accentSecondary: '#6366f1',     // Indigo (secondary, trustworthy)
    success: '#10b981',             // Emerald (secure payment)
    warning: '#fbbf24',             // Amber (pending withdrawal)
    error: '#ef4444',               // Red (failed payment)
    galleryBg: '#0d0d0d',           // Very dark
    caseBgLight: '#0d0d0d',         // Dark theme (privacy-first)
    glowColor: 'rgba(16, 185, 129, 0.5)',
    glowIntensity: 'subtle',        // Privacy is subtle
    shadowDepth: 'shallow',         // Minimal visibility
    borderStyle: 'solid',
    borderOpacity: 0.7,             // Subtle borders (privacy)
    transitionSpeed: 'normal',
    accentUse: 'privacy',
  },

  // ============================================================================
  // 8. MANTLECRED - Orange/RWA DeFi
  // ============================================================================
  // Orange for financial action and accessibility
  // Source: Dark fintech theme, orange buttons and icons
  mantlecred: {
    id: 'mantlecred',
    name: 'MantleCred',
    accentPrimary: '#f97316',       // Orange (action, financial growth)
    accentSecondary: '#fbbf24',     // Amber (warnings, secondary actions)
    success: '#4ade80',             // Green (successful loans)
    warning: '#fbbf24',             // Amber (liquidation risk)
    error: '#ef4444',               // Red (default, liquidation)
    galleryBg: '#0a0a0a',           // Near black with grid
    caseBgLight: '#0a0a0a',         // Dark theme
    glowColor: 'rgba(249, 115, 22, 0.5)',
    glowIntensity: 'medium',
    shadowDepth: 'medium',
    borderStyle: 'solid',
    transitionSpeed: 'normal',
    accentUse: 'rwa',
  },

  // ============================================================================
  // FALLBACK: DEFAULT THEME
  // ============================================================================
  // Used when project ID is not found
  default: baseTheme,
};

/**
 * Helper function to get theme by ID with fallback
 */
export function getProjectTheme(projectId: string): ProjectTheme {
  return projectThemes[projectId] || projectThemes['default'];
}

/**
 * Helper function to get all theme IDs
 */
export function getThemeIds(): string[] {
  return Object.keys(projectThemes).filter(id => id !== 'default');
}

/**
 * Helper function to validate a project theme
 */
export function isValidProjectTheme(theme: unknown): theme is ProjectTheme {
  const t = theme as ProjectTheme;
  return (
    typeof t.id === 'string' &&
    typeof t.accentPrimary === 'string' &&
    typeof t.accentSecondary === 'string' &&
    typeof t.galleryBg === 'string' &&
    typeof t.caseBgLight === 'string'
  );
}

// Type exports
export type ProjectThemeKey = keyof typeof projectThemes;

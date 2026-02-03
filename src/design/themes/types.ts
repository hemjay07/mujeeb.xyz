/**
 * Theme Type Definitions
 *
 * Comprehensive TypeScript interfaces for the theming system
 */

/**
 * Comprehensive theme definition for a project
 * Defines all visual properties: colors, backgrounds, effects, typography
 */
export interface ProjectTheme {
  // ========== IDENTIFICATION ==========
  /** Unique identifier (must match project ID) */
  id: string;

  /** Display name */
  name: string;

  // ========== COLOR PALETTE ==========
  /** Primary accent color (main CTA, highlights, borders) */
  accentPrimary: string;

  /** Secondary accent color (hover states, secondary actions) */
  accentSecondary: string;

  /** Success color (optional, defaults to #4ade80) */
  success?: string;

  /** Warning color (optional, defaults to #fbbf24) */
  warning?: string;

  /** Error color (optional, defaults to #ef4444) */
  error?: string;

  // ========== BACKGROUNDS ==========
  /** Gallery card background (dark, behind 3D card) */
  galleryBg: string;

  /** Case study background variant (for light themes or alternatives) */
  caseBgLight: string;

  /** Optional: Overlay color for semi-transparent overlays */
  overlayColor?: string;

  // ========== TYPOGRAPHY (Optional) ==========
  /** Custom font stack definitions */
  fontFamily?: {
    /** Display/heading font (defaults to Space Grotesk) */
    display?: string;

    /** Body text font (defaults to Space Grotesk) */
    body?: string;

    /** Monospace font (defaults to IBM Plex Mono) */
    mono?: string;
  };

  // ========== EFFECTS & STYLING ==========
  /** Border style (solid, dashed, dotted) */
  borderStyle?: 'solid' | 'dashed' | 'dotted';

  /** Border opacity (0-1) */
  borderOpacity?: number;

  /** Glow color for accent glows (optional, auto-generated if not provided) */
  glowColor?: string;

  /** Glow intensity level */
  glowIntensity?: 'subtle' | 'medium' | 'strong';

  /** Shadow depth for elevation effects */
  shadowDepth?: 'none' | 'shallow' | 'medium' | 'deep';

  // ========== TRANSITIONS ==========
  /** Custom transition speed for color changes */
  transitionSpeed?: 'fast' | 'normal' | 'slow';

  // ========== SEMANTIC METADATA ==========
  /** Project category (for categorizing and filtering themes) */
  accentUse: 'tech' | 'defi' | 'social' | 'privacy' | 'productivity' | 'rwa' | 'mixed';
}

/**
 * Semantic color mapping
 * Maps abstract color roles to actual theme colors
 * Used for consistent color application across components
 */
export interface ThemeColorMap {
  /** Primary action color (main accent) */
  primary: string;

  /** Secondary accent color */
  secondary: string;

  /** Success state color */
  success: string;

  /** Warning state color */
  warning: string;

  /** Error state color */
  error: string;

  /** Informational state color */
  info: string;
}

/**
 * CSS Variables extracted from theme
 * Used for injecting into document.documentElement.style
 */
export interface ThemeCSSVariables {
  // Accent colors
  '--theme-accent-primary': string;
  '--theme-accent-secondary': string;
  '--theme-accent-glow': string;

  // Semantic colors
  '--theme-success': string;
  '--theme-warning': string;
  '--theme-error': string;

  // Backgrounds
  '--theme-bg-gallery': string;
  '--theme-bg-case': string;
  '--theme-bg-overlay': string;

  // Effects
  '--theme-border-style': string;
  '--theme-border-opacity': string;
  '--theme-glow-intensity': string;
  '--theme-shadow-depth': string;
  '--theme-transition-speed': string;
}

/**
 * Theme validation result
 * Returned from validateTheme() function
 */
export interface ThemeValidationResult {
  /** Whether theme is valid (no critical errors) */
  isValid: boolean;

  /** Critical errors that prevent use */
  errors: string[];

  /** Non-critical warnings */
  warnings: string[];
}

/**
 * Theme context type
 * Provided by ThemeProvider to components
 */
export interface ThemeContextValue {
  /** Currently active theme */
  currentTheme: ProjectTheme;

  /** Currently active project ID */
  projectId: string;

  /** Function to change theme */
  setTheme: (projectId: string) => void;

  /** Color map for current theme */
  themeColors: ThemeColorMap;

  /** Whether theme is transitioning */
  isTransitioning: boolean;
}

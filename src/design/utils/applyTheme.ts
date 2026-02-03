/**
 * Theme Application Utilities
 *
 * Functions for applying themes to the DOM and managing CSS variables
 */

import type { ProjectTheme, ThemeCSSVariables } from '../themes/types';

/**
 * Apply theme to document root element
 * Updates all CSS variables in a single operation
 *
 * Usage:
 * ```ts
 * applyThemeToDOM(theme);
 * ```
 */
export function applyThemeToDOM(theme: ProjectTheme): void {
  const root = document.documentElement;
  const variables = getCSSVariablesFromTheme(theme);

  // Apply all variables at once to minimize repaints
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Add data attribute for reference
  root.setAttribute('data-theme', theme.id);
}

/**
 * Convert ProjectTheme to CSS variable map
 * Maps theme properties to CSS custom properties
 *
 * Returns a complete set of variables ready for DOM injection
 */
export function getCSSVariablesFromTheme(theme: ProjectTheme): ThemeCSSVariables {
  return {
    // Accent colors
    '--theme-accent-primary': theme.accentPrimary,
    '--theme-accent-secondary': theme.accentSecondary,
    '--theme-accent-glow': theme.glowColor || generateGlowColor(theme.accentPrimary),

    // Semantic colors
    '--theme-success': theme.success || '#4ade80',
    '--theme-warning': theme.warning || '#fbbf24',
    '--theme-error': theme.error || '#ef4444',

    // Backgrounds
    '--theme-bg-gallery': theme.galleryBg,
    '--theme-bg-case': theme.caseBgLight,
    '--theme-bg-overlay': theme.overlayColor || 'rgba(10, 10, 15, 0.8)',

    // Effects
    '--theme-border-style': theme.borderStyle || 'solid',
    '--theme-border-opacity': String(theme.borderOpacity ?? 1),
    '--theme-glow-intensity': String(getGlowIntensityValue(theme.glowIntensity || 'medium')),
    '--theme-shadow-depth': theme.shadowDepth || 'medium',
    '--theme-transition-speed': getTransitionSpeedValue(theme.transitionSpeed || 'normal'),
  };
}

/**
 * Remove theme from DOM (reset to defaults)
 * Clears all theme CSS variables
 */
export function removeThemeFromDOM(): void {
  const root = document.documentElement;
  const variables = getCSSVariablesFromTheme({
    id: 'default',
    name: 'Default',
    accentPrimary: '#22d3ee',
    accentSecondary: '#06b6d4',
    galleryBg: '#1a1a1a',
    caseBgLight: '#0a0a0f',
    accentUse: 'tech',
  });

  Object.keys(variables).forEach(key => {
    root.style.removeProperty(key);
  });

  root.removeAttribute('data-theme');
}

/**
 * Get the current theme from DOM
 * Reads the data-theme attribute
 */
export function getCurrentThemeFromDOM(): string | null {
  if (typeof document === 'undefined') return null;
  return document.documentElement.getAttribute('data-theme');
}

/**
 * Helper: Convert glow intensity string to opacity value (0-1)
 */
function getGlowIntensityValue(intensity: 'subtle' | 'medium' | 'strong'): number {
  const intensityMap: Record<string, number> = {
    subtle: 0.15,
    medium: 0.3,
    strong: 0.5,
  };
  return intensityMap[intensity] || intensityMap['medium'];
}

/**
 * Helper: Convert transition speed string to milliseconds
 */
function getTransitionSpeedValue(speed: 'fast' | 'normal' | 'slow'): string {
  const speedMap: Record<string, string> = {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
  };
  return speedMap[speed] || speedMap['normal'];
}

/**
 * Helper: Generate glow color from accent hex color
 * Converts hex to rgba with appropriate alpha for glow effect
 *
 * Example:
 * - Input: '#22d3ee'
 * - Output: 'rgba(34, 211, 238, 0.5)'
 */
function generateGlowColor(accentColor: string): string {
  // If already rgba/rgb, return as-is
  if (accentColor.includes('rgb')) {
    return accentColor;
  }

  // Convert hex to rgba
  if (accentColor.startsWith('#')) {
    const hex = accentColor.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  // Fallback: return as-is
  return accentColor;
}

/**
 * Utility: Is color a valid hex color?
 */
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * Utility: Is color a valid rgb/rgba color?
 */
export function isValidRgbColor(color: string): boolean {
  const rgbRegex = /^rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)$/;
  return rgbRegex.test(color);
}

/**
 * Utility: Validate a color string
 */
export function isValidColor(color: string): boolean {
  return isValidHexColor(color) || isValidRgbColor(color) || color === 'transparent';
}

/**
 * Utility: Batch apply multiple CSS variables
 * More efficient than applying one at a time
 *
 * Usage:
 * ```ts
 * batchSetCSSVariables({
 *   '--theme-accent-primary': '#ec4899',
 *   '--theme-accent-secondary': '#22d3ee',
 * });
 * ```
 */
export function batchSetCSSVariables(variables: Record<string, string>): void {
  const root = document.documentElement;
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Utility: Get a specific CSS variable value
 * Reads from computed styles
 */
export function getCSSVariableValue(variableName: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

/**
 * Utility: Get all current theme CSS variables
 * Useful for debugging or exporting
 */
export function getAllCSSVariables(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const root = document.documentElement;
  const style = getComputedStyle(root);
  const result: Record<string, string> = {};

  // List of theme variables to retrieve
  const themeVars = [
    '--theme-accent-primary',
    '--theme-accent-secondary',
    '--theme-accent-glow',
    '--theme-success',
    '--theme-warning',
    '--theme-error',
    '--theme-bg-gallery',
    '--theme-bg-case',
    '--theme-bg-overlay',
    '--theme-border-style',
    '--theme-border-opacity',
    '--theme-glow-intensity',
    '--theme-shadow-depth',
    '--theme-transition-speed',
  ];

  themeVars.forEach(varName => {
    result[varName] = style.getPropertyValue(varName).trim();
  });

  return result;
}

/**
 * Utility: Add transition class for smooth theme changes
 * Enables CSS transitions during theme switch
 */
export function enableThemeTransition(): void {
  document.documentElement.classList.add('theme-transitioning');
}

/**
 * Utility: Remove transition class after theme change completes
 * Call after transition duration (usually 300-400ms)
 */
export function disableThemeTransition(delay: number = 400): void {
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, delay);
}

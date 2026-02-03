/**
 * Theme Color Utilities
 *
 * Functions for extracting and working with theme colors
 */

import { projectThemes } from '../themes/projects';
import type { ProjectTheme, ThemeColorMap } from '../themes/types';

/**
 * Get semantic color map for a project theme
 * Maps abstract color roles to actual colors for consistent usage
 *
 * Usage:
 * ```ts
 * const colors = getThemeColorMap('foresight');
 * console.log(colors.primary); // #f59e0b
 * ```
 *
 * @param projectId - Project ID
 * @returns ThemeColorMap with semantic colors
 * @throws Error if project not found
 */
export function getThemeColorMap(projectId: string): ThemeColorMap {
  const theme = projectThemes[projectId];
  if (!theme) {
    throw new Error(
      `Unknown project: ${projectId}. ` +
      `Valid projects: ${Object.keys(projectThemes).join(', ')}`
    );
  }

  return {
    primary: theme.accentPrimary,
    secondary: theme.accentSecondary,
    success: theme.success || '#4ade80',
    warning: theme.warning || '#fbbf24',
    error: theme.error || '#ef4444',
    info: theme.accentSecondary, // Use secondary color for info
  };
}

/**
 * Get a specific color from a theme
 *
 * Usage:
 * ```ts
 * const primaryColor = getThemeColor('foresight', 'primary');
 * // Returns: '#f59e0b'
 * ```
 *
 * @param projectId - Project ID
 * @param colorRole - Color role (primary, secondary, success, etc.)
 * @returns Hex color string
 */
export function getThemeColor(
  projectId: string,
  colorRole: keyof ThemeColorMap
): string {
  const colorMap = getThemeColorMap(projectId);
  return colorMap[colorRole];
}

/**
 * Check if a project uses a specific color in its accent
 * Useful for conditional styling based on color scheme
 *
 * Usage:
 * ```ts
 * if (usesColor('signalhive', 'pink')) {
 *   // Apply pink-specific styles
 * }
 * ```
 *
 * @param projectId - Project ID
 * @param colorName - Color name (e.g., 'pink', 'blue', 'orange')
 * @returns Boolean
 */
export function projectUsesColor(projectId: string, colorName: string): boolean {
  const theme = projectThemes[projectId];
  if (!theme) return false;

  const colorMap: Record<string, string[]> = {
    blue: ['#3b82f6', '#2563eb'],
    pink: ['#ec4899'],
    cyan: ['#22d3ee', '#06b6d4'],
    orange: ['#f97316', '#f59e0b'],
    green: ['#10b981', '#22c55e', '#4ade80'],
    indigo: ['#6366f1'],
    amber: ['#f59e0b', '#fbbf24'],
  };

  const colors = colorMap[colorName.toLowerCase()] || [];
  return (
    colors.includes(theme.accentPrimary) ||
    colors.includes(theme.accentSecondary)
  );
}

/**
 * Get projects grouped by color scheme
 *
 * Usage:
 * ```ts
 * const blueProjects = getProjectsByColor('blue');
 * // Returns: ['predictkit', 'truthbounty']
 * ```
 *
 * @param colorName - Color name
 * @returns Array of project IDs
 */
export function getProjectsByColor(colorName: string): string[] {
  return Object.keys(projectThemes)
    .filter(id => id !== 'default' && projectUsesColor(id, colorName));
}

/**
 * Get projects grouped by category
 *
 * Usage:
 * ```ts
 * const defiProjects = getProjectsByCategory('defi');
 * ```
 *
 * @param category - Category
 * @returns Array of project IDs
 */
export function getProjectsByCategory(
  category: 'tech' | 'defi' | 'social' | 'privacy' | 'productivity' | 'rwa' | 'mixed'
): string[] {
  return Object.entries(projectThemes)
    .filter(([id, theme]) => id !== 'default' && theme.accentUse === category)
    .map(([id]) => id);
}

/**
 * Check if two themes have compatible (similar) accent colors
 * Useful for smooth transitions between related projects
 *
 * @param projectId1 - First project ID
 * @param projectId2 - Second project ID
 * @returns Boolean
 */
export function areThemesCompatible(projectId1: string, projectId2: string): boolean {
  const theme1 = projectThemes[projectId1];
  const theme2 = projectThemes[projectId2];

  if (!theme1 || !theme2) return false;

  // Same primary color = compatible
  if (theme1.accentPrimary === theme2.accentPrimary) return true;

  // Same category = somewhat compatible
  if (theme1.accentUse === theme2.accentUse) return true;

  return false;
}

/**
 * Get all unique accent colors across themes
 * Useful for generating color palettes
 *
 * @returns Array of unique hex colors
 */
export function getAllThemeAccentColors(): string[] {
  const colors = new Set<string>();

  Object.values(projectThemes).forEach(theme => {
    if (theme.id !== 'default') {
      colors.add(theme.accentPrimary);
      colors.add(theme.accentSecondary);
    }
  });

  return Array.from(colors);
}

/**
 * Get theme statistics
 * Returns metadata about the theme collection
 *
 * @returns Object with theme statistics
 */
export function getThemeStats() {
  const themes = Object.values(projectThemes).filter(t => t.id !== 'default');

  const categories = new Set<string>();
  const colors = new Set<string>();

  themes.forEach(theme => {
    categories.add(theme.accentUse);
    colors.add(theme.accentPrimary);
    colors.add(theme.accentSecondary);
  });

  return {
    totalThemes: themes.length,
    categories: Array.from(categories),
    uniqueAccentColors: colors.size,
    themes: themes.map(t => ({
      id: t.id,
      name: t.name,
      accentPrimary: t.accentPrimary,
      accentSecondary: t.accentSecondary,
      category: t.accentUse,
    })),
  };
}

/**
 * Find projects with similar visual identity
 * Groups by primary accent color
 *
 * @param projectId - Project ID
 * @returns Array of similar project IDs
 */
export function findSimilarThemes(projectId: string): string[] {
  const theme = projectThemes[projectId];
  if (!theme) return [];

  return Object.entries(projectThemes)
    .filter(([id, t]) => id !== projectId && t.accentPrimary === theme.accentPrimary)
    .map(([id]) => id);
}

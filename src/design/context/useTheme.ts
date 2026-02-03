'use client';

/**
 * useTheme Hook
 *
 * Custom React hook for accessing theme context
 * Must be used within ThemeProvider
 */

import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { ThemeContextValue } from '@/design/themes/types';

/**
 * useTheme Hook
 *
 * Access the complete theme context in any component
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { currentTheme, projectId, setTheme, themeColors } = useTheme();
 *   // Use theme...
 * }
 * ```
 *
 * @throws Error if used outside of ThemeProvider
 * @returns ThemeContextValue with theme and methods
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure your component is wrapped with <ThemeProvider> at a higher level.'
    );
  }

  return context;
}

/**
 * useCurrentTheme Hook
 *
 * Get only the current theme object
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const theme = useCurrentTheme();
 *   // Use theme...
 * }
 * ```
 *
 * @throws Error if used outside of ThemeProvider
 * @returns Current ProjectTheme
 */
export function useCurrentTheme() {
  const { currentTheme } = useTheme();
  return currentTheme;
}

/**
 * useProjectId Hook
 *
 * Get only the current project ID
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const projectId = useProjectId();
 *   // Use projectId...
 * }
 * ```
 *
 * @throws Error if used outside of ThemeProvider
 * @returns Current project ID string
 */
export function useProjectId() {
  const { projectId } = useTheme();
  return projectId;
}

/**
 * useThemeColors Hook
 *
 * Get only the color map for the current theme
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const colors = useThemeColors();
 *   return <div style={{ color: colors.primary }}>Themed text</div>;
 * }
 * ```
 *
 * @throws Error if used outside of ThemeProvider
 * @returns ThemeColorMap with semantic colors
 */
export function useThemeColors() {
  const { themeColors } = useTheme();
  return themeColors;
}

/**
 * useSetTheme Hook
 *
 * Get only the setTheme function for changing themes
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const setTheme = useSetTheme();
 *   return (
 *     <button onClick={() => setTheme('foresight')}>
 *       Switch to Foresight
 *     </button>
 *   );
 * }
 * ```
 *
 * @throws Error if used outside of ThemeProvider
 * @returns Function to change the theme
 */
export function useSetTheme() {
  const { setTheme } = useTheme();
  return setTheme;
}

/**
 * useIsThemeTransitioning Hook
 *
 * Check if the theme is currently transitioning
 * Useful for disabling interactions during transitions
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const isTransitioning = useIsThemeTransitioning();
 *   return (
 *     <div style={{ pointerEvents: isTransitioning ? 'none' : 'auto' }}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 *
 * @throws Error if used outside of ThemeProvider
 * @returns Boolean indicating if transition is active
 */
export function useIsThemeTransitioning() {
  const { isTransitioning } = useTheme();
  return isTransitioning;
}

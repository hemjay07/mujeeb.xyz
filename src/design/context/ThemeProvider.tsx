'use client';

/**
 * Theme Provider Component
 *
 * Provides theme context to all child components
 * Manages theme state and CSS variable application
 * Handles smooth transitions between themes
 */

import React, { createContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  projectThemes,
  getProjectTheme,
} from '@/design/themes/projects';
import type { ProjectTheme, ThemeColorMap, ThemeContextValue } from '@/design/themes/types';
import {
  applyThemeToDOM,
  enableThemeTransition,
  disableThemeTransition,
} from '@/design/utils/applyTheme';
import { getThemeColorMap } from '@/design/utils/getThemeColors';
import { validateTheme } from '@/design/utils/validateTheme';

/**
 * Theme context
 * Provides current theme and methods to change it
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial project ID (defaults to 'predictkit') */
  initialProjectId?: string;
  /** Transition duration in milliseconds (defaults to 400) */
  transitionDuration?: number;
}

/**
 * ThemeProvider Component
 *
 * Wrap your app with this provider to enable theming:
 *
 * ```tsx
 * <ThemeProvider initialProjectId="predictkit">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  initialProjectId = 'predictkit',
  transitionDuration = 400,
}: ThemeProviderProps) {
  // Current active theme
  const [currentTheme, setCurrentTheme] = useState<ProjectTheme>(() =>
    getProjectTheme(initialProjectId)
  );

  // Current active project ID
  const [projectId, setProjectId] = useState(initialProjectId);

  // Track previous project for transition effect
  const prevProjectIdRef = useRef<string | null>(null);

  // Track if currently transitioning
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply theme to DOM when it changes
  useEffect(() => {
    // Get theme with fallback
    const theme = getProjectTheme(projectId);
    const validationResult = validateTheme(theme);

    if (!validationResult.isValid) {
      console.error(
        `Invalid theme for project "${projectId}":`,
        validationResult.errors
      );
      // Use fallback
      const fallback = getProjectTheme('predictkit');
      applyThemeToDOM(fallback);
      return;
    }

    // If this is not the initial load and project changed, enable transition
    if (prevProjectIdRef.current && prevProjectIdRef.current !== projectId) {
      setIsTransitioning(true);
      enableThemeTransition();
    }

    // Apply theme to DOM
    applyThemeToDOM(theme);

    // Update state
    setCurrentTheme(theme);

    // Disable transition after duration
    const transitionTimer = setTimeout(() => {
      disableThemeTransition(0);
      setIsTransitioning(false);
    }, transitionDuration);

    // Update previous project ref
    prevProjectIdRef.current = projectId;

    // Cleanup
    return () => clearTimeout(transitionTimer);
  }, [projectId, transitionDuration]);

  // Get color map for current theme
  const themeColors = getThemeColorMap(projectId);

  // Function to change theme
  const setTheme = useCallback((newProjectId: string) => {
    setProjectId(newProjectId);
  }, []);

  // Context value
  const contextValue: ThemeContextValue = {
    currentTheme,
    projectId,
    setTheme,
    themeColors,
    isTransitioning,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

/**
 * Theme Validation Utilities
 *
 * Functions for validating themes and detecting issues
 */

import type { ProjectTheme, ThemeValidationResult } from '../themes/types';

/**
 * Validate a project theme
 * Checks for required properties and valid color values
 *
 * Usage:
 * ```ts
 * const result = validateTheme(myTheme);
 * if (!result.isValid) {
 *   console.error('Theme errors:', result.errors);
 * }
 * if (result.warnings.length > 0) {
 *   console.warn('Theme warnings:', result.warnings);
 * }
 * ```
 *
 * @param theme - Theme to validate
 * @returns Validation result with isValid, errors, and warnings
 */
export function validateTheme(theme: ProjectTheme): ThemeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // ========== REQUIRED PROPERTIES ==========

  if (!theme.id) {
    errors.push('Missing required property: id');
  }

  if (!theme.name) {
    errors.push('Missing required property: name');
  }

  if (!theme.accentPrimary) {
    errors.push('Missing required property: accentPrimary');
  } else if (!isValidColor(theme.accentPrimary)) {
    errors.push(`Invalid color format for accentPrimary: ${theme.accentPrimary}`);
  }

  if (!theme.accentSecondary) {
    errors.push('Missing required property: accentSecondary');
  } else if (!isValidColor(theme.accentSecondary)) {
    errors.push(`Invalid color format for accentSecondary: ${theme.accentSecondary}`);
  }

  if (!theme.galleryBg) {
    errors.push('Missing required property: galleryBg');
  } else if (!isValidColor(theme.galleryBg)) {
    errors.push(`Invalid color format for galleryBg: ${theme.galleryBg}`);
  }

  if (!theme.caseBgLight) {
    errors.push('Missing required property: caseBgLight');
  } else if (!isValidColor(theme.caseBgLight)) {
    errors.push(`Invalid color format for caseBgLight: ${theme.caseBgLight}`);
  }

  // ========== OPTIONAL COLOR PROPERTIES ==========

  if (theme.success && !isValidColor(theme.success)) {
    warnings.push(`Invalid color format for success: ${theme.success}`);
  }

  if (theme.warning && !isValidColor(theme.warning)) {
    warnings.push(`Invalid color format for warning: ${theme.warning}`);
  }

  if (theme.error && !isValidColor(theme.error)) {
    warnings.push(`Invalid color format for error: ${theme.error}`);
  }

  if (theme.overlayColor && !isValidColor(theme.overlayColor)) {
    warnings.push(`Invalid color format for overlayColor: ${theme.overlayColor}`);
  }

  if (theme.glowColor && !isValidColor(theme.glowColor)) {
    warnings.push(`Invalid color format for glowColor: ${theme.glowColor}`);
  }

  // ========== ENUM PROPERTIES ==========

  const validBorderStyles = ['solid', 'dashed', 'dotted'];
  if (theme.borderStyle && !validBorderStyles.includes(theme.borderStyle)) {
    warnings.push(
      `Invalid borderStyle: ${theme.borderStyle}. ` +
      `Must be one of: ${validBorderStyles.join(', ')}`
    );
  }

  const validGlowIntensities = ['subtle', 'medium', 'strong'];
  if (theme.glowIntensity && !validGlowIntensities.includes(theme.glowIntensity)) {
    warnings.push(
      `Invalid glowIntensity: ${theme.glowIntensity}. ` +
      `Must be one of: ${validGlowIntensities.join(', ')}`
    );
  }

  const validShadowDepths = ['none', 'shallow', 'medium', 'deep'];
  if (theme.shadowDepth && !validShadowDepths.includes(theme.shadowDepth)) {
    warnings.push(
      `Invalid shadowDepth: ${theme.shadowDepth}. ` +
      `Must be one of: ${validShadowDepths.join(', ')}`
    );
  }

  const validTransitionSpeeds = ['fast', 'normal', 'slow'];
  if (theme.transitionSpeed && !validTransitionSpeeds.includes(theme.transitionSpeed)) {
    warnings.push(
      `Invalid transitionSpeed: ${theme.transitionSpeed}. ` +
      `Must be one of: ${validTransitionSpeeds.join(', ')}`
    );
  }

  const validAccentUses = ['tech', 'defi', 'social', 'privacy', 'productivity', 'rwa', 'mixed'];
  if (!theme.accentUse || !validAccentUses.includes(theme.accentUse)) {
    errors.push(
      `Invalid accentUse: ${theme.accentUse}. ` +
      `Must be one of: ${validAccentUses.join(', ')}`
    );
  }

  // ========== NUMERIC PROPERTIES ==========

  if (theme.borderOpacity !== undefined) {
    if (typeof theme.borderOpacity !== 'number') {
      warnings.push(`borderOpacity must be a number, got: ${typeof theme.borderOpacity}`);
    } else if (theme.borderOpacity < 0 || theme.borderOpacity > 1) {
      warnings.push(`borderOpacity must be between 0 and 1, got: ${theme.borderOpacity}`);
    }
  }

  // ========== COLOR CONTRAST CHECK ==========

  // Check that primary and secondary accents are different
  if (
    theme.accentPrimary.toLowerCase() === theme.accentSecondary.toLowerCase()
  ) {
    warnings.push(
      'accentPrimary and accentSecondary should be different colors for better UX'
    );
  }

  // ========== RETURN RESULT ==========

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Check if a string is a valid color (hex, rgb, rgba, or named)
 *
 * @param color - Color string to validate
 * @returns Boolean
 */
export function isValidColor(color: string): boolean {
  if (!color || typeof color !== 'string') return false;

  // Hex colors (#fff, #ffffff)
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
    return true;
  }

  // RGB/RGBA colors
  if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/.test(color)) {
    return true;
  }

  // CSS named colors and special values
  const namedColors = ['transparent', 'currentColor', 'inherit'];
  if (namedColors.includes(color)) {
    return true;
  }

  return false;
}

/**
 * Print validation result to console in a readable format
 *
 * @param result - Validation result
 */
export function printValidationResult(result: ThemeValidationResult): void {
  const status = result.isValid ? '✓ VALID' : '✗ INVALID';
  console.log(`Theme Validation: ${status}`);

  if (result.errors.length > 0) {
    console.error('Errors:');
    result.errors.forEach(error => console.error(`  - ${error}`));
  }

  if (result.warnings.length > 0) {
    console.warn('Warnings:');
    result.warnings.forEach(warning => console.warn(`  - ${warning}`));
  }

  if (result.isValid && result.warnings.length === 0) {
    console.log('No issues found!');
  }
}

/**
 * Compare two themes and report differences
 * Useful for debugging theme updates
 *
 * @param theme1 - First theme
 * @param theme2 - Second theme
 * @returns Differences object
 */
export function compareThemes(
  theme1: ProjectTheme,
  theme2: ProjectTheme
): Record<string, { old: unknown; new: unknown }> {
  const differences: Record<string, { old: unknown; new: unknown }> = {};

  const keys = new Set([...Object.keys(theme1), ...Object.keys(theme2)]);

  keys.forEach(key => {
    const val1 = (theme1 as unknown as Record<string, unknown>)[key];
    const val2 = (theme2 as unknown as Record<string, unknown>)[key];

    if (JSON.stringify(val1) !== JSON.stringify(val2)) {
      differences[key] = { old: val1, new: val2 };
    }
  });

  return differences;
}

/**
 * Merge a partial theme with a base theme
 * Fills in missing properties from base
 *
 * @param partialTheme - Partial theme definition
 * @param baseTheme - Base theme to fill from
 * @returns Complete theme
 */
export function mergeThemes(
  partialTheme: Partial<ProjectTheme>,
  baseTheme: ProjectTheme
): ProjectTheme {
  return {
    ...baseTheme,
    ...partialTheme,
  } as ProjectTheme;
}

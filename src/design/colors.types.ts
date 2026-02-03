/**
 * TypeScript Type Definitions for Color System
 *
 * Provides strict typing for all color-related operations.
 * Use these types in components for type safety and IDE autocompletion.
 */

// ============================================================================
// COLOR VALUE TYPES
// ============================================================================

/**
 * Valid hex color format: #RRGGBB
 */
export type HexColor = string & { readonly __brand: 'HexColor' };

/**
 * Create a branded hex color for type safety
 * Usage: asHexColor('#3b82f6')
 */
export function asHexColor(value: string): HexColor {
  if (!/^#[0-9A-F]{6}$/i.test(value)) {
    throw new Error(`Invalid hex color: ${value}`);
  }
  return value as HexColor;
}

/**
 * Valid rgba color format
 */
export type RgbaColor = string & { readonly __brand: 'RgbaColor' };

/**
 * Valid color format (hex or rgba)
 */
export type Color = HexColor | RgbaColor | string;

// ============================================================================
// PROJECT IDENTIFIERS
// ============================================================================

/**
 * All valid project IDs
 */
export type ProjectId =
  | 'predictkit'
  | 'truthbounty'
  | 'foresight'
  | 'idealme'
  | 'signalhive'
  | 'veilpass'
  | 'payshield'
  | 'mantlecred';

/**
 * All valid project names (human-readable)
 */
export type ProjectName =
  | 'PredictKit'
  | 'TruthBounty'
  | 'Foresight'
  | 'IdealMe'
  | 'SignalHive'
  | 'VeilPass'
  | 'PayShield'
  | 'MantleCred';

/**
 * Project categories
 */
export type ProjectCategory = 'DeFi' | 'Privacy' | 'Social' | 'Productivity' | 'RWA' | 'Tech' | 'Gaming';

/**
 * Type guard to check if string is valid ProjectId
 */
export function isProjectId(value: string): value is ProjectId {
  return [
    'predictkit',
    'truthbounty',
    'foresight',
    'idealme',
    'signalhive',
    'veilpass',
    'payshield',
    'mantlecred',
  ].includes(value);
}

// ============================================================================
// SEMANTIC COLOR TYPES
// ============================================================================

/**
 * Semantic color roles with universal meaning
 */
export type SemanticColorRole = 'success' | 'warning' | 'error' | 'info';

/**
 * Global semantic colors (always the same across projects)
 */
export interface SemanticColors {
  success: Color;  // Green (#4ade80)
  warning: Color;  // Amber (#fbbf24)
  error: Color;    // Red (#ef4444)
  info: Color;     // Blue (#3b82f6)
}

/**
 * Semantic color overrides (per-project, usually empty)
 */
export interface SemanticColorOverrides {
  success?: Color;
  warning?: Color;
  info?: Color;
}

// ============================================================================
// COLOR PALETTE COMPONENT TYPES
// ============================================================================

/**
 * Gallery card colors (3D card in gallery view)
 */
export interface GalleryColors {
  background: Color;   // 3D card background (dark, rich)
  border: Color;       // Card border when active/hovered
  borderGlow: Color;   // Glow shadow (usually rgba)
}

/**
 * Case study page colors
 */
export interface CaseStudyColors {
  heroBackground: Color;    // Hero section background
  contentBackground: Color; // Main content area
  lightVariant: Color;      // Light theme variant (if applicable)
}

/**
 * Primary accent color with variations
 */
export interface AccentColors {
  primary: Color;      // Main action color
  primaryHover: Color; // Hover state (darker)
  primaryLight: Color; // Light variant for backgrounds
  primarySubtle: Color; // Very light bg with opacity (rgba)
}

/**
 * Secondary accent color
 */
export interface SecondaryColors {
  base: Color;   // Secondary color
  hover: Color;  // Darker secondary on hover
}

/**
 * Button color variants
 */
export interface ButtonColors {
  primary: {
    base: Color;
    hover: Color;
    background: Color;
    text: Color;
  };
  secondary: {
    border: Color;
    text: Color;
    hover: Color;
  };
  ghost: {
    text: Color;
    hover: Color;
  };
}

/**
 * Card color variants
 */
export interface CardColors {
  default: {
    background: Color;
    border: Color;
    hover: {
      background: Color;
      border: Color;
    };
  };
  interactive: {
    border: Color;
    borderHover: Color;
    glowHover: Color;
  };
  challenge: {
    background: Color;
    border: Color;
  };
  solution: {
    background: Color;
    border: Color;
  };
}

/**
 * Tag/Badge color variants
 */
export interface TagColors {
  default: {
    border: Color;
    text: Color;
    hover: Color;
  };
  active: {
    background: Color;
    border: Color;
    text: Color;
  };
}

/**
 * Link colors
 */
export interface LinkColors {
  text: Color;
  hover: Color;
  underline: Color;
}

/**
 * Metadata and stats colors
 */
export interface MetadataColors {
  label: Color;      // Label text color
  value: Color;      // Value text color
  highlight: Color;  // Emphasized values (project accent)
}

/**
 * Section header colors (terminal style: // section)
 */
export interface SectionHeaderColors {
  label: Color;   // Header color (project accent)
  divider: Color; // Dividing line
}

// ============================================================================
// COMPLETE PROJECT PALETTE TYPE
// ============================================================================

/**
 * Complete color definition for a single project.
 * Includes ALL colors needed for the entire UI.
 */
export interface ProjectColorPalette {
  // Project Identity
  projectId: ProjectId;
  projectName: ProjectName;
  category: ProjectCategory;

  // Main Components
  gallery: GalleryColors;
  caseStudy: CaseStudyColors;
  accent: AccentColors;
  secondary: SecondaryColors;
  semantic: SemanticColorOverrides;

  // UI Elements
  button: ButtonColors;
  card: CardColors;
  tag: TagColors;
  link: LinkColors;
  metadata: MetadataColors;
  sectionHeader: SectionHeaderColors;
}

// ============================================================================
// GLOBAL COLOR TYPES
// ============================================================================

/**
 * Global color palette (shared by all projects)
 */
export interface GlobalColorPalette {
  background: {
    base: Color;
    surface: Color;
    elevated: Color;
    modal: Color;
  };
  text: {
    primary: Color;
    secondary: Color;
    muted: Color;
    dimmed: Color;
    inverse: Color;
  };
  semantic: SemanticColors;
  border: {
    default: Color;
    hover: Color;
    subtle: Color;
    light: Color;
  };
  overlay: {
    dark: Color;
    light: Color;
    glow: Color;
  };
}

// ============================================================================
// THEME APPLICATION TYPES
// ============================================================================

/**
 * CSS Variables that get set on document root
 */
export interface ThemeCSSVariables {
  '--accent-primary': Color;
  '--accent-primary-hover': Color;
  '--accent-secondary': Color;
  '--text-accent': Color;
  '--border-accent': Color;
  '--glow-accent': Color;
}

/**
 * Function type for getting theme colors
 */
export type GetThemeColorFunction = (projectId: ProjectId) => Color;

/**
 * Function type for applying theme
 */
export type ApplyThemeFunction = (projectId: ProjectId) => void;

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Color map with semantic roles
 */
export interface ThemeColorMap {
  primary: Color;      // Main action/accent
  secondary: Color;    // Secondary accent
  success: Color;      // Success state (green)
  warning: Color;      // Warning state (amber)
  error: Color;        // Error state (red)
  info: Color;         // Info state (blue)
}

/**
 * Result of color operations
 */
export interface ColorResult<T> {
  success: boolean;
  value: T | null;
  error: string | null;
}

/**
 * Color theme state for context/provider
 */
export interface ColorThemeState {
  currentProject: ProjectId;
  palette: ProjectColorPalette;
  cssVariables: ThemeCSSVariables;
  setProject: (projectId: ProjectId) => void;
}

// ============================================================================
// FUNCTION SIGNATURES
// ============================================================================

/**
 * Get project palette
 */
export type GetProjectPaletteFunction = (
  projectId: ProjectId | string
) => ProjectColorPalette | null;

/**
 * Get semantic color
 */
export type GetSemanticColorFunction = (
  projectId: ProjectId,
  role: SemanticColorRole
) => Color;

/**
 * Apply theme to document
 */
export type ApplyProjectThemeColorsFunction = (projectId: ProjectId) => void;

/**
 * Get CSS variables object
 */
export type GetCSSVariablesObjectFunction = (
  projectId: ProjectId
) => Record<string, Record<string, string>>;

/**
 * Get all project IDs
 */
export type GetAllProjectIdsFunction = () => ProjectId[];

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

/**
 * Props for theme provider component
 */
export interface ThemeProviderProps {
  projectId: ProjectId;
  children: React.ReactNode;
  onThemeChange?: (projectId: ProjectId) => void;
}

/**
 * Props for color-aware components
 */
export interface ColorAwareComponentProps {
  projectId?: ProjectId;
  customColors?: Partial<ProjectColorPalette>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Props for semantic color components
 */
export interface SemanticColorProps {
  projectId: ProjectId;
  role: SemanticColorRole;
  children: React.ReactNode;
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

/**
 * Color validation result
 */
export interface ColorValidationResult {
  valid: boolean;
  format: 'hex' | 'rgba' | 'invalid';
  contrast?: number;
  wcagLevel?: 'AA' | 'AAA';
}

/**
 * Palette validation result
 */
export interface PaletteValidationResult {
  valid: boolean;
  missingColors: string[];
  contrastIssues: string[];
  warnings: string[];
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Check if value is a valid ProjectId
 */
export function isValidProjectId(value: unknown): value is ProjectId {
  return typeof value === 'string' && isProjectId(value);
}

/**
 * Check if value is a valid SemanticColorRole
 */
export function isSemanticColorRole(value: unknown): value is SemanticColorRole {
  return typeof value === 'string' && ['success', 'warning', 'error', 'info'].includes(value);
}

/**
 * Check if value is a valid hex color
 */
export function isHexColor(value: unknown): value is HexColor {
  return typeof value === 'string' && /^#[0-9A-F]{6}$/i.test(value);
}

/**
 * Check if value is a valid rgba color
 */
export function isRgbaColor(value: unknown): value is RgbaColor {
  return typeof value === 'string' && /^rgba?\(/.test(value);
}

// ============================================================================
// CONSTANT TYPES
// ============================================================================

/**
 * All project IDs as a const array for iteration
 */
export const ALL_PROJECT_IDS = [
  'predictkit',
  'truthbounty',
  'foresight',
  'idealme',
  'signalhive',
  'veilpass',
  'payshield',
  'mantlecred',
] as const;

/**
 * All semantic roles as a const array
 */
export const ALL_SEMANTIC_ROLES = ['success', 'warning', 'error', 'info'] as const;

/**
 * Project categories as a const array
 */
export const ALL_CATEGORIES = ['DeFi', 'Privacy', 'Social', 'Productivity', 'RWA', 'Tech', 'Gaming'] as const;

// ============================================================================
// MAPPED TYPES (For generating types dynamically)
// ============================================================================

/**
 * Map project IDs to their color palettes
 */
export type ProjectPaletteMap = {
  [K in ProjectId]: ProjectColorPalette;
};

/**
 * Map semantic roles to colors
 */
export type SemanticColorMap = {
  [K in SemanticColorRole]: Color;
};

/**
 * Make all properties of a type optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Readonly version of color palette
 */
export type ReadonlyProjectColorPalette = Readonly<ProjectColorPalette>;


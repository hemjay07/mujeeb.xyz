/**
 * Premium Web3 Portfolio - Complete Color Token System
 *
 * This is a comprehensive color architecture for a premium Web3 portfolio
 * with 8 distinct projects, each with unique visual identities.
 *
 * Architecture:
 * 1. Global/Semantic Colors - Shared across all projects
 * 2. Per-Project Palettes - Unique colors for each of the 8 Web3 projects
 * 3. Semantic Mappings - How colors map to UI elements (buttons, cards, etc.)
 * 4. Theme Application System - Runtime theme switching with CSS variables
 * 5. Component Color Utilities - Functions for getting themed colors in components
 *
 * Design Principles:
 * - Premium feel: Rich, intentional color choices
 * - Dark theme baseline: All projects maintain dark aesthetic (except light variants)
 * - Cohesive yet distinct: Shared foundation with project-specific accents
 * - Accessibility: WCAG AA contrast maintained throughout
 * - GPU-optimized: CSS variables for smooth theme transitions
 */

// ============================================================================
// GLOBAL & SEMANTIC COLORS (Shared by All Projects)
// ============================================================================

/**
 * Base color palette that all projects inherit.
 * Projects override accent colors only.
 */
export const globalColors = {
  // Backgrounds - Deep Dark Terminal Aesthetic
  background: {
    base: '#0a0a0f',           // Main canvas background
    surface: '#12121a',         // Elevated surfaces (cards)
    elevated: '#1a1a24',        // Hover states, layer 2
    modal: '#0a0a0fcc',         // Semi-transparent overlay (80% opacity)
  },

  // Text Colors - High Contrast for Readability
  text: {
    primary: '#e4e4e7',         // Main body text (WCAG AA on #0a0a0f)
    secondary: '#a1a1a6',       // Reduced emphasis text
    muted: '#71717a',           // Tertiary text, labels
    dimmed: '#3f3f46',          // Quaternary, very subtle
    inverse: '#0a0a0f',         // Text on light/accent backgrounds
  },

  // Semantic Colors - Consistent Across All Projects
  semantic: {
    success: '#4ade80',         // Green - positive outcomes, solutions, checkmarks
    warning: '#fbbf24',         // Amber - challenges, alerts, attention
    error: '#ef4444',           // Red - errors, critical states
    info: '#3b82f6',            // Blue - informational, neutral accent
  },

  // Borders - Subtle and Intentional
  border: {
    default: '#1f1f2e',         // Standard border color
    hover: '#27272a',           // Slightly lighter on hover
    subtle: '#161618',          // More subtle variant
    light: '#2d2d4a',           // Lighter for emphasis
  },

  // Special Effects & Overlays
  overlay: {
    dark: 'rgba(0, 0, 0, 0.3)', // Darkening overlay
    light: 'rgba(255, 255, 255, 0.05)', // Subtle light overlay
    glow: 'rgba(34, 211, 238, 0.15)', // Cyan glow (default, will be overridden)
  },
} as const;

// ============================================================================
// PER-PROJECT COLOR PALETTES
// ============================================================================

/**
 * Complete color definition for a single project.
 * Includes all necessary colors for gallery, hero, content, and semantic mappings.
 */
export interface ProjectColorPalette {
  // Project Identity
  projectId: string;
  projectName: string;

  // Gallery & Card Backgrounds
  gallery: {
    background: string;        // 3D card background (dark, rich)
    border: string;            // Card border color when active
    borderGlow: string;        // Glow color (rgba)
  };

  // Case Study Backgrounds
  caseStudy: {
    heroBackground: string;    // Hero section background
    contentBackground: string; // Main content area (usually same as gallery)
    lightVariant: string;      // Light theme variant (if applicable)
  };

  // Primary Accent Colors
  accent: {
    primary: string;           // Main action color (replaces cyan)
    primaryHover: string;      // Hover state (darker)
    primaryLight: string;      // Lighter variant for backgrounds
    primarySubtle: string;     // Very light bg with opacity
  };

  // Secondary Accent
  secondary: {
    base: string;              // Secondary accent color
    hover: string;             // Darker secondary on hover
  };

  // Semantic Color Overrides (Project-Specific)
  semantic: {
    success: string;           // Override if needed, else falls back to global
    warning: string;           // Override if needed
    error: string;             // Override if needed
    info: string;              // Override if needed
  };

  // UI Element Colors
  button: {
    primary: {
      base: string;            // Border color
      hover: string;           // Hover text/border
      background: string;      // Background (usually transparent)
      text: string;            // Text color
    };
    secondary: {
      border: string;
      text: string;
      hover: string;
    };
    ghost: {
      text: string;
      hover: string;
    };
  };

  // Card Styling
  card: {
    default: {
      background: string;      // Card background
      border: string;          // Card border
      hover: {
        background: string;
        border: string;
      };
    };
    interactive: {
      border: string;
      borderHover: string;
      glowHover: string;       // Shadow/glow color
    };
    challenge: {
      background: string;      // Override semantic warning
      border: string;
    };
    solution: {
      background: string;      // Override semantic success
      border: string;
    };
  };

  // Tags & Badges
  tag: {
    default: {
      border: string;
      text: string;
      hover: string;
    };
    active: {
      background: string;      // Active state bg (with opacity)
      border: string;
      text: string;
    };
  };

  // Links & CTAs
  link: {
    text: string;
    hover: string;
    underline: string;
  };

  // Metadata & Stats
  metadata: {
    label: string;             // Label text color
    value: string;             // Value text color
    highlight: string;         // Emphasized values
  };

  // Section Headers (Terminal style: // about)
  sectionHeader: {
    label: string;             // Header color
    divider: string;           // Dividing line color
  };

  // Category Metadata
  category: 'DeFi' | 'Privacy' | 'Social' | 'Productivity' | 'RWA' | 'Tech' | 'Gaming';
}

/**
 * Master color palette for all 8 projects.
 * Each entry is a complete, self-contained color system.
 */
export const projectPalettes: Record<string, ProjectColorPalette> = {
  // ========================================================================
  // 1. PREDICTKIT - Blue SDK/Infrastructure
  // ========================================================================
  // Visual Signature: Light blue, clean technical aesthetic
  // Product Theme: Light theme documentation, blue CTAs
  // Brand Colors: Blue (#3b82f6), Gray accents
  predictkit: {
    projectId: 'predictkit',
    projectName: 'PredictKit',
    category: 'Tech',

    gallery: {
      background: '#1a2f4a',    // Deep blue-gray (dark rich)
      border: '#3b82f6',        // Bright blue
      borderGlow: 'rgba(59, 130, 246, 0.4)', // Blue glow
    },

    caseStudy: {
      heroBackground: '#1a2f4a',
      contentBackground: '#0a0a0f', // Falls back to base
      lightVariant: '#f0f7ff',  // Light blue variant
    },

    accent: {
      primary: '#3b82f6',       // Main blue
      primaryHover: '#2563eb',  // Darker blue
      primaryLight: '#dbeafe',  // Very light blue
      primarySubtle: 'rgba(59, 130, 246, 0.1)',
    },

    secondary: {
      base: '#2563eb',          // Darker blue
      hover: '#1d4ed8',         // Even darker
    },

    semantic: {
      success: '#4ade80',       // Green (no override)
      warning: '#fbbf24',       // Amber (no override)
      error: '#ef4444',         // Red (no override)
      info: '#3b82f6',          // Use primary as info
    },

    button: {
      primary: {
        base: '#3b82f6',
        hover: '#2563eb',
        background: 'transparent',
        text: '#3b82f6',
      },
      secondary: {
        border: '#2563eb',
        text: '#2563eb',
        hover: '#1d4ed8',
      },
      ghost: {
        text: '#71717a',
        hover: '#3b82f6',
      },
    },

    card: {
      default: {
        background: 'rgba(59, 130, 246, 0.03)',
        border: '#1f1f2e',
        hover: {
          background: 'rgba(59, 130, 246, 0.05)',
          border: '#3b82f6',
        },
      },
      interactive: {
        border: '#3b82f6',
        borderHover: '#2563eb',
        glowHover: 'rgba(59, 130, 246, 0.2)',
      },
      challenge: {
        background: 'rgba(251, 191, 36, 0.05)',
        border: 'rgba(251, 191, 36, 0.2)',
      },
      solution: {
        background: 'rgba(74, 222, 128, 0.05)',
        border: 'rgba(74, 222, 128, 0.2)',
      },
    },

    tag: {
      default: {
        border: '#1f1f2e',
        text: '#71717a',
        hover: '#3b82f6',
      },
      active: {
        background: 'rgba(59, 130, 246, 0.1)',
        border: '#3b82f6',
        text: '#3b82f6',
      },
    },

    link: {
      text: '#3b82f6',
      hover: '#2563eb',
      underline: '#3b82f6',
    },

    metadata: {
      label: '#71717a',
      value: '#e4e4e7',
      highlight: '#3b82f6',
    },

    sectionHeader: {
      label: '#3b82f6',
      divider: '#1f1f2e',
    },
  },

  // ========================================================================
  // 2. TRUTHBOUNTY - Purple Reputation
  // ========================================================================
  // Visual Signature: Purple + Amber for reputation scoring
  // Product Theme: Dark crypto dashboard, "Verified" in blue, "Valuable" in amber
  // Brand Colors: Purple (#a855f7), Amber (#f59e0b)
  truthbounty: {
    projectId: 'truthbounty',
    projectName: 'TruthBounty',
    category: 'DeFi',

    gallery: {
      background: '#2d1f3d',    // Deep purple
      border: '#a855f7',        // Vibrant purple
      borderGlow: 'rgba(168, 85, 247, 0.4)',
    },

    caseStudy: {
      heroBackground: '#2d1f3d',
      contentBackground: '#0a0a0f',
      lightVariant: '#faf5ff',  // Light purple variant
    },

    accent: {
      primary: '#a855f7',       // Purple
      primaryHover: '#9333ea',  // Darker purple
      primaryLight: '#e9d5ff',  // Very light purple
      primarySubtle: 'rgba(168, 85, 247, 0.1)',
    },

    secondary: {
      base: '#f59e0b',          // Amber (reputation/value)
      hover: '#d97706',         // Darker amber
    },

    semantic: {
      success: '#4ade80',
      warning: '#f59e0b',       // Use secondary as warning
      error: '#ef4444',
      info: '#a855f7',
    },

    button: {
      primary: {
        base: '#a855f7',
        hover: '#9333ea',
        background: 'transparent',
        text: '#a855f7',
      },
      secondary: {
        border: '#f59e0b',
        text: '#f59e0b',
        hover: '#d97706',
      },
      ghost: {
        text: '#71717a',
        hover: '#a855f7',
      },
    },

    card: {
      default: {
        background: 'rgba(168, 85, 247, 0.03)',
        border: '#1f1f2e',
        hover: {
          background: 'rgba(168, 85, 247, 0.05)',
          border: '#a855f7',
        },
      },
      interactive: {
        border: '#a855f7',
        borderHover: '#9333ea',
        glowHover: 'rgba(168, 85, 247, 0.2)',
      },
      challenge: {
        background: 'rgba(245, 158, 11, 0.05)',
        border: 'rgba(245, 158, 11, 0.2)',
      },
      solution: {
        background: 'rgba(74, 222, 128, 0.05)',
        border: 'rgba(74, 222, 128, 0.2)',
      },
    },

    tag: {
      default: {
        border: '#1f1f2e',
        text: '#71717a',
        hover: '#a855f7',
      },
      active: {
        background: 'rgba(168, 85, 247, 0.1)',
        border: '#a855f7',
        text: '#a855f7',
      },
    },

    link: {
      text: '#a855f7',
      hover: '#9333ea',
      underline: '#a855f7',
    },

    metadata: {
      label: '#71717a',
      value: '#e4e4e7',
      highlight: '#a855f7',
    },

    sectionHeader: {
      label: '#a855f7',
      divider: '#1f1f2e',
    },
  },

  // ========================================================================
  // 3. FORESIGHT - Amber Gaming & Social
  // ========================================================================
  // Visual Signature: Amber/Orange with gaming energy
  // Product Theme: Dark gaming dashboard, orange badges, green checkmarks
  // Brand Colors: Amber (#f59e0b), Green (#22c55e)
  foresight: {
    projectId: 'foresight',
    projectName: 'Foresight',
    category: 'Gaming',

    gallery: {
      background: '#0f2830',    // Dark teal-gray
      border: '#f59e0b',        // Bright amber
      borderGlow: 'rgba(245, 158, 11, 0.4)',
    },

    caseStudy: {
      heroBackground: '#0f2830',
      contentBackground: '#0a0a0f',
      lightVariant: '#ecfdf5',  // Light green variant
    },

    accent: {
      primary: '#f59e0b',       // Amber
      primaryHover: '#d97706',  // Darker amber
      primaryLight: '#fef3c7',  // Very light amber
      primarySubtle: 'rgba(245, 158, 11, 0.1)',
    },

    secondary: {
      base: '#22c55e',          // Bright green
      hover: '#16a34a',         // Darker green
    },

    semantic: {
      success: '#22c55e',       // Use secondary as success
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#22c55e',
    },

    button: {
      primary: {
        base: '#f59e0b',
        hover: '#d97706',
        background: 'transparent',
        text: '#f59e0b',
      },
      secondary: {
        border: '#22c55e',
        text: '#22c55e',
        hover: '#16a34a',
      },
      ghost: {
        text: '#71717a',
        hover: '#f59e0b',
      },
    },

    card: {
      default: {
        background: 'rgba(245, 158, 11, 0.03)',
        border: '#1f1f2e',
        hover: {
          background: 'rgba(245, 158, 11, 0.05)',
          border: '#f59e0b',
        },
      },
      interactive: {
        border: '#f59e0b',
        borderHover: '#d97706',
        glowHover: 'rgba(245, 158, 11, 0.2)',
      },
      challenge: {
        background: 'rgba(245, 158, 11, 0.05)',
        border: 'rgba(245, 158, 11, 0.2)',
      },
      solution: {
        background: 'rgba(34, 197, 94, 0.05)',
        border: 'rgba(34, 197, 94, 0.2)',
      },
    },

    tag: {
      default: {
        border: '#1f1f2e',
        text: '#71717a',
        hover: '#f59e0b',
      },
      active: {
        background: 'rgba(245, 158, 11, 0.1)',
        border: '#f59e0b',
        text: '#f59e0b',
      },
    },

    link: {
      text: '#f59e0b',
      hover: '#d97706',
      underline: '#f59e0b',
    },

    metadata: {
      label: '#71717a',
      value: '#e4e4e7',
      highlight: '#f59e0b',
    },

    sectionHeader: {
      label: '#f59e0b',
      divider: '#1f1f2e',
    },
  },

  // ========================================================================
  // 4. IDEALME - Orange Productivity
  // ========================================================================
  // Visual Signature: Warm orange (desktop/productivity energy)
  // Product Theme: Dark Electron app with orange highlights
  // Brand Colors: Orange (#f97316), Lighter Orange (#fb923c)
  idealme: {
    projectId: 'idealme',
    projectName: 'IdealMe',
    category: 'Productivity',

    gallery: {
      background: '#3d2314',    // Deep orange-brown
      border: '#f97316',        // Vibrant orange
      borderGlow: 'rgba(249, 115, 22, 0.4)',
    },

    caseStudy: {
      heroBackground: '#3d2314',
      contentBackground: '#0a0a0f',
      lightVariant: '#fff7ed',  // Light orange variant
    },

    accent: {
      primary: '#f97316',       // Orange
      primaryHover: '#ea580c',  // Darker orange
      primaryLight: '#fed7aa',  // Very light orange
      primarySubtle: 'rgba(249, 115, 22, 0.1)',
    },

    secondary: {
      base: '#fb923c',          // Lighter orange
      hover: '#f97316',         // Back to primary
    },

    semantic: {
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#f97316',
    },

    button: {
      primary: {
        base: '#f97316',
        hover: '#ea580c',
        background: 'transparent',
        text: '#f97316',
      },
      secondary: {
        border: '#fb923c',
        text: '#fb923c',
        hover: '#f97316',
      },
      ghost: {
        text: '#71717a',
        hover: '#f97316',
      },
    },

    card: {
      default: {
        background: 'rgba(249, 115, 22, 0.03)',
        border: '#1f1f2e',
        hover: {
          background: 'rgba(249, 115, 22, 0.05)',
          border: '#f97316',
        },
      },
      interactive: {
        border: '#f97316',
        borderHover: '#ea580c',
        glowHover: 'rgba(249, 115, 22, 0.2)',
      },
      challenge: {
        background: 'rgba(251, 191, 36, 0.05)',
        border: 'rgba(251, 191, 36, 0.2)',
      },
      solution: {
        background: 'rgba(74, 222, 128, 0.05)',
        border: 'rgba(74, 222, 128, 0.2)',
      },
    },

    tag: {
      default: {
        border: '#1f1f2e',
        text: '#71717a',
        hover: '#f97316',
      },
      active: {
        background: 'rgba(249, 115, 22, 0.1)',
        border: '#f97316',
        text: '#f97316',
      },
    },

    link: {
      text: '#f97316',
      hover: '#ea580c',
      underline: '#f97316',
    },

    metadata: {
      label: '#71717a',
      value: '#e4e4e7',
      highlight: '#f97316',
    },

    sectionHeader: {
      label: '#f97316',
      divider: '#1f1f2e',
    },
  },

  // ========================================================================
  // 5. SIGNALHIVE - Pink + Cyan Futuristic Trading
  // ========================================================================
  // Visual Signature: Hot pink with cyan accents (futuristic)
  // Product Theme: Vibrant dark with mesh pattern, pink headlines
  // Brand Colors: Pink (#ec4899), Cyan (#22d3ee)
  signalhive: {
    projectId: 'signalhive',
    projectName: 'SignalHive',
    category: 'DeFi',

    gallery: {
      background: '#1a1a2e',    // Very dark navy with mesh
      border: '#ec4899',        // Hot pink
      borderGlow: 'rgba(236, 72, 153, 0.4)',
    },

    caseStudy: {
      heroBackground: '#1a1a2e',
      contentBackground: '#0a0a0f',
      lightVariant: '#fdf2f8',  // Light pink variant
    },

    accent: {
      primary: '#ec4899',       // Hot pink
      primaryHover: '#db2777',  // Darker pink
      primaryLight: '#fbcfe8',  // Very light pink
      primarySubtle: 'rgba(236, 72, 153, 0.1)',
    },

    secondary: {
      base: '#22d3ee',          // Cyan (futuristic)
      hover: '#06b6d4',         // Darker cyan
    },

    semantic: {
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#22d3ee',
    },

    button: {
      primary: {
        base: '#ec4899',
        hover: '#db2777',
        background: 'transparent',
        text: '#ec4899',
      },
      secondary: {
        border: '#22d3ee',
        text: '#22d3ee',
        hover: '#06b6d4',
      },
      ghost: {
        text: '#71717a',
        hover: '#ec4899',
      },
    },

    card: {
      default: {
        background: 'rgba(236, 72, 153, 0.03)',
        border: '#1f1f2e',
        hover: {
          background: 'rgba(236, 72, 153, 0.05)',
          border: '#ec4899',
        },
      },
      interactive: {
        border: '#ec4899',
        borderHover: '#db2777',
        glowHover: 'rgba(236, 72, 153, 0.2)',
      },
      challenge: {
        background: 'rgba(251, 191, 36, 0.05)',
        border: 'rgba(251, 191, 36, 0.2)',
      },
      solution: {
        background: 'rgba(74, 222, 128, 0.05)',
        border: 'rgba(74, 222, 128, 0.2)',
      },
    },

    tag: {
      default: {
        border: '#1f1f2e',
        text: '#71717a',
        hover: '#ec4899',
      },
      active: {
        background: 'rgba(236, 72, 153, 0.1)',
        border: '#ec4899',
        text: '#ec4899',
      },
    },

    link: {
      text: '#ec4899',
      hover: '#db2777',
      underline: '#ec4899',
    },

    metadata: {
      label: '#71717a',
      value: '#e4e4e7',
      highlight: '#ec4899',
    },

    sectionHeader: {
      label: '#ec4899',
      divider: '#1f1f2e',
    },
  },

  // ========================================================================
  // 6. VEILPASS - Indigo + Pink Privacy
  // ========================================================================
  // Visual Signature: Indigo/Violet with pink gradient accents
  // Product Theme: Light professional theme originally, adapting to dark
  // Brand Colors: Indigo (#6366f1), Pink (#ec4899)
  veilpass: {
    projectId: 'veilpass',
    projectName: 'VeilPass',
    category: 'Privacy',

    gallery: {
      background: '#1f1f2e',    // Dark neutral
      border: '#8b5cf6',        // Indigo/Violet
      borderGlow: 'rgba(139, 92, 246, 0.4)',
    },

    caseStudy: {
      heroBackground: '#1f1f2e',
      contentBackground: '#0a0a0f',
      lightVariant: '#f5f3ff',  // Light purple variant
    },

    accent: {
      primary: '#8b5cf6',       // Violet
      primaryHover: '#7c3aed',  // Darker violet
      primaryLight: '#ede9fe',  // Very light violet
      primarySubtle: 'rgba(139, 92, 246, 0.1)',
    },

    secondary: {
      base: '#ec4899',          // Pink (gradient accent)
      hover: '#db2777',         // Darker pink
    },

    semantic: {
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#8b5cf6',
    },

    button: {
      primary: {
        base: '#8b5cf6',
        hover: '#7c3aed',
        background: 'transparent',
        text: '#8b5cf6',
      },
      secondary: {
        border: '#ec4899',
        text: '#ec4899',
        hover: '#db2777',
      },
      ghost: {
        text: '#71717a',
        hover: '#8b5cf6',
      },
    },

    card: {
      default: {
        background: 'rgba(139, 92, 246, 0.03)',
        border: '#1f1f2e',
        hover: {
          background: 'rgba(139, 92, 246, 0.05)',
          border: '#8b5cf6',
        },
      },
      interactive: {
        border: '#8b5cf6',
        borderHover: '#7c3aed',
        glowHover: 'rgba(139, 92, 246, 0.2)',
      },
      challenge: {
        background: 'rgba(251, 191, 36, 0.05)',
        border: 'rgba(251, 191, 36, 0.2)',
      },
      solution: {
        background: 'rgba(74, 222, 128, 0.05)',
        border: 'rgba(74, 222, 128, 0.2)',
      },
    },

    tag: {
      default: {
        border: '#1f1f2e',
        text: '#71717a',
        hover: '#8b5cf6',
      },
      active: {
        background: 'rgba(139, 92, 246, 0.1)',
        border: '#8b5cf6',
        text: '#8b5cf6',
      },
    },

    link: {
      text: '#8b5cf6',
      hover: '#7c3aed',
      underline: '#8b5cf6',
    },

    metadata: {
      label: '#71717a',
      value: '#e4e4e7',
      highlight: '#8b5cf6',
    },

    sectionHeader: {
      label: '#8b5cf6',
      divider: '#1f1f2e',
    },
  },

  // ========================================================================
  // 7. PAYSHIELD - Emerald Privacy Payments
  // ========================================================================
  // Visual Signature: Emerald green (trust, privacy)
  // Product Theme: Dark privacy-focused with emerald accents
  // Brand Colors: Emerald (#10b981), Indigo secondary
  payshield: {
    projectId: 'payshield',
    projectName: 'PayShield',
    category: 'Privacy',

    gallery: {
      background: '#0a1628',    // Very dark navy
      border: '#22d3ee',        // Cyan/Emerald
      borderGlow: 'rgba(34, 211, 238, 0.4)',
    },

    caseStudy: {
      heroBackground: '#0a1628',
      contentBackground: '#0a0a0f',
      lightVariant: '#ecfeff',  // Light cyan variant
    },

    accent: {
      primary: '#22d3ee',       // Cyan (emerald feel)
      primaryHover: '#06b6d4',  // Darker cyan
      primaryLight: '#cffafe',  // Very light cyan
      primarySubtle: 'rgba(34, 211, 238, 0.1)',
    },

    secondary: {
      base: '#6366f1',          // Indigo
      hover: '#4f46e5',         // Darker indigo
    },

    semantic: {
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#22d3ee',
    },

    button: {
      primary: {
        base: '#22d3ee',
        hover: '#06b6d4',
        background: 'transparent',
        text: '#22d3ee',
      },
      secondary: {
        border: '#6366f1',
        text: '#6366f1',
        hover: '#4f46e5',
      },
      ghost: {
        text: '#71717a',
        hover: '#22d3ee',
      },
    },

    card: {
      default: {
        background: 'rgba(34, 211, 238, 0.03)',
        border: '#1f1f2e',
        hover: {
          background: 'rgba(34, 211, 238, 0.05)',
          border: '#22d3ee',
        },
      },
      interactive: {
        border: '#22d3ee',
        borderHover: '#06b6d4',
        glowHover: 'rgba(34, 211, 238, 0.2)',
      },
      challenge: {
        background: 'rgba(251, 191, 36, 0.05)',
        border: 'rgba(251, 191, 36, 0.2)',
      },
      solution: {
        background: 'rgba(74, 222, 128, 0.05)',
        border: 'rgba(74, 222, 128, 0.2)',
      },
    },

    tag: {
      default: {
        border: '#1f1f2e',
        text: '#71717a',
        hover: '#22d3ee',
      },
      active: {
        background: 'rgba(34, 211, 238, 0.1)',
        border: '#22d3ee',
        text: '#22d3ee',
      },
    },

    link: {
      text: '#22d3ee',
      hover: '#06b6d4',
      underline: '#22d3ee',
    },

    metadata: {
      label: '#71717a',
      value: '#e4e4e7',
      highlight: '#22d3ee',
    },

    sectionHeader: {
      label: '#22d3ee',
      divider: '#1f1f2e',
    },
  },

  // ========================================================================
  // 8. MANTLECRED - Orange RWA DeFi
  // ========================================================================
  // Visual Signature: Orange with fintech grid aesthetic
  // Product Theme: Dark fintech with orange buttons and grid
  // Brand Colors: Orange (#f97316), Amber warnings
  mantlecred: {
    projectId: 'mantlecred',
    projectName: 'MantleCred',
    category: 'RWA',

    gallery: {
      background: '#1a1a1a',    // Near black with grid pattern
      border: '#ef4444',        // Red/Orange
      borderGlow: 'rgba(239, 68, 68, 0.4)',
    },

    caseStudy: {
      heroBackground: '#1a1a1a',
      contentBackground: '#0a0a0f',
      lightVariant: '#fef2f2',  // Light red variant
    },

    accent: {
      primary: '#ef4444',       // Red (fintech energy)
      primaryHover: '#dc2626',  // Darker red
      primaryLight: '#fee2e2',  // Very light red
      primarySubtle: 'rgba(239, 68, 68, 0.1)',
    },

    secondary: {
      base: '#fbbf24',          // Amber (warnings, alerts)
      hover: '#f59e0b',         // Darker amber
    },

    semantic: {
      success: '#4ade80',
      warning: '#fbbf24',       // Use secondary as warning
      error: '#ef4444',
      info: '#ef4444',
    },

    button: {
      primary: {
        base: '#ef4444',
        hover: '#dc2626',
        background: 'transparent',
        text: '#ef4444',
      },
      secondary: {
        border: '#fbbf24',
        text: '#fbbf24',
        hover: '#f59e0b',
      },
      ghost: {
        text: '#71717a',
        hover: '#ef4444',
      },
    },

    card: {
      default: {
        background: 'rgba(239, 68, 68, 0.03)',
        border: '#1f1f2e',
        hover: {
          background: 'rgba(239, 68, 68, 0.05)',
          border: '#ef4444',
        },
      },
      interactive: {
        border: '#ef4444',
        borderHover: '#dc2626',
        glowHover: 'rgba(239, 68, 68, 0.2)',
      },
      challenge: {
        background: 'rgba(251, 191, 36, 0.05)',
        border: 'rgba(251, 191, 36, 0.2)',
      },
      solution: {
        background: 'rgba(74, 222, 128, 0.05)',
        border: 'rgba(74, 222, 128, 0.2)',
      },
    },

    tag: {
      default: {
        border: '#1f1f2e',
        text: '#71717a',
        hover: '#ef4444',
      },
      active: {
        background: 'rgba(239, 68, 68, 0.1)',
        border: '#ef4444',
        text: '#ef4444',
      },
    },

    link: {
      text: '#ef4444',
      hover: '#dc2626',
      underline: '#ef4444',
    },

    metadata: {
      label: '#71717a',
      value: '#e4e4e7',
      highlight: '#ef4444',
    },

    sectionHeader: {
      label: '#ef4444',
      divider: '#1f1f2e',
    },
  },
};

// ============================================================================
// THEME APPLICATION & RUNTIME SYSTEM
// ============================================================================

/**
 * Get a specific project's color palette.
 * Falls back to default palette if project not found.
 *
 * Usage:
 * ```tsx
 * const palette = getProjectPalette('predictkit');
 * return <div style={{ color: palette.text.primary }} />;
 * ```
 */
export function getProjectPalette(projectId: string): ProjectColorPalette {
  const palette = projectPalettes[projectId];
  if (!palette) {
    console.warn(`Project palette not found for ${projectId}, using fallback`);
    return projectPalettes.predictkit; // Fallback to first project
  }
  return palette;
}

/**
 * Apply project theme to document root.
 * Sets CSS variables for seamless theme transitions.
 *
 * Usage:
 * ```tsx
 * useEffect(() => {
 *   applyProjectThemeColors('predictkit');
 * }, [projectId]);
 * ```
 */
export function applyProjectThemeColors(projectId: string): void {
  const palette = getProjectPalette(projectId);
  const root = document.documentElement;

  // Accent colors
  root.style.setProperty('--accent-primary', palette.accent.primary);
  root.style.setProperty('--accent-primary-hover', palette.accent.primaryHover);
  root.style.setProperty('--accent-secondary', palette.secondary.base);

  // Text colors
  root.style.setProperty('--text-accent', palette.accent.primary);
  root.style.setProperty('--text-secondary', palette.secondary.base);

  // Borders
  root.style.setProperty('--border-accent', palette.gallery.border);

  // Glow effects
  root.style.setProperty('--glow-accent', palette.gallery.borderGlow);
}

/**
 * Generate CSS variable object for inline styles.
 * Useful for React components that need theme colors.
 *
 * Usage:
 * ```tsx
 * const colors = getCSSVariablesObject('predictkit');
 * return <div style={colors.accentPrimary} />;
 * ```
 */
export function getCSSVariablesObject(
  projectId: string
): Record<string, Record<string, string>> {
  const palette = getProjectPalette(projectId);

  return {
    accent: {
      '--accent-primary': palette.accent.primary,
      '--accent-primary-hover': palette.accent.primaryHover,
      '--accent-secondary': palette.secondary.base,
    },
    text: {
      '--text-primary': palette.metadata.value,
      '--text-muted': palette.metadata.label,
      '--text-accent': palette.accent.primary,
    },
    border: {
      '--border-default': palette.card.default.border,
      '--border-accent': palette.gallery.border,
    },
  };
}

// ============================================================================
// UTILITY FUNCTIONS FOR COMPONENTS
// ============================================================================

/**
 * Get the appropriate color for a semantic role in a specific project.
 * Respects project overrides.
 *
 * Usage:
 * ```tsx
 * const successColor = getSemanticColor('predictkit', 'success');
 * ```
 */
export function getSemanticColor(
  projectId: string,
  role: 'success' | 'warning' | 'error' | 'info'
): string {
  const palette = getProjectPalette(projectId);

  switch (role) {
    case 'success':
      return palette.semantic.success || globalColors.semantic.success;
    case 'warning':
      return palette.semantic.warning || globalColors.semantic.warning;
    case 'error':
      return palette.semantic.error || globalColors.semantic.error;
    case 'info':
      return palette.semantic.info || globalColors.semantic.info;
    default:
      return globalColors.semantic.success;
  }
}

/**
 * Generate fallback color if project theme unavailable.
 * Returns a sensible default that maintains design coherence.
 */
export function getFallbackColor(role: 'primary' | 'secondary' | 'border'): string {
  switch (role) {
    case 'primary':
      return '#22d3ee'; // Cyan fallback
    case 'secondary':
      return '#71717a'; // Muted text
    case 'border':
      return '#1f1f2e'; // Subtle border
    default:
      return '#e4e4e7'; // Text primary
  }
}

/**
 * Get all project IDs (useful for generating theme CSS at build time).
 */
export function getAllProjectIds(): string[] {
  return Object.keys(projectPalettes);
}

/**
 * Merge project palette with global defaults.
 * Ensures all required colors exist even if not explicitly set.
 */
export function resolveProjectColors(projectId: string): ProjectColorPalette {
  const palette = getProjectPalette(projectId);

  // Ensure all required colors exist (already done in palette definition)
  return palette;
}

// Type exports for strict typing
export type GlobalColors = typeof globalColors;
export type ProjectPalettes = typeof projectPalettes;

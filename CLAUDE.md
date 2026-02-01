# Mujeeb Portfolio - Complete Design System & Guidelines

## Design Philosophy

**Terminal-Meets-Editorial** - A hacker/developer aesthetic with editorial clarity.

Each of the 8 Web3 projects has its own visual identity while maintaining a cohesive dark baseline.

### Core Identity
- **Aesthetic**: Terminal/Hacker inspired - dark backgrounds, monospace fonts, command-line UI patterns
- **Palette**: Deep dark (#0a0a0f), project-specific accents, green success, amber warnings
- **Typography**: Space Grotesk for display, IBM Plex Mono for UI/code
- **Vibe**: Professional developer's terminal + editorial clarity
- **Premium Feel**: Generous whitespace, smooth transitions (200-1200ms), intentional animations

---

## Design System Structure

The design system is divided into 4 core files (in `src/design/`):

### 1. **tokens.ts** - Foundation Layer
Three-tier token system with:
- **Base tokens**: Spacing, sizing, timing, easing
- **Semantic tokens**: Colors, shadows, opacity (dark theme baseline)
- **Component tokens**: Button sizes, card spacing, form inputs

Import and use:
```tsx
import { baseTokens, semanticTokens, componentTokens } from '@/design/tokens';
```

### 2. **themes.ts** - Project-Specific Theming
Each project (PredictKit, TruthBounty, etc.) has:
- Primary accent color (replaces cyan)
- Secondary accent color
- Gallery background
- Case study light variant

Apply theme:
```tsx
import { applyProjectTheme } from '@/design/themes';
applyProjectTheme('predictkit');  // Sets CSS variables
```

### 3. **animations.ts** - Motion System
Centralized animation definitions:
- Timing presets (fast: 200ms, base: 300ms, slow: 500ms+)
- Easing functions (easeOutQuint for entrances)
- Keyframe animations (fadeIn, slideInUp, etc.)
- GSAP presets
- Stagger delay calculator

Use:
```tsx
import { animationTiming, easing, keyframes } from '@/design/animations';
```

### 4. **components.ts** - Component Patterns
Reusable component style patterns:
- Button variants (primary, secondary, ghost, terminal)
- Card variants (default, interactive, challenge, solution, featured)
- Tag patterns
- Input patterns
- Section headers
- Layout patterns

---

## Color Palette & Per-Project Themes

### Base Palette (Shared by All Projects)

```css
/* Backgrounds */
--bg-base: #0a0a0f;        /* Main background */
--bg-surface: #12121a;      /* Cards, elevated surfaces */
--bg-elevated: #1a1a24;     /* Hover states, active cards */

/* Text */
--text-primary: #e4e4e7;    /* Main text */
--text-muted: #71717a;      /* Secondary text */
--text-dimmed: #3f3f46;     /* Tertiary, labels */

/* Semantic Colors (NOT accent - always same) */
--color-success: #4ade80;   /* Green - success, solution, positive */
--color-warning: #fbbf24;   /* Amber - highlights, challenges */
--color-error: #ef4444;     /* Red - errors, critical */
```

### Per-Project Accent Colors

Each project **replaces cyan (#22d3ee)** with its own accent:

| Project | Accent | Primary | Secondary | Category |
|---------|--------|---------|-----------|----------|
| **PredictKit** | Blue | `#60a5fa` | `#3b82f6` | Tech/DeFi |
| **TruthBounty** | Purple | `#c084fc` | `#a855f7` | DeFi/Reputation |
| **Foresight** | Green | `#34d399` | `#10b981` | Social/Gaming |
| **IdealMe** | Orange | `#fb923c` | `#f97316` | Productivity |
| **SignalHive** | Pink | `#f472b6` | `#ec4899` | DeFi/Trading |
| **VeilPass** | Violet | `#8b5cf6` | `#7c3aed` | Privacy |
| **PayShield** | Cyan | `#22d3ee` | `#06b6d4` | Privacy/Payments |
| **MantleCred** | Red | `#ef4444` | `#dc2626` | RWA/DeFi |

**How it works:**
1. Baseline cyan is used throughout components (e.g., `text-cyan-400`)
2. When a project loads, `applyProjectTheme()` sets CSS variables
3. All `text-cyan-*` automatically become the project's accent color
4. No component changes needed - automatic via CSS cascade

---

## Typography

### Font Stack
- **Display/Headings**: `'Space Grotesk', -apple-system, sans-serif`
- **Body**: `'Space Grotesk', -apple-system, sans-serif`
- **Mono/Code/UI**: `'IBM Plex Mono', 'JetBrains Mono', monospace`

### Usage Rules
- **Monospace**: All UI labels, buttons, stats, metadata, technical terms, paths
- **Space Grotesk**: All headings, body text, project titles, narratives
- **Bold**: Important headings, project titles
- **Regular**: Body text, descriptions

### Line Length & Readability
- Body text: Max 80 characters per line
- Headings: Can be longer
- Monospace: Generally shorter (code, metadata)

---

## UI Patterns & Component Styles

All components follow patterns defined in `src/design/components.ts`.

### Button Patterns

**Sizes:**
- `sm`: 12px padding, text-xs
- `md`: 16px padding, text-sm (default)
- `lg`: 24px padding, text-base

**Variants:**
- `primary`: Border only, accent color on hover
- `secondary`: Subtle, muted text
- `ghost`: Minimal, transparent
- `terminal`: Monospace with `>` prefix

Example:
```tsx
import { buttonPattern } from '@/design/components';

<button className={`${buttonPattern.baseClasses} ${buttonPattern.sizes.md} ${buttonPattern.variants.primary.base}`}>
  Action
</button>
```

### Card Patterns

**Variants:**
- `default`: Standard surface (p-6, border, rounded-xs)
- `interactive`: Responds to hover with accent glow
- `challenge`: Amber accent background (for problems)
- `solution`: Green accent background (for answers)
- `featured`: Cyan glow on border

```tsx
import { cardPattern } from '@/design/components';

<div className={`${cardPattern.baseClasses} ${cardPattern.variants.interactive}`}>
  Content
</div>
```

### Terminal-Style Elements

**Back Button**:
```jsx
<button>
  <span>cd</span>
  <span className="text-cyan-400">..</span>
</button>
```

**Section Headers** (Terminal comment style):
```jsx
<div className="flex items-center gap-4 mb-8">
  <span className="font-mono text-xs text-cyan-400">// about</span>
  <div className="flex-1 h-px bg-zinc-800" />
</div>
```

**Stats Display**:
```jsx
<div className="font-mono">
  <span className="text-4xl font-bold text-cyan-400">2</span>
  <span className="text-sm text-zinc-500"> weeks</span>
  <div className="text-xs text-zinc-600 uppercase">build time</div>
</div>
```

**Feature Cards** (Numbered grid):
```jsx
<div className="p-6 bg-zinc-900/30 border border-zinc-800">
  <span className="font-mono text-lg text-cyan-500/60">01</span>
  <h4 className="font-mono text-sm text-zinc-200 mt-2">Title</h4>
  <p className="text-zinc-500 text-sm">Description...</p>
</div>
```

**Challenge/Solution Cards**:
- Challenge: Amber accent (#fbbf24) with `!` icon
- Solution: Green accent (#4ade80) with `✓` icon
- Use accent background at 5% opacity (e.g., bg-amber-500/5)

### Navigation
- Top-left: Logo or status indicator (`● mujeeb.dev`)
- Top-right: `/about` link
- Right side: Vertical navigation bars (prefer bars over dots)
- Fixed header: 80px height minimum with clear hierarchy

### Cards & Surfaces
- Padding: Consistent (24px default, 16px for compact)
- Borders: 1px solid #1f1f2e (subtle, not prominent)
- Border radius: 2-4px maximum (minimal rounding)
- Grid pattern background: Optional (subtle 1% opacity)
- Hover state: Lighter border (#27272a), slightly darker background
- Active state: Accent color border, glow effect

---

## Animation Guidelines

### Timing & Easing Standards

**Timing:**
| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 200ms | Hover, micro-interactions |
| Base | 300ms | Standard transitions |
| Slow | 500ms | Entrance animations |
| Slower | 700ms | Page transitions, major movements |
| Slowest | 1000ms | Hero entrance, initial load |

**Easing:**
- `easeOutQuint` (cubic-bezier(0.22, 1, 0.36, 1)): Bouncy, natural feel - use for entrances
- `easeOut` (cubic-bezier(0, 0, 0.2, 1)): Standard exit animation
- `easeInOut` (cubic-bezier(0.4, 0, 0.2, 1)): Smooth both directions
- `sharp` (cubic-bezier(0.4, 0.0, 0.2, 1)): Quick, immediate

### Entry Animations
- Duration: 800-1200ms
- Easing: easeOutQuint
- Stagger: 100-150ms between elements
- Start: Fade + translate from below (slideInUp)

### Scroll Animations
- Hero content: Fades out and moves up as user scrolls
- Content sections: Fade in from below when viewport visible
- Keep purposeful, never decorative
- Respect `prefers-reduced-motion` setting

### Hover States
- Duration: 200-300ms
- Easing: easeOut
- Keep subtle (color shift, slight glow, border change)
- Never move elements unexpectedly

### Page Transitions
- Reveal curtain: Left-to-right wipe (700ms)
- Fade: Content fades in/out (500ms)
- No jarring jumps or excessive motion

---

## Case Study Page Pattern

### Structure
1. **Hero**: 3D card stays visible and centered (Three.js)
2. **Content**: Starts below viewport, scrolls UP over the card
3. **Scroll Indicator**: At bottom center until user starts scrolling

### Layout

**Initial State:**
```
┌──────────────────────────────────────┐
│ cd..                        /about   │  <- Fixed header (80px)
│                                      │
│                                      │
│           [3D CARD - stays]          │  <- Gallery (centered)
│                                      │
│                                      │
│            ↓ scroll                  │  <- Scroll indicator
└──────────────────────────────────────┘
```

**After Scrolling:**
```
┌──────────────────────────────────────┐
│ cd..                        /about   │
├──────────────────────────────────────│
│ // about                             │
│                                      │
│ The API Layer for On-Chain...        │  <- Content slides over
│                                      │
│ [Challenge & Solution cards]         │
│                                      │
│       ROLE: Lead Engineer            │
│       BUILT IN: 2 weeks              │
│       YEAR: 2024                     │
└──────────────────────────────────────┘
```

### Key Rules
1. **Hero always visible at top**: 3D card doesn't get covered initially
2. **Content background**: Solid #0a0a0f starting ~70vh down
3. **Smooth scroll reveal**: Content fades in as it scrolls over card
4. **Terminal styling**: Monospace labels, `//` comment headers throughout
5. **Generous spacing**: 24-48px padding, 80px between sections
6. **Max width**: Case study content capped at 56rem (max-w-4xl)

---

## File Structure

```
src/
├── design/
│   ├── tokens.ts           # Base, semantic, component tokens
│   ├── themes.ts           # 8 project themes
│   ├── animations.ts       # Animation presets & GSAP configs
│   ├── components.ts       # Component pattern definitions
│   └── index.ts            # Barrel export
│
├── components/
│   ├── Gallery/
│   │   ├── Gallery.tsx     # Main gallery with Three.js
│   │   └── GalleryUI.tsx   # Gallery overlay UI
│   ├── CaseStudy/
│   │   └── CaseStudyView.tsx # Case study content (scrolls over card)
│   ├── Navigation/
│   │   └── Header.tsx      # Fixed header
│   ├── Common/
│   │   ├── Button.tsx      # Reusable button
│   │   ├── Card.tsx        # Reusable card
│   │   └── [Other primitives]
│   └── Preloader/
│       └── Preloader.tsx   # Initial loader
│
├── hooks/
│   ├── useTheme.ts         # Theme context
│   ├── useThreeGallery.ts  # Three.js logic
│   └── [Other hooks]
│
├── data/
│   └── projects.ts         # Project metadata + theme assignments
│
└── app/
    ├── globals.css         # Global styles, all theme CSS
    ├── layout.tsx          # Root layout
    └── page.tsx            # Main page
```

---

## Do's and Don'ts

### Design Do's
- Use tokens from `@/design/tokens` - never hardcode values
- Use component patterns from `@/design/components`
- Apply project theme colors via CSS variables
- Use semantic colors (success, warning) consistently
- Keep backgrounds very dark (#0a0a0f, #12121a)
- Use monospace for all data/metadata
- Animate purposefully - every motion has meaning
- Respect accessibility (WCAG AA contrast, keyboard nav)

### Design Don'ts
- Don't hardcode hex colors (use tokens)
- Don't use rounded corners > 8px (max: rounded-lg)
- Don't use gradients excessively (max 2 colors, subtle)
- Don't use generic "back" buttons (use `cd..` terminal style)
- Don't cover 3D card completely in case study hero
- Don't use colored backgrounds (keep dark baseline)
- Don't use decorative animations (no distractions)
- Don't forget animation timings (follow standards)
- Don't make text smaller than 12px without reason
- Don't add shadows > 1 layer deep

### Performance Do's
- Use CSS-only animations where possible
- GPU-accelerate with `transform` and `opacity`
- Lazy load Three.js and heavy components
- Prefer Tailwind classes over inline styles
- Cache animation values in constants
- Use memoization for theme calculations

### Git Workflow
- **ALWAYS commit every breakthrough change** - Create a checkpoint after any significant working state
- Commit before attempting risky refactors or experiments
- Use descriptive commit messages that explain the "why"
- Never leave working code uncommitted for long

---

## Implementation Workflow

### 1. Creating a New Component

Step-by-step process:

```tsx
// 1. Import design system
import { baseTokens, componentTokens } from '@/design/tokens';
import { buttonPattern } from '@/design/components';

// 2. Define props interface
interface MyComponentProps {
  children: ReactNode;
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// 3. Build component with patterns
export function MyComponent({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: MyComponentProps) {
  // 4. Compose class names
  const classes = `
    ${buttonPattern.baseClasses}
    ${buttonPattern.sizes[size]}
    ${buttonPattern.variants[variant].base}
    ${className}
  `.trim();

  return <button className={classes}>{children}</button>;
}
```

### 2. Applying Project Themes

In layout or root component:

```tsx
'use client';

import { useEffect } from 'react';
import { applyProjectTheme } from '@/design/themes';

export function ThemeProvider({ projectId, children }) {
  useEffect(() => {
    applyProjectTheme(projectId);
  }, [projectId]);

  return <>{children}</>;
}
```

Components automatically use the project's accent color:
- `text-cyan-400` becomes project accent
- `border-cyan-400` becomes project accent
- No individual component updates needed

### 3. Adding Animations

```tsx
import { animationTiming, easing } from '@/design/animations';
import { getStaggerDelay } from '@/design/animations';

// Use CSS classes
<div className="animate-slideInUp">Content</div>

// Or inline styles
<div
  style={{
    animation: `slideInUp ${animationTiming.slowestTrans} ${easing.easeOutQuint}`,
    animationDelay: getStaggerDelay(0),
  }}
>
  Content
</div>
```

### 4. Updating Design System

To change something globally:

1. **Change a color**: Update `src/design/themes.ts` → project theme
2. **Change spacing**: Update `src/design/tokens.ts` → baseTokens.spacing
3. **New animation**: Add to `src/design/animations.ts` → keyframes
4. **New component pattern**: Add to `src/design/components.ts`
5. **Update documentation**: Reflect changes in `/docs/DESIGN_SYSTEM.md`

---

## Quality Checklist

Before submitting code:

- [ ] Uses tokens (no hardcoded colors/spacing)
- [ ] Follows component patterns
- [ ] Animations use presets (200-1200ms range)
- [ ] Respects dark theme baseline
- [ ] Project theme applied (where needed)
- [ ] WCAG AA contrast maintained
- [ ] Keyboard navigable
- [ ] Focus states visible
- [ ] Mobile responsive (mobile-first)
- [ ] Tested in reduced-motion mode
- [ ] Documentation updated
- [ ] No unnecessary dependencies

---

## Documentation Files

- **`/docs/DESIGN_SYSTEM.md`**: Comprehensive system documentation
- **`/docs/COMPONENT_ARCHITECTURE.md`**: Component structure & patterns
- **`/CLAUDE.md`**: This file - quick reference guide

---

## Development Notes

- **Three.js**: Handles 3D gallery with smooth card transitions
- **GSAP**: Available for complex scroll animations (ScrollTrigger)
- **Tailwind v4**: CSS variables from globals.css, no hardcoded colors
- **Next.js 16**: App router, RSC where possible, client components for interactivity

---

**Design System Version:** 2.0
**Last Updated:** February 2026
**Status:** Actively Maintained
**Scope:** All 8 projects with individual themes

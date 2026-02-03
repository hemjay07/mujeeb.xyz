/**
 * Themed Component Example
 *
 * This is an example of how to create components that respond to theme changes
 * Use this as a template for building theme-aware components
 */

'use client';

import {
  useTheme,
  useCurrentTheme,
  useThemeColors,
  useSetTheme,
} from '@/design/context/useTheme';

/**
 * Example 1: Simple themed button component
 * Uses CSS variables directly
 */
export function ThemedButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-mono text-sm border transition-colors-theme"
      style={{
        borderColor: 'var(--theme-accent-primary)',
        color: 'var(--theme-accent-primary)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget.style as any).borderColor = 'var(--theme-accent-secondary)';
        (e.currentTarget.style as any).color = 'var(--theme-accent-secondary)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style as any).borderColor = 'var(--theme-accent-primary)';
        (e.currentTarget.style as any).color = 'var(--theme-accent-primary)';
      }}
    >
      {children}
    </button>
  );
}

/**
 * Example 2: Card component using theme hook
 * Accesses theme through useTheme hook
 */
export function ThemedCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { themeColors } = useTheme();

  return (
    <div
      className="p-6 border rounded transition-all-theme"
      style={{
        borderColor: themeColors.primary,
        backgroundColor: `color-mix(in srgb, ${themeColors.primary} 5%, transparent)`,
      }}
    >
      <h3 style={{ color: themeColors.primary }} className="font-bold mb-2">
        {title}
      </h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}

/**
 * Example 3: Component that displays current theme info
 */
export function CurrentThemeDisplay() {
  const { currentTheme, projectId, themeColors } = useTheme();

  return (
    <div className="p-4 border border-zinc-800 rounded">
      <h4 className="font-mono text-sm text-zinc-500 mb-3">current_theme</h4>

      <div className="space-y-2 font-mono text-sm">
        <div>
          <span className="text-zinc-600">project:</span>
          <span className="ml-2" style={{ color: themeColors.primary }}>
            {projectId}
          </span>
        </div>

        <div>
          <span className="text-zinc-600">name:</span>
          <span className="ml-2">{currentTheme.name}</span>
        </div>

        <div>
          <span className="text-zinc-600">primary:</span>
          <span
            className="ml-2 px-2 py-1 rounded border"
            style={{
              color: themeColors.primary,
              borderColor: themeColors.primary,
              backgroundColor: `color-mix(in srgb, ${themeColors.primary} 10%, transparent)`,
            }}
          >
            {themeColors.primary}
          </span>
        </div>

        <div>
          <span className="text-zinc-600">secondary:</span>
          <span
            className="ml-2 px-2 py-1 rounded border"
            style={{
              color: themeColors.secondary,
              borderColor: themeColors.secondary,
              backgroundColor: `color-mix(in srgb, ${themeColors.secondary} 10%, transparent)`,
            }}
          >
            {themeColors.secondary}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 4: Theme switcher component
 * Allows users to change themes
 */
export function ThemeSwitcher() {
  const setTheme = useSetTheme();
  const { projectId } = useTheme();

  const projects = ['predictkit', 'truthbounty', 'foresight', 'idealme', 'signalhive', 'veilpass', 'payshield', 'mantlecred'];

  return (
    <div className="flex flex-wrap gap-2">
      {projects.map((id) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`px-3 py-1 font-mono text-xs border rounded transition-all-theme ${
            projectId === id
              ? 'border-current'
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
          style={
            projectId === id
              ? { color: 'var(--theme-accent-primary)' }
              : {}
          }
        >
          {id}
        </button>
      ))}
    </div>
  );
}

/**
 * Example 5: Feature showcase component
 * Demonstrates multiple theme-aware elements together
 */
export function FeatureShowcase({
  title,
  features,
}: {
  title: string;
  features: string[];
}) {
  const { currentTheme, themeColors } = useTheme();

  return (
    <div className="space-y-6">
      <h2
        className="text-3xl font-bold"
        style={{ color: themeColors.primary }}
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-4 border rounded transition-all-theme"
            style={{
              borderColor: `color-mix(in srgb, ${themeColors.primary} 50%, transparent)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style as any).borderColor = themeColors.primary;
              (e.currentTarget.style as any).backgroundColor = `color-mix(in srgb, ${themeColors.primary} 5%, transparent)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style as any).borderColor = `color-mix(in srgb, ${themeColors.primary} 50%, transparent)`;
              (e.currentTarget.style as any).backgroundColor = 'transparent';
            }}
          >
            <span
              className="font-mono text-xs mr-2"
              style={{ color: themeColors.primary }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="text-zinc-300">{feature}</span>
          </div>
        ))}
      </div>

      <div className="text-xs text-zinc-600 border-t border-zinc-800 pt-4">
        <p>Project: <span style={{ color: themeColors.primary }}>{currentTheme.name}</span></p>
        <p>Category: {currentTheme.accentUse}</p>
      </div>
    </div>
  );
}

/**
 * Example 6: Multi-level component composition
 * Parent uses useTheme, passes to children
 */
interface ProjectCardProps {
  title: string;
  description: string;
}

function CardHeader({ title }: { title: string }) {
  const { themeColors } = useTheme();

  return (
    <h4 style={{ color: themeColors.primary }} className="font-bold text-lg">
      {title}
    </h4>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <p className="text-zinc-400">{children}</p>;
}

export function ProjectCard({ title, description }: ProjectCardProps) {
  const { themeColors } = useTheme();

  return (
    <div
      className="p-6 border rounded transition-all-theme cursor-pointer"
      style={{
        borderColor: `color-mix(in srgb, ${themeColors.primary} 30%, transparent)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget.style as any).borderColor = themeColors.primary;
        (e.currentTarget.style as any).backgroundColor = `color-mix(in srgb, ${themeColors.primary} 5%, transparent)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style as any).borderColor = `color-mix(in srgb, ${themeColors.primary} 30%, transparent)`;
        (e.currentTarget.style as any).backgroundColor = 'transparent';
      }}
    >
      <CardHeader title={title} />
      <CardBody>{description}</CardBody>
    </div>
  );
}

/**
 * Example 7: Component with conditional styling based on theme
 */
export function AdaptiveComponent() {
  const currentTheme = useCurrentTheme();
  const { themeColors } = useTheme();

  // Some components may need different styles for different projects
  const isPrivacyProject = currentTheme.accentUse === 'privacy';
  const isDeFiProject = currentTheme.accentUse === 'defi';

  return (
    <div
      className="p-6 border rounded"
      style={{
        borderColor: themeColors.primary,
        background: isPrivacyProject
          ? `color-mix(in srgb, ${themeColors.primary} 3%, transparent)`
          : isDeFiProject
            ? `color-mix(in srgb, ${themeColors.primary} 8%, transparent)`
            : `color-mix(in srgb, ${themeColors.primary} 5%, transparent)`,
      }}
    >
      <p>
        {isPrivacyProject && '🔒 Privacy-focused styling'}
        {isDeFiProject && '💰 DeFi-focused styling'}
        {!isPrivacyProject && !isDeFiProject && '⚙️ Standard styling'}
      </p>
    </div>
  );
}

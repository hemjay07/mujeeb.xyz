'use client';

import { useState } from 'react';

export interface AnimationConfig {
  // Entry animation
  stripScroll: number;
  entryZ: number;
  entryTilt: number;
  entryDuration: number;
  smoothness: number;

  // Gallery position
  galleryPosX: number;
  galleryRotX: number;
  galleryRotY: number;
  galleryRotZ: number;
  galleryBend: number;

  // Card dimensions
  cardWidth: number;
  cardHeight: number;
  spacing: number;
}

export const defaultConfig: AnimationConfig = {
  // Entry animation
  stripScroll: 17,      // Cards start above viewport
  entryZ: -9,           // Start behind
  entryTilt: -0.8,      // Initial tilt during entry
  entryDuration: 3.0,   // Entry animation duration
  smoothness: 3.0,      // Easing smoothness

  // Gallery settled position (from original that worked)
  galleryPosX: 1.2,     // Card X position
  galleryRotX: 0.03,    // Individual card X rotation
  galleryRotY: -0.27,   // Individual card Y rotation (creates parallelogram look)
  galleryRotZ: -0.12,   // Individual card Z rotation
  galleryBend: 0.4,     // Parabolic bend amount

  // Card dimensions (from original)
  cardWidth: 4.0,
  cardHeight: 3.1,
  spacing: 3.3,
};

interface AnimationControlsProps {
  config: AnimationConfig;
  onChange: (config: AnimationConfig) => void;
  onReset: () => void;
}

export default function AnimationControls({ config, onChange, onReset }: AnimationControlsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const updateValue = (key: keyof AnimationConfig, value: number) => {
    onChange({ ...config, [key]: value });
  };

  const ControlRow = ({
    label,
    configKey,
    min,
    max,
    step = 0.1
  }: {
    label: string;
    configKey: keyof AnimationConfig;
    min: number;
    max: number;
    step?: number;
  }) => (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-24 text-zinc-400">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={config[configKey]}
        onChange={(e) => updateValue(configKey, parseFloat(e.target.value))}
        className="flex-1 h-1 bg-zinc-700 rounded appearance-none cursor-pointer accent-cyan-400"
      />
      <span className="w-12 text-right text-cyan-400 font-mono">
        {config[configKey].toFixed(2)}
      </span>
    </div>
  );

  return (
    <div className="fixed top-4 right-4 z-[1000] font-mono">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-cyan-400 rounded mb-2 hover:bg-zinc-800"
      >
        {isOpen ? '× Close Controls' : '⚙ Animation Controls'}
      </button>

      {isOpen && (
        <div className="bg-zinc-900/95 border border-zinc-700 rounded-lg p-4 w-80 space-y-4 backdrop-blur">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
            Entry Animation
          </div>

          <div className="space-y-3">
            <ControlRow label="stripScroll" configKey="stripScroll" min={0} max={30} step={0.5} />
            <ControlRow label="entryZ" configKey="entryZ" min={-20} max={0} step={0.5} />
            <ControlRow label="entryTilt" configKey="entryTilt" min={-1.5} max={0} step={0.05} />
            <ControlRow label="duration" configKey="entryDuration" min={1} max={6} step={0.1} />
            <ControlRow label="smoothness" configKey="smoothness" min={1} max={6} step={0.1} />
          </div>

          <div className="border-t border-zinc-700 pt-4 mt-4">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Gallery Position
            </div>
            <div className="space-y-3">
              <ControlRow label="posX" configKey="galleryPosX" min={-2} max={4} step={0.1} />
              <ControlRow label="rotX" configKey="galleryRotX" min={-0.5} max={0.5} step={0.01} />
              <ControlRow label="rotY" configKey="galleryRotY" min={-1} max={1} step={0.01} />
              <ControlRow label="rotZ" configKey="galleryRotZ" min={-0.5} max={0.5} step={0.01} />
              <ControlRow label="bend" configKey="galleryBend" min={0} max={1} step={0.05} />
            </div>
          </div>

          <div className="border-t border-zinc-700 pt-4 mt-4">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Card Dimensions
            </div>
            <div className="space-y-3">
              <ControlRow label="width" configKey="cardWidth" min={2} max={6} step={0.1} />
              <ControlRow label="height" configKey="cardHeight" min={2} max={5} step={0.1} />
              <ControlRow label="spacing" configKey="spacing" min={2} max={5} step={0.1} />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onReset}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs py-2 rounded"
            >
              Reset to Default
            </button>
            <button
              onClick={() => {
                console.log('Current config:', JSON.stringify(config, null, 2));
                navigator.clipboard.writeText(JSON.stringify(config, null, 2));
              }}
              className="flex-1 bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-400 text-xs py-2 rounded"
            >
              Copy Config
            </button>
          </div>

          <div className="text-[10px] text-zinc-600 mt-2">
            Press R to replay entry animation
          </div>
        </div>
      )}
    </div>
  );
}

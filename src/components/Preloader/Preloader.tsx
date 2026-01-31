'use client';

import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

// Timing constants - slowed down for readability
const TYPING_SPEED = 60;
const PAUSE_AFTER_COMMAND = 400;
const PROGRESS_SPEED = 25;
const LINE_DELAY = 300;
const READY_PAUSE = 800;
const FINAL_PAUSE = 600;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState(0);
  const [typedCommand, setTypedCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [line1Progress, setLine1Progress] = useState(0);
  const [line2Progress, setLine2Progress] = useState(0);
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const command = './portfolio --projects=8';

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Stage 0: Type the command
  useEffect(() => {
    if (stage !== 0) return;

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < command.length) {
        setTypedCommand(command.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setStage(1), PAUSE_AFTER_COMMAND);
      }
    }, TYPING_SPEED);

    return () => clearInterval(typeInterval);
  }, [stage]);

  // Stage 1: Progress bar 1
  useEffect(() => {
    if (stage !== 1) return;

    const progressInterval = setInterval(() => {
      setLine1Progress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLine1Done(true);
          setTimeout(() => setStage(2), LINE_DELAY);
          return 100;
        }
        return prev + 6;
      });
    }, PROGRESS_SPEED);

    return () => clearInterval(progressInterval);
  }, [stage]);

  // Stage 2: Progress bar 2
  useEffect(() => {
    if (stage !== 2) return;

    const progressInterval = setInterval(() => {
      setLine2Progress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLine2Done(true);
          setTimeout(() => setStage(3), LINE_DELAY);
          return 100;
        }
        return prev + 7;
      });
    }, PROGRESS_SPEED);

    return () => clearInterval(progressInterval);
  }, [stage]);

  // Stage 3: Show ready and transition
  useEffect(() => {
    if (stage !== 3) return;

    setShowReady(true);

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, FINAL_PAUSE);
    }, READY_PAUSE);
  }, [stage, onComplete]);

  const getProgressBar = (progress: number) => {
    const filled = Math.min(12, Math.floor(progress / 8.34));
    const empty = Math.max(0, 12 - filled);
    return '█'.repeat(filled) + '░'.repeat(empty);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center transition-opacity duration-600 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow in center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.06) 0%, transparent 50%)',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      <div className="relative">
        {/* Main terminal content */}
        <div className="font-mono">
          {/* Command line - LARGE and prominent */}
          <div className="flex items-center text-lg mb-8">
            <span className="text-cyan-400 font-semibold">mujeeb</span>
            <span className="text-zinc-600">@</span>
            <span className="text-zinc-400">dev</span>
            <span className="text-zinc-600 ml-1">:~$</span>
            <span className="text-white font-medium ml-3">{typedCommand}</span>
            {stage === 0 && (
              <span
                className={`ml-0.5 text-cyan-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              >
                █
              </span>
            )}
          </div>

          {/* Output lines - slightly smaller, indented */}
          <div className="space-y-4 ml-6 text-base">
            {stage >= 1 && (
              <div className="flex items-center gap-4">
                <span className="text-zinc-500 w-40 whitespace-nowrap">loading projects</span>
                <span className="text-cyan-400/60 tracking-tight">{getProgressBar(line1Progress)}</span>
                <span
                  className={`text-green-400 font-medium transition-opacity duration-300 ${
                    line1Done ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  done
                </span>
              </div>
            )}

            {stage >= 2 && (
              <div className="flex items-center gap-4">
                <span className="text-zinc-500 w-40 whitespace-nowrap">checking vibes</span>
                <span className="text-cyan-400/60 tracking-tight">{getProgressBar(line2Progress)}</span>
                <span
                  className={`text-green-400 font-medium transition-opacity duration-300 ${
                    line2Done ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  immaculate
                </span>
              </div>
            )}
          </div>

          {/* Ready prompt - big and bold */}
          <div
            className={`mt-10 flex items-center transition-all duration-500 ${
              showReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="text-cyan-400 text-xl">{'>'}</span>
            <span className="text-white text-xl font-semibold ml-3">ready</span>
            <span
              className={`text-cyan-400 text-xl ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
            >
              _
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      {/* Corner info - accent colored */}
      <div className="absolute top-8 left-8 font-mono text-xs text-cyan-400/40">
        v1.0.0
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-cyan-400/40">
        2026
      </div>
    </div>
  );
}

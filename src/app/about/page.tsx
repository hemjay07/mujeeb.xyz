'use client';

import { useState, useEffect } from 'react';
import TransitionLink from '@/components/TransitionLink';
import Image from 'next/image';

export default function AboutPage() {
  const [typedText, setTypedText] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  const command = '$ ./mujeeb --stats';

  // Typing animation for hero
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < command.length) {
        setTypedText(command.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowStats(true), 400);
        setTimeout(() => setShowProcess(true), 800);
        setTimeout(() => setShowContact(true), 1200);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'projects_shipped', value: '13', highlight: true },
    { label: 'time_frame', value: '3 months', highlight: true },
    { label: 'avg_build_time', value: '3 days - 2 weeks' },
    { label: 'hackathon_misses', value: '6' },
    { label: 'reason', value: '"already building next one"' },
  ];

  const processPillars = [
    {
      label: 'RESEARCH',
      percentage: 40,
      description: 'Before writing a single line of code',
      details: [
        'Social media listening for user pain points',
        'Market validation and competitor analysis',
        'Understanding what users actually need vs what they say',
        '8-12 hours of research before implementation',
      ],
    },
    {
      label: 'ARCHITECTURE',
      percentage: 20,
      description: 'Avoiding roadblocks before they happen',
      details: [
        'Tech stack decisions based on project needs',
        'Scope definition - what ships, what doesn\'t',
        'Identifying potential blockers early',
        'Design system reuse to save 10+ hours per project',
      ],
    },
    {
      label: 'EXECUTION',
      percentage: 40,
      description: 'Heads-down shipping',
      details: [
        'No notifications, no meetings, just code',
        '48-72 hour sprints for core architecture',
        'Ship when it works, not when perfect',
        'Ruthless prioritization of features',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16">
        <TransitionLink href="/" className="flex items-center gap-3 group">
          <span className="font-mono text-xs text-zinc-500 group-hover:text-cyan-400 transition-colors">
            cd <span className="text-cyan-400">..</span>
          </span>
        </TransitionLink>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="font-mono text-xs text-zinc-500">/about</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-6 md:px-12 max-w-3xl mx-auto">

        {/* Section 1: Hero Diagnostic */}
        <section className="mb-20">
          {/* Terminal command */}
          <div className="font-mono text-lg md:text-xl text-cyan-400 mb-6">
            {typedText}
            <span className="animate-pulse">_</span>
          </div>

          {/* Stats output */}
          <div
            className={`space-y-2 transition-all duration-500 ${
              showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {stats.map((stat, i) => (
              <div key={i} className="font-mono text-sm flex">
                <span className="text-zinc-500 mr-2">{'>'}</span>
                <span className="text-zinc-400">{stat.label}:</span>
                <span className={`ml-2 ${stat.highlight ? 'text-cyan-400 font-semibold' : 'text-zinc-300'}`}>
                  {stat.value}
                </span>
              </div>
            ))}

            {/* Status line */}
            <div className="font-mono text-sm flex mt-4 pt-4 border-t border-zinc-800">
              <span className="text-zinc-500 mr-2">{'>'}</span>
              <span className="text-zinc-400">status:</span>
              <span className="ml-2 text-green-400 font-semibold">OBSESSED</span>
            </div>
          </div>
        </section>

        {/* Section 2: The Process */}
        <section
          className={`mb-20 transition-all duration-500 delay-200 ${
            showProcess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-cyan-400">// process</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <p className="text-zinc-400 text-sm mb-8 max-w-lg">
            Speed isn't about rushing. It's about eliminating wasted cycles through upfront research and clear scope.
          </p>

          {/* Process breakdown bar */}
          <div className="flex h-2 rounded-full overflow-hidden mb-8 bg-zinc-800">
            <div className="bg-cyan-500/80 w-[40%]" title="Research 40%" />
            <div className="bg-cyan-400/50 w-[20%]" title="Architecture 20%" />
            <div className="bg-cyan-300/30 w-[40%]" title="Execution 40%" />
          </div>

          {/* Process pillars - accordion */}
          <div className="space-y-3">
            {processPillars.map((pillar, i) => (
              <div
                key={i}
                className="border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors"
              >
                <button
                  onClick={() => setExpandedPillar(expandedPillar === i ? null : i)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-inset"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-cyan-400 w-8">
                      {pillar.percentage}%
                    </span>
                    <span className="font-mono text-sm text-white font-medium">
                      {pillar.label}
                    </span>
                  </div>
                  <span className={`text-zinc-500 transition-transform duration-200 ${
                    expandedPillar === i ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedPillar === i ? 'max-h-60' : 'max-h-0'
                }`}>
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-zinc-500 text-xs mb-3 font-mono">
                      {pillar.description}
                    </p>
                    <ul className="space-y-2">
                      {pillar.details.map((detail, j) => (
                        <li key={j} className="text-zinc-400 text-sm flex items-start gap-2">
                          <span className="text-cyan-400/60 mt-1">›</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Availability + Contact */}
        <section
          className={`transition-all duration-500 delay-400 ${
            showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-cyan-400">// contact</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Profile photo + Status */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {/* Photo with terminal frame */}
            <div className="shrink-0">
              <div className="border border-zinc-800 rounded-lg p-2 bg-zinc-900/50 w-fit">
                <div className="relative w-28 h-28 rounded overflow-hidden">
                  <Image
                    src="/mujeeb.png"
                    alt="Mujeeb"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="font-mono text-xs text-zinc-600 text-center mt-2">
                  profile.png
                </div>
              </div>
            </div>

            {/* Status terminal */}
            <div className="flex-1 border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <div className="font-mono text-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="text-zinc-500 shrink-0">status:</span>
                  <span className="text-green-400">open for collabs</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="text-zinc-500 shrink-0">looking_for:</span>
                  <span className="text-zinc-300">co-founders, collaborators, interesting problems</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="text-zinc-500 shrink-0">response:</span>
                  <span className="text-zinc-300">&lt;24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact links */}
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:mujeebopabode07@gmail.com"
              className="flex items-center gap-2 px-4 py-2.5 border border-cyan-400/30 rounded-lg font-mono text-sm text-cyan-400 hover:bg-cyan-400/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            >
              <span>email</span>
              <span className="text-cyan-400/50">→</span>
            </a>
            <a
              href="https://x.com/__mujeeb__"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-zinc-700 rounded-lg font-mono text-sm text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            >
              <span>twitter</span>
              <span className="text-zinc-600">↗</span>
            </a>
            <a
              href="https://github.com/hemjay07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-zinc-700 rounded-lg font-mono text-sm text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            >
              <span>github</span>
              <span className="text-zinc-600">↗</span>
            </a>
          </div>

          {/* Closing line */}
          <p className="mt-12 font-mono text-xs text-zinc-600">
            $ echo "ship fast, ship often"
          </p>
        </section>
      </main>
    </div>
  );
}

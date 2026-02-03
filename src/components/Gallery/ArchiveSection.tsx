'use client';

import { useState } from 'react';
import Image from 'next/image';
import { archivedProjects, Project } from '@/data/projects';

export default function ArchiveSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (archivedProjects.length === 0) return null;

  const handleProjectClick = (project: Project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <div className="relative">
      {/* Expanded archive panel - appears above the button */}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 transition-all duration-300 ease-out ${
          isExpanded
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="border border-zinc-800/70 rounded-lg bg-zinc-900/95 backdrop-blur-sm shadow-2xl w-[500px] max-w-[90vw]">
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/50">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-xs text-zinc-500">~/projects/archive</span>
            <div className="flex-1" />
            <span className="font-mono text-xs text-zinc-600">{archivedProjects.length} projects</span>
          </div>

          {/* Project list */}
          <div className="p-2 font-mono text-sm max-h-[60vh] overflow-y-auto">
            {archivedProjects.map((project) => (
              <div key={project.id} className="mb-1 last:mb-0">
                {/* Project row - always visible */}
                <button
                  onClick={() => handleProjectClick(project)}
                  className={`
                    w-full text-left py-2.5 px-3 rounded-md transition-all duration-200
                    flex items-center gap-4 group
                    ${selectedProject?.id === project.id
                      ? 'bg-zinc-800/80'
                      : 'hover:bg-zinc-800/40'
                    }
                  `}
                >
                  {/* Expand indicator */}
                  <span className={`text-zinc-600 text-xs transition-transform duration-200 ${
                    selectedProject?.id === project.id ? 'rotate-90' : ''
                  }`}>
                    ▶
                  </span>

                  {/* Project name with accent color */}
                  <span
                    className="font-medium min-w-[100px]"
                    style={{ color: project.accent }}
                  >
                    {project.id}/
                  </span>

                  {/* Tagline */}
                  <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors flex-1 truncate text-xs">
                    {project.tagline}
                  </span>

                  {/* Year */}
                  <span className="text-zinc-600 text-xs">
                    {project.year}
                  </span>
                </button>

                {/* Expanded preview card */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    selectedProject?.id === project.id
                      ? 'max-h-[400px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mx-3 mt-2 mb-3 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    {/* Screenshot */}
                    <div className="relative w-full h-32 rounded-md overflow-hidden mb-4 bg-zinc-900">
                      {project.screenshots?.[0] && (
                        <Image
                          src={project.screenshots[0]}
                          alt={project.title}
                          fill
                          className="object-cover object-top"
                        />
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] rounded border border-zinc-700/50 text-zinc-500 bg-zinc-800/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 6 && (
                        <span className="px-2 py-0.5 text-[10px] text-zinc-600">
                          +{project.techStack.length - 6} more
                        </span>
                      )}
                    </div>

                    {/* Actions - just links, no case study */}
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                          style={{
                            backgroundColor: `${project.accent}20`,
                            color: project.accent,
                          }}
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                          </svg>
                          <span>GitHub</span>
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          <span>↗</span>
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Terminal prompt */}
            <div className="text-zinc-600 mt-3 px-3 flex items-center gap-2">
              <span>$</span>
              <span className="w-2 h-4 bg-zinc-600 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Collapsed button */}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (isExpanded) setSelectedProject(null);
        }}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-full
          border transition-all duration-200
          ${isExpanded
            ? 'bg-zinc-800/90 border-zinc-700 text-zinc-300'
            : 'bg-zinc-900/80 border-zinc-800/50 text-zinc-500 hover:text-zinc-400 hover:border-zinc-700'
          }
          backdrop-blur-sm
        `}
      >
        <span className="font-mono text-xs">
          {isExpanded ? '✕' : '$'}
        </span>
        <span className="font-mono text-xs">
          {isExpanded ? 'close' : 'ls ./archive'}
        </span>
        <span className="font-mono text-xs text-zinc-600">
          ({archivedProjects.length})
        </span>
      </button>
    </div>
  );
}

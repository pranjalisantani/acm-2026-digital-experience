"use client";

import { useState } from "react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  domain: string;
  problem: string;
  approach: string;
  technologies: string[];
  outcome: string;
  status: "In Development" | "Production" | "Research Preprint";
  githubPlaceholder: string;
  demoPlaceholder?: string;
}

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "proj-01",
    title: "Chapter Core Platform",
    tagline: "Open digital runtime and collaborative gateway for chapter operations",
    domain: "Web Systems & Architecture",
    problem:
      "Chapter communications, event schedules, and project branches were fragmented across disparate social feeds without unified architectural continuity.",
    approach:
      "Architected a high-performance Next.js application with interactive visual telemetry, responsive dark mode design, and open accessibility standards.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "GSAP", "Open Source"],
    outcome:
      "Serves as the unified central hub for ACM FACE chapter registrations, documentation, and member signals.",
    status: "Production",
    githubPlaceholder: "github.com/acm-face/core-platform",
    demoPlaceholder: "face.acm.org",
  },
  {
    id: "proj-02",
    title: "Algorithmic Preprint Archive",
    tagline: "Curated student research notes, technical digests, and algorithmic problem decompositions",
    domain: "Scientific Computing & Theory",
    problem:
      "Theoretical exploration notes and seminar syntheses frequently remained isolated in private docs without permanent chapter indexing.",
    approach:
      "Designed a lightweight peer-reviewed Markdown archive with mathematical typesetting and static citation indexing for student papers.",
    technologies: ["Python", "FastAPI", "LaTeX", "Markdown", "Research Preprint"],
    outcome:
      "Maintains chapter working group digests on graph algorithms, cache-oblivious data structures, and computational geometry.",
    status: "Research Preprint",
    githubPlaceholder: "github.com/acm-face/preprint-archive",
    demoPlaceholder: "papers.acm-face.org",
  },
  {
    id: "proj-03",
    title: "ICPC Contest Toolkit",
    tagline: "Standard library extensions, verification harness, and templates for competitive programming",
    domain: "Algorithms & Competitive Code",
    problem:
      "Collegiate competition teams lack a shared, rigorously verified library of algorithms and automated stress-testing generators.",
    approach:
      "Developed a modern C++20 header template library paired with automated differential testing against randomized brute-force oracles.",
    technologies: ["C++20", "CMake", "Python", "Differential Testing", "ICPC"],
    outcome:
      "Standardized code templates and verification harnesses deployed across chapter competitive programming training clinics.",
    status: "In Development",
    githubPlaceholder: "github.com/acm-face/icpc-toolkit",
    demoPlaceholder: "icpc.acm-face.org",
  },
];

export default function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("proj-01");
  const activeProject = SAMPLE_PROJECTS.find((p) => p.id === selectedProjectId) || SAMPLE_PROJECTS[0];

  return (
    <section id="projects" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              05 // PROJECTS & CHAPTER BRANCHES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Engineering & Open Source
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              In our living network, ideas branch into systems. Here is the architectural layout for chapter-engineered software, research tools, and student repositories.
            </p>
          </div>
        </div>

        {/* Structural Disclaimer Banner */}
        <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-3 font-mono text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            [EXEMPLAR PROJECT REPOSITORIES // CHAPTER ENGINEERING STANDARD]
          </span>
          <span className="text-[11px] text-slate-400">
            Incoming chapter project roster will map to this schema.
          </span>
        </div>

        {/* Spatial Project Explorer Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
              CHAPTER REPOSITORY ROSTER
            </div>
            {SAMPLE_PROJECTS.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/20"
                      : "border-slate-800 bg-[#030816]/70 hover:border-cyan-500/30 hover:bg-cyan-950/20"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-cyan-400">{proj.domain}</span>
                    <span
                      className={`rounded px-1.5 py-0.2 ${
                        proj.status === "Production"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-bold text-white text-base">
                    {proj.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 font-light truncate">
                    {proj.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Dossier of Selected Project */}
          <div className="lg:col-span-7 corner-crosshair glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                BRANCH // {activeProject.domain}
              </span>
              <span className="font-mono text-xs text-slate-400">
                STATUS: <strong className="text-white">{activeProject.status}</strong>
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
              {activeProject.title}
            </h3>
            <div className="mt-1 text-xs font-mono text-cyan-300">
              {activeProject.tagline}
            </div>

            {/* Problem Statement */}
            <div className="mt-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400">
                01 // THE PROBLEM STATEMENT
              </h4>
              <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">
                {activeProject.problem}
              </p>
            </div>

            {/* Approach */}
            <div className="mt-5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                02 // ARCHITECTURAL APPROACH
              </h4>
              <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">
                {activeProject.approach}
              </p>
            </div>

            {/* Technologies Stack Pills */}
            <div className="mt-5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400">
                03 // CORE TECHNOLOGY STACK
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded border border-cyan-500/30 bg-cyan-950/30 px-2.5 py-1 font-mono text-xs text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcome */}
            <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-300">
                04 // CHAPTER IMPACT & DEPLOYMENT
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 font-light leading-relaxed">
                {activeProject.outcome}
              </p>
            </div>

            {/* Repository Links */}
            <div className="mt-6 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-cyan-400">⚡</span>
                <span>Repo: {activeProject.githubPlaceholder}</span>
              </div>
              <button
                onClick={() => alert(`Opening project repository interface: ${activeProject.githubPlaceholder}`)}
                className="rounded bg-cyan-400 px-4 py-2 text-slate-950 font-bold hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                Inspect Codebase ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

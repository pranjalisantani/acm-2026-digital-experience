"use client";

import { useState } from "react";

interface Capability {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tracks: string[];
  deliverables: string[];
  symbol: string;
}

export default function CapabilitiesSection() {
  const capabilities: Capability[] = [
    {
      id: "learn",
      name: "LEARN",
      tagline: "Foundational & Frontier Computational Science",
      description:
        "Structured masterclasses, deep-dive algorithm workshops, and systems labs designed to bridge academic curriculum with real engineering depth.",
      tracks: [
        "Advanced Data Structures & Graph Algorithms",
        "Operating Systems & Distributed Architecture",
        "Machine Learning Foundations & Deep Math",
        "Full-Stack Production Systems",
      ],
      deliverables: [
        "Peer-reviewed study guides",
        "Hands-on coding sprints",
        "Verified skill certifications",
      ],
      symbol: "01",
    },
    {
      id: "build",
      name: "BUILD",
      tagline: "High-Impact Systems & Open-Source Engineering",
      description:
        "Developing real production software, campus digital tools, microservices, and contributing to high-visibility open-source projects under senior guidance.",
      tracks: [
        "Chapter Digital Infrastructure & APIs",
        "Autonomous Microservices & Web3 Tooling",
        "Developer Tooling & CLI Utilities",
        "Cloud-Native Distributed Applications",
      ],
      deliverables: [
        "Live deployed applications",
        "Public GitHub repositories",
        "Architecture documentation",
      ],
      symbol: "02",
    },
    {
      id: "research",
      name: "RESEARCH",
      tagline: "Theoretical Papers, Reading Groups & Discoveries",
      description:
        "Collaborating with faculty advisors on computational research, analyzing seminal ACM SIG papers, and authoring student preprints for computing symposiums.",
      tracks: [
        "Seminal Computing Paper Reading Circles",
        "AI/ML Benchmarking & Algorithmic Optimizations",
        "Computer Vision & Computational Geometry",
        "ACM Digital Library Deep Studies",
      ],
      deliverables: [
        "Student workshop papers",
        "Symposium poster presentations",
        "Reproducible research artifacts",
      ],
      symbol: "03",
    },
    {
      id: "connect",
      name: "CONNECT",
      tagline: "Senior Mentorship, Alumni Ties & Global Chapters",
      description:
        "Uniting students with industry researchers, global ACM student chapters, faculty mentors, and alumni leaders working in top tech labs worldwide.",
      tracks: [
        "1-on-1 Senior-to-Junior Mentorship Circles",
        "Alumni Fireside Chats & Research Panels",
        "Cross-Chapter Collaborations with ACM Global",
        "Industry Technology Leaders Exchange",
      ],
      deliverables: [
        "Lifelong professional network",
        "Career and internship referral pipelines",
        "Peer review circles",
      ],
      symbol: "04",
    },
    {
      id: "compete",
      name: "COMPETE",
      tagline: "ICPC, Hackathons, CTFs & Innovation Sprints",
      description:
        "Forming elite chapter squads to represent the university in ICPC regional contests, international hackathons, algorithmic leagues, and cyber challenges.",
      tracks: [
        "ICPC Algorithmic Problem Solving Drills",
        "National & Global 36-Hour Hackathons",
        "Security & Cryptographic CTF Squads",
        "Internal Chapter Coding Marathons",
      ],
      deliverables: [
        "Podium finishes and institutional glory",
        "Rapid prototyping mastery",
        "High-pressure teamwork skills",
      ],
      symbol: "05",
    },
    {
      id: "create",
      name: "CREATE",
      tagline: "Generative Art, Computational Creativity & Vision",
      description:
        "Exploring the boundary where algorithms meet aesthetics: procedural design, creative audio synthesis, technical writing, and human-computer interfaces.",
      tracks: [
        "Procedural Art & Shader Programming",
        "Human-Centered UI/UX Engineering",
        "Computing Journalism & Tech Editorials",
        "Interactive Digital Installations",
      ],
      deliverables: [
        "Creative compute exhibitions",
        "Chapter tech blog & podcasts",
        "Interactive web installations",
      ],
      symbol: "06",
    },
  ];

  const [activeCapId, setActiveCapId] = useState<string>("learn");
  const activeCap = capabilities.find((c) => c.id === activeCapId) || capabilities[0];

  return (
    <section id="capabilities" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/60">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              02 // ACM NETWORK & CAPABILITIES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Six Core Operational Vectors
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-300 font-light leading-relaxed">
            The ACM network is not a decorative backdrop—it is a functional engine organizing student energy into six high-velocity disciplines.
          </p>
        </div>

        {/* Capability Navigation Tabs */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {capabilities.map((cap) => {
            const isActive = cap.id === activeCapId;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveCapId(cap.id)}
                className={`flex flex-col items-start p-3.5 rounded-xl border font-mono transition-all text-left cursor-pointer ${
                  isActive
                    ? "border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-lg shadow-cyan-500/20 -translate-y-0.5"
                    : "border-slate-800 bg-[#030816]/70 text-slate-400 hover:border-cyan-500/30 hover:text-slate-200"
                }`}
              >
                <span className="text-[10px] text-cyan-500 font-bold">{cap.symbol} {"//"}</span>
                <span className="mt-1 text-sm font-black tracking-wider uppercase">
                  {cap.name}
                </span>
                <span className="mt-1 text-[9px] text-slate-500 uppercase tracking-widest truncate w-full">
                  {isActive ? "ACTIVE VECTOR" : "SELECT NODE"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Panel */}
        <div className="mt-8 corner-crosshair glass-panel rounded-2xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            {/* Left: Identity and Description */}
            <div className="lg:max-w-xl">
              <div className="inline-flex items-center gap-2 rounded border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 font-mono text-xs text-cyan-300">
                <span>VECTOR {"//"} {activeCap.symbol}</span>
                <span className="text-slate-500">|</span>
                <span className="font-bold">{activeCap.name} ENGINE</span>
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {activeCap.tagline}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {activeCap.description}
              </p>
            </div>

            {/* Right: Technical Deliverables & Focus */}
            <div className="w-full lg:w-96 space-y-5">
              <div className="rounded-xl border border-cyan-500/20 bg-[#03091a]/80 p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 block mb-3">
                  {"// FOCUS CURRICULA & TRACKS"}
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeCap.tracks.map((track, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">▸</span>
                      <span>{track}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#02050f] p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-2">
                  CONCRETE DELIVERABLES
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCap.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="rounded border border-cyan-500/20 bg-cyan-950/20 px-2.5 py-1 font-mono text-[11px] text-cyan-300"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connected Network Vector Telemetry */}
          <div className="mt-8 pt-5 border-t border-cyan-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-slate-400">
            <span className="flex items-center gap-2 text-[11px]">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              TOPOLOGY: {activeCap.name} LINKED TO CHAPTER CORE ENGINE
            </span>
            <a
              href="#events"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px]"
            >
              See Events Powered by This Vector →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

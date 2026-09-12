"use client";

import { useState } from "react";

interface LearningResource {
  id: string;
  title: string;
  category: "DSA" | "AI / ML" | "WEB" | "CLOUD" | "SYSTEMS" | "RESEARCH" | "EVENT MATERIAL";
  type: "PDF Guide" | "GitHub Repo" | "Colab Notebook" | "Curated Roadmap" | "Slide Deck";
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  accessUrlPlaceholder: string;
}

export const SAMPLE_RESOURCES: LearningResource[] = [
  {
    id: "res-01",
    title: "Graph Algorithms & Advanced Trees Master Handbook",
    category: "DSA",
    type: "PDF Guide",
    description:
      "Comprehensive chapter guide to Fenwick trees, heavy-light decomposition, and minimum cut network flows with verified C++ templates.",
    level: "Advanced",
    accessUrlPlaceholder: "acm.chapter/resources/dsa-handbook.pdf",
  },
  {
    id: "res-02",
    title: "Transformer Attention From Scratch // PyTorch Lab",
    category: "AI / ML",
    type: "Colab Notebook",
    description:
      "Self-contained interactive Jupyter notebook implementing multi-head self-attention and positional embeddings with live training graphs.",
    level: "Intermediate",
    accessUrlPlaceholder: "colab.research.google.com/acm-transformers",
  },
  {
    id: "res-03",
    title: "Distributed Systems Reading List & Papers Syllabus",
    category: "SYSTEMS",
    type: "Curated Roadmap",
    description:
      "Curated syllabus of seminal ACM papers: Lamport clocks, Spanner, MapReduce, and Raft consensus with student summary notes.",
    level: "Advanced",
    accessUrlPlaceholder: "acm.chapter/resources/systems-syllabus",
  },
  {
    id: "res-04",
    title: "Production Web Architecture & Micro-Frontends",
    category: "WEB",
    type: "GitHub Repo",
    description:
      "Boilerplate architecture for high-performance React/Next.js applications with Tailwind design tokens and accessible ARIA patterns.",
    level: "Intermediate",
    accessUrlPlaceholder: "github.com/acm-chapter/modern-web-stack",
  },
  {
    id: "res-05",
    title: "Kubernetes & Cloud Infrastructure Starter Kit",
    category: "CLOUD",
    type: "GitHub Repo",
    description:
      "Hands-on lab repository demonstrating containerization, ingress controllers, Helm charts, and local Kind cluster deployments.",
    level: "Intermediate",
    accessUrlPlaceholder: "github.com/acm-chapter/cloud-lab-kit",
  },
  {
    id: "res-06",
    title: "Student Research & Computing Paper Writing Guide",
    category: "RESEARCH",
    type: "PDF Guide",
    description:
      "Structural toolkit for undergraduate researchers: LaTeX IEEE/ACM templates, literature review methodologies, and citation ethics.",
    level: "Beginner",
    accessUrlPlaceholder: "acm.chapter/resources/research-handbook.pdf",
  },
  {
    id: "res-07",
    title: "Compiler Optimization Workshop Slides & Code Sprints",
    category: "EVENT MATERIAL",
    type: "Slide Deck",
    description:
      "Official slide deck and accompanying C++ starter code for the LLVM Custom Optimization Pass workshop held in Spring 2026.",
    level: "Advanced",
    accessUrlPlaceholder: "acm.chapter/events/compiler-pass-slides.pdf",
  },
];

export default function ResourcesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "DSA",
    "AI / ML",
    "SYSTEMS",
    "WEB",
    "CLOUD",
    "RESEARCH",
    "EVENT MATERIAL",
  ];

  const filteredResources = SAMPLE_RESOURCES.filter((res) => {
    const matchesCategory =
      selectedCategory === "All" || res.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="resources" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              07 // KNOWLEDGE CONNECTIONS & RESOURCES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Student Learning Repository
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Knowledge is the connection that unifies the network. Access chapter syllabi, curated roadmaps, algorithm templates, and research guides.
            </p>
          </div>
        </div>

        {/* Structural Disclaimer */}
        <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-3 font-mono text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            [CURATED LEARNING ARTIFACTS // REPOSITORY SCHEMA PREVIEW]
          </span>
          <span className="text-[11px] text-slate-400">
            Search and category filtering fully functional.
          </span>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, topics, or types..."
              className="w-full rounded-xl border border-cyan-500/30 bg-[#030816] px-4 py-2.5 pl-10 font-mono text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <span className="absolute left-3.5 top-3 text-slate-400 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="font-mono text-xs text-slate-400">
            Showing {filteredResources.length} of {SAMPLE_RESOURCES.length} learning modules
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 uppercase transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "border border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20"
                  : "border border-slate-800 bg-[#030816] text-slate-400 hover:border-cyan-500/30 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Card Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="glass-panel glass-panel-hover corner-crosshair rounded-xl border border-cyan-500/20 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-cyan-300 border border-cyan-500/20 uppercase font-bold">
                    {res.category}
                  </span>
                  <span className="rounded border border-slate-800 bg-[#020510] px-2 py-0.5 text-slate-400">
                    {res.level}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold text-white tracking-tight leading-snug">
                  {res.title}
                </h3>

                <div className="mt-1 font-mono text-xs text-cyan-400">
                  Format: {res.type}
                </div>

                <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                  {res.accessUrlPlaceholder}
                </span>
                <button
                  onClick={() => alert(`Accessing learning resource: ${res.title}\nIn production, this links to verified courseware or Google Drive/GitHub repository.`)}
                  className="rounded bg-cyan-400 px-3.5 py-1.5 font-bold text-slate-950 hover:bg-cyan-300 transition-colors text-[11px] cursor-pointer"
                >
                  Open Resource ↗
                </button>
              </div>
            </div>
          ))}

          {filteredResources.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-slate-800 bg-[#02050e] p-10 text-center font-mono text-xs">
              <div className="text-slate-500 mb-2">∅ NO RESOURCES MATCH CRITERIA</div>
              <p className="text-slate-400">Try resetting your search query or selecting &quot;All&quot; categories.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded border border-cyan-500/30 bg-cyan-950/30 px-3 py-1.5 text-cyan-300 hover:bg-cyan-900/40"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

interface ArchiveItem {
  id: string;
  title: string;
  season: string; // e.g. "Fall 2025" or "Annual 2025"
  date: string;
  category: "Hackathon" | "Symposium" | "Masterclass" | "Ceremony" | "Research";
  caption: string;
  aspectRatio: string;
  technicalMetadata: string;
  gradientTheme: string;
}

export const SAMPLE_ARCHIVE: ArchiveItem[] = [
  {
    id: "arch-01",
    title: "National Flagship Hackathon // Midnight Terminal Session",
    season: "2025-2026 Season",
    date: "October 18, 2025",
    category: "Hackathon",
    caption:
      "Student teams debugging distributed clusters under low-light ambient illumination at 03:00 AM.",
    aspectRatio: "aspect-video",
    technicalMetadata: "ISO 1600 • 35mm f/1.8 • 1/125s // LAB_04",
    gradientTheme: "from-cyan-950 via-slate-900 to-[#020512]",
  },
  {
    id: "arch-02",
    title: "ACM Annual Induction & Senior Keynote Address",
    season: "2025-2026 Season",
    date: "August 22, 2025",
    category: "Ceremony",
    caption:
      "Welcoming 120+ incoming student members with inaugural technical addresses from chapter seniors and faculty patron.",
    aspectRatio: "aspect-4/3",
    technicalMetadata: "ISO 800 • 50mm f/1.4 • 1/250s // AUDITORIUM_A",
    gradientTheme: "from-blue-950 via-sky-950 to-[#030818]",
  },
  {
    id: "arch-03",
    title: "Compiler Engineering & Low-Level Code Sprint",
    season: "2024-2025 Season",
    date: "March 15, 2025",
    category: "Masterclass",
    caption:
      "Hands-on whiteboard derivations of SSA intermediate representations and register allocation graphs.",
    aspectRatio: "aspect-video",
    technicalMetadata: "ISO 400 • 24mm f/2.8 • 1/160s // WHITEBOARD_ALPHA",
    gradientTheme: "from-indigo-950 via-slate-900 to-[#040c1e]",
  },
  {
    id: "arch-04",
    title: "ICPC Regional Preparation Mock Contest Arena",
    season: "2024-2025 Season",
    date: "November 30, 2024",
    category: "Research",
    caption:
      "Intensive 5-hour timed coding battle simulating the ACM-ICPC regional environment with live scoreboard projections.",
    aspectRatio: "aspect-4/3",
    technicalMetadata: "ISO 1250 • 85mm f/1.8 • 1/200s // LAB_01_ARENA",
    gradientTheme: "from-slate-900 via-cyan-950 to-[#020614]",
  },
];

export default function ArchiveSection() {
  const [selectedSeason, setSelectedSeason] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<ArchiveItem | null>(null);

  const seasons = ["All", "2025-2026 Season", "2024-2025 Season"];

  const filtered = SAMPLE_ARCHIVE.filter((item) => {
    if (selectedSeason === "All") return true;
    return item.season === selectedSeason;
  });

  return (
    <section id="archive" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/60">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              07 // CHAPTER ARCHIVE
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Chapter Archive
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Photographic documentation and milestones from past chapter symposiums, hackathons,
              coding battles, and community workshops.
            </p>
          </div>
        </div>

        {/* Structural Disclaimer Banner */}
        <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-3 font-mono text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            [OFFICIAL CHAPTER PHOTO ARCHIVE // HIGH-RES PHOTOGRAPHY WILL LINK HERE]
          </span>
          <span className="text-[11px] text-slate-400">
            Structured for high-resolution event media.
          </span>
        </div>

        {/* Season Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
          {seasons.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSeason(s)}
              className={`rounded-lg px-3.5 py-1.5 uppercase transition-all cursor-pointer ${
                selectedSeason === s
                  ? "border border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20"
                  : "border border-slate-800 bg-[#030816] text-slate-400 hover:border-cyan-500/30 hover:text-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Cinematic Archive Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group corner-crosshair glass-panel rounded-2xl border border-cyan-500/20 p-5 transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer"
            >
              {/* Photo Placeholder Frame */}
              <div
                className={`relative w-full ${item.aspectRatio} rounded-xl border border-cyan-500/30 bg-gradient-to-tr ${item.gradientTheme} p-6 flex flex-col justify-between overflow-hidden`}
              >
                {/* Visual Grid Reticle Overlay */}
                <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

                {/* Top Telemetry Stamp */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px]">
                  <span className="rounded bg-black/70 px-2 py-0.5 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm uppercase">
                    {item.category}
                  </span>
                  <span className="rounded bg-black/70 px-2 py-0.5 text-slate-300 backdrop-blur-sm">
                    {item.season}
                  </span>
                </div>

                {/* Central Camera Focus Target */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-black/40 text-cyan-300 backdrop-blur-md">
                    <span className="font-mono text-xs">📷</span>
                  </div>
                  <span className="mt-2 font-mono text-[10px] text-cyan-400 uppercase tracking-wider">
                    ACM ARCHIVE PHOTO // CLICK TO INSPECT
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{item.date}</span>
                  <span className="text-cyan-400/80">{item.technicalMetadata}</span>
                </div>
              </div>

              {/* Caption & Context Below Frame */}
              <div className="mt-4">
                <h3 className="font-bold text-white text-base group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-300 font-light leading-relaxed">
                  {item.caption}
                </p>
                <div className="mt-3 pt-3 border-t border-cyan-500/10 flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <span>DOCUMENTARY RECORD</span>
                  <span className="text-cyan-400">VIEW HIGH RES ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg">
            <div
              className="fixed inset-0"
              onClick={() => setActivePhoto(null)}
              aria-label="Close archive preview"
            />
            <div className="relative z-10 max-w-3xl w-full rounded-2xl border border-cyan-500/30 bg-[#040a18] p-6 sm:p-8 font-mono shadow-2xl">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 text-xs">
                <span className="text-cyan-400 uppercase">
                  ARCHIVE INSPECTOR // {activePhoto.category}
                </span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="rounded px-2 py-1 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Large Frame */}
              <div
                className={`mt-4 h-72 sm:h-96 w-full rounded-xl border border-cyan-500/30 bg-gradient-to-tr ${activePhoto.gradientTheme} p-6 flex flex-col justify-between`}
              >
                <div className="tech-grid-pattern absolute inset-0 opacity-20 pointer-events-none" />
                <div className="flex justify-between text-xs text-cyan-300 relative z-10">
                  <span>{activePhoto.season}</span>
                  <span>{activePhoto.date}</span>
                </div>
                <div className="text-center my-auto relative z-10">
                  <div className="text-4xl mb-2">📸</div>
                  <div className="text-sm font-bold text-white uppercase">
                    {activePhoto.title}
                  </div>
                  <div className="mt-2 text-xs text-cyan-300">
                    [FULL-RESOLUTION EVENT PHOTOGRAPHY CONTAINER]
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 relative z-10 flex justify-between">
                  <span>METADATA: {activePhoto.technicalMetadata}</span>
                  <span className="text-cyan-400">STATUS: PRESERVED IN ARCHIVE</span>
                </div>
              </div>

              <div className="mt-4 text-xs font-sans text-slate-300">
                {activePhoto.caption}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

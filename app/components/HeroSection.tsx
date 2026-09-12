"use client";

import { useState } from "react";
import NetworkCanvas from "./NetworkCanvas";

export default function HeroSection() {
  const [interactiveNetwork, setInteractiveNetwork] = useState(true);

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Interactive Network Node Canvas Layer */}
      <div className="absolute inset-0 z-0 opacity-70">
        <NetworkCanvas interactive={interactiveNetwork} nodeCount={60} />
      </div>

      {/* Ambient Grid Reticles */}
      <div className="pointer-events-none absolute inset-x-8 top-32 flex justify-between text-[10px] font-mono text-cyan-500/30">
        <span>{"// CHAPTER_NODE: ACM.2026.ONLINE"}</span>
        <span>{"TOPOLOGY: LIVING_NETWORK //"}</span>
      </div>

      <div className="pointer-events-none absolute inset-x-8 bottom-12 hidden md:flex justify-between text-[10px] font-mono text-cyan-500/30">
        <span>{"PEOPLE = NODES // EVENTS = SIGNALS"}</span>
        <span>{"// ADVANCING COMPUTING SCIENCE"}</span>
      </div>

      {/* Central Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Top Pill / Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-cyan-950/50">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
            ASSOCIATION FOR COMPUTING MACHINERY • CHAPTER ENVIRONMENT
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.08]">
          A LIVING DIGITAL
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-white bg-clip-text text-transparent cyan-text-glow">
            NETWORK OF COMPUTING
          </span>
        </h1>

        {/* Authentic, Refined Subhead */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 font-light leading-relaxed">
          Where students become researchers, algorithms become systems, and curiosity turns into computational impact. The definitive digital home of our ACM Chapter.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest">
          <a
            href="#about"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-7 py-3.5 font-bold text-slate-950 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/25 hover:shadow-cyan-300/40 hover:-translate-y-0.5"
          >
            <span>Explore ACM</span>
            <span>↓</span>
          </a>
          <a
            href="#events"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-7 py-3.5 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all backdrop-blur-sm"
          >
            <span>Discover Events</span>
            <span className="text-cyan-400">↗</span>
          </a>
        </div>

        {/* Canvas HUD Controller */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setInteractiveNetwork(!interactiveNetwork)}
            className="inline-flex items-center gap-2 rounded border border-slate-800 bg-[#040a17]/80 px-3 py-1 font-mono text-[11px] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors cursor-pointer"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${interactiveNetwork ? "bg-cyan-400" : "bg-slate-600"}`} />
            <span>INTERACTIVE NETWORK: {interactiveNetwork ? "RESPONSIVE TO MOUSE" : "PAUSED"}</span>
          </button>
        </div>
      </div>

      {/* Hero Telemetry Strip */}
      <div className="relative z-10 mt-16 w-full max-w-5xl">
        <div className="corner-crosshair glass-panel rounded-xl p-4 sm:p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-cyan-500/10">
            <div className="p-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Core Identity
              </div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-white font-mono">
                ACM CHAPTER // CORE
              </div>
            </div>
            <div className="p-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Network Architecture
              </div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-cyan-300 font-mono">
                LIVING TOPOLOGY
              </div>
            </div>
            <div className="p-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Major Pillars
              </div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-white font-mono">
                6 CAPABILITIES ACTIVE
              </div>
            </div>
            <div className="p-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Interactive State
              </div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-cyan-300 font-mono flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                CONSTELLATION ONLINE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

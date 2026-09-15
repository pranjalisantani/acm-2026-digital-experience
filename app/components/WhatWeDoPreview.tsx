"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhatWeDoPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeVector, setActiveVector] = useState(0);

  const vectors = [
    {
      num: "01",
      title: "LEARN",
      tagline: "Foundational & Frontier Computing",
      desc: "Structured masterclasses, deep-dive algorithm clinics, and low-level systems labs designed to bridge coursework with real engineering depth.",
      highlights: ["Advanced Data Structures", "Operating Systems Internals", "Distributed Computing"],
    },
    {
      num: "02",
      title: "BUILD",
      tagline: "High-Impact Open Source Software",
      desc: "Architecting real production software, developer utilities, microservices, and contributing to high-visibility open-source projects.",
      highlights: ["Chapter Core APIs", "Compiler AST Tools", "Cryptographic Ledgers"],
    },
    {
      num: "03",
      title: "RESEARCH",
      tagline: "Theoretical Papers & Preprints",
      desc: "Collaborating with faculty on computational research, dissecting seminal ACM SIG papers, and authoring student symposium preprints.",
      highlights: ["ACM SIG Paper Circles", "Deep Model Optimization", "Consensus Verification"],
    },
    {
      num: "04",
      title: "CONNECT",
      tagline: "Senior Mentorship & Global Ties",
      desc: "Connecting students with industry researchers, worldwide ACM chapters, faculty sponsors, and alumni working in frontier technology labs.",
      highlights: ["1-on-1 Senior Mentoring", "ACM Global Network", "Industry Fireside Panels"],
    },
    {
      num: "05",
      title: "COMPETE",
      tagline: "ICPC, Hackathons & CTFs",
      desc: "Forming elite chapter squads to represent the university in ICPC regional contests, international hackathons, and security challenges.",
      highlights: ["ICPC Training Squads", "36-Hour Hackathons", "Cryptographic CTFs"],
    },
    {
      num: "06",
      title: "CREATE",
      tagline: "Computational Art & Interface Design",
      desc: "Exploring the boundary where algorithms meet aesthetics: procedural graphics, human-centered UI/UX engineering, and technical editorials.",
      highlights: ["WebGPU Shaders", "Design Systems", "Computing Journalism"],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vector-preview-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vectors-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          clearProps: "transform",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-we-do"
      ref={containerRef}
      className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#030712]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              04 // CHAPTER INITIATIVES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              What We Do
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs text-slate-400">
            <p className="font-sans text-sm text-slate-300 font-light leading-relaxed">
              Six key initiatives designed to help students learn, build, and grow through
              computer science and community collaboration.
            </p>
          </div>
        </div>

        {/* 6-Discipline Interactive Grid */}
        <div className="vectors-grid mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vectors.map((vec, idx) => {
            const isSelected = activeVector === idx;
            return (
              <div
                key={vec.num}
                onClick={() => setActiveVector(idx)}
                className={`vector-preview-card glass-panel glass-panel-hover corner-crosshair rounded-2xl border p-6 flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/20"
                    : "border-cyan-500/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-cyan-500/10 pb-3">
                    <span className="text-cyan-400 font-bold">{vec.num} {"//"} INITIATIVE</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                      {vec.title}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white uppercase tracking-tight">
                    {vec.title}
                  </h3>
                  <div className="font-mono text-xs text-cyan-300 mt-1">
                    {vec.tagline}
                  </div>

                  <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                    {vec.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-cyan-500/10">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {vec.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="rounded border border-slate-800 bg-[#020510] px-2 py-0.5 text-slate-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

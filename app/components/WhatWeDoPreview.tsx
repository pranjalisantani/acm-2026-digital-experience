"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhatWeDoPreview() {
  const containerRef = useRef<HTMLElement>(null);

  const pillars = [
    {
      num: "01",
      title: "Workshops",
      subtitle: "Hands-on technical sessions",
      desc: "Deep-dive systems labs, algorithmic clinics, and practical software engineering led by senior students and invited industry engineers.",
      metric: "Bi-weekly practical labs",
    },
    {
      num: "02",
      title: "Projects",
      subtitle: "Collaborative software development",
      desc: "Student squads architecting verified open-source chapter infrastructure, developer tooling, and production software applications.",
      metric: "Open chapter repositories",
    },
    {
      num: "03",
      title: "Reading Groups",
      subtitle: "Exploring research & ideas",
      desc: "Collaborative discussions dissecting seminal ACM SIG papers, algorithmic proofs, preprints, and frontier computing advances.",
      metric: "Weekly paper circles",
    },
    {
      num: "04",
      title: "Hackathons",
      subtitle: "Intense collaborative building",
      desc: "The annual 36-hour chapter hackathon and competitive coding clinics preparing students for collegiate ICPC regional contests.",
      metric: "Annual 36h hackathon",
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
        ".what-we-do-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".what-we-do-grid",
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
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#030712]"
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
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Four core initiatives focused on real technical depth, collaborative software
              development, and student mentorship.
            </p>
          </div>
        </div>

        {/* 4 Focused Pillars Grid */}
        <div className="what-we-do-grid mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.num}
              className="what-we-do-card glass-panel glass-panel-hover corner-crosshair rounded-2xl border border-cyan-500/20 p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs border-b border-cyan-500/10 pb-3">
                  <span className="text-cyan-400 font-bold">{item.num} {"//"}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    INITIATIVE
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white uppercase tracking-tight">
                  {item.title}
                </h3>
                <div className="font-mono text-xs text-cyan-300 mt-1">
                  {item.subtitle}
                </div>

                <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-500/10 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span>FORMAT:</span>
                <span className="text-cyan-300 font-medium">{item.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

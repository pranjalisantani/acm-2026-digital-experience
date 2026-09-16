"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SAMPLE_PROJECTS } from "./ProjectsSection";

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const featured = SAMPLE_PROJECTS.slice(0, 3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-project-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".featured-projects-grid",
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
      id="projects"
      ref={containerRef}
      className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/60"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header: Restrained & Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              05 // STUDENT SOFTWARE & TOOLS
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Selected Projects
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Open-source software, research tools, and competition libraries engineered
              and maintained by chapter students.
            </p>
          </div>
        </div>

        {/* Restrained Project Cards (PROJECT NAME, SHORT PURPOSE, EXPLORE) */}
        <div className="featured-projects-grid mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((proj) => (
            <div
              key={proj.id}
              className="featured-project-card glass-panel glass-panel-hover corner-crosshair rounded-2xl border border-cyan-500/20 p-7 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50"
            >
              <div>
                {/* Domain Pill */}
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">
                  {proj.domain}
                </div>

                {/* PROJECT NAME */}
                <h3 className="mt-3 text-xl font-bold text-white tracking-tight leading-snug">
                  {proj.title}
                </h3>

                {/* SHORT PURPOSE */}
                <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                  {proj.tagline}
                </p>
              </div>

              {/* EXPLORE */}
              <div className="mt-8 pt-4 border-t border-cyan-500/10 flex items-center justify-between font-mono text-xs text-slate-400 group">
                <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
                  {proj.githubPlaceholder}
                </span>
                <span className="text-cyan-400 text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

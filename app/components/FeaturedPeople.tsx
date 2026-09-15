"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SAMPLE_MEMBERS } from "./PeopleSection";
import { ACMMember } from "./PersonDetailModal";

interface FeaturedPeopleProps {
  onSelectPerson: (person: ACMMember) => void;
}

export default function FeaturedPeople({ onSelectPerson }: FeaturedPeopleProps) {
  const containerRef = useRef<HTMLElement>(null);
  // Pick 4 representative nodes across executive, systems, research, faculty
  const featured = [
    SAMPLE_MEMBERS[0], // Chapter Chair
    SAMPLE_MEMBERS[2], // Lead Systems Architect
    SAMPLE_MEMBERS[4], // AI/ML Research Associate
    SAMPLE_MEMBERS[7], // Faculty Chapter Advisor
  ].filter(Boolean);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-person-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".featured-people-grid",
            start: "top 82%",
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
      id="featured-people"
      ref={containerRef}
      className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/60"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              04 // CHAPTER ARCHITECTS & PATRONS
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              The People Behind The Network
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs text-slate-400">
            <p className="font-sans text-sm text-slate-300 font-light">
              Undergraduate researchers, systems leads, and faculty advisors directing the
              chapter’s academic and technical charter.
            </p>
          </div>
        </div>

        {/* Clean, Simple 4-Column Roster Grid */}
        <div className="featured-people-grid mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((person) => (
            <div
              key={person.id}
              onClick={() => onSelectPerson(person)}
              className="featured-person-card glass-panel glass-panel-hover rounded-xl border border-cyan-500/20 p-5 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Photo / Avatar + Status Indicator */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-cyan-500/10">
                  <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border-2 border-cyan-500/40 bg-[#040a18] shadow-md shadow-cyan-950 group-hover:border-cyan-400 transition-all">
                    <span className="font-mono text-base font-bold text-cyan-300">
                      {person.initials}
                    </span>
                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-cyan-400 border-2 border-[#030712]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-cyan-200 transition-colors">
                      {person.name}
                    </h3>
                    <div className="font-mono text-[11px] text-cyan-400 mt-0.5">
                      {person.role}
                    </div>
                  </div>
                </div>

                {/* Academic Department */}
                <div className="mt-3 font-mono text-[11px] text-slate-400">
                  {person.yearBranch}
                </div>

                {/* Short Work / Responsibility */}
                <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                  {person.bio}
                </p>
              </div>

              {/* Action row */}
              <div className="mt-5 pt-3 border-t border-cyan-500/10 flex items-center justify-between font-mono text-[10px] text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span>VIEW DOSSIER</span>
                <span>↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

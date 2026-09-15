"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SAMPLE_EVENTS } from "./EventsSection";
import { ACMEvent } from "./EventDetailModal";

interface FeaturedEventsProps {
  onSelectEvent: (event: ACMEvent) => void;
}

export default function FeaturedEvents({ onSelectEvent }: FeaturedEventsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const featured = SAMPLE_EVENTS.slice(0, 3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-event-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".featured-events-grid",
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
      id="featured-events"
      ref={containerRef}
      className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/60"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header with Editorial Alignment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              02 // FEATURED CHAPTER SIGNALS
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Signals & Convergence
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs text-slate-400">
            <p className="font-sans text-sm text-slate-300 font-light">
              High-velocity workshops, flagship hackathons, and technical symposiums
              orchestrated by the chapter.
            </p>
          </div>
        </div>

        {/* Featured Events Grid (Concise 3-card layout with rich visual emphasis) */}
        <div className="featured-events-grid mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((event, idx) => (
            <div
              key={event.id}
              className="featured-event-card glass-panel glass-panel-hover corner-crosshair rounded-2xl border border-cyan-500/25 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Visual Header / Poster Banner */}
                <div
                  className={`h-32 w-full rounded-xl border border-cyan-500/20 p-4 flex flex-col justify-between relative overflow-hidden mb-5 ${event.posterGradient}`}
                >
                  <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10 font-mono text-[10px]">
                    <span className="rounded bg-black/70 px-2 py-0.5 text-cyan-300 border border-cyan-500/30 uppercase font-semibold">
                      {event.category}
                    </span>
                    <span className="rounded bg-black/70 px-2 py-0.5 text-slate-300">
                      {event.mode}
                    </span>
                  </div>
                  <div className="relative z-10 font-mono text-xs text-cyan-300 font-bold tracking-wide">
                    {event.displayDate}
                  </div>
                </div>

                <div className="font-mono text-[10px] text-cyan-400 mb-1">
                  SIGNAL // 0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {event.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                  {event.shortDescription}
                </p>

                <div className="mt-4 pt-3 border-t border-cyan-500/10 space-y-1 font-mono text-[11px] text-slate-400">
                  <div className="truncate">🕒 {event.time}</div>
                  <div className="truncate">📍 {event.location}</div>
                </div>
              </div>

              {/* Action row */}
              <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center justify-between gap-3 font-mono text-xs">
                <button
                  onClick={() => onSelectEvent(event)}
                  className="w-full rounded-lg border border-cyan-500/30 bg-cyan-950/40 py-2.5 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all text-center cursor-pointer text-xs font-bold uppercase tracking-wider"
                >
                  Open Dossier ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NetworkCanvas from "./NetworkCanvas";

export default function HeroSection() {
  const [interactiveNetwork, setInteractiveNetwork] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const reticleTopRef = useRef<HTMLDivElement>(null);
  const reticleBottomRef = useRef<HTMLDivElement>(null);
  const canvasLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Respect user reduced-motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let bootInterval: NodeJS.Timeout | null = null;
    let fallbackTimeout: NodeJS.Timeout | null = null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      // 1. Subtle Canvas backdrop reveal
      if (canvasLayerRef.current) {
        tl.fromTo(
          canvasLayerRef.current,
          { opacity: 0 },
          { opacity: 0.7, duration: 1.2, ease: "power2.inOut" },
          0
        );
      }

      // 2. Ambient grid reticles entrance
      const reticles = [reticleTopRef.current, reticleBottomRef.current].filter(
        Boolean
      );
      if (reticles.length > 0) {
        tl.fromTo(
          reticles,
          { opacity: 0, y: (i) => (i === 0 ? -10 : 10) },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "transform",
          },
          0.1
        );
      }

      // 3. Top Chapter Badge / Pill
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "transform",
          },
          0.2
        );
      }

      // 4. Headline Lines (with sophisticated focus/blur reveal)
      tl.fromTo(
        ".hero-title-line",
        { opacity: 0, y: 36, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.14,
          ease: "power4.out",
          clearProps: "transform,filter",
        },
        "-=0.45"
      );

      // 5. Authentic Subhead
      if (subheadRef.current) {
        tl.fromTo(
          subheadRef.current,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
          },
          "-=0.6"
        );
      }

      // 6. Action CTAs (staggered entrance, clear transforms so hover styles work)
      if (ctaGroupRef.current) {
        const ctaButtons = ctaGroupRef.current.children;
        tl.fromTo(
          ctaButtons,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
          },
          "-=0.5"
        );
      }

      // 7. Interactive Canvas HUD Controller
      if (hudRef.current) {
        tl.fromTo(
          hudRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform",
          },
          "-=0.4"
        );
      }

      // 8. Telemetry Strip Glass Panel Container
      if (telemetryRef.current) {
        tl.fromTo(
          telemetryRef.current,
          { opacity: 0, y: 32, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform",
          },
          "-=0.45"
        );

        // 9. Stagger telemetry metrics
        tl.fromTo(
          ".hero-telemetry-item",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform",
          },
          "-=0.55"
        );
      }

      // 10. Subtle scroll scrub exit transitioning Hero into InformationSection
      gsap.to(
        [
          badgeRef.current,
          headlineRef.current,
          subheadRef.current,
          ctaGroupRef.current,
          telemetryRef.current,
        ].filter(Boolean),
        {
          y: -50,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "bottom 95%",
            end: "bottom 25%",
            scrub: true,
          },
        }
      );

      // Check if BootSequence is running or has finished
      const hasBooted =
        typeof window !== "undefined" &&
        sessionStorage.getItem("acm_boot_completed");

      if (hasBooted) {
        // Immediate smooth play on subsequent visits or after boot
        tl.play();
      } else {
        // Poll briefly for boot dismissal (via keydown/skip/timer) with fallback
        let started = false;
        const trigger = () => {
          if (started) return;
          started = true;
          if (bootInterval) clearInterval(bootInterval);
          if (fallbackTimeout) clearTimeout(fallbackTimeout);
          tl.play();
        };

        bootInterval = setInterval(() => {
          if (sessionStorage.getItem("acm_boot_completed")) {
            trigger();
          }
        }, 100);

        fallbackTimeout = setTimeout(() => {
          trigger();
        }, 2600);
      }
    }, heroRef);

    return () => {
      if (bootInterval) clearInterval(bootInterval);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Interactive Network Node Canvas Layer */}
      <div ref={canvasLayerRef} className="absolute inset-0 z-0 opacity-70">
        <NetworkCanvas interactive={interactiveNetwork} nodeCount={60} />
      </div>

      {/* Ambient Grid Reticles */}
      <div
        ref={reticleTopRef}
        className="pointer-events-none absolute inset-x-8 top-32 flex justify-between text-[10px] font-mono text-cyan-500/30"
      >
        <span>{"// CHAPTER_STATUS: ACTIVE // ACM.2026"}</span>
        <span>{"STUDENT COMMUNITY // ACM CHAPTER"}</span>
      </div>

      <div
        ref={reticleBottomRef}
        className="pointer-events-none absolute inset-x-8 bottom-12 hidden md:flex justify-between text-[10px] font-mono text-cyan-500/30"
      >
        <span>{"STUDENTS • RESEARCHERS • DEVELOPERS"}</span>
        <span>{"// ADVANCING COMPUTING AS A SCIENCE & PROFESSION"}</span>
      </div>

      {/* Central Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Top Pill / Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-cyan-950/50"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
            ASSOCIATION FOR COMPUTING MACHINERY • STUDENT CHAPTER
          </span>
        </div>

        {/* Monumental Headline */}
        <h1
          ref={headlineRef}
          className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.08]"
        >
          <span className="block hero-title-line">A LIVING COMMUNITY</span>
          <span className="block hero-title-line bg-gradient-to-r from-cyan-400 via-sky-300 to-white bg-clip-text text-transparent cyan-text-glow">
            OF COMPUTING MINDS
          </span>
        </h1>

        {/* Authentic, Refined Subhead */}
        <p
          ref={subheadRef}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 font-light leading-relaxed"
        >
          Where students become researchers, algorithms become systems, and curiosity turns into computational impact. The digital gateway to our ACM student chapter.
        </p>

        {/* Action CTAs */}
        <div
          ref={ctaGroupRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest"
        >
          <a
            href="#information"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-7 py-3.5 font-bold text-slate-950 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/25 hover:shadow-cyan-300/40 hover:-translate-y-0.5"
          >
            <span>Explore Chapter</span>
            <span>↓</span>
          </a>
          <a
            href="#people"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-7 py-3.5 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all backdrop-blur-sm"
          >
            <span>Meet The Team</span>
            <span className="text-cyan-400">→</span>
          </a>
        </div>

        {/* Canvas HUD Controller */}
        <div ref={hudRef} className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setInteractiveNetwork(!interactiveNetwork)}
            className="inline-flex items-center gap-2 rounded border border-slate-800 bg-[#040a17]/80 px-3 py-1 font-mono text-[11px] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors cursor-pointer"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${interactiveNetwork ? "bg-cyan-400" : "bg-slate-600"}`} />
            <span>INTERACTIVE VISUAL: {interactiveNetwork ? "ACTIVE" : "PAUSED"}</span>
          </button>
        </div>
      </div>

      {/* Hero Telemetry Strip */}
      <div ref={telemetryRef} className="relative z-10 mt-16 w-full max-w-5xl">
        <div className="corner-crosshair glass-panel rounded-xl p-4 sm:p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-cyan-500/10">
            <div className="p-2 hero-telemetry-item">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Chapter
              </div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-white font-mono">
                ACM STUDENT CHAPTER
              </div>
            </div>
            <div className="p-2 hero-telemetry-item">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Community
              </div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-cyan-300 font-mono">
                STUDENTS & FACULTY
              </div>
            </div>
            <div className="p-2 hero-telemetry-item">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Activities
              </div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-white font-mono">
                WORKSHOPS & SPRINTS
              </div>
            </div>
            <div className="p-2 hero-telemetry-item">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Access
              </div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-cyan-300 font-mono flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                OPEN TO ALL MAJORS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

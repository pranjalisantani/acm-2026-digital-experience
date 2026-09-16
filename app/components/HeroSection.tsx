"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NetworkCanvas from "./NetworkCanvas";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP: UNIFIED PINNED CONTINUOUS SCROLL STORYTELLING
    // Starts directly from the Hero at progress 0.0
    // ========================================================
    mm.add("(min-width: 1024px)", () => {
      if (!pinTrackRef.current) return;

      // Selectors for Hero and 3 Narrative Beats
      const heroContent = ".hero-initial-content";
      const heroTitleLines = ".hero-initial-title .mask-line";
      const heroSubtitle = ".hero-initial-sub";
      const heroScrollCue = ".hero-scroll-cue";

      const b1 = ".story-beat-1";
      const b1Pill = ".story-beat-1 .beat-pill";
      const b1Lines = ".story-beat-1 .mask-line";
      const b1Copy = ".story-beat-1 .beat-copy";
      const b1Tags = ".story-beat-1 .beat-tags";

      const b2 = ".story-beat-2";
      const b2Pill = ".story-beat-2 .beat-pill";
      const b2Lines = ".story-beat-2 .mask-line";
      const b2Copy = ".story-beat-2 .beat-copy";
      const b2Tags = ".story-beat-2 .beat-tags";

      const b3 = ".story-beat-3";
      const b3Pill = ".story-beat-3 .beat-pill";
      const b3Lines = ".story-beat-3 .mask-line";
      const b3Copy = ".story-beat-3 .beat-copy";
      const b3Actions = ".story-beat-3 .beat-actions";

      // Initial visual states
      // Hero: Fully visible at top
      gsap.set(heroContent, { opacity: 1, pointerEvents: "auto" });
      gsap.set(heroTitleLines, { yPercent: 0, opacity: 1 });
      gsap.set([heroSubtitle, heroScrollCue], { opacity: 1, y: 0 });

      // Beats 1, 2, 3: Hidden below
      gsap.set([b1, b2, b3], { opacity: 0, pointerEvents: "none" });
      gsap.set([b1Lines, b2Lines, b3Lines], { yPercent: 120, opacity: 0 });
      gsap.set([b1Pill, b1Copy, b1Tags, b2Pill, b2Copy, b2Tags, b3Pill, b3Copy, b3Actions], {
        opacity: 0,
        y: 25,
      });

      // Master Scroll-Triggered Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTrackRef.current,
          start: "top top",
          end: "+=3600",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // ----------------------------------------------------
      // SEQUENCE 0: HERO EXIT (Progress 0.0 -> 0.25)
      // Camera begins accelerating into network canvas
      // ----------------------------------------------------
      tl.addLabel("hero", 0)
        // Hero title lines slide up and dissolve through mask
        .to(
          heroTitleLines,
          {
            yPercent: -120,
            opacity: 0,
            stagger: 0.06,
            duration: 1.0,
            ease: "power2.inOut",
          },
          0.15
        )
        .to(
          [heroSubtitle, heroScrollCue],
          {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.15
        )
        .set(heroContent, { opacity: 0, pointerEvents: "none" }, 1.1)

        // ----------------------------------------------------
        // SEQUENCE 1: BEAT 1 (FOUNDATION) (Progress 0.25 -> 0.52)
        // Camera centers on Cluster 1 (Scientific Rigor & Charter)
        // ----------------------------------------------------
        .addLabel("beat1", 1.1)
        .set(b1, { opacity: 1, pointerEvents: "auto" }, 1.1)
        .to(b1Pill, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.2)
        .to(
          b1Lines,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 1.0,
            ease: "power3.out",
          },
          1.3
        )
        .to([b1Copy, b1Tags], { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.5)

        // Hold Beat 1, then transition out
        .to(
          b1Lines,
          {
            yPercent: -120,
            opacity: 0,
            stagger: 0.06,
            duration: 0.9,
            ease: "power2.inOut",
          },
          2.6
        )
        .to([b1Pill, b1Copy, b1Tags], { opacity: 0, y: -25, duration: 0.8, ease: "power2.inOut" }, 2.6)
        .set(b1, { opacity: 0, pointerEvents: "none" }, 3.4)

        // ----------------------------------------------------
        // SEQUENCE 2: BEAT 2 (CONVERGENCE) (Progress 0.52 -> 0.78)
        // Camera shifts to Cluster 2 (Systems & Open Code)
        // ----------------------------------------------------
        .addLabel("beat2", 3.4)
        .set(b2, { opacity: 1, pointerEvents: "auto" }, 3.4)
        .to(b2Pill, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 3.5)
        .to(
          b2Lines,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 1.0,
            ease: "power3.out",
          },
          3.6
        )
        .to([b2Copy, b2Tags], { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 3.8)

        // Hold Beat 2, then transition out
        .to(
          b2Lines,
          {
            yPercent: -120,
            opacity: 0,
            stagger: 0.06,
            duration: 0.9,
            ease: "power2.inOut",
          },
          4.9
        )
        .to([b2Pill, b2Copy, b2Tags], { opacity: 0, y: -25, duration: 0.8, ease: "power2.inOut" }, 4.9)
        .set(b2, { opacity: 0, pointerEvents: "none" }, 5.7)

        // ----------------------------------------------------
        // SEQUENCE 3: BEAT 3 (COMMUNITY & GATEWAY) (Progress 0.78 -> 1.0)
        // Camera pulls back to reveal the connected constellation
        // ----------------------------------------------------
        .addLabel("beat3", 5.7)
        .set(b3, { opacity: 1, pointerEvents: "auto" }, 5.7)
        .to(b3Pill, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 5.8)
        .to(
          b3Lines,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 1.0,
            ease: "power3.out",
          },
          5.9
        )
        .to([b3Copy, b3Actions], { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 6.1);
    });

    // ========================================================
    // MOBILE / TABLET: TOUCH PROGRESSIVE EDITORIAL STORY
    // No scroll-trapping; clean progressive scroll reveals
    // ========================================================
    mm.add("(max-width: 1023px)", () => {
      const mobileCards = gsap.utils.toArray<HTMLElement>(".mobile-story-card");
      mobileCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative z-10 w-full bg-[#030712] text-slate-100 overflow-hidden"
    >
      {/* ======================================================== */}
      {/* DESKTOP PINNED CONTINUOUS SCROLL VIEWPORT               */}
      {/* ======================================================== */}
      <div
        ref={pinTrackRef}
        className="hidden lg:flex relative h-screen w-full flex-col justify-between overflow-hidden px-8 py-8"
      >
        {/* Living 3D Perspective Network Canvas */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[180px] pointer-events-none" />

          {/* Interactive / Scrubbed 3D Canvas */}
          <NetworkCanvas
            progress={scrollProgress}
            interactive={true}
            className="absolute inset-0"
          />

          {/* Minimal Editorial Grid Mask */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff06_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff06_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_65%,transparent_100%)] pointer-events-none" />
        </div>

        {/* TOP STATUS BAR: Minimal Editorial Header */}
        <div className="relative z-20 flex items-center justify-between border-b border-cyan-500/15 pb-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
            <span className="text-cyan-300 font-bold uppercase tracking-wider">
              ACM FACE // CHAPTER EXPERIENCE
            </span>
          </div>

          {/* Phase Indicators */}
          <div className="flex items-center gap-4 text-[11px]">
            <span
              className={`transition-colors duration-300 ${
                scrollProgress < 0.25
                  ? "text-cyan-300 font-bold"
                  : "text-slate-500"
              }`}
            >
              00 // IDENTITY
            </span>
            <span className="text-slate-700">•</span>
            <span
              className={`transition-colors duration-300 ${
                scrollProgress >= 0.25 && scrollProgress < 0.52
                  ? "text-cyan-300 font-bold"
                  : "text-slate-500"
              }`}
            >
              01 // FOUNDATION
            </span>
            <span className="text-slate-700">•</span>
            <span
              className={`transition-colors duration-300 ${
                scrollProgress >= 0.52 && scrollProgress < 0.78
                  ? "text-cyan-300 font-bold"
                  : "text-slate-500"
              }`}
            >
              02 // CONVERGENCE
            </span>
            <span className="text-slate-700">•</span>
            <span
              className={`transition-colors duration-300 ${
                scrollProgress >= 0.78
                  ? "text-cyan-300 font-bold"
                  : "text-slate-500"
              }`}
            >
              03 // COMMUNITY
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">
              PROGRESS
            </span>
            <span className="font-mono text-cyan-400 font-bold">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* CENTRAL NARRATIVE STAGE */}
        <div className="relative z-10 mx-auto w-full max-w-5xl flex-1 flex items-center justify-center">
          {/* ==================================================== */}
          {/* 00: INITIAL HERO IDENTITY (Progress 0.0)             */}
          {/* ==================================================== */}
          <div className="hero-initial-content absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            {/* Minimal Chapter Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
                ASSOCIATION FOR COMPUTING MACHINERY • STUDENT CHAPTER
              </span>
            </div>

            {/* Monumental Clean Typography with Masked Line Wrappers */}
            <div className="hero-initial-title">
              <div className="overflow-hidden py-1">
                <h1 className="mask-line text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.05]">
                  ACM FACE
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h2 className="mask-line text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text leading-[1.08] cyan-text-glow">
                  A Living Community of Computing Minds
                </h2>
              </div>
            </div>

            {/* Editorial Subtitle */}
            <p className="hero-initial-sub mt-8 max-w-2xl text-slate-300 font-light text-lg sm:text-xl leading-relaxed">
              Where students become researchers, algorithms become systems, and curiosity
              turns into computational impact.
            </p>

            {/* Scroll Explore Cue */}
            <div className="hero-scroll-cue mt-10 flex items-center gap-2 font-mono text-xs text-cyan-400/80">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Scroll to enter the network ↓</span>
            </div>
          </div>

          {/* ==================================================== */}
          {/* 01: BEAT 1 — FOUNDATION (Progress ~0.35)              */}
          {/* ==================================================== */}
          <div className="story-beat-1 absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <div className="beat-pill inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-4 py-1 font-mono text-xs uppercase tracking-widest text-cyan-300 mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>PHASE 01 // GLOBAL ROOTS</span>
            </div>

            <div className="overflow-hidden py-1">
              <h2 className="mask-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
                Chartered For
              </h2>
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="mask-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text leading-[1.05] cyan-text-glow">
                Scientific Rigor
              </h2>
            </div>

            <p className="beat-copy mt-8 max-w-2xl text-slate-300 font-light text-lg sm:text-xl leading-relaxed">
              Chartered under the ACM. Advancing foundational computer science,
              algorithmic depth, and scientific rigor.
            </p>

            <div className="beat-tags mt-8 flex items-center gap-6 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">■</span> EST. 1947 ACM CHARTER
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">■</span> TURING AWARD LEGACY
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">■</span> SCIENTIFIC ETHOS
              </span>
            </div>
          </div>

          {/* ==================================================== */}
          {/* 02: BEAT 2 — CONVERGENCE (Progress ~0.65)              */}
          {/* ==================================================== */}
          <div className="story-beat-2 absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <div className="beat-pill inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-4 py-1 font-mono text-xs uppercase tracking-widest text-cyan-300 mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>PHASE 02 // THE CONVERGENCE</span>
            </div>

            <div className="overflow-hidden py-1">
              <h2 className="mask-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
                Where Rigorous Theory
              </h2>
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="mask-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-gradient-to-r from-sky-300 via-cyan-200 to-white bg-clip-text leading-[1.05] cyan-text-glow">
                Turns Into Production
              </h2>
            </div>

            <p className="beat-copy mt-8 max-w-2xl text-slate-300 font-light text-lg sm:text-xl leading-relaxed">
              Bridging textbook algorithms and systems engineering through reading groups,
              practical clinics, and collaborative open-source repositories.
            </p>

            <div className="beat-tags mt-8 flex items-center gap-6 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">▲</span> ALGORITHMIC CLINICS
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">▲</span> SYSTEMS RUNTIMES
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">▲</span> PEER CODE REVIEW
              </span>
            </div>
          </div>

          {/* ==================================================== */}
          {/* 03: BEAT 3 — COMMUNITY & GATEWAY (Progress ~0.90)    */}
          {/* ==================================================== */}
          <div className="story-beat-3 absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <div className="beat-pill inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-4 py-1 font-mono text-xs uppercase tracking-widest text-cyan-300 mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>PHASE 03 // THE GATEWAY</span>
            </div>

            <div className="overflow-hidden py-1">
              <h2 className="mask-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
                An Open Gateway For
              </h2>
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="mask-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white bg-clip-text leading-[1.05] cyan-text-glow">
                Computational Minds
              </h2>
            </div>

            <p className="beat-copy mt-8 max-w-2xl text-slate-300 font-light text-lg sm:text-xl leading-relaxed">
              Connecting students with peer mentorship, technical workshops, and direct access
              to the global computing society.
            </p>

            {/* Direct Action CTAs */}
            <div className="beat-actions mt-9 flex items-center gap-4">
              <a
                href="#people"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-3.5 font-mono text-xs font-bold text-slate-950 shadow-lg shadow-cyan-400/25 transition-all hover:bg-cyan-300 hover:shadow-cyan-400/40 cursor-pointer"
              >
                <span>MEET THE TEAM</span>
                <span className="text-sm">↓</span>
              </a>
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-slate-900/60 px-7 py-3.5 font-mono text-xs text-cyan-300 backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-cyan-950/40 cursor-pointer"
              >
                <span>UPCOMING EVENTS</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM PROGRESS TRACK */}
        <div className="relative z-20 flex flex-col gap-2 pt-4 border-t border-cyan-500/15 font-mono text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              CONTINUOUS SCROLL STORYTELLING
            </span>
            <span className="text-[10px] text-cyan-400 tracking-widest uppercase">
              REVERSE TO REWIND
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-slate-900/80 overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-sky-300 transition-[width] duration-75 shadow-sm shadow-cyan-400"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE / TABLET: TOUCH PROGRESSIVE EDITORIAL STORY       */}
      {/* ======================================================== */}
      <div className="lg:hidden px-4 pt-32 pb-20 max-w-2xl mx-auto space-y-12">
        {/* Mobile Hero Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-[11px] font-mono uppercase text-cyan-300 mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ACM STUDENT CHAPTER</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            ACM FACE
          </h1>
          <p className="mt-3 text-lg font-bold text-transparent bg-gradient-to-r from-cyan-300 to-white bg-clip-text">
            A Living Community of Computing Minds
          </p>
          <p className="mt-4 text-sm text-slate-300 font-light leading-relaxed">
            Where students become researchers, algorithms become systems, and curiosity
            turns into computational impact.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 font-mono text-xs">
            <a
              href="#people"
              className="rounded-lg bg-cyan-400 px-6 py-3 font-bold text-slate-950"
            >
              Meet The Team ↓
            </a>
            <a
              href="#events"
              className="rounded-lg border border-cyan-500/30 bg-slate-900/60 px-6 py-3 text-cyan-300"
            >
              Events →
            </a>
          </div>
        </div>

        {/* Mobile Story Card 1 */}
        <div className="mobile-story-card corner-crosshair glass-panel rounded-2xl p-6 border border-cyan-500/30">
          <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-2">
            01 // GLOBAL ROOTS (EST. 1947)
          </div>
          <h3 className="text-xl font-bold text-white uppercase">
            World’s Premier Computing Society
          </h3>
          <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
            Chartered under the Association for Computing Machinery. Behind the Turing Award
            and canonical computing SIGs, ACM establishes global standards of scientific excellence.
          </p>
        </div>

        {/* Mobile Story Card 2 */}
        <div className="mobile-story-card corner-crosshair glass-panel rounded-2xl p-6 border border-cyan-500/30">
          <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-2">
            02 // THE CONVERGENCE
          </div>
          <h3 className="text-xl font-bold text-white uppercase">
            Where Theory Turns Into Production
          </h3>
          <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
            Eliminating the boundary between textbook proofs and production software.
            Student-run reading groups, algorithmic clinics, and open-source infrastructure.
          </p>
        </div>

        {/* Mobile Story Card 3 */}
        <div className="mobile-story-card corner-crosshair glass-panel rounded-2xl p-6 border border-cyan-500/30">
          <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-2">
            03 // OUR MANDATE
          </div>
          <h3 className="text-xl font-bold text-white uppercase">
            An Open Gateway For Student Growth
          </h3>
          <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
            Connecting students with peer mentorship, practical software projects,
            hands-on technical workshops, and direct access to the global ACM society.
          </p>
        </div>
      </div>
    </section>
  );
}

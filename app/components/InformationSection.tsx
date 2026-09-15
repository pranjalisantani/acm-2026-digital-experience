"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NetworkCanvas from "./NetworkCanvas";

export default function InformationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const glowOrbRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // ==========================================
    // DESKTOP: CINEMATIC PINNED SCROLL STORY
    // ==========================================
    mm.add("(min-width: 1024px)", () => {
      if (!pinTrackRef.current) return;

      // Select line reveals for each beat
      const b1Tag = ".story-beat-1 .beat-tag";
      const b1Lines = ".story-beat-1 .beat-line";
      const b1Copy = ".story-beat-1 .beat-copy";
      const b1Meta = ".story-beat-1 .beat-meta";

      const b2Tag = ".story-beat-2 .beat-tag";
      const b2Lines = ".story-beat-2 .beat-line";
      const b2Copy = ".story-beat-2 .beat-copy";
      const b2Meta = ".story-beat-2 .beat-meta";

      const b3Tag = ".story-beat-3 .beat-tag";
      const b3Lines = ".story-beat-3 .beat-line";
      const b3Copy = ".story-beat-3 .beat-copy";
      const b3Meta = ".story-beat-3 .beat-meta";
      const b3Cta = ".story-beat-3 .beat-cta";

      // Initial visual states
      // Beat 1: Visible by default
      gsap.set(".story-beat-1", { opacity: 1, pointerEvents: "auto" });
      gsap.set([b1Tag, b1Lines, b1Copy, b1Meta], { yPercent: 0, opacity: 1 });

      // Beat 2 & 3: Hidden below mask
      gsap.set(".story-beat-2", { opacity: 0, pointerEvents: "none" });
      gsap.set([b2Tag, b2Copy, b2Meta], { opacity: 0, y: 30 });
      gsap.set(b2Lines, { yPercent: 120, opacity: 0 });

      // Beat 3
      gsap.set(".story-beat-3", { opacity: 0, pointerEvents: "none" });
      gsap.set([b3Tag, b3Copy, b3Meta, b3Cta], { opacity: 0, y: 30 });
      gsap.set(b3Lines, { yPercent: 120, opacity: 0 });

      // Step indicators
      const indicators = gsap.utils.toArray<HTMLElement>(".hud-step-pill");

      // Main Master Timeline controlled entirely by user scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTrackRef.current,
          start: "top top",
          end: "+=3200",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.round(self.progress * 100)}%`;
            }
            if (progressTextRef.current) {
              const pct = Math.round(self.progress * 100);
              progressTextRef.current.textContent = `${pct < 10 ? "0" : ""}${pct}%`;
            }
          },
        },
      });

      // ----------------------------------------------------
      // SECTION 1: BEAT 1 HOLD & DISSOLVE (Progress 0.0 -> 0.35)
      // ----------------------------------------------------
      tl.addLabel("beat1_start", 0)
        // Canvas initial slow ambient scale
        .to(canvasWrapRef.current, {
          scale: 1.1,
          xPercent: 4,
          yPercent: -2,
          duration: 1.2,
          ease: "none",
        }, 0)
        // Beat 1 typography exits upwards cleanly through line masks
        .to(b1Lines, {
          yPercent: -120,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power2.inOut",
        }, 0.8)
        .to([b1Tag, b1Copy, b1Meta], {
          opacity: 0,
          y: -25,
          duration: 0.8,
          ease: "power2.inOut",
        }, 0.8)
        .to(".story-beat-1", {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2,
        }, 1.6)

        // ----------------------------------------------------
        // SECTION 2: BEAT 2 ENTRANCE & CONVERGENCE (Progress 0.35 -> 0.70)
        // ----------------------------------------------------
        .addLabel("beat2_start", 1.6)
        // Update HUD indicator 1 -> 2
        .to(indicators[0], { opacity: 0.3, borderColor: "rgba(0, 240, 255, 0.15)" }, 1.6)
        .to(indicators[1], { opacity: 1, borderColor: "rgba(0, 240, 255, 0.9)" }, 1.7)
        // Canvas zooms closer into high-density graph nodes
        .to(canvasWrapRef.current, {
          scale: 1.35,
          xPercent: -8,
          yPercent: 4,
          duration: 1.6,
          ease: "power1.inOut",
        }, 1.6)
        // Glow orb shifts and intensifies
        .to(glowOrbRef.current, {
          xPercent: -20,
          yPercent: 15,
          opacity: 0.85,
          duration: 1.6,
        }, 1.6)
        // Beat 2 activates
        .set(".story-beat-2", { opacity: 1, pointerEvents: "auto" }, 1.6)
        // Beat 2 lines scrub UP into view through line masks
        .to(b2Tag, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.7)
        .to(b2Lines, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.0,
          ease: "power3.out",
        }, 1.8)
        .to([b2Copy, b2Meta], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, 2.0)

        // Hold Beat 2 briefly, then transition out
        .to(b2Lines, {
          yPercent: -120,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power2.inOut",
        }, 3.0)
        .to([b2Tag, b2Copy, b2Meta], {
          opacity: 0,
          y: -25,
          duration: 0.8,
          ease: "power2.inOut",
        }, 3.0)
        .to(".story-beat-2", {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2,
        }, 3.8)

        // ----------------------------------------------------
        // SECTION 3: BEAT 3 ENTRANCE & MANDATE (Progress 0.70 -> 1.0)
        // ----------------------------------------------------
        .addLabel("beat3_start", 3.8)
        // Update HUD indicator 2 -> 3
        .to(indicators[1], { opacity: 0.3, borderColor: "rgba(0, 240, 255, 0.15)" }, 3.8)
        .to(indicators[2], { opacity: 1, borderColor: "rgba(0, 240, 255, 0.9)" }, 3.9)
        // Canvas recedes to wide panoramic perspective
        .to(canvasWrapRef.current, {
          scale: 0.95,
          xPercent: 0,
          yPercent: 0,
          duration: 1.5,
          ease: "power2.inOut",
        }, 3.8)
        // Glow orb widens
        .to(glowOrbRef.current, {
          xPercent: 0,
          yPercent: 0,
          opacity: 0.5,
          scale: 1.2,
          duration: 1.5,
        }, 3.8)
        // Beat 3 activates
        .set(".story-beat-3", { opacity: 1, pointerEvents: "auto" }, 3.8)
        // Beat 3 lines scrub UP into view through line masks
        .to(b3Tag, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 3.9)
        .to(b3Lines, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.0,
          ease: "power3.out",
        }, 4.0)
        .to([b3Copy, b3Meta, b3Cta], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }, 4.2);
    });

    // ==========================================
    // MOBILE / TABLET: TOUCH PROGRESSIVE REVEALS
    // ==========================================
    mm.add("(max-width: 1023px)", () => {
      const beats = gsap.utils.toArray<HTMLElement>(".mobile-story-beat");
      beats.forEach((beat) => {
        gsap.fromTo(
          beat,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: beat,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // 4 Dimensions of Growth Grid (Always smooth entrance on scroll)
    gsap.fromTo(
      ".growth-dimension-card",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".growth-dimension-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        clearProps: "transform",
      }
    );

    return () => mm.revert();
  }, []);

  const dimensions = [
    {
      step: "01",
      title: "Scientific Inquiry & Research",
      tag: "THEORY & PAPERS",
      desc: "Algorithmic complexity, reading circles, preprint digests, and theoretical computation extending beyond standard curriculum.",
      metric: "ACM SIG Paper Reading Circles",
    },
    {
      step: "02",
      title: "Systems Engineering & Infrastructure",
      tag: "SYSTEMS & CODE",
      desc: "Real-world distributed systems, performance tooling, and open-source chapter infrastructure engineered by students.",
      metric: "Verified Student Repositories",
    },
    {
      step: "03",
      title: "Peer Culture & Competitive Code",
      tag: "COMMUNITY & SPEED",
      desc: "Algorithmic problem-solving clinics, ICPC Asia regional preparation, and collaborative weekend sprints.",
      metric: "Weekly Competitive Clinics",
    },
    {
      step: "04",
      title: "Professional Access & Mentorship",
      tag: "CAREER & HORIZONS",
      desc: "Direct architectural reviews from alumni, chapter seniors, and immediate access to global ACM Digital Library assets.",
      metric: "Senior-to-Junior Pipeline",
    },
  ];

  return (
    <section
      id="information"
      ref={containerRef}
      className="relative z-20 bg-[#030712] text-slate-100 selection:bg-cyan-500/20"
    >
      {/* DESKTOP PINNED STORYTELLING STAGE */}
      <div
        ref={pinTrackRef}
        className="hidden lg:flex relative h-screen w-full flex-col justify-between overflow-hidden border-t border-cyan-500/20 px-8 py-8"
      >
        {/* Living Visual Canvas Layer (Transforms with Scroll Timeline) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Ambient Lighting Orb */}
          <div
            ref={glowOrbRef}
            className="absolute top-1/2 left-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[160px] transition-all duration-300"
          />

          {/* Dynamic Interactive Network Canvas */}
          <div
            ref={canvasWrapRef}
            className="absolute inset-0 h-full w-full transform origin-center will-change-transform"
          >
            <NetworkCanvas interactive={false} nodeCount={60} maxDistance={150} />
          </div>

          {/* Precision Grid & Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        {/* TOP HUD BAR: Storytelling Navigation & Real-time State */}
        <div className="relative z-20 flex items-center justify-between border-b border-cyan-500/20 pb-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
            <span className="text-cyan-300 font-bold uppercase tracking-wider">
              ACM STUDENT CHAPTER // OVERVIEW
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">
              SCROLL TO EXPLORE
            </span>
          </div>

          {/* Phase Step Pills */}
          <div className="flex items-center gap-3">
            <div className="hud-step-pill flex items-center gap-2 rounded-full border border-cyan-400/90 bg-cyan-950/40 px-3.5 py-1 text-cyan-300 transition-all">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>01 // FOUNDATION</span>
            </div>
            <div className="hud-step-pill flex items-center gap-2 rounded-full border border-cyan-500/15 bg-slate-900/30 px-3.5 py-1 text-slate-400 opacity-30 transition-all">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>02 // CONVERGENCE</span>
            </div>
            <div className="hud-step-pill flex items-center gap-2 rounded-full border border-cyan-500/15 bg-slate-900/30 px-3.5 py-1 text-slate-400 opacity-30 transition-all">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>03 // MANDATE</span>
            </div>
          </div>

          {/* Scrub Telemetry */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">
              PROGRESS
            </span>
            <span
              ref={progressTextRef}
              className="font-bold text-cyan-400 font-mono text-sm"
            >
              00%
            </span>
          </div>
        </div>

        {/* CENTER STORYTELLING STAGE (All 3 Beats Positioned Absolute) */}
        <div className="relative z-10 mx-auto w-full max-w-5xl flex-1 flex items-center justify-center">
          {/* ======================================================== */}
          {/* BEAT 01: THE FOUNDATION                                   */}
          {/* ======================================================== */}
          <div className="story-beat-1 absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            {/* Pill */}
            <div className="beat-tag inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-cyan-300 mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>PHASE 01 // GLOBAL ROOTS</span>
            </div>

            {/* Masked Typography Reveal */}
            <div className="overflow-hidden py-1">
              <h2 className="beat-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] will-change-transform">
                A Living Network
              </h2>
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="beat-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text leading-[1.05] cyan-text-glow will-change-transform">
                Of Computing Minds
              </h2>
            </div>

            {/* Editorial Copy */}
            <p className="beat-copy mt-8 max-w-2xl text-slate-300 font-light text-lg sm:text-xl leading-relaxed">
              Chartered under the world’s largest scientific and educational computing society.
              We unite students, researchers, and engineers to explore foundational computer science
              with uncompromising technical rigor.
            </p>

            {/* Metadata Tags */}
            <div className="beat-meta mt-8 flex items-center gap-6 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">■</span> EST. 1947 CHARTER
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">■</span> A.M. TURING LEGACY
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">■</span> OPEN SCIENTIFIC ETHOS
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BEAT 02: THE CONVERGENCE                                  */}
          {/* ======================================================== */}
          <div className="story-beat-2 absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            {/* Pill */}
            <div className="beat-tag inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-cyan-300 mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>PHASE 02 // THE CONVERGENCE</span>
            </div>

            {/* Masked Typography Reveal */}
            <div className="overflow-hidden py-1">
              <h2 className="beat-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] will-change-transform">
                Where Rigorous Theory
              </h2>
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="beat-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-gradient-to-r from-sky-300 via-cyan-200 to-white bg-clip-text leading-[1.05] cyan-text-glow will-change-transform">
                Turns Into Production
              </h2>
            </div>

            {/* Editorial Copy */}
            <p className="beat-copy mt-8 max-w-2xl text-slate-300 font-light text-lg sm:text-xl leading-relaxed">
              We eliminate the boundary between textbook proofs and production software.
              Through student-led reading groups, systems workshops, and competitive programming,
              curiosity transforms into verifiable code.
            </p>

            {/* Metadata Tags */}
            <div className="beat-meta mt-8 flex items-center gap-6 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">▲</span> ALGORITHMIC CLINICS
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">▲</span> DISTRIBUTED RUNTIMES
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">▲</span> PEER-REVIEWED ARCHITECTURE
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BEAT 03: THE MANDATE                                      */}
          {/* ======================================================== */}
          <div className="story-beat-3 absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            {/* Pill */}
            <div className="beat-tag inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-cyan-300 mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>PHASE 03 // THE MANDATE</span>
            </div>

            {/* Masked Typography Reveal */}
            <div className="overflow-hidden py-1">
              <h2 className="beat-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] will-change-transform">
                An Interactive Platform
              </h2>
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="beat-line text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white bg-clip-text leading-[1.05] cyan-text-glow will-change-transform">
                For Computational Impact
              </h2>
            </div>

            {/* Editorial Copy */}
            <p className="beat-copy mt-8 max-w-2xl text-slate-300 font-light text-lg sm:text-xl leading-relaxed">
              ACM FACE connects students with peer mentorship, practical software projects,
              technical workshops, and direct access to the global ACM computing society.
            </p>

            {/* Action Prompt */}
            <div className="beat-cta mt-9 flex items-center gap-4">
              <a
                href="#people"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-mono text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-300 hover:shadow-cyan-400/40 cursor-pointer"
              >
                <span>MEET THE TEAM</span>
                <span className="text-sm">↓</span>
              </a>
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-slate-900/60 px-6 py-3 font-mono text-xs text-cyan-300 backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-cyan-950/40 cursor-pointer"
              >
                <span>UPCOMING EVENTS</span>
                <span>→</span>
              </a>
            </div>

            {/* Metadata Tags */}
            <div className="beat-meta mt-8 flex items-center gap-6 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">●</span> STUDENT ORGANIZED
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">●</span> OPEN TO ALL MAJORS
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">●</span> PEER MENTORSHIP
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM HUD BAR: Continuous Scrubbed Progress Track */}
        <div className="relative z-20 flex flex-col gap-2 pt-4 border-t border-cyan-500/20 font-mono text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              SCROLL TO PROGRESS // REVERSE TO REWIND
            </span>
            <span className="text-[10px] text-cyan-400 tracking-widest uppercase">
              CINEMATIC SCROLL SEQUENCE
            </span>
          </div>

          {/* Slim Cyan Scrub Bar */}
          <div className="h-1 w-full rounded-full bg-slate-900/80 overflow-hidden border border-cyan-500/20">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-gradient-to-r from-cyan-400 to-sky-300 transition-[width] duration-75 shadow-sm shadow-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET: TOUCH PROGRESSIVE EDITORIAL STACK */}
      <div className="lg:hidden px-4 py-20 max-w-2xl mx-auto space-y-10 border-t border-cyan-500/20">
        <div className="border-b border-cyan-500/20 pb-6">
          <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
            01 // CHAPTER IDENTITY & FOUNDATION
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
            A Living Network of Computing Minds
          </h2>
          <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
            The Association for Computing Machinery student chapter advancing computing rigor,
            open-source engineering, and research culture.
          </p>
        </div>

        {/* Mobile Beat 1 */}
        <div className="mobile-story-beat corner-crosshair glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30">
          <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
            01 // GLOBAL ROOTS (EST. 1947)
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
            World’s Largest Computing Society
          </h3>
          <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
            The Association for Computing Machinery unites educators, researchers, and practitioners
            worldwide. Behind the Turing Award and canonical computing SIGs, ACM establishes global
            standards of scientific excellence.
          </p>
        </div>

        {/* Mobile Beat 2 */}
        <div className="mobile-story-beat corner-crosshair glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30">
          <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
            02 // THE CONVERGENCE
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
            Where Theory Turns Into Production
          </h3>
          <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
            We bridge textbook algorithms and distributed systems. Student-run reading groups,
            algorithmic clinics, and production open-source repositories designed to build real engineering depth.
          </p>
        </div>

        {/* Mobile Beat 3 */}
        <div className="mobile-story-beat corner-crosshair glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30">
          <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
            03 // OUR MISSION
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
            An Open Community For Student Growth
          </h3>
          <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
            ACM FACE connects students with peer mentorship, practical software projects,
            technical workshops, and direct access to the global ACM computing society.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#people"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 font-mono text-xs font-bold text-slate-950"
            >
              <span>Meet The Team ↓</span>
            </a>
            <a
              href="#events"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-slate-900/60 px-5 py-2.5 font-mono text-xs text-cyan-300"
            >
              <span>View Events →</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 DIMENSIONS OF GROWTH (OPERATIONAL CHAPTER EPILOGUE) */}
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 border-t border-cyan-500/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              02 // WHAT OUR MEMBERS DO
            </div>
            <h3 className="mt-3 text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              How Students Grow In The Chapter
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">
            COMMUNITY & LEARNING
          </span>
        </div>

        <div className="growth-dimension-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dimensions.map((dim) => (
            <div
              key={dim.step}
              className="growth-dimension-card glass-panel glass-panel-hover rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-cyan-400 font-bold">{dim.step} {"//"}</span>
                  <span className="rounded bg-cyan-500/10 px-2.5 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/20">
                    {dim.tag}
                  </span>
                </div>
                <h4 className="mt-4 text-base font-bold text-white tracking-tight leading-snug">
                  {dim.title}
                </h4>
                <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                  {dim.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-500/10 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span>FOCUS:</span>
                <span className="text-cyan-300 font-medium">{dim.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

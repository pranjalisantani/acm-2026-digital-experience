"use client";

import { useState, useEffect, useCallback } from "react";

interface BootSequenceProps {
  onComplete?: () => void;
}

const checks = [
  { label: "ACM IDENTITY // CHAPTER CORE", delay: 300 },
  { label: "NETWORK CONSTELLATION MESH", delay: 650 },
  { label: "EVENTS & SIGNALS ARCHITECTURE", delay: 1050 },
  { label: "PROJECT BRANCHES & INITIATIVES", delay: 1450 },
  { label: "COMMUNITY NODES & FACULTY ADVISORY", delay: 1850 },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [step, setStep] = useState(0);

  const dismiss = useCallback(() => {
    sessionStorage.setItem("acm_boot_completed", "true");
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasBooted = sessionStorage.getItem("acm_boot_completed");

    if (mediaQuery.matches || hasBooted) {
      if (onComplete) onComplete();
      return;
    }

    // Defer state update slightly to avoid cascading renders
    const startTimer = setTimeout(() => {
      setVisible(true);
    }, 50);

    // Progressive step reveal
    const timers: NodeJS.Timeout[] = [startTimer];
    checks.forEach((item, index) => {
      timers.push(
        setTimeout(() => {
          setStep(index + 1);
        }, item.delay)
      );
    });

    // System ready & auto fade
    timers.push(
      setTimeout(() => {
        setStep(checks.length + 1);
      }, 2200)
    );

    timers.push(
      setTimeout(() => {
        dismiss();
      }, 2900)
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismiss, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-slate-100 font-mono transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Central Terminal Box */}
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="corner-crosshair glass-panel rounded-xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                ACM 2026 // DIGITAL NETWORK
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">INIT_SEQ // v2.6</span>
          </div>

          {/* Subheader */}
          <div className="mt-4 text-xs text-slate-400">
            INITIALIZING CHAPTER ENVIRONMENT...
          </div>

          {/* Verification Items */}
          <div className="mt-6 space-y-3 text-xs">
            {checks.map((item, idx) => {
              const isChecked = step > idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between transition-all duration-300 ${
                    isChecked ? "text-slate-200" : "text-slate-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={isChecked ? "text-cyan-400" : "text-slate-600"}>
                      {isChecked ? "▸" : "·"}
                    </span>
                    {item.label}
                  </span>
                  <span
                    className={`font-mono text-[11px] ${
                      isChecked ? "text-cyan-400 font-bold" : "text-slate-700"
                    }`}
                  >
                    {isChecked ? "[ ✓ ]" : "[ ... ]"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Status line */}
          <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
            <div className="text-xs">
              {step > checks.length ? (
                <span className="text-cyan-300 font-bold flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  SYSTEM READY // ENTERING ACM
                </span>
              ) : (
                <span className="text-slate-400 animate-pulse text-[11px]">
                  CONNECTING TOPOLOGY...
                </span>
              )}
            </div>
            <button
              onClick={dismiss}
              className="text-[10px] uppercase tracking-wider text-slate-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 rounded px-2.5 py-1 bg-[#02050e] transition-colors cursor-pointer"
            >
              Skip [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

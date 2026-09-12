"use client";

import { useEffect } from "react";

interface ReviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewDrawer({ isOpen, onClose }: ReviewDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sections = [
    { num: "01", name: "Cinematic Boot", status: "Active & Skippable [ESC]" },
    { num: "02", name: "Monumental Hero", status: "ACM Community Tone & Dynamic Canvas" },
    { num: "03", name: "About ACM", status: "Editorial Storytelling & 4 Growth Dimensions" },
    { num: "04", name: "6 Capabilities", status: "Interactive Vectors: Learn, Build, Research..." },
    { num: "05", name: "Events & Calendar", status: "Interactive Month Navigator & Day Signals" },
    { num: "06", name: "Event Detail Modal", status: "Full Dossier with Curriculum & Speaker" },
    { num: "07", name: "People Constellation", status: "Node Hover & Profile Dossier Modal" },
    { num: "08", name: "Project Branches", status: "Problem, Approach, Tech, and Outcome Schema" },
    { num: "09", name: "Photo Archive", status: "Timeline-based Event Visual Record" },
    { num: "10", name: "Learning Repository", status: "Live Search & Category Filters" },
    { num: "11", name: "Membership Portal", status: "The 4 Verbs & Interactive Form Modal" },
    { num: "12", name: "Contact & Headquarters", status: "Verified Channels & Signal Dispatch" },
    { num: "13", name: "Footer Directory", status: "Complete Index & Official ACM Affiliations" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md transition-opacity font-mono">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-label="Close review guide backdrop"
      />
      <div className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-cyan-500/30 bg-[#040a18]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-cyan-400">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              SENIOR PRESENTATION GUIDE // ACM 2026
            </div>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-white font-sans">
              Visual Product Preview Walkthrough
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 transition-colors cursor-pointer"
            aria-label="Close guide"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-xs text-slate-300 font-sans">
          {/* Section 1: Senior Presentation Thesis */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-bold">
              01 // How To Present This To ACM Seniors
            </h3>
            <p className="mt-2 text-slate-300 leading-relaxed font-light">
              This build is a <strong>complete visual product preview</strong> of the upcoming ACM Chapter website. It demonstrates exactly where every major chapter feature lives—events, calendar, members, projects, photos, learning resources, and contact pipelines—while rigorously avoiding any fake ACM facts or made-up statistics.
            </p>
          </div>

          {/* Section 2: Real vs Structural Placeholders */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold mb-3">
              02 // Real Architecture vs Structural Placeholders
            </h3>
            <div className="space-y-2.5 font-mono text-[11px]">
              <div className="rounded border border-slate-800 bg-[#020510] p-3">
                <span className="text-cyan-300 font-bold">✓ REAL INTERACTIVE ENGINES:</span>
                <p className="mt-1 text-slate-300 font-sans text-xs">
                  Native 60 FPS HTML5 constellation canvas, month-by-month interactive calendar, real-time resource search bar, event detail slideouts, member profile dossiers, and skippable boot telemetry.
                </p>
              </div>

              <div className="rounded border border-slate-800 bg-[#020510] p-3">
                <span className="text-amber-400 font-bold">✦ STRUCTURAL PLACEHOLDERS:</span>
                <p className="mt-1 text-slate-300 font-sans text-xs">
                  Specific dates, event speaker names, chapter member photos, and repository URLs are marked as structural placeholders until the incoming 2026 Executive Committee ratifies the official roster and calendar.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: 13-Section Feature Matrix */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold mb-3">
              03 // Implemented Feature Matrix
            </h3>
            <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-[#030714] font-mono text-[11px]">
              {sections.map((s) => (
                <div key={s.num} className="p-2.5 flex items-center justify-between">
                  <span className="text-white font-semibold">
                    {s.num}. {s.name}
                  </span>
                  <span className="text-cyan-400 text-[10px]">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Phase 2 Next Steps */}
          <div className="rounded-xl border border-slate-800 bg-[#02050f] p-4 font-mono text-xs">
            <span className="text-cyan-300 font-bold block mb-1">
              04 // PHASE 2 INTEGRATION ROADMAP
            </span>
            <ul className="space-y-1.5 text-slate-400 text-[11px] font-sans">
              <li>• Connect Google Calendar / Devfolio API to the Interactive Calendar.</li>
              <li>• Populate official member photos and verified social links.</li>
              <li>• Embed student chapter research preprints in the Learning Repository.</li>
              <li>• Bind the Join Form to the official chapter registration database.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-cyan-500/20 pt-4 flex justify-between items-center text-xs font-mono text-slate-400">
          <span>ACM 2026 DIGITAL EXPERIENCE</span>
          <button
            onClick={onClose}
            className="rounded bg-cyan-500/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

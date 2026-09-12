"use client";

import { useEffect } from "react";

export interface ACMEvent {
  id: string;
  title: string;
  category: "Workshop" | "Hackathon" | "Symposium" | "Competitive" | "Keynote" | "Circle";
  date: string; // e.g. "2026-03-24"
  displayDate: string; // e.g. "March 24, 2026"
  time: string; // e.g. "17:30 - 19:30 IST"
  location: string; // e.g. "Computing Systems Lab 4 & Hybrid Stream"
  mode: "In-Person" | "Virtual" | "Hybrid";
  shortDescription: string;
  fullDescription: string;
  learningOutcomes: string[];
  speaker: {
    name: string;
    role: string;
    organization: string;
    isPlaceholder: boolean;
  };
  capacity?: string;
  status: "Upcoming" | "Registration Open" | "Archived";
  posterGradient: string;
}

interface EventDetailModalProps {
  event: ACMEvent | null;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (event) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-cyan-500/30 bg-[#040a18]/95 p-6 sm:p-8 shadow-2xl shadow-black overflow-y-auto font-sans">
        {/* Top bar with banner */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="uppercase tracking-widest">{event.category} {"//"} SIGNAL</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Structural Placeholder Notice */}
        <div className="mt-3 rounded border border-cyan-500/20 bg-cyan-950/20 px-3 py-1.5 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
          <span>[SAMPLE EVENT DATA // STRUCTURAL PLACEHOLDER]</span>
          <span className="text-slate-400">CONNECTS TO OFFICIAL REGISTRATION</span>
        </div>

        {/* Event Visual / Poster Banner Placeholder */}
        <div
          className={`mt-4 h-40 sm:h-48 w-full rounded-xl border border-cyan-500/30 p-6 flex flex-col justify-end relative overflow-hidden ${event.posterGradient}`}
        >
          <div className="absolute inset-0 tech-grid-dense opacity-30 pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block rounded border border-cyan-400/40 bg-black/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300 backdrop-blur-sm">
              ACM CHAPTER // 2026 CALENDAR
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow-md">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Key Event Metadata Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="rounded-lg border border-slate-800 bg-[#030712] p-2.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Date</span>
            <span className="font-semibold text-white">{event.displayDate}</span>
          </div>
          <div className="rounded-lg border border-slate-800 bg-[#030712] p-2.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Time</span>
            <span className="font-semibold text-cyan-300">{event.time}</span>
          </div>
          <div className="rounded-lg border border-slate-800 bg-[#030712] p-2.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Modality</span>
            <span className="font-semibold text-white">{event.mode}</span>
          </div>
          <div className="rounded-lg border border-slate-800 bg-[#030712] p-2.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Status</span>
            <span className="font-semibold text-emerald-400">{event.status}</span>
          </div>
        </div>

        {/* Location / Room */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-slate-800/80 bg-[#030712]/60 px-3.5 py-2 font-mono text-xs text-slate-300">
          <span className="text-cyan-400">📍</span>
          <span className="text-slate-400">Venue:</span>
          <span className="text-white font-medium">{event.location}</span>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            About This Session
          </h3>
          <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">
            {event.fullDescription}
          </p>
        </div>

        {/* What You'll Learn */}
        <div className="mt-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            What You&apos;ll Experience & Learn
          </h3>
          <ul className="mt-2.5 space-y-2 text-xs text-slate-300">
            {event.learningOutcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-mono mt-0.5">✦</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Speaker / Organizer Card Placeholder */}
        <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase text-slate-400">
            <span>Session Faculty / Speaker Host</span>
            <span className="text-cyan-400">[PLACEHOLDER DOSSIER]</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-500/30 bg-[#030712] font-mono text-sm font-bold text-cyan-300">
              ACM
            </div>
            <div>
              <div className="font-semibold text-white text-sm">{event.speaker.name}</div>
              <div className="text-xs text-slate-400">
                {event.speaker.role} • {event.speaker.organization}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="text-slate-400 text-[11px] text-center sm:text-left">
            Event architecture: Discover → Preview → Register
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => alert("Registration interface link placeholder. In production, this directs to the ACM Event Registration Portal / Google Forms / Devfolio.")}
              className="w-full sm:w-auto rounded-lg bg-cyan-400 px-5 py-2.5 font-bold text-slate-950 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20 cursor-pointer"
            >
              Register on Event Portal ↗
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

export interface EventPhoto {
  caption: string;
  tag: string;
  aspect?: string;
}

export interface ACMEvent {
  id: string;
  title: string;
  category: "Workshop" | "Hackathon" | "Symposium" | "Competitive" | "Keynote" | "Circle";
  date: string;
  displayDate: string;
  time: string;
  location: string;
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
  status: "Upcoming" | "Registration Open" | "Past Event";
  posterGradient: string;
  photos?: EventPhoto[];
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

  const isPast = event.status === "Past Event";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-cyan-500/30 bg-[#040a18]/95 p-6 sm:p-8 shadow-2xl shadow-black overflow-y-auto font-sans">
        {/* Top bar with category & close */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="uppercase tracking-widest">{event.category} EVENT</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Event Visual Header */}
        <div
          className={`mt-4 h-40 sm:h-48 w-full rounded-xl border border-cyan-500/30 p-6 flex flex-col justify-end relative overflow-hidden ${event.posterGradient}`}
        >
          <div className="absolute inset-0 tech-grid-dense opacity-25 pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block rounded border border-cyan-400/40 bg-black/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300 backdrop-blur-sm">
              ACM STUDENT CHAPTER // 2026
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow-md">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Key Event Metadata Grid: WHAT, WHEN, WHERE, STATUS */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="rounded-lg border border-slate-800 bg-[#030712] p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Date</span>
            <span className="font-semibold text-white mt-0.5 block">{event.displayDate}</span>
          </div>
          <div className="rounded-lg border border-slate-800 bg-[#030712] p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Time</span>
            <span className="font-semibold text-cyan-300 mt-0.5 block">{event.time}</span>
          </div>
          <div className="rounded-lg border border-slate-800 bg-[#030712] p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Mode</span>
            <span className="font-semibold text-white mt-0.5 block">{event.mode}</span>
          </div>
          <div className="rounded-lg border border-slate-800 bg-[#030712] p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Status</span>
            <span
              className={`font-semibold mt-0.5 block ${
                isPast ? "text-slate-400" : "text-emerald-400"
              }`}
            >
              {event.status}
            </span>
          </div>
        </div>

        {/* Where: Venue */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-slate-800/80 bg-[#030712]/60 px-3.5 py-2 font-mono text-xs text-slate-300">
          <span className="text-cyan-400">📍</span>
          <span className="text-slate-400">Location:</span>
          <span className="text-white font-medium">{event.location}</span>
        </div>

        {/* Details: Description */}
        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            About This Event
          </h3>
          <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">
            {event.fullDescription}
          </p>
        </div>

        {/* What You'll Experience & Learn */}
        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            Key Highlights & Topics
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

        {/* Host / Organizer */}
        <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-950/15 p-4">
          <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
            Organizer / Host
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-[#030712] font-mono text-xs font-bold text-cyan-300">
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

        {/* Registration Action (if upcoming) */}
        {!isPast ? (
          <div className="mt-6 p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-bold text-white">
                Registration Open
              </div>
              <div className="text-xs text-slate-300 font-light mt-0.5">
                Free for all university students. Limited seating for lab workshops.
              </div>
            </div>
            <button
              onClick={() => alert("Registration interface link placeholder. In production, this directs to the ACM Event Registration Portal / Google Forms / Devfolio.")}
              className="w-full sm:w-auto rounded-lg bg-cyan-400 px-6 py-2.5 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-400/25 cursor-pointer whitespace-nowrap"
            >
              Register on Portal ↗
            </button>
          </div>
        ) : (
          <div className="mt-6 p-3 rounded-lg border border-slate-800 bg-[#030712] font-mono text-xs text-slate-400 flex items-center justify-between">
            <span>SESSION COMPLETED</span>
            <span className="text-cyan-300">View Event Gallery Below ↓</span>
          </div>
        )}

        {/* Event-Owned Photo Gallery (Flow: DETAILS -> REGISTRATION -> EVENT PHOTOS) */}
        <div className="mt-8 pt-6 border-t border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Event Photo Gallery ({event.photos ? event.photos.length : 0})
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              {isPast ? "Archived Captures" : "Past Workshop Reference"}
            </span>
          </div>

          {event.photos && event.photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.photos.map((photo, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-cyan-500/20 bg-[#020612] p-3 overflow-hidden flex flex-col justify-between group hover:border-cyan-400/40 transition-all"
                >
                  <div className="h-28 w-full rounded-lg bg-gradient-to-br from-cyan-950/40 via-slate-900 to-[#020510] border border-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                    <span className="font-mono text-xs text-cyan-400/60 font-medium">
                      [PHOTO // {photo.tag}]
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-300 font-light leading-snug">
                    {photo.caption}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800/80 bg-[#030712]/50 p-6 text-center font-mono text-xs text-slate-500">
              Photos from this event will be uploaded to this session record following completion.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between font-mono text-xs text-slate-400">
          <span>ACM FACE 2026 // EVENTS</span>
          <button
            onClick={onClose}
            className="rounded border border-slate-700 bg-slate-900/60 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

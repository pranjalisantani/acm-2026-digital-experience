"use client";

import { useEffect } from "react";

export interface ACMMember {
  id: string;
  name: string;
  role: string;
  category: "Executive Core" | "Technical Lead" | "Research Associate" | "Operations & Creative" | "Alumni";
  yearBranch: string;
  initials: string;
  interests: string[];
  bio: string;
  responsibility?: string;
  isAlumni?: boolean;
  previousRole?: string;
  currentAffiliation?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  avatarSeed: string;
}

interface PersonDetailModalProps {
  person: ACMMember | null;
  onClose: () => void;
}

export default function PersonDetailModal({ person, onClose }: PersonDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (person) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [person, onClose]);

  if (!person) return null;

  const hasSocials = Boolean(person.githubUrl || person.linkedinUrl || person.portfolioUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />

      {/* Profile Card Modal */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl border border-cyan-500/30 bg-[#040a18]/95 p-6 sm:p-8 shadow-2xl shadow-black overflow-y-auto font-sans">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="uppercase tracking-widest">
              {person.isAlumni ? "ACM ALUMNI" : person.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar Placeholder */}
          <div
            className={`relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-2 shadow-lg ${
              person.isAlumni
                ? "border-amber-400/50 bg-gradient-to-br from-amber-950/40 via-[#030712] to-slate-900 shadow-amber-500/10"
                : "border-cyan-400/40 bg-gradient-to-br from-cyan-950 via-[#030712] to-sky-950 shadow-cyan-500/20"
            }`}
          >
            <span
              className={`font-mono text-2xl font-black ${
                person.isAlumni ? "text-amber-300" : "text-cyan-300"
              }`}
            >
              {person.initials}
            </span>
            {person.isAlumni ? (
              <span className="absolute -bottom-2 -right-1 rounded bg-amber-500/20 border border-amber-400/50 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-300">
                ALUMNI
              </span>
            ) : (
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 font-mono text-[10px] font-bold text-slate-950">
                ✓
              </div>
            )}
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                {person.name}
              </h2>
              {person.isAlumni && (
                <span className="rounded-full bg-amber-500/10 border border-amber-400/40 px-2.5 py-0.5 font-mono text-[10px] text-amber-300 uppercase tracking-wider">
                  Chapter Alumni
                </span>
              )}
            </div>

            <div className="mt-1 font-mono text-sm text-cyan-300 font-medium">
              {person.role}
            </div>

            {person.previousRole && (
              <div className="font-mono text-xs text-amber-300/80 mt-0.5">
                Previously: {person.previousRole}
              </div>
            )}

            <div className="mt-1 font-mono text-xs text-slate-400">
              {person.yearBranch}
            </div>
          </div>
        </div>

        {/* Responsibility / Core Contribution */}
        {person.responsibility && (
          <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-300">
              Key Chapter Responsibility
            </h3>
            <p className="mt-1.5 text-xs text-slate-300 font-light leading-relaxed">
              {person.responsibility}
            </p>
          </div>
        )}

        {/* Bio / Statement */}
        <div className="mt-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            About & Initiatives
          </h3>
          <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">
            {person.bio}
          </p>
        </div>

        {/* Technical Focus / Research Interests */}
        <div className="mt-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            Technical Focus & Interests
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {person.interests.map((interest, idx) => (
              <span
                key={idx}
                className="rounded border border-cyan-500/30 bg-cyan-950/30 px-2.5 py-1 font-mono text-xs text-cyan-200"
              >
                #{interest}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Social Links (Rendered ONLY when genuine URLs exist) */}
        {hasSocials && (
          <div className="mt-6 rounded-xl border border-slate-800 bg-[#030712] p-4 font-mono text-xs">
            <div className="text-[10px] uppercase text-slate-400 tracking-wider mb-2">
              Verified Profiles
            </div>
            <div className="flex flex-wrap gap-3">
              {person.githubUrl && (
                <a
                  href={person.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded border border-slate-700 bg-[#061022] px-3 py-1.5 text-slate-200 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
              )}
              {person.linkedinUrl && (
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded border border-slate-700 bg-[#061022] px-3 py-1.5 text-slate-200 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                >
                  <span>LinkedIn</span>
                  <span>↗</span>
                </a>
              )}
              {person.portfolioUrl && (
                <a
                  href={person.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded border border-slate-700 bg-[#061022] px-3 py-1.5 text-slate-200 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                >
                  <span>Portfolio</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between font-mono text-xs text-slate-400">
          <span>ACM STUDENT CHAPTER</span>
          <button
            onClick={onClose}
            className="rounded bg-cyan-500/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

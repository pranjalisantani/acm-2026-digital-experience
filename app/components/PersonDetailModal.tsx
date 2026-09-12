"use client";

import { useEffect } from "react";

export interface ACMMember {
  id: string;
  name: string;
  role: string;
  category: "Executive Core" | "Technical Lead" | "Research Associate" | "Operations & Creative";
  yearBranch: string; // e.g. "B.Tech CSE // 3rd Year"
  initials: string;
  interests: string[];
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
  emailContact?: string;
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark backdrop */}
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
            <span className="uppercase tracking-widest">{person.category} {"//"} ROSTER NODE</span>
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
          <span>[OFFICIAL CHAPTER ROSTER // STRUCTURAL PLACEHOLDER]</span>
          <span className="text-slate-400">SENIOR TEAM INPUT READY</span>
        </div>

        {/* Profile Card Header */}
        <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar Placeholder */}
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-950 via-[#030712] to-sky-950 shadow-lg shadow-cyan-500/20">
            <span className="font-mono text-2xl font-black text-cyan-300">
              {person.initials}
            </span>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 font-mono text-[10px] font-bold text-slate-950">
              ✓
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              {person.name}
            </h2>
            <div className="mt-1 font-mono text-sm text-cyan-300 font-medium">
              {person.role}
            </div>
            <div className="mt-1 font-mono text-xs text-slate-400">
              {person.yearBranch}
            </div>
          </div>
        </div>

        {/* Bio / Statement */}
        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            About & Chapter Focus
          </h3>
          <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">
            {person.bio}
          </p>
        </div>

        {/* Technical Focus / Research Interests */}
        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            Core Competencies & Research Vectors
          </h3>
          <div className="mt-2.5 flex flex-wrap gap-2">
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

        {/* Verified Links & Connection Placeholders */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-[#030712] p-4 font-mono text-xs">
          <div className="text-[10px] uppercase text-slate-500 tracking-wider mb-2">
            Verified Profiles & Channels
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center justify-between rounded border border-slate-800 bg-[#061022] p-2 text-slate-300">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">⚡</span> GitHub
              </span>
              <span className="text-[11px] text-cyan-400">[github.com/profile]</span>
            </div>
            <div className="flex items-center justify-between rounded border border-slate-800 bg-[#061022] p-2 text-slate-300">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">⚡</span> LinkedIn
              </span>
              <span className="text-[11px] text-cyan-400">[linkedin.com/in]</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between font-mono text-xs text-slate-400">
          <span>ACM MEMBER NETWORK</span>
          <button
            onClick={onClose}
            className="rounded bg-cyan-500/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ACMMember } from "./PersonDetailModal";

interface PeopleSectionProps {
  onSelectPerson: (person: ACMMember) => void;
}

export const SAMPLE_MEMBERS: ACMMember[] = [
  {
    id: "mem-01",
    name: "Core Executive Lead",
    role: "Chapter Chair // Executive Lead",
    category: "Executive Core",
    yearBranch: "B.Tech CSE // Final Year",
    initials: "CC",
    interests: ["Distributed Systems", "Consensus Protocols", "Engineering Leadership"],
    bio: "Guiding the ACM Chapter's strategic vision, industry partnerships, and campus research initiatives. Structural placeholder for incoming Chapter Chair.",
    avatarSeed: "lead",
  },
  {
    id: "mem-02",
    name: "Vice Chair // Operations",
    role: "Chapter Vice Chair",
    category: "Executive Core",
    yearBranch: "B.Tech IT // 3rd Year",
    initials: "VC",
    interests: ["Cloud Architecture", "Large Scale Events", "Chapter Community"],
    bio: "Managing cross-department synchronization, symposium logistics, and university administration liaison. Structural placeholder for incoming Vice Chair.",
    avatarSeed: "vice",
  },
  {
    id: "mem-03",
    name: "Lead Systems Architect",
    role: "Technical Lead // Systems SIG",
    category: "Technical Lead",
    yearBranch: "B.Tech CSE // 3rd Year",
    initials: "SA",
    interests: ["Compilers", "Rust", "Kernel Internals", "High-Performance Computing"],
    bio: "Directing the chapter's open-source infrastructure and compiler workshops. Structural placeholder for Technical Division Lead.",
    avatarSeed: "tech1",
  },
  {
    id: "mem-04",
    name: "Competitive Programming Lead",
    role: "Division Lead // Algorithms",
    category: "Technical Lead",
    yearBranch: "B.Tech CSE // 3rd Year",
    initials: "CP",
    interests: ["Graph Theory", "Dynamic Programming", "ICPC Regionals"],
    bio: "Leading weekly algorithmic problem-solving clinics and mentoring university squads for regional programming leagues. Structural placeholder.",
    avatarSeed: "tech2",
  },
  {
    id: "mem-05",
    name: "AI / ML Research Associate",
    role: "Research Circle Director",
    category: "Research Associate",
    yearBranch: "Dual Degree CSE // 4th Year",
    initials: "RA",
    interests: ["Deep Learning", "Transformer Optimization", "Computer Vision"],
    bio: "Coordinating student paper reading groups and authoring preprints under faculty guidance. Structural placeholder for Research Circle Director.",
    avatarSeed: "res1",
  },
  {
    id: "mem-06",
    name: "Design & Identity Lead",
    role: "Creative Director // UI & Media",
    category: "Operations & Creative",
    yearBranch: "B.Des / CSE // 3rd Year",
    initials: "CD",
    interests: ["Procedural Aesthetics", "Design Systems", "Kinetic Typography"],
    bio: "Crafting the visual identity, brand guidelines, and spatial digital assets across chapter events. Structural placeholder for Creative Lead.",
    avatarSeed: "creat1",
  },
  {
    id: "mem-07",
    name: "Open Source Coordinator",
    role: "Community & Guild Lead",
    category: "Operations & Creative",
    yearBranch: "B.Tech CSE // 2nd Year",
    initials: "OS",
    interests: ["Git Workflows", "Web Standards", "Junior Mentorship"],
    bio: "Mentoring junior members on first-time open source pull requests and project documentation. Structural placeholder.",
    avatarSeed: "ops1",
  },
  {
    id: "mem-08",
    name: "Faculty Chapter Advisor",
    role: "Faculty Sponsor & Patron",
    category: "Executive Core",
    yearBranch: "Professor of Computer Science",
    initials: "FA",
    interests: ["Theoretical Computer Science", "ACM Professional Council"],
    bio: "Guiding the chapter's charter compliance, academic integrity, and liaising with the ACM India / Global Council.",
    avatarSeed: "advisor",
  },
];

export default function PeopleSection({ onSelectPerson }: PeopleSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ["All", "Executive Core", "Technical Lead", "Research Associate", "Operations & Creative"];

  const filtered = SAMPLE_MEMBERS.filter((m) => {
    if (activeCategory === "All") return true;
    return m.category === activeCategory;
  });

  return (
    <section id="people" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/50">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              04 // PEOPLE & NETWORK NODES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              The People Constellation
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              In our living network, each member is a sovereign compute node. Explore chapter leadership, technical leads, and research directors.
            </p>
            <div className="mt-2 font-mono text-[11px] text-cyan-400 flex items-center gap-1.5">
              <span>✦ Interaction:</span>
              <span className="text-slate-400">Hover to focus node • Click for full dossier</span>
            </div>
          </div>
        </div>

        {/* Structural Disclaimer Banner */}
        <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-3 font-mono text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            [STRUCTURAL ROSTER PLACEHOLDER // PENDING INCOMING ACM COMMITTEE NOTIFICATION]
          </span>
          <span className="text-[11px] text-slate-400">
            No unverified student identities used.
          </span>
        </div>

        {/* Role Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? "border border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20"
                  : "border border-slate-800 bg-[#030816] text-slate-400 hover:border-cyan-500/30 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Constellation Network Grid (Editorial Layout) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((person) => {
            const isHovered = hoveredId === person.id;
            return (
              <div
                key={person.id}
                onMouseEnter={() => setHoveredId(person.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectPerson(person)}
                className={`group relative rounded-xl border p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isHovered
                    ? "border-cyan-400 bg-cyan-950/40 shadow-xl shadow-cyan-500/20 -translate-y-1"
                    : "border-cyan-500/20 bg-[#040a18]/70 hover:border-cyan-500/40"
                }`}
              >
                {/* Node connector line visual indicator */}
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 border-b border-cyan-500/10 pb-3">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <span className={`h-1.5 w-1.5 rounded-full ${isHovered ? "bg-cyan-300 animate-ping" : "bg-cyan-500"}`} />
                    NODE // {person.initials}
                  </span>
                  <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 border border-cyan-500/20 text-cyan-300">
                    {person.category}
                  </span>
                </div>

                {/* Avatar Placeholder and Name */}
                <div className="mt-4 flex items-center gap-3.5">
                  <div
                    className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 transition-all ${
                      isHovered
                        ? "border-cyan-400 bg-cyan-950 shadow-md shadow-cyan-400/30 scale-105"
                        : "border-cyan-500/30 bg-[#02050f]"
                    }`}
                  >
                    <span className="font-mono text-base font-bold text-cyan-300">
                      {person.initials}
                    </span>
                    <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-cyan-400 border-2 border-[#030712]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-cyan-200 transition-colors">
                      {person.name}
                    </h3>
                    <div className="font-mono text-xs text-cyan-400 mt-0.5">
                      {person.role}
                    </div>
                  </div>
                </div>

                {/* Academic credentials placeholder */}
                <div className="mt-4 font-mono text-[11px] text-slate-400">
                  {person.yearBranch}
                </div>

                {/* Tag Pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {person.interests.slice(0, 2).map((interest, i) => (
                    <span
                      key={i}
                      className="rounded border border-slate-800 bg-[#020510] px-2 py-0.5 font-mono text-[10px] text-slate-300"
                    >
                      {interest}
                    </span>
                  ))}
                  {person.interests.length > 2 && (
                    <span className="font-mono text-[10px] text-cyan-400 self-center">
                      +{person.interests.length - 2}
                    </span>
                  )}
                </div>

                {/* Bottom Callout */}
                <div className="mt-5 pt-3 border-t border-cyan-500/10 flex items-center justify-between font-mono text-[10px] text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>INSPECT PROFILE</span>
                  <span>↗</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

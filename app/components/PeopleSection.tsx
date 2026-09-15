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
    role: "Chapter Chair",
    category: "Executive Core",
    yearBranch: "B.Tech CSE // Final Year",
    initials: "CC",
    interests: ["Distributed Systems", "Consensus Protocols", "Engineering Leadership"],
    responsibility: "Guiding chapter operations, faculty liaison, and overall technical strategy.",
    bio: "Coordinating executive committees, community meetings, and faculty advisors for the chapter.",
    avatarSeed: "lead",
    isAlumni: false,
  },
  {
    id: "mem-02",
    name: "Vice Chair // Operations",
    role: "Chapter Vice Chair",
    category: "Executive Core",
    yearBranch: "B.Tech IT // 3rd Year",
    initials: "VC",
    interests: ["Cloud Architecture", "Large Scale Events", "Chapter Community"],
    responsibility: "Managing event logistics, volunteer squads, and department synchronization.",
    bio: "Organizing weekly technical meetups, hackathon infrastructure, and chapter student onboarding.",
    avatarSeed: "vice",
    isAlumni: false,
  },
  {
    id: "mem-03",
    name: "Lead Systems Architect",
    role: "Technical Division Lead",
    category: "Technical Lead",
    yearBranch: "B.Tech CSE // 3rd Year",
    initials: "SA",
    interests: ["Compilers", "Rust", "Kernel Internals", "High-Performance Computing"],
    responsibility: "Directing open-source software projects and technical workshops for students.",
    bio: "Leading chapter development repositories, code review sessions, and system engineering seminars.",
    avatarSeed: "tech1",
    isAlumni: false,
  },
  {
    id: "mem-04",
    name: "Competitive Programming Lead",
    role: "Algorithms & ICPC Lead",
    category: "Technical Lead",
    yearBranch: "B.Tech CSE // 3rd Year",
    initials: "CP",
    interests: ["Graph Theory", "Dynamic Programming", "ICPC Regionals"],
    responsibility: "Conducting weekly algorithmic clinics and training collegiate ICPC squads.",
    bio: "Curating problem sets, hosting mock contest simulations, and mentoring beginner competitive coders.",
    avatarSeed: "tech2",
    isAlumni: false,
  },
  {
    id: "mem-05",
    name: "AI / ML Research Lead",
    role: "Research Coordinator",
    category: "Research Associate",
    yearBranch: "Dual Degree CSE // 4th Year",
    initials: "RL",
    interests: ["Deep Learning", "Transformer Optimization", "Computer Vision"],
    responsibility: "Organizing paper reading circles and mentoring student preprint investigations.",
    bio: "Facilitating discussions on seminal ACM computing papers and introductory machine learning labs.",
    avatarSeed: "res1",
    isAlumni: false,
  },
  {
    id: "mem-06",
    name: "Web & Community Lead",
    role: "Community & Frontend Lead",
    category: "Operations & Creative",
    yearBranch: "B.Tech CSE // 2nd Year",
    initials: "WL",
    interests: ["Web Standards", "React / Next.js", "Open Source Onboarding"],
    responsibility: "Maintaining chapter web portals and assisting juniors with Git and code contributions.",
    bio: "Dedicated to making chapter tools accessible and hosting beginner-friendly git workshops.",
    avatarSeed: "ops1",
    isAlumni: false,
  },
  {
    id: "mem-07",
    name: "Former Chapter Chair",
    role: "Chapter Alumni Advisor",
    category: "Alumni",
    yearBranch: "Class of 2024 // Software Engineer",
    initials: "AC",
    interests: ["Cloud Infrastructure", "Distributed Databases", "Mentorship"],
    previousRole: "ACM Chapter Chair (2023-2024)",
    currentAffiliation: "Software Engineer @ Cloud Systems Lab",
    responsibility: "Advising current chapter officers and conducting alumni mock interviews.",
    bio: "Former Chapter Chair who oversaw the growth of the student development group and annual hackathon.",
    avatarSeed: "alum1",
    isAlumni: true,
  },
  {
    id: "mem-08",
    name: "Former Technical Lead",
    role: "Chapter Alumni Advisor",
    category: "Alumni",
    yearBranch: "Class of 2023 // Systems Researcher",
    initials: "AT",
    interests: ["Compilers", "Formal Methods", "Graduate Studies"],
    previousRole: "ACM Technical Lead (2022-2023)",
    currentAffiliation: "MS Computer Science Scholar",
    responsibility: "Mentoring undergraduate researchers on graduate school applications and paper writing.",
    bio: "Guided multiple student teams into ICPC regional placements and spearheaded open source student repos.",
    avatarSeed: "alum2",
    isAlumni: true,
  },
  {
    id: "mem-09",
    name: "Faculty Chapter Sponsor",
    role: "Faculty Advisor",
    category: "Executive Core",
    yearBranch: "Professor, Department of Computer Science",
    initials: "FA",
    interests: ["Algorithms", "Computing Education", "ACM Professional Liaison"],
    responsibility: "Institutional guidance, charter compliance, and ACM professional council liaison.",
    bio: "Supporting student initiatives, providing lab access, and fostering academic rigor across activities.",
    avatarSeed: "advisor",
    isAlumni: false,
  },
];

export default function PeopleSection({ onSelectPerson }: PeopleSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ["All", "Current Team", "Executive", "Technical Leads", "Alumni"];

  const filtered = SAMPLE_MEMBERS.filter((m) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Current Team") return !m.isAlumni;
    if (activeCategory === "Alumni") return m.isAlumni;
    if (activeCategory === "Executive") return m.category === "Executive Core" && !m.isAlumni;
    if (activeCategory === "Technical Leads") return (m.category === "Technical Lead" || m.category === "Research Associate") && !m.isAlumni;
    return true;
  });

  return (
    <section
      id="people"
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/70"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              02 // CHAPTER LEADERSHIP & MEMBERS
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              People & Team
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Meet the student organizers, technical leads, and alumni guiding our ACM chapter
              initiatives, workshops, and student mentorship.
            </p>
          </div>
        </div>

        {/* Role Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? "border border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20"
                  : "border border-slate-800 bg-[#030816] text-slate-400 hover:border-cyan-500/30 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* People Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((person) => {
            const isHovered = hoveredId === person.id;
            return (
              <div
                key={person.id}
                onMouseEnter={() => setHoveredId(person.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectPerson(person)}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  person.isAlumni
                    ? "border-amber-500/20 bg-[#070b14] hover:border-amber-400/50"
                    : isHovered
                    ? "border-cyan-400 bg-cyan-950/40 shadow-xl shadow-cyan-500/15 -translate-y-1"
                    : "border-cyan-500/20 bg-[#040a18]/70 hover:border-cyan-500/40"
                }`}
              >
                <div>
                  {/* Top Bar with Category & Tag */}
                  <div className="flex items-center justify-between font-mono text-[10px] pb-4 border-b border-cyan-500/10">
                    <span className="text-slate-400">
                      {person.yearBranch}
                    </span>
                    {person.isAlumni ? (
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 border border-amber-400/40 text-amber-300 font-bold tracking-wider">
                        ALUMNI
                      </span>
                    ) : (
                      <span className="rounded bg-cyan-500/10 px-2 py-0.5 border border-cyan-500/20 text-cyan-300 font-medium">
                        {person.category}
                      </span>
                    )}
                  </div>

                  {/* Avatar & Identity */}
                  <div className="mt-5 flex items-center gap-4">
                    <div
                      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${
                        person.isAlumni
                          ? "border-amber-400/40 bg-gradient-to-br from-amber-950/30 via-[#030712] to-slate-900 shadow-sm shadow-amber-500/10"
                          : isHovered
                          ? "border-cyan-400 bg-cyan-950 shadow-md shadow-cyan-400/30 scale-105"
                          : "border-cyan-500/30 bg-[#02050f]"
                      }`}
                    >
                      <span
                        className={`font-mono text-base font-bold ${
                          person.isAlumni ? "text-amber-300" : "text-cyan-300"
                        }`}
                      >
                        {person.initials}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-200 transition-colors truncate">
                        {person.name}
                      </h3>
                      <div className="font-mono text-xs text-cyan-400 mt-0.5">
                        {person.role}
                      </div>
                      {person.previousRole && (
                        <div className="font-mono text-[11px] text-amber-300/80 mt-0.5">
                          {person.previousRole}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Responsibility / Impact */}
                  {person.responsibility && (
                    <div className="mt-4 pt-3 border-t border-cyan-500/10">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Responsibility
                      </div>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        {person.responsibility}
                      </p>
                    </div>
                  )}

                  {/* Technical Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {person.interests.slice(0, 3).map((interest, i) => (
                      <span
                        key={i}
                        className="rounded border border-slate-800 bg-[#020510] px-2 py-0.5 font-mono text-[10px] text-slate-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Profile Action */}
                <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center justify-between font-mono text-[11px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                  <span>View Details</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

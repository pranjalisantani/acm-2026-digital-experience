"use client";

import { useState } from "react";
import { ACMMember } from "./PersonDetailModal";

interface PeopleSectionProps {
  onSelectPerson: (person: ACMMember) => void;
}

export const SAMPLE_MEMBERS: ACMMember[] = [
  {
    id: "mem-01",
    name: "Aarav Sharma",
    role: "Chapter Chair",
    category: "Executive Core",
    yearBranch: "B.Tech CSE • Final Year",
    initials: "AS",
    interests: ["Distributed Systems", "Consensus Protocols", "Engineering Leadership"],
    responsibility: "Guiding chapter operations, faculty liaison, and overall technical strategy.",
    bio: "Coordinating executive committees, community meetings, and faculty advisors for the chapter.",
    avatarSeed: "lead",
    isAlumni: false,
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "mem-02",
    name: "Diya Patel",
    role: "Vice Chair & Operations",
    category: "Executive Core",
    yearBranch: "B.Tech IT • 3rd Year",
    initials: "DP",
    interests: ["Cloud Architecture", "Large Scale Events", "Chapter Community"],
    responsibility: "Managing event logistics, volunteer squads, and department synchronization.",
    bio: "Organizing weekly technical meetups, hackathon infrastructure, and chapter student onboarding.",
    avatarSeed: "vice",
    isAlumni: false,
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "mem-03",
    name: "Rohan Verma",
    role: "Technical Division Lead",
    category: "Technical Lead",
    yearBranch: "B.Tech CSE • 3rd Year",
    initials: "RV",
    interests: ["Compilers", "Rust", "Kernel Internals", "High-Performance Computing"],
    responsibility: "Directing open-source software projects and technical workshops for students.",
    bio: "Leading chapter development repositories, code review sessions, and system engineering seminars.",
    avatarSeed: "tech1",
    isAlumni: false,
    githubUrl: "https://github.com",
  },
  {
    id: "mem-04",
    name: "Ananya Iyer",
    role: "Algorithms & ICPC Lead",
    category: "Technical Lead",
    yearBranch: "B.Tech CSE • 3rd Year",
    initials: "AI",
    interests: ["Graph Theory", "Dynamic Programming", "ICPC Regionals"],
    responsibility: "Conducting weekly algorithmic clinics and training collegiate ICPC squads.",
    bio: "Curating problem sets, hosting mock contest simulations, and mentoring beginner competitive coders.",
    avatarSeed: "tech2",
    isAlumni: false,
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "mem-05",
    name: "Karan Malhotra",
    role: "Research Coordinator",
    category: "Research Associate",
    yearBranch: "Dual Degree CSE • 4th Year",
    initials: "KM",
    interests: ["Deep Learning", "Transformer Optimization", "Computer Vision"],
    responsibility: "Organizing paper reading circles and mentoring student preprint investigations.",
    bio: "Facilitating discussions on seminal ACM computing papers and introductory machine learning labs.",
    avatarSeed: "res1",
    isAlumni: false,
    githubUrl: "https://github.com",
  },
  {
    id: "mem-06",
    name: "Sneha Nair",
    role: "Web & Community Lead",
    category: "Operations & Creative",
    yearBranch: "B.Tech CSE • 2nd Year",
    initials: "SN",
    interests: ["Web Standards", "React / Next.js", "Open Source Onboarding"],
    responsibility: "Maintaining chapter web portals and assisting juniors with Git and code contributions.",
    bio: "Dedicated to making chapter tools accessible and hosting beginner-friendly git workshops.",
    avatarSeed: "ops1",
    isAlumni: false,
    githubUrl: "https://github.com",
    portfolioUrl: "https://example.com",
  },
  {
    id: "mem-07",
    name: "Vikram Sengupta",
    role: "Chapter Alumni Advisor",
    category: "Alumni",
    yearBranch: "Class of 2024",
    initials: "VS",
    interests: ["Cloud Infrastructure", "Distributed Databases", "Mentorship"],
    previousRole: "ACM Chapter Chair (2023-2024)",
    currentAffiliation: "Software Engineer @ Cloud Systems Lab",
    responsibility: "Advising current chapter officers and conducting alumni mock interviews.",
    bio: "Former Chapter Chair who oversaw the growth of the student development group and annual hackathon.",
    avatarSeed: "alum1",
    isAlumni: true,
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "mem-08",
    name: "Pooja Deshmukh",
    role: "Chapter Alumni Advisor",
    category: "Alumni",
    yearBranch: "Class of 2023",
    initials: "PD",
    interests: ["Compilers", "Formal Methods", "Graduate Studies"],
    previousRole: "ACM Technical Lead (2022-2023)",
    currentAffiliation: "MS Computer Science Scholar",
    responsibility: "Mentoring undergraduate researchers on graduate school applications and paper writing.",
    bio: "Guided multiple student teams into ICPC regional placements and spearheaded open source student repos.",
    avatarSeed: "alum2",
    isAlumni: true,
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "mem-09",
    name: "Dr. K. Ramanathan",
    role: "Faculty Advisor",
    category: "Executive Core",
    yearBranch: "Professor, Dept. of Computer Science",
    initials: "KR",
    interests: ["Algorithms", "Computing Education", "ACM Professional Liaison"],
    responsibility: "Institutional guidance, charter compliance, and ACM professional council liaison.",
    bio: "Supporting student initiatives, providing lab access, and fostering academic rigor across activities.",
    avatarSeed: "advisor",
    isAlumni: false,
  },
];

export default function PeopleSection({ onSelectPerson }: PeopleSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Current Team", "Executive", "Technical Leads", "Alumni"];

  const filtered = SAMPLE_MEMBERS.filter((m) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Current Team") return !m.isAlumni;
    if (activeCategory === "Alumni") return m.isAlumni;
    if (activeCategory === "Executive") return m.category === "Executive Core" && !m.isAlumni;
    if (activeCategory === "Technical Leads")
      return (m.category === "Technical Lead" || m.category === "Research Associate") && !m.isAlumni;
    return true;
  });

  return (
    <section
      id="people"
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/80"
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

        {/* People Grid (Clean, Editorial, Genuine) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((person) => {
            return (
              <div
                key={person.id}
                onClick={() => onSelectPerson(person)}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  person.isAlumni
                    ? "border-amber-500/25 bg-[#060a15] hover:border-amber-400/60 shadow-lg shadow-black/40"
                    : "border-cyan-500/20 bg-[#040a18]/70 hover:border-cyan-400/60 hover:bg-cyan-950/30 shadow-lg shadow-cyan-950/15"
                }`}
              >
                <div>
                  {/* Top Bar with Category & Tag */}
                  <div className="flex items-center justify-between font-mono text-[11px] pb-4 border-b border-cyan-500/10">
                    <span className="text-slate-400">{person.yearBranch}</span>
                    {person.isAlumni ? (
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 border border-amber-400/40 text-amber-300 font-bold tracking-wider text-[10px]">
                        ALUMNI
                      </span>
                    ) : (
                      <span className="rounded bg-cyan-500/10 px-2 py-0.5 border border-cyan-500/20 text-cyan-300 font-medium text-[10px]">
                        {person.category}
                      </span>
                    )}
                  </div>

                  {/* Avatar & Identity */}
                  <div className="mt-5 flex items-start gap-4">
                    <div
                      className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${
                        person.isAlumni
                          ? "border-amber-400/40 bg-gradient-to-br from-amber-950/30 via-[#030712] to-slate-900 shadow-sm shadow-amber-500/10 group-hover:border-amber-400"
                          : "border-cyan-500/30 bg-[#02050f] group-hover:border-cyan-400 group-hover:bg-cyan-950/40 shadow-sm shadow-cyan-500/15"
                      }`}
                    >
                      <span
                        className={`font-mono text-lg font-bold ${
                          person.isAlumni ? "text-amber-300" : "text-cyan-300"
                        }`}
                      >
                        {person.initials}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg group-hover:text-cyan-200 transition-colors leading-snug">
                        {person.name}
                      </h3>
                      <div className="font-mono text-xs text-cyan-400 mt-1 font-medium">
                        {person.role}
                      </div>

                      {/* For Alumni: Clearly show previous role & current affiliation */}
                      {person.isAlumni && (
                        <div className="mt-2 space-y-1 font-mono text-[11px]">
                          {person.previousRole && (
                            <div className="text-slate-400">
                              <span className="text-slate-500">Was: </span>
                              {person.previousRole}
                            </div>
                          )}
                          {person.currentAffiliation && (
                            <div className="text-amber-300 font-semibold">
                              <span className="text-slate-500">Now: </span>
                              {person.currentAffiliation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clean Short Bio / Responsibility */}
                  <p className="mt-4 text-xs text-slate-300 font-light leading-relaxed">
                    {person.bio}
                  </p>
                </div>

                {/* Card Footer with Genuine Social Links & Profile Action */}
                <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center justify-between font-mono text-xs">
                  {/* Social icons only if real URLs exist */}
                  <div className="flex items-center gap-2">
                    {person.githubUrl && (
                      <a
                        href={person.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
                        title="GitHub Profile"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {person.linkedinUrl && (
                      <a
                        href={person.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {person.portfolioUrl && (
                      <a
                        href={person.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
                        title="Personal Website"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold">
                    <span>Details</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ACMEvent } from "./EventDetailModal";

interface EventsSectionProps {
  onSelectEvent: (event: ACMEvent) => void;
}

export const SAMPLE_EVENTS: ACMEvent[] = [
  {
    id: "evt-01",
    title: "Distributed Systems & Consensus Symposium",
    category: "Symposium",
    date: "2026-03-24",
    displayDate: "March 24, 2026",
    time: "17:30 - 19:30 IST",
    location: "Systems Engineering Lab 4 & Virtual Stream",
    mode: "Hybrid",
    shortDescription:
      "Deep dive into Paxos, Raft, Byzantine fault tolerance, and production distributed database architectures.",
    fullDescription:
      "This technical symposium explores the algorithmic primitives powering modern high-scale cloud databases and distributed ledgers. Attendees will dissect real-world failures, trace state-machine replication protocols, and build a minimal Raft consensus cluster in Go.",
    learningOutcomes: [
      "Deconstruct Raft leader election and log compaction algorithms",
      "Analyze network partition split-brain resilience in production clusters",
      "Hands-on benchmark of consensus overhead across varying network latencies",
    ],
    speaker: {
      name: "Senior Chapter Fellow / Visiting Researcher",
      role: "Distributed Systems Architect",
      organization: "ACM Chapter Research Circle",
      isPlaceholder: true,
    },
    status: "Upcoming",
    posterGradient: "bg-gradient-to-tr from-cyan-950 via-slate-900 to-[#020512]",
    photos: [
      { tag: "01", caption: "Whiteboard derivation of Raft consensus state machine." },
      { tag: "02", caption: "Lab participants testing simulated partition scenarios in Go." },
    ],
  },
  {
    id: "evt-02",
    title: "ACM Annual 36-Hour Chapter Hackathon",
    category: "Hackathon",
    date: "2026-04-11",
    displayDate: "April 11-12, 2026",
    time: "36-Hour Hackathon",
    location: "Campus Innovation Center & Virtual Discord War Room",
    mode: "Hybrid",
    shortDescription:
      "Our premier chapter innovation sprint bringing together student developers across Systems, AI, and Web tracks.",
    fullDescription:
      "The flagship annual chapter hackathon challenges student teams to architect production-grade software in 36 hours. Mentorship from senior software engineers, hardware testbeds, compute credits, and peer evaluations.",
    learningOutcomes: [
      "Build and deploy zero-to-one software under tight collaborative deadlines",
      "Receive direct architectural reviews from senior alumni engineers",
      "Showcase projects to student peers and campus technical faculty",
    ],
    speaker: {
      name: "ACM Executive Organizing Committee",
      role: "Hackathon Track Directors",
      organization: "ACM Student Chapter",
      isPlaceholder: true,
    },
    status: "Upcoming",
    posterGradient: "bg-gradient-to-tr from-blue-950 via-sky-950 to-[#020817]",
    photos: [
      { tag: "01", caption: "Opening keynote and problem domain briefings." },
      { tag: "02", caption: "Teams collaborating on distributed systems prototypes at 02:00 AM." },
    ],
  },
  {
    id: "evt-03",
    title: "Compiler Construction & LLVM Optimization Workshop",
    category: "Workshop",
    date: "2026-04-18",
    displayDate: "April 18, 2026",
    time: "14:00 - 17:00 IST",
    location: "Computing Auditorium Alpha",
    mode: "In-Person",
    shortDescription:
      "Constructing ASTs, intermediate representations, and writing custom LLVM optimization passes from scratch.",
    fullDescription:
      "Ever wondered how modern compilers transform high-level code into optimized machine instructions? In this workshop, students will construct a lexical scanner, build an abstract syntax tree, and write an LLVM pass that performs dead-code elimination.",
    learningOutcomes: [
      "Understand Lexing, Parsing, and Context-Free Grammars",
      "Write custom SSA Intermediate Representation optimization passes",
      "Demystify register allocation and code generation pipelines",
    ],
    speaker: {
      name: "Senior Systems Lead",
      role: "Compiler Infrastructure Researcher",
      organization: "ACM Systems SIG",
      isPlaceholder: true,
    },
    status: "Upcoming",
    posterGradient: "bg-gradient-to-tr from-indigo-950 via-slate-900 to-[#040c1e]",
    photos: [
      { tag: "01", caption: "Tracing control flow graph transformations in LLVM IR." },
      { tag: "02", caption: "Interactive terminal profiling of custom dead-code elimination passes." },
    ],
  },
  {
    id: "evt-04",
    title: "ICPC Algorithmic Problem Solving Bootcamp",
    category: "Competitive",
    date: "2026-03-29",
    displayDate: "March 29, 2026",
    time: "10:00 - 13:00 IST",
    location: "Algorithms Lab & Codeforces Arena",
    mode: "In-Person",
    shortDescription:
      "Rigorous problem sets covering dynamic programming on trees, segment trees, and network flow algorithms.",
    fullDescription:
      "Weekly chapter training session preparing squads for the ICPC Asia Regionals. Featuring live contest simulations, editorial walkthroughs, and time-complexity optimization clinics.",
    learningOutcomes: [
      "Master advanced range queries and heavy-light decomposition",
      "Analyze time and space asymptotics under strict contest limits",
      "Develop rapid team coordination and debugging workflows",
    ],
    speaker: {
      name: "ICPC Regional Finalist Senior",
      role: "Competitive Programming Lead",
      organization: "ACM Competitive Division",
      isPlaceholder: true,
    },
    status: "Upcoming",
    posterGradient: "bg-gradient-to-tr from-cyan-900 via-[#030919] to-slate-950",
    photos: [
      { tag: "01", caption: "Live scoreboard projection during mock contest simulation." },
      { tag: "02", caption: "Editorial review of tree dynamic programming solutions." },
    ],
  },
  {
    id: "evt-05",
    title: "Generative AI Systems & Transformer Mechanics",
    category: "Workshop",
    date: "2026-02-14",
    displayDate: "February 14, 2026",
    time: "Completed Session",
    location: "Archived Virtual Stream & GitHub Code",
    mode: "Virtual",
    shortDescription:
      "Deep mathematical exploration of multi-head self-attention, rotary embeddings, and KV cache implementations.",
    fullDescription:
      "Archived chapter technical session where we built a miniature GPT architecture from scratch in PyTorch, exploring rotary positional embeddings and inference latency optimizations.",
    learningOutcomes: [
      "Mathematical derivation of self-attention mechanisms",
      "Profiling tensor operations on GPU hardware",
      "Open-source tutorial notebook and reference code repository",
    ],
    speaker: {
      name: "AI/ML Research Circle Lead",
      role: "Machine Learning Associate",
      organization: "ACM AI Circle",
      isPlaceholder: true,
    },
    status: "Past Event",
    posterGradient: "bg-gradient-to-tr from-slate-900 via-sky-950 to-[#020512]",
    photos: [
      { tag: "01", caption: "Deriving attention matrix calculations on interactive canvas." },
      { tag: "02", caption: "Code walkthrough of PyTorch tensor optimization techniques." },
      { tag: "03", caption: "Student Q&A session on KV cache memory footprint." },
    ],
  },
];

export default function EventsSection({ onSelectEvent }: EventsSectionProps) {
  const [filter, setFilter] = useState<string>("All");

  const filteredEvents = SAMPLE_EVENTS.filter((evt) => {
    if (filter === "All") return true;
    if (filter === "Upcoming") return evt.status !== "Past Event";
    if (filter === "Past Events") return evt.status === "Past Event";
    return evt.category === filter;
  });

  return (
    <section
      id="events"
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#030712]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              03 // CHAPTER EVENTS & CALENDAR
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Events & Workshops
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Hands-on technical workshops, symposia, and hackathons. Structured with complete details,
              registration access, and embedded event photo archives.
            </p>
          </div>
        </div>

        {/* Filter Controls: All / Upcoming / Past */}
        <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
          {["All", "Upcoming", "Past Events"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 uppercase transition-all cursor-pointer ${
                filter === f
                  ? "border border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20"
                  : "border border-slate-800 bg-[#030816] text-slate-400 hover:border-cyan-500/30 hover:text-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Events Grid adhering strictly to WHAT / WHEN / WHERE / STATUS / ACTION */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isPast = event.status === "Past Event";
            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className={`group glass-panel glass-panel-hover corner-crosshair rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isPast
                    ? "border-slate-800 bg-[#040816]/80 hover:border-cyan-500/50"
                    : "border-cyan-500/25 bg-[#030919]/90 hover:border-cyan-400/60 shadow-lg shadow-cyan-950/20"
                }`}
              >
                <div>
                  {/* Visual Header / Poster Banner */}
                  <div
                    className={`h-32 w-full rounded-xl border border-cyan-500/20 p-4 flex flex-col justify-between relative overflow-hidden mb-5 ${event.posterGradient}`}
                  >
                    <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />
                    <div className="flex items-center justify-between relative z-10 font-mono text-[10px]">
                      <span className="rounded bg-black/70 px-2 py-0.5 text-cyan-300 border border-cyan-500/30 uppercase font-semibold">
                        {event.category}
                      </span>
                      <span className="rounded bg-black/70 px-2 py-0.5 text-slate-300">
                        {event.mode}
                      </span>
                    </div>
                    <div className="relative z-10 font-mono text-xs text-cyan-300 font-bold tracking-wide">
                      {event.displayDate}
                    </div>
                  </div>

                  {/* STATUS & TIME */}
                  <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                    <span
                      className={`font-semibold ${
                        isPast ? "text-slate-400" : "text-emerald-400"
                      }`}
                    >
                      ● {event.status}
                    </span>
                    <span className="text-slate-400">{event.time}</span>
                  </div>

                  {/* WHAT: Title */}
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors">
                    {event.title}
                  </h3>

                  {/* WHERE: Location */}
                  <div className="mt-2 text-xs font-mono text-cyan-400/90 flex items-center gap-1.5">
                    <span>📍</span>
                    <span className="truncate">{event.location}</span>
                  </div>

                  {/* Short Description */}
                  <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                    {event.shortDescription}
                  </p>

                  {/* Embedded Event Photo Strip for Past Events (Rule 6) */}
                  {isPast && event.photos && event.photos.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-cyan-500/10">
                      <div className="text-[10px] font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
                        <span>Captured Event Photos</span>
                        <span className="text-cyan-400 font-medium">
                          {event.photos.length} photos
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {event.photos.slice(0, 3).map((p, idx) => (
                          <div
                            key={idx}
                            className="h-12 rounded bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center font-mono text-[9px] text-cyan-400/70"
                          >
                            📷 #{p.tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* WHAT CAN I DO: Action CTA */}
                <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center justify-between font-mono text-xs">
                  {isPast ? (
                    <span className="text-cyan-300 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Summary & Photos</span>
                      <span>→</span>
                    </span>
                  ) : (
                    <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Register / View Details</span>
                      <span>↗</span>
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400">Details</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

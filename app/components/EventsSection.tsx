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
  },
  {
    id: "evt-02",
    title: "ACM Flagship 36-Hour Hackathon // HACK_ACM 2026",
    category: "Hackathon",
    date: "2026-04-11",
    displayDate: "April 11-12, 2026",
    time: "36-Hour Intensive Hackathon",
    location: "Campus Innovation Pavilion & Discord Virtual War Room",
    mode: "Hybrid",
    shortDescription:
      "Our premier chapter innovation sprint bringing together 400+ student developers across Systems, AI, and Web3 tracks.",
    fullDescription:
      "The flagship annual chapter hackathon challenges teams to architect production-grade software in 36 hours. Mentorship from senior software engineers, hardware testbeds, compute credits, and rigorous rubric-based evaluation.",
    learningOutcomes: [
      "Ship zero-to-one deployed software under high velocity",
      "Direct technical reviews from senior industry architects",
      "Compete for chapter incubator tracks and seed grants",
    ],
    speaker: {
      name: "ACM Executive Organizing Committee",
      role: "Hackathon Track Directors",
      organization: "ACM Student Chapter",
      isPlaceholder: true,
    },
    status: "Upcoming",
    posterGradient: "bg-gradient-to-tr from-blue-950 via-sky-950 to-[#020817]",
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
      "Ever wondered how modern compilers transform high-level code into vectorized machine instructions? In this workshop, students will construct a lexical scanner, build an abstract syntax tree, and write an LLVM pass that performs dead-code elimination.",
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
      "Rigorous problem sets covering dynamic programming on trees, segment trees with lazy propagation, and graph flows.",
    fullDescription:
      "Weekly chapter training session preparing squads for the ICPC Asia Regionals. Featuring live contest simulations, editorial walkthroughs, and time-complexity optimization clinics.",
    learningOutcomes: [
      "Master advanced range queries and heavy-light decomposition",
      "Analyze time/space asymptotics under strict competition limits",
      "Develop rapid team-coding coordination and debugging protocols",
    ],
    speaker: {
      name: "ICPC Regional Finalist Senior",
      role: "Competitive Programming Lead",
      organization: "ACM Competitive Division",
      isPlaceholder: true,
    },
    status: "Upcoming",
    posterGradient: "bg-gradient-to-tr from-cyan-900 via-[#030919] to-slate-950",
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
      "Deep mathematical exploration of multi-head self-attention and KV caching implementations.",
    fullDescription:
      "Archived chapter technical session where we built a miniature GPT architecture from scratch in PyTorch, exploring rotary positional embeddings and inference latency optimizations.",
    learningOutcomes: [
      "Mathematical derivation of attention mechanisms",
      "Profiling matrix multiplication FLOPS on GPU hardware",
      "Open-source notebook and session recording repository",
    ],
    speaker: {
      name: "AI/ML Research Circle Lead",
      role: "Machine Learning Associate",
      organization: "ACM AI Circle",
      isPlaceholder: true,
    },
    status: "Archived",
    posterGradient: "bg-gradient-to-tr from-slate-900 via-sky-950 to-[#020512]",
  },
];

export default function EventsSection({ onSelectEvent }: EventsSectionProps) {
  const [filter, setFilter] = useState<string>("All");
  const [currentMonth, setCurrentMonth] = useState<number>(2); // 2 = March (0-indexed: 0=Jan, 1=Feb, 2=Mar, 3=Apr)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [selectedDay, setSelectedDay] = useState<number>(24);

  // Month labels
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calendar helpers
  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOffset = (month: number, year: number) => new Date(year, month, 1).getDay();

  const totalDays = daysInMonth(currentMonth, currentYear);
  const startOffset = firstDayOffset(currentMonth, currentYear);

  // Find events for the selected date or current month
  const getEventForDate = (year: number, month: number, day: number) => {
    const monthStr = String(month + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const targetDate = `${year}-${monthStr}-${dayStr}`;
    return SAMPLE_EVENTS.find((e) => e.date === targetDate);
  };

  const selectedDateEvent = getEventForDate(currentYear, currentMonth, selectedDay);

  // Filter list
  const filteredEvents = SAMPLE_EVENTS.filter((evt) => {
    if (filter === "All") return true;
    if (filter === "Upcoming") return evt.status === "Upcoming";
    if (filter === "Archived") return evt.status === "Archived";
    return evt.category === filter;
  });

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <section id="events" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              03 // CHAPTER EVENTS & SIGNALS
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Signals Across The Network
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Every workshop, hackathon, and symposium is a synchronized signal. Explore upcoming chapter activities and inspect session details.
            </p>
            <div className="mt-2 font-mono text-[11px] text-cyan-300 flex items-center gap-1.5">
              <span>✦ Architecture:</span>
              <span className="text-slate-400">Discover → Details → Register</span>
            </div>
          </div>
        </div>

        {/* Structural Placeholder Notice */}
        <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-3 font-mono text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            [SAMPLE EVENT SCHEDULE // SUBJECT TO OFFICIAL CHAPTER RATIFICATION]
          </span>
          <span className="text-[11px] text-slate-400">
            Real dates & venues will sync here for 2026.
          </span>
        </div>

        {/* Interactive Event Calendar Widget */}
        <div className="mt-10 corner-crosshair glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/25 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Interactive Calendar Grid */}
            <div className="w-full lg:w-7/12">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <div className="font-mono text-sm font-bold text-white uppercase flex items-center gap-2">
                  <span className="text-cyan-400">CALENDAR //</span>
                  <span>{monthNames[currentMonth]} {currentYear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevMonth}
                    className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900/50 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-mono transition-colors cursor-pointer"
                    aria-label="Previous month"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextMonth}
                    className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900/50 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-mono transition-colors cursor-pointer"
                    aria-label="Next month"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Day-of-week headers */}
              <div className="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-[11px] text-slate-500 uppercase">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Days Matrix */}
              <div className="mt-2 grid grid-cols-7 gap-1">
                {/* Empty offset days */}
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10 sm:h-12 rounded bg-transparent" />
                ))}

                {/* Actual month days */}
                {Array.from({ length: totalDays }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateEvent = getEventForDate(currentYear, currentMonth, dayNum);
                  const isSelected = selectedDay === dayNum;

                  return (
                    <button
                      key={dayNum}
                      onClick={() => setSelectedDay(dayNum)}
                      className={`relative flex flex-col items-center justify-center h-10 sm:h-12 rounded border font-mono text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "border-cyan-400 bg-cyan-950/60 text-white shadow-md shadow-cyan-500/30"
                          : dateEvent
                          ? "border-cyan-500/40 bg-cyan-950/20 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-950/40"
                          : "border-slate-800/60 bg-[#02050f]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      <span>{dayNum}</span>
                      {dateEvent && (
                        <span className="absolute bottom-1.5 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 inline-block" />
                  Pulsing dot = Confirmed Signal / Event
                </span>
                <span>Click any date to inspect</span>
              </div>
            </div>

            {/* Right: Selected Date Event Preview Box */}
            <div className="w-full lg:w-5/12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-cyan-500/20 pt-6 lg:pt-0 lg:pl-8">
              <div>
                <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider flex items-center justify-between">
                  <span>SELECTED TIMELINE DATE</span>
                  <span className="text-white font-bold">
                    {monthNames[currentMonth]} {selectedDay}, {currentYear}
                  </span>
                </div>

                {selectedDateEvent ? (
                  <div className="mt-4 rounded-xl border border-cyan-500/30 bg-[#040c1e] p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                        {selectedDateEvent.category}
                      </span>
                      <span className="font-mono text-xs text-emerald-400">
                        {selectedDateEvent.status}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white leading-snug">
                      {selectedDateEvent.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                      {selectedDateEvent.shortDescription}
                    </p>
                    <div className="mt-4 pt-3 border-t border-cyan-500/15 font-mono text-xs text-slate-400 space-y-1.5">
                      <div>🕒 {selectedDateEvent.time}</div>
                      <div>📍 {selectedDateEvent.location}</div>
                    </div>
                    <button
                      onClick={() => onSelectEvent(selectedDateEvent)}
                      className="mt-5 w-full rounded-lg bg-cyan-400 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-400/20 cursor-pointer"
                    >
                      Open Full Event Details ↗
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-slate-800 bg-[#02050e] p-8 text-center">
                    <div className="font-mono text-2xl text-slate-600 mb-2">∅</div>
                    <div className="font-mono text-xs text-slate-300 font-semibold">
                      No Official Signal on This Date
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 font-light">
                      Click highlighted days (e.g. March 24, March 29, April 11, April 18) to preview chapter sessions.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-lg border border-slate-800 bg-[#030712] p-3 text-center font-mono text-[11px] text-slate-400">
                ACM Synchronized Calendar Engine // 2026 Chapter Edition
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs for Event Catalog */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {["All", "Upcoming", "Workshop", "Symposium", "Hackathon", "Competitive", "Archived"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`rounded-lg px-3.5 py-1.5 uppercase transition-all cursor-pointer ${
                    filter === cat
                      ? "border border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold"
                      : "border border-slate-800 bg-[#030816] text-slate-400 hover:border-cyan-500/30 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
          <span className="font-mono text-xs text-slate-500">
            SHOWING {filteredEvents.length} VERIFIED SIGNALS
          </span>
        </div>

        {/* Event Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="glass-panel glass-panel-hover corner-crosshair rounded-xl border border-cyan-500/20 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Event Poster Placeholder Header */}
                <div
                  className={`h-32 w-full rounded-lg border border-cyan-500/20 p-4 flex flex-col justify-between relative overflow-hidden mb-5 ${event.posterGradient}`}
                >
                  <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10 font-mono text-[10px]">
                    <span className="rounded bg-black/60 px-2 py-0.5 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm uppercase">
                      {event.category}
                    </span>
                    <span className="rounded bg-black/60 px-2 py-0.5 text-slate-300 backdrop-blur-sm">
                      {event.mode}
                    </span>
                  </div>
                  <div className="relative z-10 font-mono text-[11px] text-cyan-300 font-semibold">
                    {event.displayDate}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {event.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                  {event.shortDescription}
                </p>

                <div className="mt-4 space-y-1 font-mono text-[11px] text-slate-400">
                  <div className="truncate">🕒 {event.time}</div>
                  <div className="truncate">📍 {event.location}</div>
                </div>
              </div>

              {/* Action row */}
              <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center justify-between gap-2 font-mono text-xs">
                <button
                  onClick={() => onSelectEvent(event)}
                  className="rounded border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-1.5 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition-colors cursor-pointer text-[11px]"
                >
                  View Details ↗
                </button>
                <button
                  onClick={() => onSelectEvent(event)}
                  className="rounded bg-cyan-400/90 px-3.5 py-1.5 text-slate-950 font-bold hover:bg-cyan-300 transition-colors cursor-pointer text-[11px]"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

export default function JoinSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pillars = [
    { verb: "LEARN", desc: "Access high-caliber algorithmic curricula, systems labs, and masterclasses." },
    { verb: "BUILD", desc: "Collaborate on real open-source software and chapter engineering projects." },
    { verb: "CONNECT", desc: "Gain 1-on-1 mentorship from seniors and connect with global ACM peers." },
    { verb: "CREATE", desc: "Spearhead symposiums, hackathons, and novel research initiatives on campus." },
  ];

  return (
    <section id="join" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15 bg-[#02050e]/80">
      <div className="mx-auto max-w-6xl">
        {/* Main Call to Action Box */}
        <div className="corner-crosshair glass-panel rounded-3xl p-8 sm:p-14 border border-cyan-500/35 shadow-2xl relative overflow-hidden text-center">
          {/* Ambient Glow in Box */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-cyan-500/15 blur-[90px] pointer-events-none" />

          {/* Section Subtitle Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 font-mono text-xs text-cyan-300 uppercase tracking-widest mb-6">
            <span>{"// MEMBERSHIP & INVOLVEMENT"}</span>
            <span className="text-slate-500">•</span>
            <span>BECOME A NODE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.1]">
            ENTER THE ACM NETWORK
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Whether you want to publish computational research, build distributed applications, or solve ICPC algorithms—there is an active vector waiting for you.
          </p>

          {/* The 4 Action Pillars */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {pillars.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-cyan-500/20 bg-[#03091c]/80 p-4 font-mono"
              >
                <div className="text-cyan-400 font-bold text-sm">
                  0{i + 1} {"//"} {item.verb}
                </div>
                <p className="mt-2 text-xs text-slate-300 font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 hover:bg-cyan-300 transition-all shadow-xl shadow-cyan-400/25 hover:shadow-cyan-300/40 hover:-translate-y-0.5 cursor-pointer"
            >
              Apply To Join Chapter ↗
            </button>
            <a
              href="#events"
              className="w-full sm:w-auto rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-8 py-4 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all backdrop-blur-sm"
            >
              Participate In Events ↓
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto rounded-xl border border-slate-700 bg-[#02050f] px-8 py-4 text-slate-300 hover:text-white hover:border-slate-500 transition-all"
            >
              Explore Projects →
            </a>
          </div>

          <div className="mt-8 font-mono text-[11px] text-slate-500">
            Open to all undergraduate & postgraduate students passionate about computing science.
          </div>
        </div>
      </div>

      {/* Application Placeholder Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="fixed inset-0" onClick={() => setModalOpen(false)} />
          <div className="relative z-10 max-w-lg w-full rounded-2xl border border-cyan-500/30 bg-[#040a18] p-6 sm:p-8 font-sans shadow-2xl">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
                CHAPTER MEMBERSHIP REGISTRATION
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="mt-6 text-center py-6 space-y-3 font-mono">
                <div className="text-3xl text-cyan-400">✓</div>
                <div className="text-white text-base font-bold">
                  INTEREST SIGNAL RECORDED
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  In production, this submission routes into the official ACM chapter onboarding workflow and Google Forms registration pipeline.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setModalOpen(false);
                  }}
                  className="mt-4 rounded bg-cyan-400 px-4 py-2 font-mono text-xs font-bold text-slate-950"
                >
                  Close Confirmation
                </button>
              </div>
            ) : (
              <div className="mt-5 space-y-4 text-xs font-mono">
                <div className="rounded border border-cyan-500/20 bg-cyan-950/20 p-3 text-cyan-300 text-[11px]">
                  [FORM PLACEHOLDER // CONNECTS TO OFFICIAL ONBOARDING SHEET]
                </div>

                <div>
                  <label className="block text-slate-400 uppercase text-[10px] mb-1">
                    Full Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Rivera"
                    className="w-full rounded border border-slate-800 bg-[#020510] px-3 py-2 text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase text-[10px] mb-1">
                    University Email
                  </label>
                  <input
                    type="email"
                    placeholder="student@university.edu"
                    className="w-full rounded border border-slate-800 bg-[#020510] px-3 py-2 text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase text-[10px] mb-1">
                    Primary Area of Interest
                  </label>
                  <select className="w-full rounded border border-slate-800 bg-[#020510] px-3 py-2 text-white focus:border-cyan-400 focus:outline-none">
                    <option>Distributed Systems & Cloud</option>
                    <option>Artificial Intelligence & Machine Learning</option>
                    <option>Theoretical Computer Science & ICPC</option>
                    <option>Open Source & Full-Stack Systems</option>
                    <option>Design & Technical Journalism</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="rounded border border-slate-800 px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setSubmitted(true)}
                    className="rounded bg-cyan-400 px-5 py-2 font-bold text-slate-950 hover:bg-cyan-300"
                  >
                    Submit Interest
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

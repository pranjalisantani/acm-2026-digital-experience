"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <section id="contact" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              08 // CONTACT & CHAPTER NODES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Connect With Chapter Core
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Have questions about upcoming hackathons, sponsorship partnerships, or joining a SIG research circle? Send a signal directly to the organizing committee.
            </p>
          </div>
        </div>

        {/* Structural Placeholder Notice */}
        <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-3 font-mono text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            [CHAPTER CONTACT HUB // OFFICIAL CHANNELS SCHEMA]
          </span>
          <span className="text-[11px] text-slate-400">
            Official university email & handles will bind here.
          </span>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Chapter Information */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            {/* Direct Email Card */}
            <div className="corner-crosshair glass-panel rounded-xl p-6 border border-cyan-500/20">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
                OFFICIAL INBOX
              </span>
              <div className="text-white font-bold text-base mt-1">
                acm@university.edu
              </div>
              <div className="text-[11px] text-cyan-400 mt-1">
                [OFFICIAL CHAPTER INBOX PLACEHOLDER]
              </div>
              <p className="mt-3 text-slate-300 font-sans text-xs leading-relaxed font-light">
                Monitored by the Chapter Executive Secretariat. Typical response time within 24-48 hours during academic terms.
              </p>
            </div>

            {/* Physical Headquarters Card */}
            <div className="rounded-xl border border-slate-800 bg-[#030816] p-6">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
                CAMPUS PRESENCE // LAB NODE
              </span>
              <div className="text-white font-semibold text-sm mt-1">
                Department of Computer Science & Engineering
              </div>
              <div className="text-slate-400 text-xs mt-0.5">
                Advanced Computing Lab, Block Alpha, Room 304
              </div>
              <div className="text-[10px] text-slate-500 mt-2">
                [CAMPUS LOCATION PLACEHOLDER]
              </div>
            </div>

            {/* Official Global ACM Links */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-6">
              <span className="text-[10px] text-cyan-400 uppercase tracking-wider block mb-2 font-bold">
                AFFILIATION & GLOBAL DIRECTORY
              </span>
              <ul className="space-y-2 text-slate-300 text-[11px]">
                <li className="flex items-center justify-between">
                  <span>Parent Society:</span>
                  <a
                    href="https://www.acm.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    acm.org ↗
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>ACM Digital Library:</span>
                  <a
                    href="https://dl.acm.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    dl.acm.org ↗
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>ACM Code of Ethics:</span>
                  <a
                    href="https://www.acm.org/code-of-ethics"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    acm.org/ethics ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {["GitHub", "Discord", "LinkedIn", "X (Twitter)", "Instagram"].map((platform) => (
                <div
                  key={platform}
                  className="rounded border border-slate-800 bg-[#020510] px-3 py-1.5 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors cursor-pointer"
                >
                  ⚡ {platform}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Query Form */}
          <div className="lg:col-span-7 corner-crosshair glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/25 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                TRANSMIT INQUIRY // SIGNAL DISPATCH
              </span>
              <span className="text-[10px] text-slate-500">ENCRYPTION: VERIFIED</span>
            </div>

            {formSent ? (
              <div className="py-12 text-center space-y-3 font-sans">
                <div className="font-mono text-3xl text-cyan-400">✓</div>
                <h3 className="text-xl font-bold text-white font-mono">
                  SIGNAL DISPATCHED SUCCESSFULLY
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. In the production deployment, this dispatch automatically creates a ticket in the ACM Executive committee dashboard.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="mt-4 rounded bg-cyan-400 px-5 py-2.5 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-300"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase text-[10px] mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jordan Lee"
                      className="w-full rounded-lg border border-slate-800 bg-[#020510] px-3.5 py-2.5 text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase text-[10px] mb-1.5">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jordan@university.edu"
                      className="w-full rounded-lg border border-slate-800 bg-[#020510] px-3.5 py-2.5 text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase text-[10px] mb-1.5">
                    Subject / Area of Interest
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-[#020510] px-3.5 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option>General Chapter Inquiry</option>
                    <option>Hackathon Sponsorship & Collaboration</option>
                    <option>Research SIG Participation</option>
                    <option>Speaker / Faculty Session Proposal</option>
                    <option>Membership Onboarding Help</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase text-[10px] mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, project proposal, or collaboration idea..."
                    className="w-full rounded-lg border border-slate-800 bg-[#020510] px-3.5 py-2.5 text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none font-sans text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-cyan-400 py-3 font-bold uppercase tracking-wider text-slate-950 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20 cursor-pointer"
                >
                  Transmit Message To Executive Core ↗
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

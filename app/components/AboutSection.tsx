"use client";

export default function AboutSection() {
  const journeys = [
    {
      step: "01",
      title: "Scientific Inquiry & Research",
      desc: "Engaging in algorithmic research, theoretical computation, reading groups, and symposium papers that extend beyond standard coursework.",
      tag: "THEORY & DISCOVERY",
    },
    {
      step: "02",
      title: "Systems Engineering & Open Source",
      desc: "Architecting real-world distributed software, low-latency tools, and chapter infrastructure alongside passionate student builders.",
      tag: "SYSTEMS & CODE",
    },
    {
      step: "03",
      title: "Vibrant Peer Culture & Competitions",
      desc: "Collaborating in hackathons, ICPC competitive programming circles, and security challenges with driven peers.",
      tag: "COMMUNITY & SPEED",
    },
    {
      step: "04",
      title: "Professional Access & Senior Mentorship",
      desc: "Direct guidance from chapter seniors, alumni in frontier technology labs, and global ACM digital library access.",
      tag: "CAREER & HORIZONS",
    },
  ];

  return (
    <section id="about" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/15">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading with Editorial Treatment */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="h-1.5 w-4 bg-cyan-400 inline-block" />
              01 // CHAPTER IDENTITY & MISSION
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
              Advancing Computing As A Science & Profession
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-300 font-light leading-relaxed">
            The Association for Computing Machinery is the world’s largest educational and scientific computing society. Our chapter serves as the vibrant technical nucleus on campus.
          </div>
        </div>

        {/* Editorial Storytelling Layout */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Manifest and Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="corner-crosshair glass-panel rounded-2xl p-7 border border-cyan-500/25 shadow-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 block mb-2">
                {"// THE CHAPTER PHILOSOPHY"}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Not Just Another Club. A Living Research & Engineering Collective.
              </h3>
              <p className="mt-4 text-sm text-slate-300 font-light leading-relaxed">
                We believe computing is far more than rote syntax. It is the art of modeling complex reality, designing resilient systems, and creating digital infrastructure that serves humanity.
              </p>
              <div className="mt-6 pt-5 border-t border-cyan-500/15 font-mono text-xs text-slate-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>PARENT BODY:</span>
                  <span className="text-white font-semibold">ACM GLOBAL (EST. 1947)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>PRIMARY CULTURE:</span>
                  <span className="text-cyan-300">OPEN SCIENCE & RIGOR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>MEMBERSHIP SCOPE:</span>
                  <span className="text-white">UNDERGRADUATE & RESEARCHERS</span>
                </div>
              </div>
            </div>

            {/* Chapter Mandate Box */}
            <div className="rounded-xl border border-slate-800 bg-[#020614]/80 p-6 font-mono text-xs">
              <div className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                <span>✦</span> CHAPTER MANDATE
              </div>
              <p className="text-slate-300 text-[12px] leading-relaxed">
                Empowering students with peer mentorship, technical autonomy, direct access to ACM publications, and structured pathways to build groundbreaking projects.
              </p>
            </div>
          </div>

          {/* Right: What Students Experience / The 4 Pathways */}
          <div className="lg:col-span-7 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2">
              WHAT STUDENTS DO HERE // 4 DIMENSIONS OF GROWTH
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {journeys.map((item) => (
                <div
                  key={item.step}
                  className="glass-panel glass-panel-hover rounded-xl p-6 border border-cyan-500/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-cyan-400 font-bold">{item.step} {"//"}</span>
                      <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/20">
                        {item.tag}
                      </span>
                    </div>
                    <h4 className="mt-4 text-base font-bold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-cyan-500/10 flex items-center justify-between font-mono text-[11px] text-slate-500">
                    <span>STUDENT PATHWAY</span>
                    <span className="text-cyan-400">ACTIVE TRACK</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Connectivity Bar */}
            <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 font-mono text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-cyan-300 font-medium">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                From Novice to Lead Architect: Seamless Continuous Progression
              </span>
              <a
                href="#capabilities"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 shrink-0 text-[11px]"
              >
                Inspect Capabilities →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

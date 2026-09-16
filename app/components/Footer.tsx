"use client";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-[#02040a] text-slate-400 font-mono text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cyan-500/15">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-950/30 text-cyan-300">
                <svg
                  className="h-6 w-6 text-cyan-400"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="16,3 29,10.5 29,25.5 16,33 3,25.5 3,10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    className="opacity-40"
                  />
                  <path
                    d="M10 22L16 9L22 22"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 18H19.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <circle cx="16" cy="9" r="1.5" fill="#00f0ff" />
                  <circle cx="10" cy="22" r="1.5" fill="#00f0ff" />
                  <circle cx="22" cy="22" r="1.5" fill="#00f0ff" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-base tracking-wider">
                  ACM <span className="text-cyan-400">FACE</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  ASSOCIATION FOR COMPUTING MACHINERY
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans font-light leading-relaxed max-w-sm">
              Advancing computing as a science and profession. The student chapter digital experience uniting learners, researchers, and systems architects into a living community.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>ACM FACE // 2026 EDITION</span>
            </div>
          </div>

          {/* Col 3: Experience */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              EXPERIENCE
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="#hero" className="hover:text-cyan-300 transition-colors">
                  Chapter Story
                </a>
              </li>
              <li>
                <a href="#people" className="hover:text-cyan-300 transition-colors">
                  People & Team
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-cyan-300 transition-colors">
                  Events & Workshops
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-cyan-300 transition-colors">
                  What We Do
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-300 transition-colors">
                  Selected Projects
                </a>
              </li>
              <li>
                <a href="#join" className="hover:text-cyan-300 transition-colors">
                  Join Chapter
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Initiatives */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              INITIATIVES
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="#what-we-do" className="hover:text-cyan-300 transition-colors">
                  Hands-on Workshops
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-cyan-300 transition-colors">
                  Open Source Projects
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-cyan-300 transition-colors">
                  Research Reading Groups
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-cyan-300 transition-colors">
                  ICPC Clinics & Hackathons
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-cyan-300 transition-colors">
                  Event Photo Archives
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Affiliation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              OFFICIAL ACM
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="https://www.acm.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  ACM Global Portal ↗
                </a>
              </li>
              <li>
                <a
                  href="https://dl.acm.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  ACM Digital Library ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.acm.org/chapters"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  Student Chapters Directory ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.acm.org/code-of-ethics"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  Code of Ethics ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Trademark Notice */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 ACM FACE Student Chapter. All rights reserved. Built as an official digital experience.
          </div>
          <div className="flex items-center gap-4">
            <span>ACM® is a registered trademark of the Association for Computing Machinery.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  onOpenSpecs: () => void;
}

export default function Navbar({ onOpenSpecs }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "ABOUT", href: "#information" },
    { label: "PEOPLE", href: "#people" },
    { label: "EVENTS", href: "#events" },
    { label: "WHAT WE DO", href: "#what-we-do" },
    { label: "PROJECTS", href: "#projects" },
    { label: "RESOURCES", href: "#resources" },
    { label: "ARCHIVE", href: "#archive" },
    { label: "JOIN", href: "#join" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/92 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-lg shadow-black/60"
          : "bg-transparent py-5 border-b border-cyan-500/10"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ACM Brand Identity */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-950/30 text-cyan-300 shadow-sm shadow-cyan-500/20 group-hover:border-cyan-400 group-hover:shadow-cyan-400/30 transition-all">
            {/* Custom geometric ACM vector monogram */}
            <svg
              className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors"
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
            <div className="absolute -inset-0.5 rounded-lg bg-cyan-500/10 blur-sm -z-10 group-hover:bg-cyan-500/20 transition-all" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-extrabold tracking-wider text-white">
                ACM<span className="text-cyan-400 font-normal ml-1">2026</span>
              </span>
              <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-widest text-cyan-300">
                LIVING NETWORK
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider hidden sm:inline">
              ASSOCIATION FOR COMPUTING MACHINERY
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-mono tracking-wider text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-300 transition-colors uppercase py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenSpecs}
            className="rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-all cursor-pointer"
            title="Senior Walkthrough & Spec Guide"
          >
            Senior Guide ↗
          </button>
          <a
            href="#join"
            className="rounded-lg bg-cyan-400 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-400/20 hover:shadow-cyan-300/30 hover:-translate-y-0.5"
          >
            Join ACM
          </a>
        </div>

        {/* Mobile menu controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cyan-500/20 bg-[#030712]/98 px-6 py-5 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-3 font-mono text-xs text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-cyan-400 flex items-center gap-1.5"
              >
                <span className="text-cyan-500 text-[10px]">▸</span> {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-cyan-500/20 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSpecs();
              }}
              className="w-1/2 rounded border border-slate-700 bg-slate-900/50 py-2 text-[11px] font-mono text-slate-300 cursor-pointer text-center"
            >
              Senior Guide ↗
            </button>
            <a
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="w-1/2 rounded bg-cyan-400 py-2 text-[11px] font-mono font-bold text-slate-950 text-center"
            >
              Join ACM
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

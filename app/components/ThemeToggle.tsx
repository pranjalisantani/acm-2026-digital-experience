"use client";

import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export default function ThemeToggle({
  className = "",
  compact = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-all duration-200 cursor-pointer ${
        theme === "dark"
          ? "border-slate-800 bg-[#030816]/70 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300"
          : "border-sky-300/80 bg-white text-slate-800 hover:border-sky-500 hover:text-sky-600 shadow-sm"
      } ${className}`}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Visual Icon */}
      {theme === "dark" ? (
        <span className="flex items-center justify-center text-amber-300 group-hover:rotate-45 transition-transform duration-300">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            />
          </svg>
        </span>
      ) : (
        <span className="flex items-center justify-center text-sky-600 group-hover:-rotate-12 transition-transform duration-300">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
      )}

      {/* Label */}
      <span className="uppercase tracking-wider font-semibold">
        {compact ? (
          theme === "dark" ? "LIGHT" : "DARK"
        ) : (
          theme === "dark" ? "MODE: LIGHT" : "MODE: DARK"
        )}
      </span>
    </button>
  );
}

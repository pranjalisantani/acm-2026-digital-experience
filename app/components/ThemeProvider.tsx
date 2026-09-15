"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

function applyThemeToDocument(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (t === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("acm_theme") as Theme | null;
      if (saved === "light" || saved === "dark") {
        const timer = setTimeout(() => {
          setThemeState(saved);
        }, 0);
        applyThemeToDocument(saved);
        return () => clearTimeout(timer);
      } else {
        applyThemeToDocument("dark");
      }
    } catch {
      applyThemeToDocument("dark");
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyThemeToDocument(t);
    try {
      localStorage.setItem("acm_theme", t);
    } catch {
      // Storage unavailable
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

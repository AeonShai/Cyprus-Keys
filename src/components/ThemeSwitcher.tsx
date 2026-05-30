"use client";

import { useState, useEffect } from "react";

const THEMES = [
  {
    id: "navy",
    label: "Navy",
    primary: "#0A2540",
    accent: "#D1A77E",
  },
  {
    id: "obsidian",
    label: "Obsidian",
    primary: "#1C1917",
    accent: "#F59E0B",
  },
  {
    id: "forest",
    label: "Forest",
    primary: "#14532D",
    accent: "#CA8A04",
  },
  {
    id: "midnight",
    label: "Midnight",
    primary: "#1E1B4B",
    accent: "#A78BFA",
  },
  {
    id: "bordeaux",
    label: "Bordeaux",
    primary: "#450A0A",
    accent: "#E11D48",
  },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("navy");

  useEffect(() => {
    const stored = localStorage.getItem("ck-theme");
    if (stored) applyTheme(stored);
  }, []);

  function applyTheme(id: string) {
    const theme = THEMES.find((t) => t.id === id);
    if (!theme) return;
    if (id === "navy") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", id);
    }
    localStorage.setItem("ck-theme", id);
    setActive(id);
  }

  const activeTheme = THEMES.find((t) => t.id === active) ?? THEMES[0];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Swatch panel */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-[var(--clr-border)] p-4 w-56">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-[#9CA3AF] uppercase mb-3">
            Color Theme
          </p>
          <div className="flex flex-col gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => { applyTheme(theme.id); setOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-left ${
                  active === theme.id
                    ? "bg-[var(--clr-surface)] ring-1 ring-[var(--clr-border)]"
                    : "hover:bg-[var(--clr-surface)]"
                }`}
              >
                {/* Color preview */}
                <div className="flex gap-1 flex-shrink-0">
                  <span
                    className="w-5 h-5 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-white shadow-sm -ml-2"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>
                <span className="text-sm font-semibold text-[var(--clr-text)]">{theme.label}</span>
                {active === theme.id && (
                  <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border-2 border-white"
        style={{ backgroundColor: activeTheme.primary }}
        title="Switch theme"
        aria-label="Open theme switcher"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.55-.22-1.05-.59-1.41a.996.996 0 0 1 0-1.42c.37-.36.59-.86.59-1.42V14c0-2.21-1.79-4-4-4H6" />
          <circle cx="6.5" cy="11.5" r="1.5" />
          <circle cx="9.5" cy="7.5" r="1.5" />
          <circle cx="14.5" cy="7.5" r="1.5" />
          <circle cx="17.5" cy="11.5" r="1.5" />
        </svg>
      </button>
    </div>
  );
}

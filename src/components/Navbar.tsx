"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IMAGES } from "@/constants/images";
import { useLang } from "@/hooks/useLang";
import type { Lang } from "@/lib/translations";

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Close lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="max-w-[1600px] mx-auto px-8 md:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={IMAGES.logo}
            alt="Cyprus Keys logo"
            width={240}
            height={72}
            priority
            style={{ height: "42px", width: "auto", filter: isHome ? "brightness(0) invert(1)" : "brightness(0)" }}
          />
        </Link>

        {/* Desktop nav links — glass pill on home, plain on other pages */}
        <div className={`hidden md:flex items-center gap-6 rounded-full px-6 py-2.5 ${
          isHome
            ? "bg-white/10 backdrop-blur-md border border-white/20"
            : "bg-black/5 border border-black/10"
        }`}>
          <Link href="/properties?status=sale" className={`text-sm transition-colors ${ isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black" }`}>{t("nav_buy")}</Link>
          <Link href="/properties?status=rent" className={`text-sm transition-colors ${ isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black" }`}>{t("nav_rent")}</Link>
          <Link href="/projects" className={`text-sm transition-colors ${ isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black" }`}>{t("nav_projects")}</Link>

          {/* Language picker */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-sm transition-colors cursor-pointer ${ isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black" }`}
            >
              <GlobeIcon />
              <span>{t("nav_language")}</span>
              <ChevronDown />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[#0B1F3A] border border-white/20 rounded-xl shadow-lg overflow-hidden">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left ${
                      lang === l.code
                        ? "bg-white/20 text-white font-semibold"
                        : "text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/contacts"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              isHome
                ? "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
                : "bg-black/5 border border-black/15 text-black/80 hover:bg-black/10"
            }`}
          >
            {t("nav_contacts")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isHome ? "bg-white" : "bg-black"} ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isHome ? "bg-white" : "bg-black"} ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isHome ? "bg-white" : "bg-black"} ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B1F3A] border-t border-white/20 shadow-lg px-6 py-5 flex flex-col gap-4">
          <Link href="/properties?status=sale" className="text-base text-white/80 hover:text-white transition-colors" onClick={() => setOpen(false)}>{t("nav_buy")}</Link>
          <Link href="/properties?status=rent" className="text-base text-white/80 hover:text-white transition-colors" onClick={() => setOpen(false)}>{t("nav_rent")}</Link>
          <Link href="/projects" className="text-base text-white/80 hover:text-white transition-colors" onClick={() => setOpen(false)}>{t("nav_projects")}</Link>

          {/* Mobile language switcher */}
          <div className="flex items-center gap-2 pt-1 border-t border-white/20">
            <GlobeIcon />
            <span className="text-sm text-white/60 mr-1">{t("nav_language")}:</span>
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                  lang === l.code
                    ? "bg-white/20 text-white"
                    : "border border-white/30 text-white/60 hover:bg-white/10"
                }`}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          <Link
            href="/contacts"
            className="mt-1 text-center px-4 py-2 rounded-full border border-white/40 text-[14px] font-medium text-white hover:bg-white/20 transition-colors"
            onClick={() => setOpen(false)}
          >
            {t("nav_contacts")}
          </Link>
        </div>
      )}
    </header>
  );
}

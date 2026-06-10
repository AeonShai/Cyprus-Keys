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
    <header className="navbar-anim absolute top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="max-w-[1600px] mx-auto px-6 md:px-10 py-2 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={IMAGES.logo}
            alt="Cyprus Keys logo"
            width={200}
            height={60}
            priority
            style={{ height: "32px", width: "auto", filter: isHome ? "brightness(0) invert(1)" : "brightness(0)" }}
          />
        </Link>

        {/* Desktop nav links — pill */}
        <div className={`hidden md:flex items-center gap-5 rounded-full px-5 py-2 ${
          isHome
            ? "bg-white/10 backdrop-blur-md border border-white/20"
            : "bg-black/5 border border-black/10"
        }`}>
          <Link href="/properties?status=sale" className={`text-sm transition-colors ${isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"}`}>{t("nav_buy")}</Link>
          <Link href="/properties?status=rent" className={`text-sm transition-colors ${isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"}`}>{t("nav_rent")}</Link>
          <Link href="/projects" className={`text-sm transition-colors ${isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"}`}>{t("nav_projects")}</Link>
          <Link href="/purchase-guide" className={`text-sm transition-colors ${isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"}`}>{t("nav_purchase_guide")}</Link>

          {/* Language picker */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm transition-colors cursor-pointer ${isHome ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"}`}
            >
              <GlobeIcon />
              <span className="font-semibold text-xs">{currentLang.code.toUpperCase()}</span>
              <ChevronDown />
            </button>
            {langOpen && (
              <div className={`absolute top-full right-0 mt-2 w-36 border rounded-xl shadow-lg overflow-hidden ${
                isHome ? "bg-[#0B1F3A] border-white/20" : "bg-white border-black/10"
              }`}>
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center px-4 py-2 text-sm transition-colors text-left ${
                      lang === l.code
                        ? isHome ? "bg-white/20 text-white font-semibold" : "bg-black/10 text-black font-semibold"
                        : isHome ? "text-white/70 hover:bg-white/10" : "text-black/70 hover:bg-black/5"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop: Contacts button */}
        <div className="hidden md:flex">
          <Link
            href="/contacts"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              isHome
                ? "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
                : "bg-black/5 border border-black/15 text-black/80 hover:bg-black/10"
            }`}
          >
            {t("nav_contacts")}
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isHome ? "white" : "black"} strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className={`md:hidden absolute top-full left-0 right-0 shadow-xl border-t ${
          isHome
            ? "bg-[#0B1F3A]/95 backdrop-blur-md border-white/10"
            : "bg-white/95 backdrop-blur-md border-black/5"
        }`}>
          <div className="px-6 py-4 flex flex-col gap-1">
            {[
              { href: "/properties?status=sale", label: t("nav_buy") },
              { href: "/properties?status=rent", label: t("nav_rent") },
              { href: "/projects", label: t("nav_projects") },
              { href: "/purchase-guide", label: t("nav_purchase_guide") },
              { href: "/contacts", label: t("nav_contacts") },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                  isHome
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-black/70 hover:text-black hover:bg-black/5"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language switcher */}
            <div className={`flex items-center gap-2 mt-2 pt-3 border-t ${isHome ? "border-white/10" : "border-black/5"}`}>
              <GlobeIcon />
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    lang === l.code
                      ? isHome ? "bg-white/20 text-white" : "bg-black/15 text-black"
                      : isHome ? "border border-white/20 text-white/60 hover:bg-white/10" : "border border-black/15 text-black/50 hover:bg-black/5"
                  }`}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

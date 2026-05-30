"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IMAGES } from "@/constants/images";

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[var(--clr-bg)] relative z-50">
      <nav className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={IMAGES.logo}
            alt="Cyprus Keys logo"
            width={180}
            height={120}
            priority
            className="!h-[72px] !w-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="/properties?status=sale" className="text-sm text-[var(--clr-text-secondary)] hover:text-[var(--clr-primary)] transition-colors">Buy</Link>
          <Link href="/properties?status=rent" className="text-sm text-[var(--clr-text-secondary)] hover:text-[var(--clr-primary)] transition-colors">Rent</Link>
          <Link href="/projects" className="text-sm text-[var(--clr-text-secondary)] hover:text-[var(--clr-primary)] transition-colors">Projects</Link>
          <button className="flex items-center gap-1.5 text-sm text-[var(--clr-text-secondary)] hover:text-[var(--clr-primary)] transition-colors cursor-pointer">
            <GlobeIcon />
            Language
          </button>
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/contacts"
            className="px-4 py-1.5 rounded-full border border-[var(--clr-primary)] text-[13px] font-medium text-[var(--clr-primary)] hover:bg-[var(--clr-primary)] hover:text-white transition-colors"
          >
            Contacts
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[var(--clr-text)] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[var(--clr-text)] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[var(--clr-text)] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--clr-bg)] border-t border-[var(--clr-border)] shadow-lg px-6 py-5 flex flex-col gap-4">
          <Link href="/properties?status=sale" className="text-base text-[var(--clr-text)] hover:text-[var(--clr-primary)] transition-colors" onClick={() => setOpen(false)}>Buy</Link>
          <Link href="/properties?status=rent" className="text-base text-[var(--clr-text)] hover:text-[var(--clr-primary)] transition-colors" onClick={() => setOpen(false)}>Rent</Link>
          <Link href="/projects" className="text-base text-[var(--clr-text)] hover:text-[var(--clr-primary)] transition-colors" onClick={() => setOpen(false)}>Projects</Link>
          <Link
            href="/contacts"
            className="mt-2 text-center px-4 py-2 rounded-full border border-[var(--clr-primary)] text-[14px] font-medium text-[var(--clr-primary)] hover:bg-[var(--clr-primary)] hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            Contacts
          </Link>
        </div>
      )}
    </header>
  );
}

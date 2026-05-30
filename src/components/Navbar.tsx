import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/images";

function GlobeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="w-full bg-[var(--clr-bg)]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={IMAGES.logo}
            alt="Cyprus Keys logo"
            width={64}
            height={64}
            priority
          />
        </Link>

        {/* Center nav links */}
        <div className="flex items-center gap-7">
          <Link
            href="/properties?status=sale"
            className="text-sm text-[var(--clr-text-secondary)] hover:text-[var(--clr-primary)] transition-colors"
          >
            Buy
          </Link>
          <Link
            href="/properties?status=rent"
            className="text-sm text-[var(--clr-text-secondary)] hover:text-[var(--clr-primary)] transition-colors"
          >
            Rent
          </Link>
          <button className="flex items-center gap-1.5 text-sm text-[var(--clr-text-secondary)] hover:text-[var(--clr-primary)] transition-colors cursor-pointer">
            <GlobeIcon />
            Language
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/contacts"
            className="px-4 py-1.5 rounded-full border border-[var(--clr-primary)] text-[13px] font-medium text-[var(--clr-primary)] hover:bg-[var(--clr-primary)] hover:text-white transition-colors"
          >
            Contacts
          </Link>
        </div>
      </nav>
    </header>
  );
}

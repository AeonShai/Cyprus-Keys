"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "satilik" | "kiralik" | "projeler";

function KeyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M21 2l-9.6 9.6M15.5 7.5l3 3" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="18" />
      <rect x="14" y="9" width="7" height="12" />
      <path d="M10 3h4" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const TABS: { id: Tab; label: string; Icon: () => React.JSX.Element }[] = [
  { id: "satilik", label: "For Sale", Icon: KeyIcon },
  { id: "kiralik", label: "For Rent", Icon: HomeIcon },
  { id: "projeler", label: "Projects", Icon: BuildingIcon },
];

const CYPRUS_REGIONS = [
  "Girne", "Lefkosa", "Gazimagusa", "Iskele", "Guzelyurt",
  "Lapta", "Alsancak", "Esentepe", "Bahceli", "Bafra", "Tatlisu", "Karpaz",
];

const PROPERTY_TYPES = ["Apartment", "Villa", "Penthouse", "Land", "Commercial"];

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("satilik");
  const [region, setRegion] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleSearch() {
    if (activeTab === "projeler") { router.push("/projects"); return; }
    const params = new URLSearchParams();
    params.set("status", activeTab === "satilik" ? "sale" : "rent");
    if (region) params.set("location", region);
    if (propertyType) params.set("type", propertyType.toLowerCase());
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex">
        {TABS.map(({ id, label, Icon }, idx) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={[
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
              idx === 0 ? "rounded-tl-[11px]" : "",
              idx === TABS.length - 1 ? "rounded-tr-[11px]" : "",
              activeTab === id
                ? "bg-white text-[var(--clr-text)]"
                : "bg-[var(--clr-text)]/70 text-white hover:bg-[var(--clr-text)]/90",
            ].join(" ")}
          >
            <Icon />
            <span className="hidden xs:inline">{label}</span>
            <span className="xs:hidden text-xs">{label}</span>
          </button>
        ))}
      </div>

      {/* Search panel */}
      <div className="relative bg-[var(--clr-bg)] shadow-md rounded-[0_11px_11px_11px] px-4 py-4 pb-10 md:pb-6">

        {/* Mobile: 2x2 grid. Desktop: single row flex */}
        <div className="grid grid-cols-2 gap-3 md:flex md:items-stretch md:gap-3">

          {/* Region */}
          <div className="border border-[var(--clr-border)] rounded-[8px] px-3 py-2.5 flex flex-col justify-center min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Region / City</p>
            <div className="relative flex items-center">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full font-bold text-[var(--clr-primary)] text-xs md:text-sm bg-transparent outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="">All</option>
                {CYPRUS_REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="absolute right-0 text-gray-400 pointer-events-none"><ChevronIcon /></span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">Cyprus</p>
          </div>

          {/* Property type */}
          <div className="border border-[var(--clr-border)] rounded-[8px] px-3 py-2.5 flex flex-col justify-center min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Property Type</p>
            <div className="relative flex items-center">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full font-bold text-[var(--clr-primary)] text-xs md:text-sm bg-transparent outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="">All</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <span className="absolute right-0 text-gray-400 pointer-events-none"><ChevronIcon /></span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">Apt, Villa...</p>
          </div>

          {/* Min price */}
          <div className="border border-[var(--clr-border)] rounded-[8px] px-3 py-2.5 flex flex-col justify-center min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Min. Price</p>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[var(--clr-primary)] text-xs md:text-sm">ú</span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full font-bold text-[var(--clr-primary)] text-xs md:text-sm bg-transparent outline-none placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">GBP</p>
          </div>

          {/* Max price */}
          <div className="border border-[var(--clr-border)] rounded-[8px] px-3 py-2.5 flex flex-col justify-center min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Max. Price</p>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[var(--clr-primary)] text-xs md:text-sm">ú</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Any"
                className="w-full font-bold text-[var(--clr-primary)] text-xs md:text-sm bg-transparent outline-none placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">GBP</p>
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="absolute right-4 md:right-[4%] -bottom-5 h-10 px-6 bg-[var(--clr-primary)] text-white font-semibold text-sm flex items-center justify-center rounded-[6px] hover:bg-[#0D3061] transition-colors whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </div>
  );
}
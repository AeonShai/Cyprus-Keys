"use client";

import { useState } from "react";
import Image from "next/image";

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
  "Girne", "Lefkoşa", "Gazimağusa", "İskele",
  "Güzelyurt", "Lapta", "Alsancak", "Esentepe",
  "Bahçeli", "Bafra", "Tatlısu", "Karpaz",
];

const PROPERTY_TYPES = ["Apartment", "Villa", "Penthouse", "Land", "Commercial"];

const MAP_PHOTO = "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1275&q=80";

export default function SearchAndMapSection() {
  const [activeTab, setActiveTab] = useState<Tab>("satilik");
  const [region, setRegion] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <section className="w-full relative overflow-hidden -mt-10" style={{ minHeight: 420 }}>

      {/* Map background photo */}
      <Image
        src={MAP_PHOTO}
        alt="Cyprus neighborhood aerial view"
        fill
        className="object-cover"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1275px] mx-auto px-6 pt-[52px] pb-10">

        {/* Tabs + Search panel */}
        <div className="relative mx-[4.72%]">

          {/* Tabs */}
          <div className="flex">
            {TABS.map(({ id, label, Icon }, idx) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={[
                  "w-28 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
                  idx === 0 ? "rounded-tl-[11px]" : "",
                  idx === TABS.length - 1 ? "rounded-tr-[11px]" : "",
                  activeTab === id
                    ? "bg-white text-[var(--clr-text)]"
                    : "bg-[var(--clr-text)]/70 text-white hover:bg-[var(--clr-text)]/90",
                ].join(" ")}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>

          {/* Search panel */}
          <div className="relative bg-white shadow-md rounded-[0_11px_11px_11px] flex items-stretch gap-3 px-4 py-4 pb-6">

            {/* Region */}
            <div className="flex-1 border border-[var(--clr-border)] rounded-[8px] px-4 py-3 flex flex-col justify-center min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Region / City</p>
              <div className="relative flex items-center">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full font-bold text-[var(--clr-primary)] text-sm bg-transparent outline-none cursor-pointer appearance-none pr-4"
                >
                  <option value="">All Regions</option>
                  {CYPRUS_REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <span className="absolute right-0 text-gray-400 pointer-events-none"><ChevronIcon /></span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">Cyprus</p>
            </div>

            {/* Property type */}
            <div className="flex-1 border border-[var(--clr-border)] rounded-[8px] px-4 py-3 flex flex-col justify-center min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Property Type</p>
              <div className="relative flex items-center">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full font-bold text-[var(--clr-primary)] text-sm bg-transparent outline-none cursor-pointer appearance-none pr-4"
                >
                  <option value="">All Types</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="absolute right-0 text-gray-400 pointer-events-none"><ChevronIcon /></span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">Apartment, Villa, Land...</p>
            </div>

            {/* Price range */}
            <div className="flex-[2] border border-[var(--clr-border)] rounded-[8px] px-4 py-3 flex items-center min-w-0 gap-3">
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Min. Price</p>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--clr-primary)] text-sm">£</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    className="w-full font-bold text-[var(--clr-primary)] text-sm bg-transparent outline-none placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">Sterling (GBP)</p>
              </div>
              <div className="w-px h-8 bg-[var(--clr-border)] shrink-0" />
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Max. Price</p>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--clr-primary)] text-sm">£</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="No limit"
                    className="w-full font-bold text-[var(--clr-primary)] text-sm bg-transparent outline-none placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">Sterling (GBP)</p>
              </div>
            </div>

            {/* Search button */}
            <button className="absolute right-[4%] -bottom-5 h-10 px-6 bg-[var(--clr-primary)] text-white font-semibold text-sm flex items-center justify-center rounded-[6px] hover:bg-[#0D3061] transition-colors whitespace-nowrap">
              Search
            </button>
          </div>
        </div>

        {/* Location card */}
        <div className="mt-16 mx-[4.72%]">
          <div className="inline-flex bg-white rounded-xl px-5 py-4 items-center gap-6 shadow-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Location</p>
              <p className="text-lg font-bold text-[var(--clr-text)]">Girne, Kuzey Kıbrıs</p>
            </div>
            <button className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
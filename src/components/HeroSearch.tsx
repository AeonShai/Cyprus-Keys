"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/useLang";

type Tab = "satilik" | "kiralik";

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

const TABS: { id: Tab; saleKey: "search_tab_sale"; rentKey?: undefined } | { id: Tab; rentKey: "search_tab_rent"; saleKey?: undefined }[] = [];

const CYPRUS_REGIONS = [
  "Girne", "Lefkosa", "Gazimagusa", "Iskele", "Guzelyurt",
  "Lapta", "Alsancak", "Esentepe", "Bahceli", "Bafra", "Tatlisu", "Karpaz",
];

const PROPERTY_TYPES = ["Apartment", "Villa", "Penthouse", "Land", "Commercial"];

export default function HeroSearch() {
  const router = useRouter();
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<Tab>("satilik");
  const [region, setRegion] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const TABS = [
    { id: "satilik" as Tab, label: t("search_tab_sale"), Icon: KeyIcon },
    { id: "kiralik" as Tab, label: t("search_tab_rent"), Icon: HomeIcon },
  ];

  function handleSearch() {
    const params = new URLSearchParams();
    params.set("status", activeTab === "satilik" ? "sale" : "rent");
    if (region) params.set("city", region);
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
      <div className="relative bg-[var(--clr-bg)] shadow-md rounded-[0_11px_11px_11px] px-4 py-4 pb-10 md:pb-6">

        {/* Mobile: stacked. Desktop: single row flex */}
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-3">

          {/* Region */}
          <div className="flex-1 border border-[var(--clr-border)] rounded-[8px] px-4 py-3 flex flex-col justify-center min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{t("search_region_label")}</p>
            <div className="relative flex items-center">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full font-bold text-[var(--clr-primary)] text-sm bg-transparent outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="">{t("search_region_placeholder")}</option>
                {CYPRUS_REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="absolute right-0 text-gray-400 pointer-events-none"><ChevronIcon /></span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">{t("search_region_sub")}</p>
          </div>

          {/* Property type */}
          <div className="flex-1 border border-[var(--clr-border)] rounded-[8px] px-4 py-3 flex flex-col justify-center min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{t("search_type_label")}</p>
            <div className="relative flex items-center">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full font-bold text-[var(--clr-primary)] text-sm bg-transparent outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="">{t("search_type_placeholder")}</option>
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
              <span className="absolute right-0 text-gray-400 pointer-events-none"><ChevronIcon /></span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">{t("search_type_sub")}</p>
          </div>

          {/* Price range — min + divider + max in one box */}
          <div className="flex-[2] border border-[var(--clr-border)] rounded-[8px] px-4 py-3 flex items-center justify-around min-w-0 gap-3">
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{t("search_min_label")}</p>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[var(--clr-primary)] text-sm">£</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder={t("search_min_placeholder")}
                  className="w-full font-bold text-[var(--clr-primary)] text-sm bg-transparent outline-none placeholder:text-gray-300 placeholder:font-normal"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">{t("search_price_sub")}</p>
            </div>
            <div className="w-px h-8 bg-[var(--clr-border)] shrink-0" />
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{t("search_max_label")}</p>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[var(--clr-primary)] text-sm">£</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={t("search_max_placeholder")}
                  className="w-full font-bold text-[var(--clr-primary)] text-sm bg-transparent outline-none placeholder:text-gray-300 placeholder:font-normal"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">Sterling (GBP)</p>
            </div>
          </div>

        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="absolute right-4 md:right-[4%] -bottom-5 h-10 px-6 bg-[var(--clr-primary)] text-white font-semibold text-sm flex items-center justify-center rounded-[6px] hover:bg-[#0D3061] transition-colors whitespace-nowrap"
        >
          {t("search_button")}
        </button>
      </div>
    </div>
  );
}
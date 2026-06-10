"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { NORTH_CYPRUS_CITIES } from "@/constants/locations";
import { useLang } from "@/hooks/useLang";

const CITIES = ["All", ...NORTH_CYPRUS_CITIES];
const TYPES = ["All", "villa", "apartment", "penthouse", "bungalow"];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

  const status = searchParams.get("status") ?? "all";
  const city = searchParams.get("city") ?? "All";
  const type = searchParams.get("type") ?? "All";

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") ?? "");
    setMaxPrice(searchParams.get("maxPrice") ?? "");
  }, [searchParams]);

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "" || value === "All" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`/properties?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const applyPrice = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice); else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice); else params.delete("maxPrice");
    router.push(`/properties?${params.toString()}`, { scroll: false });
  }, [router, searchParams, minPrice, maxPrice]);

  const activeCount = [
    status !== "all",
    city !== "All",
    type !== "All",
    !!searchParams.get("minPrice"),
    !!searchParams.get("maxPrice"),
  ].filter(Boolean).length;

  const filterPanel = (
    <div className="bg-[var(--clr-bg)] rounded-2xl p-5 shadow-sm border border-[var(--clr-border)]">

      {/* Status */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-[var(--clr-text-secondary)] tracking-widest uppercase mb-3">{t("filter_listing_type")}</p>
        <div className="flex gap-2">
          {["all", "sale", "rent"].map((s) => (
            <button
              key={s}
              onClick={() => update("status", s)}
              className={`flex-1 py-2 rounded-full text-xs font-semibold capitalize transition-colors ${
                status === s
                  ? "bg-[var(--clr-primary)] text-white"
                  : "bg-[var(--clr-surface)] text-[var(--clr-text-secondary)] hover:bg-[var(--clr-border)]"
              }`}
            >
                {s === "all" ? t("filter_all") : s === "sale" ? t("filter_sale") : t("filter_rent")}
            </button>
          ))}
        </div>
      </div>

      {/* City — select dropdown */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-[var(--clr-text-secondary)] tracking-widest uppercase mb-3">{t("filter_city")}</p>
        <select
          value={city}
          onChange={(e) => update("city", e.target.value)}
          className="w-full border border-[var(--clr-border)] rounded-xl px-3 py-2.5 text-sm text-[var(--clr-text)] bg-[var(--clr-bg)] focus:outline-none focus:border-[var(--clr-primary)] transition-colors"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>{c === "All" ? t("filter_all_cities") : c}</option>
          ))}
        </select>
      </div>

      {/* Type — wrap pills */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-[var(--clr-text-secondary)] tracking-widest uppercase mb-3">{t("filter_type")}</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((pt) => (
            <button
              key={pt}
              onClick={() => update("type", pt)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                type === pt
                  ? "bg-[var(--clr-primary)] text-white"
                  : "bg-[var(--clr-surface)] text-[var(--clr-text-secondary)] hover:bg-[var(--clr-border)]"
              }`}
            >
              {pt === "All" ? t("filter_all_types") : pt}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range — explicit Apply button */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-[var(--clr-text-secondary)] tracking-widest uppercase mb-3">{t("filter_price")}</p>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyPrice()}
            className="w-full border border-[var(--clr-border)] rounded-xl px-3 py-2 text-sm text-[var(--clr-text)] placeholder-[#9CA3AF] focus:outline-none focus:border-[var(--clr-primary)] transition-colors"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyPrice()}
            className="w-full border border-[var(--clr-border)] rounded-xl px-3 py-2 text-sm text-[var(--clr-text)] placeholder-[#9CA3AF] focus:outline-none focus:border-[var(--clr-primary)] transition-colors"
          />
        </div>
        <button
          onClick={applyPrice}
          className="w-full py-2 rounded-xl bg-[var(--clr-primary)] text-white text-sm font-semibold hover:bg-[#0D3061] transition-colors"
        >
          {t("filter_apply")}
        </button>
      </div>

      <button
        onClick={() => router.push("/properties")}
        className="w-full py-2.5 rounded-full border border-[var(--clr-border)] text-sm font-semibold text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface)] transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">

      {/* Mobile: collapsible toggle */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex items-center justify-between w-full bg-[var(--clr-bg)] border border-[var(--clr-border)] rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--clr-text)] shadow-sm"
        >
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="bg-[var(--clr-primary)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {isOpen && <div className="mt-2">{filterPanel}</div>}
      </div>

      {/* Desktop: always visible sidebar */}
      <div className="hidden lg:block sticky top-6">
        <h2 className="font-bold text-[var(--clr-text)] text-base mb-4">Filters</h2>
        {filterPanel}
      </div>

    </aside>
  );
}

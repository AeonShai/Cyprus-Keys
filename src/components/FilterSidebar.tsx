"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { NORTH_CYPRUS_CITIES } from "@/constants/locations";

const CITIES = ["All", ...NORTH_CYPRUS_CITIES];
const TYPES = ["All", "villa", "apartment", "penthouse", "bungalow"];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") ?? "all";
  const city = searchParams.get("city") ?? "All";
  const type = searchParams.get("type") ?? "All";

  // Local state for price inputs — only apply on blur or Enter
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  // Sync local state if URL changes externally (e.g. clear filters)
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

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-[var(--clr-bg)] rounded-2xl p-6 shadow-sm border border-[var(--clr-border)] sticky top-6">
        <h2 className="font-bold text-[var(--clr-text)] text-base mb-6">Filters</h2>

        {/* Status */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[var(--clr-text-secondary)] tracking-widest uppercase mb-3">Listing Type</p>
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
                {s === "all" ? "All" : s === "sale" ? "For Sale" : "For Rent"}
              </button>
            ))}
          </div>
        </div>

        {/* City */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[var(--clr-text-secondary)] tracking-widest uppercase mb-3">City</p>
          <div className="flex flex-col gap-1.5">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => update("city", c)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  city === c
                    ? "bg-[var(--clr-primary)] text-white"
                    : "text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[var(--clr-text-secondary)] tracking-widest uppercase mb-3">Property Type</p>
          <div className="flex flex-col gap-1.5">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => update("type", t)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                  type === t
                    ? "bg-[var(--clr-primary)] text-white"
                    : "text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface)]"
                }`}
              >
                {t === "All" ? "All Types" : t}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[var(--clr-text-secondary)] tracking-widest uppercase mb-3">Price Range (£)</p>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={applyPrice}
              onKeyDown={(e) => e.key === "Enter" && applyPrice()}
              className="w-full border border-[var(--clr-border)] rounded-xl px-3 py-2 text-sm text-[var(--clr-text)] placeholder-[#9CA3AF] focus:outline-none focus:border-[var(--clr-primary)] transition-colors"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={applyPrice}
              onKeyDown={(e) => e.key === "Enter" && applyPrice()}
              className="w-full border border-[var(--clr-border)] rounded-xl px-3 py-2 text-sm text-[var(--clr-text)] placeholder-[#9CA3AF] focus:outline-none focus:border-[var(--clr-primary)] transition-colors"
            />
          </div>
        </div>

        <button
          onClick={() => router.push("/properties")}
          className="w-full py-2.5 rounded-full border border-[var(--clr-border)] text-sm font-semibold text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface)] transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}

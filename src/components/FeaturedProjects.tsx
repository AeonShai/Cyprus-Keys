"use client";

import Image from "next/image";
import { useLang } from "@/hooks/useLang";

const PROJECTS = [
  {
    id: 1,
    name: "Azure Residences",
    location: "Girne, North Cyprus",
    units: "48 Units",
    status: "Off-Plan",
    completion: "Q3 2026",
    price: "From £145,000",
    photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    tag: "New Launch",
  },
  {
    id: 2,
    name: "Kyrenia Hills",
    location: "Alsancak, Girne",
    units: "24 Villas",
    status: "Under Construction",
    completion: "Q1 2027",
    price: "From £320,000",
    photo: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80",
    tag: "Limited Units",
  },
  {
    id: 3,
    name: "Famagusta Bay",
    location: "Gazimağusa, Cyprus",
    units: "112 Apartments",
    status: "Off-Plan",
    completion: "Q4 2027",
    price: "From £98,000",
    photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    tag: "Sea View",
  },
];

export default function FeaturedProjects() {
  const { t } = useLang();
  return (
    <section className="w-full max-w-[1600px] mx-auto px-8 md:px-12 py-14">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <p className="text-xs font-semibold tracking-widest text-[var(--clr-accent)] uppercase mb-2">{t("featured_badge")}</p>
          <h2 className="text-2xl md:text-4xl font-black text-[var(--clr-text)]">{t("featured_title")}</h2>
        </div>
        <a
          href="/projects"
          className="flex items-center gap-2 text-sm font-semibold text-white bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] transition-colors px-5 py-2 rounded-full"
        >
          {t("featured_all")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Asymmetric grid: large left + two stacked right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Large featured card */}
        <div className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/3]">
          <Image
            src={PROJECTS[0].photo}
            alt={PROJECTS[0].name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Tag */}
          <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-[var(--clr-accent)] px-3 py-1 rounded-full">
            {PROJECTS[0].tag}
          </span>
          {/* Info */}
          <div className="absolute bottom-0 inset-x-0 p-6">
            <h3 className="text-xl font-bold text-white">{PROJECTS[0].name}</h3>
            <p className="text-white/70 text-sm mt-1">{PROJECTS[0].location}</p>
            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 text-xs text-white/60">
              <span>{PROJECTS[0].units}</span>
              <span>·</span>
              <span>{PROJECTS[0].status}</span>
              <span>·</span>
              <span>{PROJECTS[0].completion}</span>
            </div>
            <p className="text-white font-bold text-sm mt-2">{PROJECTS[0].price}</p>
          </div>
        </div>

        {/* Two stacked cards */}
        <div className="flex flex-col gap-5">
          {PROJECTS.slice(1).map((p) => (
            <div key={p.id} className="group cursor-pointer relative rounded-2xl overflow-hidden flex-1" style={{ minHeight: 0 }}>
              <div className="relative w-full h-full aspect-[16/7]">
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-[var(--clr-accent)] px-3 py-1 rounded-full">
                  {p.tag}
                </span>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{p.location}</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5 text-xs text-white/60">
                    <span>{p.units}</span>
                    <span>·</span>
                    <span>{p.status}</span>
                    <span>·</span>
                    <span>{p.completion}</span>
                  </div>
                  <p className="text-white font-bold text-sm mt-1.5">{p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import Anim from "@/components/Anim";

const PROJECTS = [
  {
    id: 1,
    name: "Azure Residences",
    location: "Girne, North Cyprus",
    photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=90",
  },
  {
    id: 2,
    name: "Kyrenia Hills",
    location: "Alsancak, Girne",
    photo: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=90",
  },
  {
    id: 3,
    name: "Famagusta Bay",
    location: "Gazimağusa, Cyprus",
    photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=90",
  },
];

export default function FeaturedProjects() {
  const { t } = useLang();
  return (
    <section className="w-full max-w-[1600px] mx-auto px-8 md:px-12 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left: text block */}
        <Anim variant="left" className="lg:w-[38%] shrink-0">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--clr-text)] leading-tight mb-5">
            {t("projects_title")}
          </h2>
          <p className="text-[var(--clr-text-secondary)] text-sm leading-relaxed mb-8 max-w-sm">
            {t("projects_desc")}
          </p>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
          >
            {t("featured_all")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </Anim>

        {/* Right: 3-image bento — two stacked left + one tall right */}
        <Anim variant="right" delay={100} className="flex-1 w-full flex gap-3" style={{ height: "480px" }}>

          {/* Two stacked left */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex-1 relative rounded-2xl overflow-hidden">
              <Image
                src={PROJECTS[0].photo}
                alt={PROJECTS[0].name}
                fill
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden">
              <Image
                src={PROJECTS[2].photo}
                alt={PROJECTS[2].name}
                fill
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* One tall right */}
          <div className="w-[46%] relative rounded-2xl overflow-hidden">
            <Image
              src={PROJECTS[1].photo}
              alt={PROJECTS[1].name}
              fill
              unoptimized
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

        </Anim>
      </div>
    </section>
  );
}

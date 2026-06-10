"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import Anim from "@/components/Anim";

type Property = {
  id: number;
  title: string;
  location: string;
  priceAmount: number;
  currency: string;
  photo: string | null;
  description: string | null;
  status: string;
};

function formatPrice(amount: number, currency: string, status: string) {
  const sym = currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
  if (amount >= 1000000) return `${sym}${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${sym}${Math.round(amount / 1000)}K`;
  return `${sym}${amount}${status === "rent" ? "/mo" : ""}`;
}

export default function ExploreSection({ properties }: { properties: Property[] }) {
  const { t } = useLang();

  if (properties.length === 0) return null;

  const [p1, p2, p3, p4] = properties;

  return (
    <section className="w-full max-w-[1600px] mx-auto px-8 md:px-12 py-16">

      {/* Header */}
      <Anim className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-[var(--clr-text)] mb-3">
          {t("explore_title")}
        </h2>
        <p className="text-[var(--clr-text-secondary)] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          {t("explore_desc")}
        </p>
      </Anim>

      {/* Mobile: 2-col aspect-ratio grid */}
      <div className="lg:hidden grid grid-cols-2 gap-3 mb-8">
        {[p1, p2, p3, p4].filter(Boolean).map((p) => p && (
          <Anim key={p.id} variant="up" delay={0} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Link href={`/properties/${p.id}`} className="group absolute inset-0">
              <Image
                src={p.photo || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"}
                alt={p.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 px-3 py-3">
                <h3 className="font-bold text-white text-xs leading-tight line-clamp-1">{p.title}</h3>
                <span className="text-white/70 text-[10px]">{formatPrice(p.priceAmount, p.currency, p.status)}</span>
              </div>
            </Link>
          </Anim>
        ))}
      </div>

      {/* Desktop: Bento grid — each card animates individually */}
      <div className="hidden lg:flex gap-4" style={{ height: "580px" }}>

        {/* Card 1 — tall left */}
        {p1 && (
          <Anim variant="up" delay={0} style={{ width: "38%" }} className="relative rounded-2xl overflow-hidden">
            <Link href={`/properties/${p1.id}`} className="group absolute inset-0">
              <Image
                src={p1.photo || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2560&q=100"}
                alt={p1.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 px-5 py-4 flex items-end justify-between">
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">{p1.title}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{p1.location}</p>
                </div>
                <span className="text-white font-bold text-sm bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full shrink-0 ml-2">
                  {formatPrice(p1.priceAmount, p1.currency, p1.status)}
                </span>
              </div>
            </Link>
          </Anim>
        )}

        {/* Right column */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Top row: Card 2 + Card 3 */}
          <div className="flex gap-4" style={{ height: "300px" }}>
            {p2 && (
              <Anim variant="up" delay={150} className="relative flex-1 rounded-2xl overflow-hidden">
                <Link href={`/properties/${p2.id}`} className="group absolute inset-0">
                  <Image
                    src={p2.photo || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=100"}
                    alt={p2.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 px-4 py-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-white text-sm leading-tight">{p2.title}</h3>
                      <span className="text-white font-bold text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full shrink-0 ml-2">
                        {formatPrice(p2.priceAmount, p2.currency, p2.status)}
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-snug line-clamp-2">{p2.description}</p>
                  </div>
                </Link>
              </Anim>
            )}
            {p3 && (
              <Anim variant="up" delay={300} className="relative flex-1 rounded-2xl overflow-hidden">
                <Link href={`/properties/${p3.id}`} className="group absolute inset-0">
                  <Image
                    src={p3.photo || "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2560&q=100"}
                    alt={p3.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 px-4 py-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-white text-sm leading-tight">{p3.title}</h3>
                      <span className="text-white font-bold text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full shrink-0 ml-2">
                        {formatPrice(p3.priceAmount, p3.currency, p3.status)}
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-snug line-clamp-2">{p3.description}</p>
                  </div>
                </Link>
              </Anim>
            )}
          </div>

          {/* Bottom: Card 4 — wide */}
          {p4 && (
            <Anim variant="up" delay={450} className="relative flex-1 rounded-2xl overflow-hidden">
              <Link href={`/properties/${p4.id}`} className="group absolute inset-0">
                <Image
                  src={p4.photo || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2560&q=100"}
                  alt={p4.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 px-5 py-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{p4.title}</h3>
                    <p className="text-white/70 text-xs mt-0.5">{p4.location}</p>
                  </div>
                  <span className="text-white font-bold text-sm bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full shrink-0 ml-2">
                    {formatPrice(p4.priceAmount, p4.currency, p4.status)}
                  </span>
                </div>
              </Link>
            </Anim>
          )}

        </div>
      </div>

      {/* See All button */}
      <Anim delay={300} className="flex justify-center mt-8">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-white font-semibold text-sm px-7 py-3 rounded-full transition-colors"
        >
          {t("explore_all")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </Anim>

    </section>
  );
}


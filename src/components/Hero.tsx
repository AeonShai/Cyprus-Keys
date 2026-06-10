"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_SLIDES = [
  { title: "Luxury Villa in Girne", photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=95" },
  { title: "Modern Apartment in Lefkoşa", photo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=95" },
  { title: "Sea View Penthouse in İskele", photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=95" },
  { title: "Private Villa in Gazimağusa", photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=95" },
];

interface HeroProperty {
  id: number;
  title: string;
  photo: string;
  beds: number;
  baths: number;
  area: number;
}

interface HeroProps {
  properties?: HeroProperty[];
}

export default function Hero({ properties = [] }: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const slides = properties.length > 0
    ? properties.map((p) => ({ title: p.title, photo: p.photo }))
    : FALLBACK_SLIDES;

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background images */}
      {slides.map((slide, i) => (
        <Image
          key={i}
          src={slide.photo}
          alt={slide.title}
          fill
          sizes="100vw"
          unoptimized
          className={`object-cover transition-opacity duration-1000 ${i === activeIdx ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
          quality={100}
        />
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1600px] mx-auto px-8 md:px-12 flex flex-col justify-end pb-14 md:pb-20">

        {/* Headline */}
        <div className="max-w-3xl mb-10">
          <h1 className="font-black text-white leading-tight tracking-tight text-[clamp(36px,5vw,76px)] mb-5">
            {slides[activeIdx].title}
          </h1>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-lg">
            Explore the finest villas, apartments and commercial properties in North Cyprus.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between gap-4 flex-wrap">

          {/* CTA button */}
          <Link
            href="/properties"
            className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/25 transition-colors"
          >
            Explore property
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Slide indicator dots */}
          <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx ? "bg-white w-6 h-2" : "bg-white/40 w-2 h-2"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";

const PHOTOS = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1275&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1275&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1275&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1275&q=80",
];

export default function Hero() {
  const [photoIdx, setPhotoIdx] = useState(0);

  function prevPhoto() {
    setPhotoIdx((i) => (i === 0 ? PHOTOS.length - 1 : i - 1));
  }
  function nextPhoto() {
    setPhotoIdx((i) => (i === PHOTOS.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative w-full aspect-[1275/626] rounded-[11px] overflow-hidden">
      {PHOTOS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Property photo ${i + 1}`}
          fill
          className={`object-cover transition-opacity duration-700 ${i === photoIdx ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-white/55 via-white/20 to-transparent"
        style={{
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
          maskImage: "linear-gradient(to right, black 30%, transparent 65%)",
          WebkitMaskImage: "linear-gradient(to right, black 30%, transparent 65%)",
        }}
      />

      {/* Title */}
      <div className="absolute left-[7.8%] top-[12.7%]">
        <h1 className="font-black text-[var(--clr-text)] leading-none tracking-tight text-[clamp(24px,4.6vw,68px)]">
          Modern<br />house
        </h1>
        <p className="mt-2 text-[var(--clr-text)]/70 text-[clamp(9px,1vw,14px)]">
          3 bedrooms, 1 kitchen, 2 bathrooms
        </p>
      </div>

      {/* Navigation arrows */}
      <div className="absolute left-[7.8%] bottom-[22%]">
        <div className="flex gap-2">
          <button
            onClick={prevPhoto}
            className="w-9 h-9 rounded-full border border-black/50 text-[var(--clr-text)] flex items-center justify-center hover:border-black transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextPhoto}
            className="w-9 h-9 rounded-full border border-black/50 text-[var(--clr-text)] flex items-center justify-center hover:border-black transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute right-[3.1%] top-[6%] flex flex-col gap-2">
        {PHOTOS.slice(0, 3).map((src, i) => (
          <button
            key={src}
            onClick={() => setPhotoIdx(i)}
            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
              i === photoIdx ? "border-white" : "border-white/30"
            }`}
          >
            <Image src={src} alt={`Thumbnail ${i + 1}`} width={48} height={48} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
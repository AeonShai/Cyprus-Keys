"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import { useGSAP } from "@/hooks/useGSAP";

import { IMAGES } from "@/constants/images";

const NAVIGATION = [
  { key: "nav_buy" as const, href: "/properties?status=sale" },
  { key: "nav_rent" as const, href: "/properties?status=rent" },
  { key: "nav_projects" as const, href: "/projects" },
  { key: "nav_purchase_guide" as const, href: "/purchase-guide" },
  { key: "nav_contacts" as const, href: "/contacts" },
];

const SOCIALS = [
  { label: "WhatsApp", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
];

const EMAIL = "info@cypruskeys.com";
const PHONE = "+90 500 000 00 00";
const GOLD = "#C9A24E";

const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const Plus = () => (
  <span className="text-white/25 text-xl leading-none font-light select-none">+</span>
);

/* Full-bleed divider with the reference "+" corner marks sitting on the line */
const Divider = ({ marks = false }: { marks?: boolean }) => (
  <div className="relative w-full">
    <div className="border-t border-white/12" />
    {marks && (
      <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-1/2">
        <div className="w-full px-8 md:px-16 flex justify-between">
          <Plus />
          <Plus />
          <Plus />
        </div>
      </div>
    )}
  </div>
);

export default function Footer() {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Masked slide-up reveals (top row + big email)
      gsap.utils.toArray<HTMLElement>(".ck-reveal").forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%" },
        });
      });

      // Column links stagger up
      gsap.from(".ck-stagger", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".ck-footer-cols", start: "top 85%" },
      });

      // Big bottom wordmark — masked slide-up
      gsap.from(".ck-footer-logo", {
        yPercent: 100,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: { trigger: ".ck-footer-logo-mask", start: "top 96%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="font-satoshi w-full bg-[#0D0D0F] overflow-hidden">

      {/* ── Top row: Office (left) · Email (center) · Contacts (right) ── */}
      <div className="w-full px-8 md:px-16 py-9 md:py-11">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-10">

          {/* Office (left) */}
          <div className="md:flex-1">
            <p className="text-[13px] font-medium tracking-[0.22em] text-white/40 uppercase mb-2">/{t("footer_office")}</p>
            <p className="overflow-hidden">
              <span className="ck-reveal inline-block text-white/90 text-xl md:text-2xl font-semibold leading-snug">
                {t("footer_address")}
              </span>
            </p>
          </div>

          {/* Email (center) */}
          <div className="md:flex-1 md:text-center overflow-hidden">
            <a
              href={`mailto:${EMAIL}`}
              className="ck-reveal inline-block font-bold leading-[1.1] tracking-tight text-[clamp(22px,2.8vw,36px)] transition-opacity hover:opacity-80 break-all"
              style={{ color: GOLD }}
            >
              {EMAIL}
            </a>
          </div>

          {/* Contacts button (right) — gold, reference-style */}
          <div className="md:flex-1 md:flex md:justify-end">
            <a
              href="/contacts"
              className="inline-flex items-center gap-3 pl-7 pr-2.5 py-3 rounded-full text-base font-bold text-black transition-colors"
              style={{ backgroundColor: GOLD }}
            >
              {t("nav_contacts")}
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/15">
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Full-bleed divider with "+" marks */}
      <Divider marks />

      {/* ── Footer columns (same as reference) ── */}
      <div className="w-full px-8 md:px-16">
        <div className="ck-footer-cols grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pt-16 pb-16 md:pb-20">

          {/* Email + Phone */}
          <div>
            <p className="text-[13px] font-medium tracking-[0.22em] text-white/40 uppercase mb-4">/{t("footer_email_label")}</p>
            <a href={`mailto:${EMAIL}`} className="ck-stagger block text-white/85 text-lg font-medium hover:text-white transition-colors break-all mb-8">
              {EMAIL}
            </a>
            <p className="text-[13px] font-medium tracking-[0.22em] text-white/40 uppercase mb-4">/{t("footer_phone_label")}</p>
            <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="ck-stagger block text-white/85 text-lg font-medium hover:text-white transition-colors">
              {PHONE}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[13px] font-medium tracking-[0.22em] text-white/40 uppercase mb-4">/{t("footer_nav")}</p>
            <ul className="space-y-3.5">
              {NAVIGATION.map((link) => (
                <li key={link.key} className="ck-stagger">
                  <a href={link.href} className="text-white/80 text-lg font-medium hover:text-white transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal */}
          <div>
            <p className="text-[13px] font-medium tracking-[0.22em] text-white/40 uppercase mb-4">/{t("footer_company")}</p>
            <ul className="space-y-3.5 mb-8">
              <li className="ck-stagger">
                <a href="/about" className="text-white/80 text-lg font-medium hover:text-white transition-colors">{t("footer_about")}</a>
              </li>
              <li className="ck-stagger">
                <a href="/contacts" className="text-white/80 text-lg font-medium hover:text-white transition-colors">{t("nav_contacts")}</a>
              </li>
            </ul>
            <p className="text-[13px] font-medium tracking-[0.22em] text-white/40 uppercase mb-4">/{t("footer_legal")}</p>
            <ul className="space-y-3.5">
              <li className="ck-stagger">
                <a href="#" className="text-white/80 text-lg font-medium hover:text-white transition-colors">{t("footer_terms")}</a>
              </li>
              <li className="ck-stagger">
                <a href="#" className="text-white/80 text-lg font-medium hover:text-white transition-colors">{t("footer_privacy")}</a>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <p className="text-[13px] font-medium tracking-[0.22em] text-white/40 uppercase mb-4">/{t("footer_social")}</p>
            <ul className="space-y-3.5">
              {SOCIALS.map((s) => (
                <li key={s.label} className="ck-stagger">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/80 text-lg font-medium hover:text-white transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Full-bleed divider */}
      <Divider />

      {/* ── Copyright bar ── */}
      <div className="w-full px-8 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-8">
          <p className="text-white/40 text-xs tracking-wide uppercase">{t("footer_rights")}</p>
          <p className="text-white/40 text-xs tracking-wide uppercase">{t("footer_based")}</p>
        </div>
      </div>

      {/* ── Footer bottom: full-bleed big wordmark ── */}
      <div className="ck-footer-logo-mask w-full overflow-hidden flex items-center justify-center px-4 pb-2">
        <div className="ck-footer-logo w-full">
          <Image
            src={IMAGES.logo}
            alt="Cyprus Keys"
            width={1000}
            height={295}
            className="w-full h-auto brightness-0 invert opacity-95"
            priority={false}
          />
        </div>
      </div>
    </footer>
  );
}



"use client";

import { useLang } from "@/hooks/useLang";
import Anim from "@/components/Anim";
import type { TranslationKey } from "@/lib/translations";

const SERVICE_KEYS: { titleKey: TranslationKey; descKey: TranslationKey; icon: React.ReactNode }[] = [
  {
    titleKey: "service_legal_title",
    descKey: "service_legal_desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    titleKey: "service_permit_title",
    descKey: "service_permit_desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="9" cy="12" r="2.5" />
        <path d="M13 10h4M13 14h4" />
      </svg>
    ),
  },
  {
    titleKey: "service_roi_title",
    descKey: "service_roi_desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    titleKey: "service_visa_title",
    descKey: "service_visa_desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    titleKey: "service_tax_title",
    descKey: "service_tax_desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <polyline points="9 9 9 15 15 15" />
      </svg>
    ),
  },
  {
    titleKey: "service_mortgage_title",
    descKey: "service_mortgage_desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    titleKey: "service_remote_title",
    descKey: "service_remote_desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const { t } = useLang();
  return (
    <section className="w-full py-16">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">

        {/* Header */}
        <Anim className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--clr-text)] flex-shrink-0" />
              <p className="text-xs font-semibold tracking-widest text-[var(--clr-text-secondary)]">{t("services_badge")}</p>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[var(--clr-text)] leading-tight max-w-sm">
              {t("services_title")}
            </h2>
          </div>
          <a
            href="/contacts"
            className="flex items-center gap-2 bg-[var(--clr-text)] hover:bg-[var(--clr-primary)] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors whitespace-nowrap mt-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.4 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t("services_cta")}
          </a>
        </Anim>

        {/* Services grid — icon → title → description sequential reveal */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
          {SERVICE_KEYS.map((s, i) => (
            <div key={s.titleKey}>
              <Anim delay={i * 40} className="text-[var(--clr-text)] mb-3">
                {s.icon}
              </Anim>
              <Anim delay={350 + i * 40}>
                <h3 className="font-bold text-[var(--clr-text)] text-base mb-3 leading-snug">{t(s.titleKey)}</h3>
              </Anim>
              <Anim delay={650 + i * 40}>
                <p className="text-[var(--clr-text-secondary)] text-sm leading-relaxed">{t(s.descKey)}</p>
              </Anim>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Anim from "@/components/Anim";
import { useLang } from "@/hooks/useLang";
import { getPurchaseGuideData } from "@/lib/purchase-guide-data";

export default function PurchaseGuidePage() {
  const { t, lang } = useLang();
  const { steps, taxSections, annualTaxes } = getPurchaseGuideData(lang);

  return (
    <main className="min-h-screen">

      {/* Hero Banner */}
      <div className="bg-[#0B1F3A] pt-28 pb-16 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">{t("pg_title")}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            {t("pg_title")}
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
            {t("pg_subtitle")}
          </p>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-4 flex items-start gap-3">
          <svg className="shrink-0 mt-0.5 text-amber-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-amber-800 text-sm leading-relaxed">
            {t("pg_notice")}
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16">

        {/* Step-by-step procedure */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest text-[var(--clr-accent)] uppercase">{t("pg_step_label")}</span>
            <h2 className="text-2xl md:text-3xl font-black text-[var(--clr-text)] mt-2">{t("pg_procedure_title")}</h2>
          </div>

          {/* Timeline: alternating left-right on desktop */}
          <div className="relative">
            {/* Center vertical line (desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--clr-border)] -translate-x-1/2" />

            <div className="space-y-6 lg:space-y-8">
              {steps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={step.number}
                    className={`flex items-start lg:gap-0 gap-4 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* Card */}
                    <Anim
                      variant={isLeft ? "left" : "right"}
                      delay={i * 80}
                      className="w-full lg:w-[45%]"
                    >
                      <div className="border border-[var(--clr-border)] rounded-2xl p-6 md:p-8 bg-[var(--clr-bg)]">
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-2.5 h-2.5 rounded-full bg-[var(--clr-text)] mt-2" />
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-[var(--clr-text)] mb-3">{step.title}</h3>
                            <ul className="space-y-2">
                              {step.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-[var(--clr-text-secondary)] text-sm leading-relaxed">
                                  <div className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-[var(--clr-text-secondary)]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Anim>

                    {/* Center dot (desktop only) */}
                    <div className="hidden lg:flex w-[10%] justify-center pt-8 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[var(--clr-text)] relative z-10 ring-4 ring-white" />
                    </div>

                    {/* Empty opposite side */}
                    <div className="hidden lg:block lg:w-[45%]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tax Tables */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest text-[var(--clr-accent)] uppercase">{t("pg_costs_label")}</span>
            <h2 className="text-2xl md:text-3xl font-black text-[var(--clr-text)] mt-2">{t("pg_costs_title")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {taxSections.map((section, i) => (
              <Anim key={section.title} delay={i * 100}>
              <div className="border border-[var(--clr-border)] rounded-2xl overflow-hidden bg-white">
                <div className="px-6 py-4 border-b border-[var(--clr-border)] flex items-center justify-between gap-3">
                  <h3 className="font-bold text-[var(--clr-text)] text-base">{section.title}</h3>
                  <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${section.badgeColor}`}>{section.badge}</span>
                </div>
                {section.note && (
                  <div className="px-6 py-3 bg-orange-50 text-orange-700 text-xs leading-relaxed border-b border-orange-100">
                    {section.note}
                  </div>
                )}
                <div className="divide-y divide-[var(--clr-border)]">
                  {section.rows.map((row) => (
                    <div key={row.label} className="px-6 py-3.5 flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide">{row.label}</span>
                      <span className="text-sm text-[var(--clr-text)] font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              </Anim>
            ))}
          </div>
          <Anim delay={300}>
          <div className="border border-[var(--clr-border)] rounded-2xl overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-[var(--clr-border)]">
              <h3 className="font-bold text-[var(--clr-text)] text-base">{t("pg_annual_title")}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--clr-border)]">
              {annualTaxes.map((tax) => (
                <div key={tax.label} className="px-6 py-5 flex items-start gap-4">
                  <svg className="shrink-0 mt-0.5 text-[var(--clr-accent)]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                  <div>
                    <p className="font-semibold text-[var(--clr-text)] text-sm">{tax.label}</p>
                    <p className="text-[var(--clr-primary)] font-bold text-sm mt-0.5">{tax.value}</p>
                    <p className="text-[var(--clr-text-secondary)] text-xs mt-0.5">{tax.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </Anim>
        </div>

        {/* CTA */}
        <Anim variant="scale">
        <div className="bg-[#0B1F3A] rounded-3xl px-8 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-2">{t("pg_cta_title")}</h3>
            <p className="text-white/60 text-sm">{t("pg_cta_desc")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
            >
              {t("pg_cta_browse")}
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-[#0B1F3A] font-semibold text-sm px-6 py-3 rounded-full transition-colors"
            >
              {t("pg_cta_contact")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        </Anim>

      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Anim from "@/components/Anim";
import { useLang } from "@/hooks/useLang";
import type { TranslationKey } from "@/lib/translations";

const ITEMS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "faq_q1", a: "faq_a1" },
  { q: "faq_q2", a: "faq_a2" },
  { q: "faq_q3", a: "faq_a3" },
  { q: "faq_q4", a: "faq_a4" },
  { q: "faq_q5", a: "faq_a5" },
  { q: "faq_q6", a: "faq_a6" },
];

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full py-20 px-8 md:px-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

        {/* Heading */}
        <Anim variant="up" className="md:col-span-5">
          <p className="text-xs font-semibold tracking-[0.25em] text-[var(--clr-accent)] uppercase mb-4">
            {t("faq_badge")}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--clr-text)] leading-tight">
            {t("faq_title")}
          </h2>
        </Anim>

        {/* Accordion */}
        <div className="md:col-span-7">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Anim key={item.q} variant="up" delay={i * 60}>
                <div className="border-b border-[var(--clr-border)]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg md:text-xl font-semibold text-[var(--clr-text)] group-hover:text-[var(--clr-accent)] transition-colors">
                      {t(item.q)}
                    </span>
                    <span
                      className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[var(--clr-border)] text-[var(--clr-text)] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-12 text-[var(--clr-text-secondary)] leading-relaxed">
                        {t(item.a)}
                      </p>
                    </div>
                  </div>
                </div>
              </Anim>
            );
          })}
        </div>
      </div>
    </section>
  );
}

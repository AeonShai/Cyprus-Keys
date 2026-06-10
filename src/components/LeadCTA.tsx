"use client";

import Link from "next/link";
import Anim from "@/components/Anim";
import { useLang } from "@/hooks/useLang";

export default function LeadCTA() {
  const { t } = useLang();
  return (
    <section className="w-full py-20 px-8 md:px-12">
      <Anim variant="scale" className="max-w-[1600px] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[var(--clr-text)] leading-tight mb-8">
          {t("lead_question_title")}
        </h2>
        <Link
          href="/contacts"
          className="inline-flex items-center gap-2 bg-[var(--clr-text)] hover:opacity-80 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-opacity"
        >
          {t("lead_question_cta")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </Anim>
    </section>
  );
}

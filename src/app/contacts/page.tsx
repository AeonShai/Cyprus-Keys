"use client";

import { useState } from "react";
import { useLang } from "@/hooks/useLang";

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    labelKey: "contact_office_label" as const,
    value: "Girne (Kyrenia)",
    subKey: null,
    subStatic: "North Cyprus",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-.78a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    labelKey: "contact_phone_label" as const,
    value: "+90 500 000 00 00",
    subKey: "contact_phone_hours" as const,
    subStatic: null,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    labelKey: "contact_email_label" as const,
    value: "info@cypruskeys.com",
    subKey: "contact_email_sub" as const,
    subStatic: null,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    labelKey: "contact_telegram_label" as const,
    value: "@cypruskeys",
    subKey: "contact_telegram_sub" as const,
    subStatic: null,
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[var(--clr-bg)]">

      {/* ── Hero ── */}
      <section className="relative bg-[var(--clr-primary)] overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--clr-accent) 1px, transparent 1px), linear-gradient(90deg, var(--clr-accent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-[1275px] mx-auto px-6 py-20 text-center">
          <p className="inline-block text-[10px] font-semibold tracking-[0.25em] text-[var(--clr-accent)] uppercase border border-[var(--clr-accent)]/40 px-4 py-1.5 rounded-full mb-6">
            {t("contact_hero_badge")}
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-5">
            {t("contact_hero_title1")}<br />
            <span className="text-[#D4AF37]">{t("contact_hero_title2")}</span>
          </h1>
          <p className="text-white/55 text-base max-w-md mx-auto leading-relaxed">
            {t("contact_hero_desc")}
          </p>
        </div>
      </section>

      {/* ── Contact cards ── */}
      <section className="max-w-[1275px] mx-auto px-6 -mt-8 relative z-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONTACT_ITEMS.map((item) => (
            <div
              key={item.labelKey}
              className="bg-[var(--clr-bg)] border border-[var(--clr-border)] rounded-2xl p-5 shadow-sm flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--clr-surface)] flex items-center justify-center text-[var(--clr-primary)]">
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-[var(--clr-accent)] uppercase mb-1">
                  {t(item.labelKey)}
                </p>
                <p className="font-bold text-[var(--clr-text)] text-sm leading-snug">{item.value}</p>
                <p className="text-[var(--clr-text-secondary)] text-xs mt-0.5">
                  {item.subKey ? t(item.subKey) : item.subStatic}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Form ── */}
      <section className="max-w-[1275px] mx-auto px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--clr-primary)] flex items-center justify-center mb-5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-black text-[var(--clr-text)] text-2xl mb-3">{t("contact_success_title")}</h3>
              <p className="text-[var(--clr-text-secondary)] text-sm max-w-sm leading-relaxed">
                {t("contact_success_desc")}
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-[var(--clr-text)] mb-2">{t("contact_form_title")}</h2>
                <p className="text-[var(--clr-text-secondary)] text-sm">{t("contact_form_desc")}</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--clr-text-secondary)] mb-1.5">{t("contact_form_name")} *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 text-sm text-[var(--clr-text)] placeholder-[#9CA3AF] focus:outline-none focus:border-[var(--clr-primary)] focus:bg-[var(--clr-bg)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--clr-text-secondary)] mb-1.5">{t("contact_form_email")} *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 text-sm text-[var(--clr-text)] placeholder-[#9CA3AF] focus:outline-none focus:border-[var(--clr-primary)] focus:bg-[var(--clr-bg)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--clr-text-secondary)] mb-1.5">{t("contact_form_phone")}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+44 7000 000000"
                      className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 text-sm text-[var(--clr-text)] placeholder-[#9CA3AF] focus:outline-none focus:border-[var(--clr-primary)] focus:bg-[var(--clr-bg)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--clr-text-secondary)] mb-1.5">{t("contact_form_subject")}</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 text-sm text-[var(--clr-text)] focus:outline-none focus:border-[var(--clr-primary)] transition-colors"
                    >
                      <option value="">{t("contact_subject_select")}</option>
                      <option value="buying">{t("contact_subject_buying")}</option>
                      <option value="renting">{t("contact_subject_renting")}</option>
                      <option value="investment">{t("contact_subject_investment")}</option>
                      <option value="legal">{t("contact_subject_legal")}</option>
                      <option value="other">{t("contact_subject_other")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--clr-text-secondary)] mb-1.5">{t("contact_form_message")} *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contact_msg_placeholder")}
                    className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 text-sm text-[var(--clr-text)] placeholder-[#9CA3AF] focus:outline-none focus:border-[var(--clr-primary)] focus:bg-[var(--clr-bg)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] text-white font-semibold text-sm py-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? t("contact_sending") : t("contact_submit")}
                </button>
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
              </form>
            </>
          )}
        </div>
      </section>

    </main>
  );
}
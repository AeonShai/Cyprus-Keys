"use client";

import { useState } from "react";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
];

export default function BookPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Re-use the contact API — sends the booking as a message
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `📅 Call booking request\nDate: ${form.date}\nTime: ${form.time}\n\n${form.message}`,
      }),
    });
    setLoading(false);
    setSubmitted(true);
  }

  const inputClass =
    "w-full border border-[var(--clr-border)] bg-[var(--clr-surface)] rounded-xl px-4 py-3 text-sm text-[var(--clr-text)] placeholder-[var(--clr-text-secondary)] focus:outline-none focus:border-[var(--clr-primary)] transition-colors";

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-[var(--clr-text)] mb-3">Booking received!</h2>
          <p className="text-[var(--clr-text-secondary)] text-sm leading-relaxed">
            We&apos;ll confirm your call at <strong>{form.time}</strong> on <strong>{form.date}</strong>.<br />
            We&apos;ll reach out to <strong>{form.email}</strong> shortly.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-[1275px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 gap-16 items-start">

          {/* Left: Info */}
          <div className="pt-4">
            <p className="text-xs font-semibold tracking-widest text-[var(--clr-primary)] uppercase mb-4">
              Free Consultation
            </p>
            <h1 className="text-[clamp(32px,4vw,56px)] font-black text-[var(--clr-text)] leading-[1.05] tracking-tight mb-6">
              Book a call<br />with our team
            </h1>
            <p className="text-[var(--clr-text-secondary)] text-base leading-relaxed mb-10 max-w-sm">
              Whether you&apos;re looking to buy, rent, or invest in North Cyprus property — our team is ready to help. Schedule a free 30-minute call at your convenience.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { icon: "📞", title: "Phone & WhatsApp", desc: "+90 500 000 00 00" },
                { icon: "📧", title: "Email", desc: "info@cypruskeys.com" },
                { icon: "📍", title: "Office", desc: "Girne, North Cyprus" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide">{item.title}</p>
                    <p className="text-sm font-bold text-[var(--clr-text)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[var(--clr-surface)] rounded-2xl p-8 border border-[var(--clr-border)]">
            <h2 className="text-xl font-black text-[var(--clr-text)] mb-6">Schedule your call</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide mb-1.5 block">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="John Smith"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide mb-1.5 block">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+90 ..."
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide mb-1.5 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide mb-1.5 block">Preferred Date</label>
                  <input
                    required
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide mb-1.5 block">Preferred Time</label>
                  <select
                    required
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select time…</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide mb-1.5 block">Message (optional)</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us what you're looking for…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-full transition-colors mt-2"
              >
                {loading ? "Sending…" : "Book a call"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

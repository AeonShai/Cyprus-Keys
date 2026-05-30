"use client";

import { useState } from "react";

export default function LeadCTA() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to backend / CRM
    setSubmitted(true);
  }

  return (
    <section className="w-full bg-[var(--clr-primary)] py-20">
      <div className="max-w-[1275px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-[var(--clr-accent)] uppercase mb-3">Free Consultation</p>
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
              Find your ideal<br />property in Cyprus
            </h2>
            <p className="text-white/60 mt-4 text-sm leading-relaxed max-w-md">
              Leave your details and one of our advisors will contact you within 24 hours. No commitment, no pressure — just expert advice tailored to your goals.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                "Personal property shortlist",
                "Legal & residency guidance",
                "Transparent pricing — no hidden fees",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1A77E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="bg-white/8 border border-white/12 rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1A77E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3 className="text-white font-bold text-xl">Thank you!</h3>
                <p className="text-white/60 text-sm mt-2">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--clr-accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--clr-accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+44 7700 000000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--clr-accent)] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--clr-accent)] hover:bg-[#c4976d] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm mt-2"
                >
                  Request Free Consultation
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

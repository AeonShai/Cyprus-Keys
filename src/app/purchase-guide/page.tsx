import Link from "next/link";
import Anim from "@/components/Anim";

export const metadata = {
  title: "Purchase Guide – Cyprus Keys",
  description: "Step-by-step guide to buying property in North Cyprus. Taxes, legal procedures, title deed, and payment process explained.",
};

const STEPS = [
  {
    number: "01",
    title: "Arrival & Initial Meeting",
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-600",
    items: [
      "Our team welcomes you at the airport upon arrival in North Cyprus.",
      "Project areas are toured and sample apartments/villas are shown.",
      "Reservation is made for the selected property (typically £2,000 – £5,000).",
    ],
  },
  {
    number: "02",
    title: "Legal Procedure",
    color: "bg-indigo-50 border-indigo-100",
    accent: "text-indigo-600",
    items: [
      "Lawyer Selection — Foreign buyers must engage an independent lawyer. The lawyer verifies the title deed, company documents, and project status with state institutions.",
      "Sales Contract — Prepared by the lawyer and signed by both parties.",
      "Land Registry Registration — The contract is entered into state records, making the buyer's right official.",
      "Council of Ministers Permit — Required for all foreign buyers. Application is filed by the lawyer; the process takes 6–12 months. The buyer may use the property during this period.",
    ],
  },
  {
    number: "03",
    title: "Construction & Payment Process",
    color: "bg-violet-50 border-violet-100",
    accent: "text-violet-600",
    items: [
      "First payment (30%) is made at the time of signing the sales contract.",
      "Remaining payments are made as construction progresses or according to an agreed installment plan.",
      "The client is regularly informed at each stage of the construction process.",
    ],
  },
  {
    number: "04",
    title: "Habitation Permit & Title Deed",
    color: "bg-emerald-50 border-emerald-100",
    accent: "text-emerald-600",
    items: [
      "Habitation Permit — Issued by the municipality once the project is completed, certifying the property is legally livable.",
      "Title Deed Transfer — After the Council of Ministers permit is granted, the title deed is officially transferred to the buyer at the Land Registry Office.",
    ],
  },
  {
    number: "05",
    title: "Usage & Subscriptions",
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-600",
    items: [
      "After the title deed and habitation permit are finalised, electricity, water, and internet subscriptions are opened in the buyer's name.",
      "The property is now fully owned by the buyer — to live in, rent out, or keep as an investment.",
    ],
  },
];

const TAX_SECTIONS = [
  {
    title: "New Project Purchase",
    badge: "New Build",
    badgeColor: "bg-blue-100 text-blue-700",
    rows: [
      { label: "VAT", value: "5% of sale price" },
      { label: "Title Deed Transfer Fee", value: "6% (3% for first-time buyers)" },
      { label: "Stamp Duty", value: "0.5% of contract price" },
      { label: "Infrastructure Contribution", value: "Transformer + connections (electricity, water, telephone). Avg. £1,500 – £3,000" },
    ],
  },
  {
    title: "Resale – Title Deed Transferred",
    badge: "Resale",
    badgeColor: "bg-amber-100 text-amber-700",
    rows: [
      { label: "VAT", value: "Not applicable (property already registered to individual)" },
      { label: "Title Deed Transfer Fee", value: "3–6% of sale price" },
      { label: "Withholding Tax", value: "Paid by seller, sometimes shared with buyer" },
      { label: "Stamp Duty", value: "0.5% of contract price" },
    ],
  },
  {
    title: "Resale – Title Deed Not Transferred",
    badge: "Special Case",
    badgeColor: "bg-orange-100 text-orange-700",
    note: "If the first buyer did not obtain the title deed, the property remains registered to the developer. In this case, the second buyer follows the same process as a new project purchase.",
    rows: [
      { label: "VAT", value: "5% of sale price" },
      { label: "Title Deed Transfer Fee", value: "3–6% of sale price" },
      { label: "Stamp Duty", value: "0.5% of contract price" },
    ],
  },
];

const ANNUAL_TAXES = [
  { label: "Property Tax", value: "£0.1–0.2 per m² / year", example: "e.g. 100 m² apartment ≈ £10–20 / year" },
  { label: "Garbage & Cleaning Tax", value: "£50–100 / year", example: "Paid to the municipality" },
];

export default function PurchaseGuidePage() {
  return (
    <main className="min-h-screen">

      {/* Hero Banner */}
      <div className="bg-[#0B1F3A] pt-28 pb-16 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Purchase Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Purchase Guide
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
            Everything you need to know about buying property in North Cyprus — from your first visit to receiving the keys.
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
            <strong>Important:</strong> In many new projects in North Cyprus, additional connection fees (electricity, water, telephone) are not provided by the government. These infrastructure costs are collected pro rata from buyers by the construction company during project delivery.
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16">

        {/* Step-by-step procedure */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest text-[var(--clr-accent)] uppercase">Step by Step</span>
            <h2 className="text-2xl md:text-3xl font-black text-[var(--clr-text)] mt-2">Property Purchase Procedure</h2>
          </div>

          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <Anim key={step.number} delay={i * 80}>
              <div className={`border rounded-2xl p-6 md:p-8 ${step.color}`}>
                <div className="flex items-start gap-5">
                  <div className={`shrink-0 text-2xl font-black ${step.accent} opacity-40 leading-none pt-0.5`}>{step.number}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg text-[var(--clr-text)] mb-3`}>{step.title}</h3>
                    <ul className="space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[var(--clr-text-secondary)] text-sm leading-relaxed">
                          <svg className={`shrink-0 mt-0.5 ${step.accent}`} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </Anim>
            ))}
          </div>
        </div>

        {/* Tax Tables */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest text-[var(--clr-accent)] uppercase">Costs Overview</span>
            <h2 className="text-2xl md:text-3xl font-black text-[var(--clr-text)] mt-2">Taxes & Additional Costs</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {TAX_SECTIONS.map((section, i) => (
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
          <div className="border border-[var(--clr-border)] rounded-2xl overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-[var(--clr-border)]">
              <h3 className="font-bold text-[var(--clr-text)] text-base">Annual Taxes</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--clr-border)]">
              {ANNUAL_TAXES.map((tax) => (
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
        </div>

        {/* CTA */}
        <Anim variant="scale">
        <div className="bg-[#0B1F3A] rounded-3xl px-8 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-2">Ready to start your property journey?</h3>
            <p className="text-white/60 text-sm">Our team is on hand to guide you through every step of the purchase process.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-[#0B1F3A] font-semibold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Contact Us
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

import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "500+", label: "Properties Sold" },
  { value: "12+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3", label: "Offices in Cyprus" },
];

const TEAM = [
  {
    name: "Elena Petrou",
    role: "Senior Sales Consultant",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    bio: "Elena specialises in luxury villas and off-plan developments, with deep expertise in the Girne and Lapta corridors.",
  },
  {
    name: "James Whitfield",
    role: "Investment Advisor",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    bio: "James advises UK and European investors on yield optimisation and portfolio strategy for North Cyprus residential assets.",
  },
];

const VALUES = [
  {
    title: "Transparency",
    description: "We provide clear, honest information at every stage of your purchase — no hidden fees, no surprises.",
  },
  {
    title: "Local Expertise",
    description: "Born and built in North Cyprus, our knowledge of local markets, regulations and culture is unmatched.",
  },
  {
    title: "Client-First",
    description: "Your investment goals drive every recommendation we make. We succeed when you succeed.",
  },
  {
    title: "End-to-End Service",
    description: "From property search to title deed transfer, we handle every step so you don't have to.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--clr-primary)] text-white">
        <div className="max-w-[1275px] mx-auto px-6 py-20">
          <p className="text-xs font-semibold tracking-widest text-[var(--clr-accent)] uppercase mb-4">About Us</p>
          <h1 className="text-4xl font-black leading-tight max-w-2xl mb-6">
            North Cyprus&apos;s Most Trusted Real Estate Partner
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xl mb-8">
            Cyprus Keys was founded with a single mission: to make property investment in North Cyprus straightforward, secure and rewarding for buyers from anywhere in the world.
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 bg-[var(--clr-accent)] hover:bg-[#c49668] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--clr-surface)] border-b border-[var(--clr-border)]">
        <div className="max-w-[1275px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-black text-[var(--clr-primary)] mb-1">{s.value}</p>
                <p className="text-[var(--clr-text-secondary)] text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--clr-bg)]">
        <div className="max-w-[1275px] mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-widest text-[var(--clr-text-secondary)] uppercase mb-3">Our Story</p>
              <h2 className="text-3xl font-black text-[var(--clr-text)] leading-tight mb-5">
                Built on Trust, Driven by Results
              </h2>
              <p className="text-[var(--clr-text-secondary)] leading-relaxed mb-4">
                Cyprus Keys began as a boutique agency helping Turkish and British expatriates navigate the North Cyprus property market. Over a decade later, we serve clients from over 30 countries.
              </p>
              <p className="text-[var(--clr-text-secondary)] leading-relaxed">
                Our team of licensed real estate professionals, lawyers, and investment analysts work together to ensure every transaction is secure, transparent and aligned with your goals — whether you are buying a holiday home, relocating, or building an investment portfolio.
              </p>
            </div>
            <div className="w-full lg:w-[480px] flex-shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=960&q=80"
                  alt="Cyprus Keys office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--clr-surface)]">
        <div className="max-w-[1275px] mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-[var(--clr-text-secondary)] uppercase mb-3">What We Stand For</p>
            <h2 className="text-3xl font-black text-[var(--clr-text)]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-[var(--clr-bg)] rounded-2xl p-6 border border-[var(--clr-border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--clr-primary)] mb-4" />
                <h3 className="font-bold text-[var(--clr-text)] text-base mb-2">{v.title}</h3>
                <p className="text-[var(--clr-text-secondary)] text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[var(--clr-bg)]">
        <div className="max-w-[1275px] mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-[var(--clr-text-secondary)] uppercase mb-3">The People Behind Cyprus Keys</p>
            <h2 className="text-3xl font-black text-[var(--clr-text)]">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-[var(--clr-border)]">
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                </div>
                <p className="font-bold text-[var(--clr-text)] text-base">{member.name}</p>
                <p className="text-[var(--clr-accent)] text-xs font-semibold tracking-wide mb-2">{member.role}</p>
                <p className="text-[var(--clr-text-secondary)] text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--clr-primary)]">
        <div className="max-w-[1275px] mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to find your property?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm">
            Browse our portfolio of hand-picked North Cyprus properties or speak directly with our team.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/properties"
              className="bg-[var(--clr-accent)] hover:bg-[#c49668] text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
            >
              Browse Properties
            </Link>
            <Link
              href="/contacts"
              className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

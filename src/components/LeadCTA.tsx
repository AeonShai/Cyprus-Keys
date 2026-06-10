import Link from "next/link";

export default function LeadCTA() {
  return (
    <section className="w-full py-20 px-8 md:px-12">
      <div className="max-w-[1600px] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[var(--clr-text)] leading-tight mb-8">
          You&apos;ve got questions and we can&apos;t<br />wait to answer them.
        </h2>
        <Link
          href="/contacts"
          className="inline-flex items-center gap-2 bg-[var(--clr-text)] hover:opacity-80 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-opacity"
        >
          CONTACT US
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

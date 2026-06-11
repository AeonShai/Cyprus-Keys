import { notFound } from "next/navigation";
import Link from "next/link";
import db from "@/lib/db";
import { formatPrice } from "@/lib/format";
import PropertyGallery from "@/components/PropertyGallery";

export const dynamic = "force-dynamic";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = await db.property.findUnique({ where: { id: Number(id), isPublished: true } });

  if (!property) notFound();

  return (
    <main className="min-h-screen bg-[var(--clr-surface)]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--clr-text-secondary)] mb-6">
          <Link href="/" className="hover:text-[var(--clr-primary)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-[var(--clr-primary)] transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-[var(--clr-text)] font-medium line-clamp-1">{property.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Gallery + Description + Features */}
          <div className="flex-1 min-w-0">
            <PropertyGallery
              images={property.gallery.length > 0 ? property.gallery : [property.photo]}
              title={property.title}
            />

            <div className="mt-8">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl font-black text-[var(--clr-text)] leading-tight">{property.title}</h1>
                <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                  property.status === "sale" ? "bg-[var(--clr-primary)] text-white" : "bg-[var(--clr-accent)] text-white"
                }`}>
                  {property.status === "sale" ? "For Sale" : "For Rent"}
                </span>
              </div>
              <p className="text-[var(--clr-text-secondary)] text-sm flex items-center gap-1 mb-6">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {property.location}
              </p>

              <p className="text-[var(--clr-text-secondary)] text-sm leading-relaxed mb-8">{property.description}</p>

              {/* Features table */}
              <h2 className="font-bold text-[var(--clr-text)] text-lg mb-4">Property Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[var(--clr-border)] rounded-2xl overflow-hidden">
                {(property.features as { label: string; value: string }[]).map((f, i) => (
                  <div
                    key={f.label}
                    className={`flex justify-between items-center px-5 py-3 text-sm ${
                      i % 2 === 0 ? "bg-white" : "bg-[var(--clr-surface)]"
                    } border-b border-[var(--clr-border)] last:border-b-0`}
                  >
                    <span className="text-[var(--clr-text-secondary)]">{f.label}</span>
                    <span className="font-semibold text-[var(--clr-text)] text-right">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price card + Contact CTA */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-[var(--clr-bg)] rounded-2xl border border-[var(--clr-border)] shadow-sm p-6 sticky top-6">
              <p className="text-3xl font-black text-[var(--clr-primary)] mb-1">{formatPrice(property.priceAmount, property.currency)}</p>
              <p className="text-[var(--clr-text-secondary)] text-xs mb-6">
                {property.status === "sale" ? "Purchase price" : "Monthly rent"}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Beds", value: property.beds },
                  { label: "Baths", value: property.baths },
                  { label: "m²", value: property.area },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-[var(--clr-surface)] rounded-xl py-3">
                    <p className="font-black text-[var(--clr-text)] text-lg leading-none">{s.value}</p>
                    <p className="text-[var(--clr-text-secondary)] text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/contacts"
                className="block w-full text-center bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] text-white font-semibold text-sm py-3 rounded-full transition-colors mb-3"
              >
                Contact Agent
              </Link>
              <a
                href="https://wa.me/905000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-[var(--clr-border)] hover:bg-[var(--clr-surface)] text-[var(--clr-text)] font-semibold text-sm py-3 rounded-full transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

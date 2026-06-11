import { Suspense } from "react";
import Link from "next/link";
import FilterSidebar from "@/components/FilterSidebar";
import PropertiesGrid from "@/components/PropertiesGrid";
import db from "@/lib/db";
import type { PropertyModel } from "@/generated/prisma/models";

export const dynamic = "force-dynamic";

interface PropertiesPageProps {
  searchParams: Promise<{
    status?: string;
    city?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    q?: string;
    region?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const { status, city, type, minPrice, maxPrice, q } = params;
  const region = params.region === "dubai" ? "dubai" : "cyprus";

  const properties = await db.property.findMany({
    where: {
      isPublished: true,
      region,
      ...(status && status !== "all" ? { status: status as never } : {}),
      ...(city && city !== "All" ? { city: { contains: city, mode: "insensitive" } } : {}),
      ...(type && type !== "All" ? { type: type as never } : {}),
      ...(minPrice || maxPrice
        ? {
            priceAmount: {
              ...(minPrice ? { gte: Number(minPrice) } : {}),
              ...(maxPrice ? { lte: Number(maxPrice) } : {}),
            },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const filtered: PropertyModel[] = q
    ? properties.filter((p) => {
        const query = q.toLowerCase();
        return (
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
        );
      })
    : properties;

  // Build base params without region for tab links
  const baseParams = new URLSearchParams(
    Object.entries(params).filter(([k, v]) => k !== "region" && v !== undefined) as [string, string][]
  );
  const cyprusHref = baseParams.toString() ? `/properties?${baseParams}&region=cyprus` : "/properties?region=cyprus";
  const dubaiHref = baseParams.toString() ? `/properties?${baseParams}&region=dubai` : "/properties?region=dubai";

  return (
    <main className="min-h-screen bg-[var(--clr-surface)]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-10">

        {/* Region tab switcher */}
        <div className="flex gap-1 p-1 bg-[var(--clr-border)] rounded-xl w-fit mb-8">
          <Link
            href={cyprusHref}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              region === "cyprus" ? "bg-[var(--clr-bg)] shadow-sm text-[var(--clr-text)]" : "text-[var(--clr-text-secondary)] hover:text-[var(--clr-text)]"
            }`}
          >
            🇨🇾 North Cyprus
          </Link>
          <Link
            href={dubaiHref}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              region === "dubai" ? "bg-[var(--clr-bg)] shadow-sm text-[var(--clr-text)]" : "text-[var(--clr-text-secondary)] hover:text-[var(--clr-text)]"
            }`}
          >
            🇦🇪 Dubai
          </Link>
        </div>

        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--clr-text-secondary)] uppercase mb-2">
            {region === "dubai" ? "Dubai Real Estate" : "North Cyprus Real Estate"}
          </p>
          <h1 className="text-3xl font-black text-[var(--clr-text)] leading-tight">
            Browse Properties
          </h1>
          <p className="text-[var(--clr-text-secondary)] mt-1 text-sm">
            {filtered.length} propert{filtered.length === 1 ? "y" : "ies"} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <Suspense>
            <FilterSidebar />
          </Suspense>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-[var(--clr-text)] font-bold text-lg mb-2">No properties found</p>
                <p className="text-[var(--clr-text-secondary)] text-sm">Try adjusting your filters.</p>
              </div>
            ) : (
              <PropertiesGrid properties={filtered} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

import { Suspense } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import PropertyCard from "@/components/PropertyCard";
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
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const { status, city, type, minPrice, maxPrice, q } = params;

  const properties = await db.property.findMany({
    where: {
      isPublished: true,
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

  return (
    <main className="min-h-screen bg-[var(--clr-surface)]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-10">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--clr-text-secondary)] uppercase mb-2">
            North Cyprus Real Estate
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((property, i) => (
                  <PropertyCard key={property.id} property={property} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import type { PropertyModel } from "@/generated/prisma/models";

const PAGE_SIZE = 9;

export default function PropertiesGrid({ properties }: { properties: PropertyModel[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = properties.slice(0, visible);
  const remaining = properties.length - visible;
  const hasMore = visible < properties.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {shown.map((property, i) => (
          <PropertyCard key={property.id} property={property} index={i} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 border border-[var(--clr-border)] bg-[var(--clr-bg)] hover:bg-[var(--clr-surface)] text-[var(--clr-text)] font-semibold text-sm px-8 py-3 rounded-full transition-colors"
          >
            Load More
            <span className="text-[var(--clr-text-secondary)] font-normal">
              ({remaining} more)
            </span>
          </button>
        </div>
      )}

      {!hasMore && properties.length > PAGE_SIZE && (
        <p className="text-center text-[var(--clr-text-secondary)] text-xs mt-8">
          All {properties.length} properties shown
        </p>
      )}
    </>
  );
}

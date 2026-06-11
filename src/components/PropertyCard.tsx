import Image from "next/image";
import Link from "next/link";
import type { PropertyModel } from "@/generated/prisma/models";
import { formatPrice } from "@/lib/format";

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
      <path d="M2 20v-5a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v5" />
      <line x1="2" y1="14" x2="22" y2="14" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <line x1="10" y1="5" x2="8" y2="7" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

interface PropertyCardProps {
  property: PropertyModel;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-[var(--clr-bg)] rounded-2xl overflow-hidden shadow-sm border border-[var(--clr-border)] hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.photo}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
          property.status === "sale"
            ? "bg-[var(--clr-primary)] text-white"
            : "bg-[var(--clr-accent)] text-white"
        }`}>
          {property.status === "sale" ? "For Sale" : "For Rent"}
        </span>
      </div>
      <div className="p-4">
        <p className="font-bold text-[var(--clr-text)] text-base leading-snug mb-1 line-clamp-1">{property.title}</p>
        <p className="text-[var(--clr-text-secondary)] text-xs mb-3 flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {property.location}
        </p>
        <div className="flex items-center gap-4 text-[var(--clr-text-secondary)] text-xs mb-4">
          <span className="flex items-center gap-1"><BedIcon />{property.beds} Beds</span>
          <span className="flex items-center gap-1"><BathIcon />{property.baths} Baths</span>
          <span className="flex items-center gap-1"><AreaIcon />{property.area} m²</span>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--clr-border)] pt-3">
          <span className="font-bold text-[var(--clr-primary)] text-base">{formatPrice(property.priceAmount, property.currency)}</span>
          <span className="text-xs text-[var(--clr-text-secondary)] capitalize bg-[var(--clr-surface)] px-2 py-1 rounded-lg">{property.type}</span>
        </div>
      </div>
    </Link>
  );
}

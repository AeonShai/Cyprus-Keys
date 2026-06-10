import Image from "next/image";
import Link from "next/link";

const PROPERTIES = [
  {
    id: 1,
    title: "Girne Panoramic Villa",
    location: "Girne, North Cyprus",
    price: "£285K – £320K",
    description: "Stunning 4-bedroom villa with infinity pool and panoramic mountain views.",
    photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2560&q=100",
  },
  {
    id: 2,
    title: "İskele Seafront Residence",
    location: "İskele, North Cyprus",
    price: "£195K – £240K",
    description: "A stylish 3-bedroom home designed for comfort and space, featuring a smart layout.",
    photo: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=100",
  },
  {
    id: 3,
    title: "Esentepe Modern Villa",
    location: "Esentepe, North Cyprus",
    price: "£320K – £380K",
    description: "A stylish 3-bedroom home designed for comfort and space, featuring a smart layout.",
    photo: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2560&q=100",
  },
  {
    id: 4,
    title: "Tatlısu Luxury Estate",
    location: "Tatlısu, North Cyprus",
    price: "£450K – £520K",
    description: "Exclusive estate with private pool, sea views and premium finishes throughout.",
    photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2560&q=100",
  },
];

export default function ExploreSection() {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-8 md:px-12 py-16">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-[var(--clr-text)] mb-3">
          Featured Homes with Modern Design
        </h2>
        <p className="text-[var(--clr-text-secondary)] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Explore a curated collection of beautifully crafted homes that blend modern design,
          smart functionality and timeless appeal.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-3 gap-4" style={{ gridTemplateRows: "300px 280px" }}>

        {/* Card 1 — tall left, spans 2 rows */}
        <Link href="/properties" className="group relative rounded-2xl overflow-hidden row-span-2">
          <Image
            src={PROPERTIES[0].photo}
            alt={PROPERTIES[0].title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 px-5 py-4 flex items-end justify-between">
            <div>
              <h3 className="font-bold text-white text-base leading-tight">{PROPERTIES[0].title}</h3>
              <p className="text-white/70 text-xs mt-0.5">{PROPERTIES[0].location}</p>
            </div>
            <span className="text-white font-bold text-sm bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full shrink-0 ml-2">
              {PROPERTIES[0].price}
            </span>
          </div>
        </Link>

        {/* Card 2 — top middle */}
        <Link href="/properties" className="group relative rounded-2xl overflow-hidden">
          <Image
            src={PROPERTIES[1].photo}
            alt={PROPERTIES[1].title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 px-4 py-4">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-white text-sm leading-tight">{PROPERTIES[1].title}</h3>
              <span className="text-white font-bold text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full shrink-0 ml-2">
                {PROPERTIES[1].price}
              </span>
            </div>
            <p className="text-white/70 text-xs leading-snug line-clamp-2">{PROPERTIES[1].description}</p>
          </div>
        </Link>

        {/* Card 3 — top right */}
        <Link href="/properties" className="group relative rounded-2xl overflow-hidden">
          <Image
            src={PROPERTIES[2].photo}
            alt={PROPERTIES[2].title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 px-4 py-4">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-white text-sm leading-tight">{PROPERTIES[2].title}</h3>
              <span className="text-white font-bold text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full shrink-0 ml-2">
                {PROPERTIES[2].price}
              </span>
            </div>
            <p className="text-white/70 text-xs leading-snug line-clamp-2">{PROPERTIES[2].description}</p>
          </div>
        </Link>

        {/* Card 4 — bottom right, spans 2 columns */}
        <Link href="/properties" className="group relative rounded-2xl overflow-hidden col-span-2">
          <Image
            src={PROPERTIES[3].photo}
            alt={PROPERTIES[3].title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 px-5 py-4 flex items-end justify-between">
            <div>
              <h3 className="font-bold text-white text-base leading-tight">{PROPERTIES[3].title}</h3>
              <p className="text-white/70 text-xs mt-0.5">{PROPERTIES[3].location}</p>
            </div>
            <span className="text-white font-bold text-sm bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full shrink-0 ml-2">
              {PROPERTIES[3].price}
            </span>
          </div>
        </Link>

      </div>

      {/* See All button */}
      <div className="flex justify-center mt-8">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] text-white font-semibold text-sm px-7 py-3 rounded-full transition-colors"
        >
          See All Properties
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

    </section>
  );
}

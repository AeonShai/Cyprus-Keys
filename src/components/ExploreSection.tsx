import Image from "next/image";

const PROPERTIES = [
  {
    id: 1,
    title: "Modern Villa",
    location: "Girne, Cyprus",
    price: "£285,000",
    photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  },
  {
    id: 2,
    title: "Sea View Apartment",
    location: "Gazimağusa, Cyprus",
    price: "£120,000",
    photo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
  },
  {
    id: 3,
    title: "Luxury Penthouse",
    location: "Lefkoşa, Cyprus",
    price: "£450,000",
    photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  },
  {
    id: 4,
    title: "Garden Bungalow",
    location: "İskele, Cyprus",
    price: "£95,000",
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80",
  },
];

export default function ExploreSection() {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-8 md:px-12 py-12">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-black text-[var(--clr-text)] flex-1 text-center">Explore more houses</h2>
        <a
          href="/properties"
          className="flex items-center gap-2 text-sm font-semibold text-white bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] transition-colors px-5 py-2 rounded-full"
        >
          See All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PROPERTIES.map((p) => (
          <div key={p.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={p.photo}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Dark gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Info */}
              <div className="absolute bottom-0 inset-x-0 px-4 py-3">
                <h3 className="font-bold text-white text-sm leading-tight">{p.title}</h3>
                <p className="text-white/80 text-xs mt-0.5">{p.location}</p>
                <p className="font-bold text-white text-sm mt-1">{p.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

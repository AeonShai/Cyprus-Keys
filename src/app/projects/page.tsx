import Link from "next/link";
import Image from "next/image";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  ongoing: "Under Construction",
  completed: "Completed",
  upcoming: "Coming Soon",
};

const FALLBACK_PROJECTS = [
  {
    id: 0,
    title: "Azure Residences",
    location: "Girne, North Cyprus",
    totalUnits: 48,
    status: "upcoming",
    deliveryDate: "Q3 2026",
    coverPhoto: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  },
  {
    id: 0,
    title: "Kyrenia Hills",
    location: "Alsancak, Girne",
    totalUnits: 24,
    status: "ongoing",
    deliveryDate: "Q1 2027",
    coverPhoto: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80",
  },
  {
    id: 0,
    title: "Famagusta Bay",
    location: "Gazimağusa, Cyprus",
    totalUnits: 112,
    status: "upcoming",
    deliveryDate: "Q4 2027",
    coverPhoto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
  },
];

type ProjectItem = {
  id: number;
  title: string;
  location: string;
  totalUnits: number | null;
  status: string;
  deliveryDate: string | null;
  coverPhoto: string;
};

export default async function ProjectsPage() {
  const dbProjects = await db.project.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  const projects: ProjectItem[] = dbProjects.length > 0 ? dbProjects : FALLBACK_PROJECTS;
  const isFallback = dbProjects.length === 0;

  const [featured, ...rest] = projects;

  return (
    <main className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-[var(--clr-accent)] uppercase mb-2">
            New Developments
          </p>
          <h1 className="text-[clamp(28px,4vw,52px)] font-black text-[var(--clr-text)] leading-tight tracking-tight">
            Our Projects
          </h1>
          <p className="mt-3 text-[var(--clr-text-secondary)] text-base max-w-lg">
            Exclusive residential and commercial developments across North Cyprus.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-[var(--clr-text-secondary)] text-lg font-medium">No projects yet.</p>
            <p className="text-[var(--clr-text-secondary)] text-sm mt-2">Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Row 1: large left + two stacked right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Large featured card */}
              {featured && (
                <Link href={featured.id ? `/projects/${featured.id}` : "/contacts"} className="group relative rounded-2xl overflow-hidden aspect-[4/3] block">
                  <Image
                    src={featured.coverPhoto}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-[var(--clr-accent)] px-3 py-1 rounded-full">
                    {STATUS_LABEL[featured.status] ?? featured.status}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white">{featured.title}</h2>
                        <p className="text-white/70 text-sm mt-1">{featured.location}</p>
                        <div className="flex gap-3 mt-2 text-xs text-white/60">
                          {featured.totalUnits && <span>{featured.totalUnits} Units</span>}
                          {featured.totalUnits && featured.deliveryDate && <span>·</span>}
                          {featured.deliveryDate && <span>Completion {featured.deliveryDate}</span>}
                        </div>
                      </div>
                      <span className="text-white/80 font-semibold text-sm whitespace-nowrap ml-4">View →</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Two stacked cards */}
              {rest.length > 0 && (
                <div className="flex flex-col gap-5">
                  {rest.slice(0, 2).map((p, i) => (
                    <Link key={p.id || i} href={p.id ? `/projects/${p.id}` : "/contacts"} className="group relative rounded-2xl overflow-hidden flex-1 block">
                      <div className="relative w-full aspect-[16/7]">
                        <Image
                          src={p.coverPhoto}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-[var(--clr-accent)] px-3 py-1 rounded-full">
                          {STATUS_LABEL[p.status] ?? p.status}
                        </span>
                        <div className="absolute bottom-0 inset-x-0 p-5">
                          <div className="flex items-end justify-between">
                            <div>
                              <h3 className="text-base font-bold text-white">{p.title}</h3>
                              <p className="text-white/70 text-xs mt-0.5">{p.location}</p>
                              <div className="flex gap-2 mt-1.5 text-xs text-white/60">
                                {p.totalUnits && <span>{p.totalUnits} Units</span>}
                                {p.totalUnits && p.deliveryDate && <span>·</span>}
                                {p.deliveryDate && <span>Completion {p.deliveryDate}</span>}
                              </div>
                            </div>
                            <span className="text-white/80 font-semibold text-sm whitespace-nowrap ml-4">View →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining projects: 3-column grid */}
            {rest.length > 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {rest.slice(2).map((p, i) => (
                  <Link key={p.id || i} href={p.id ? `/projects/${p.id}` : "/contacts"} className="group relative rounded-2xl overflow-hidden block">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={p.coverPhoto}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-[var(--clr-accent)] px-3 py-1 rounded-full">
                        {STATUS_LABEL[p.status] ?? p.status}
                      </span>
                      <div className="absolute bottom-0 inset-x-0 p-5">
                        <div className="flex items-end justify-between">
                          <div>
                            <h3 className="text-base font-bold text-white">{p.title}</h3>
                            <p className="text-white/70 text-xs mt-0.5">{p.location}</p>
                            <div className="flex gap-2 mt-1.5 text-xs text-white/60">
                              {p.totalUnits && <span>{p.totalUnits} Units</span>}
                              {p.totalUnits && p.deliveryDate && <span>·</span>}
                              {p.deliveryDate && <span>Completion {p.deliveryDate}</span>}
                            </div>
                          </div>
                          <span className="text-white/80 font-semibold text-sm whitespace-nowrap ml-4">View →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

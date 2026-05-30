import Link from "next/link";
import Image from "next/image";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  ongoing: "Under Construction",
  completed: "Completed",
  upcoming: "Coming Soon",
};

const STATUS_COLOR: Record<string, string> = {
  ongoing: "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  upcoming: "bg-blue-100 text-blue-700",
};

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen">
      <div className="max-w-[1275px] mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-[var(--clr-primary)] uppercase mb-3">
            Developments
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block rounded-2xl overflow-hidden border border-[var(--clr-border)] bg-[var(--clr-surface)] hover:shadow-lg transition-shadow"
              >
                {/* Cover image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.coverPhoto}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLOR[project.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {STATUS_LABEL[project.status] ?? project.status}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h2 className="font-black text-[var(--clr-text)] text-lg leading-snug mb-1 group-hover:text-[var(--clr-primary)] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-[var(--clr-text-secondary)] text-sm mb-3">{project.location}</p>
                  <p className="text-[var(--clr-text-secondary)] text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--clr-border)]">
                    {project.totalUnits && (
                      <div className="text-center">
                        <p className="font-black text-[var(--clr-text)] text-sm">{project.totalUnits}</p>
                        <p className="text-[var(--clr-text-secondary)] text-xs">Units</p>
                      </div>
                    )}
                    {project.deliveryDate && (
                      <div className="text-center">
                        <p className="font-black text-[var(--clr-text)] text-sm">{project.deliveryDate}</p>
                        <p className="text-[var(--clr-text-secondary)] text-xs">Delivery</p>
                      </div>
                    )}
                    <span className="ml-auto text-xs font-semibold text-[var(--clr-primary)]">
                      View project →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

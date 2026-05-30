import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await db.project.findUnique({
    where: { id: Number(id), isPublished: true },
  });

  if (!project) notFound();

  const highlights = Array.isArray(project.highlights)
    ? (project.highlights as { text: string }[])
    : [];

  const allImages = [project.coverPhoto, ...project.gallery];

  return (
    <main className="min-h-screen">
      {/* Hero banner */}
      <div className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
        <Image
          src={project.coverPhoto}
          alt={project.title}
          fill
          className="object-cover"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full max-w-[1275px] mx-auto px-6 pb-10">
          <div className="max-w-[1275px] mx-auto">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block ${STATUS_COLOR[project.status] ?? "bg-gray-100 text-gray-600"}`}>
              {STATUS_LABEL[project.status] ?? project.status}
            </span>
            <h1 className="text-[clamp(28px,4vw,56px)] font-black text-white leading-tight tracking-tight">
              {project.title}
            </h1>
            <p className="text-white/70 text-base mt-2">{project.location}</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1275px] mx-auto px-6 py-14">
        <div className="grid grid-cols-3 gap-12 items-start">

          {/* Left: Main content */}
          <div className="col-span-2 flex flex-col gap-12">

            {/* Description */}
            <section>
              <h2 className="text-xl font-black text-[var(--clr-text)] mb-4">About this project</h2>
              <p className="text-[var(--clr-text-secondary)] text-base leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </section>

            {/* Highlights */}
            {highlights.length > 0 && (
              <section>
                <h2 className="text-xl font-black text-[var(--clr-text)] mb-5">Key Highlights</h2>
                <ul className="grid grid-cols-2 gap-3">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 bg-[var(--clr-surface)] rounded-xl px-4 py-3 border border-[var(--clr-border)]">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--clr-primary)]/10 flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-sm text-[var(--clr-text)]">{h.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Gallery */}
            {allImages.length > 1 && (
              <section>
                <h2 className="text-xl font-black text-[var(--clr-text)] mb-5">Gallery</h2>
                <div className="grid grid-cols-2 gap-3">
                  {allImages.slice(1).map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image src={src} alt={`${project.title} ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Info card + CTA */}
          <div className="sticky top-24 flex flex-col gap-4">
            <div className="bg-[var(--clr-surface)] rounded-2xl border border-[var(--clr-border)] p-6">
              <h3 className="font-black text-[var(--clr-text)] text-lg mb-5">Project Details</h3>
              <div className="flex flex-col gap-4">
                {project.totalUnits && (
                  <div className="flex justify-between items-center border-b border-[var(--clr-border)] pb-3">
                    <span className="text-sm text-[var(--clr-text-secondary)]">Total Units</span>
                    <span className="text-sm font-bold text-[var(--clr-text)]">{project.totalUnits}</span>
                  </div>
                )}
                {project.deliveryDate && (
                  <div className="flex justify-between items-center border-b border-[var(--clr-border)] pb-3">
                    <span className="text-sm text-[var(--clr-text-secondary)]">Delivery Date</span>
                    <span className="text-sm font-bold text-[var(--clr-text)]">{project.deliveryDate}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-b border-[var(--clr-border)] pb-3">
                  <span className="text-sm text-[var(--clr-text-secondary)]">Status</span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLOR[project.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {STATUS_LABEL[project.status] ?? project.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--clr-text-secondary)]">Location</span>
                  <span className="text-sm font-bold text-[var(--clr-text)] text-right max-w-[55%]">{project.location}</span>
                </div>
              </div>
            </div>

            <Link
              href="/contacts"
              className="block w-full text-center bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] text-white font-semibold text-sm py-3.5 rounded-full transition-colors"
            >
              Enquire about this project
            </Link>
            <Link
              href="/projects"
              className="block w-full text-center border border-[var(--clr-border)] hover:bg-[var(--clr-surface)] text-[var(--clr-text)] font-semibold text-sm py-3 rounded-full transition-colors"
            >
              ← All projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

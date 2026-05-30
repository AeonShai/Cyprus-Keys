import Link from "next/link";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[var(--clr-text)]">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-[var(--clr-text-secondary)] text-sm">No projects yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-5 py-4"
            >
              <div>
                <p className="font-bold text-[var(--clr-text)] text-sm">{project.title}</p>
                <p className="text-[var(--clr-text-secondary)] text-xs mt-0.5">
                  {project.location} · {project.status} · {project.isPublished ? "Published" : "Draft"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/projects/${project.id}`}
                  target="_blank"
                  className="text-xs text-[var(--clr-text-secondary)] hover:text-[var(--clr-primary)] transition-colors"
                >
                  View
                </Link>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="text-xs font-semibold text-[var(--clr-primary)] hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

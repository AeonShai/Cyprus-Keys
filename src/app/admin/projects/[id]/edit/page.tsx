import { notFound } from "next/navigation";
import db from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id: Number(id) } });
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-black text-[var(--clr-text)] mb-6">Edit Project</h1>
      <ProjectForm
        mode="edit"
        initialData={{
          ...project,
          totalUnits: project.totalUnits ?? null,
          deliveryDate: project.deliveryDate ?? undefined,
          highlights: Array.isArray(project.highlights)
            ? (project.highlights as { text: string }[])
            : [],
        }}
      />
    </div>
  );
}

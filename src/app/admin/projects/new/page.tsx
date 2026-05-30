import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-[var(--clr-text)] mb-6">New Project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}

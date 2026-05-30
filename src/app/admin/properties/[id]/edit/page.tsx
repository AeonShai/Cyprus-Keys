import { notFound } from "next/navigation";
import db from "@/lib/db";
import PropertyForm from "@/components/admin/PropertyForm";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await db.property.findUnique({ where: { id: Number(id) } });

  if (!property) notFound();

  return (
    <div>
      <h1 className="text-2xl font-black text-[var(--clr-text)] mb-6">Edit Property</h1>
      <PropertyForm
        mode="edit"
        initialData={{
          ...property,
          floor: property.floor ?? null,
          totalFloors: property.totalFloors ?? null,
          features: Array.isArray(property.features)
            ? (property.features as { label: string; value: string }[])
            : [],
        }}
      />
    </div>
  );
}

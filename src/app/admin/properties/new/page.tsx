import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-[var(--clr-text)] mb-6">Add Property</h1>
      <PropertyForm mode="create" />
    </div>
  );
}

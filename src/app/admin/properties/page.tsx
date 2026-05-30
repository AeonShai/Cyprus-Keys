import Link from "next/link";
import db from "@/lib/db";
import { formatPrice } from "@/lib/format";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";
import type { PropertyModel } from "@/generated/prisma/models";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const properties = await db.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[var(--clr-text)]">Properties</h1>
        <Link
          href="/admin/properties/new"
          className="bg-[var(--clr-primary)] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--clr-primary-hover)] transition-colors"
        >
          + Add Property
        </Link>
      </div>

      <div className="bg-[var(--clr-bg)] rounded-2xl border border-[var(--clr-border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--clr-border)] text-left">
              <th className="px-5 py-3 font-semibold text-[var(--clr-text-secondary)]">Title</th>
              <th className="px-5 py-3 font-semibold text-[var(--clr-text-secondary)]">City</th>
              <th className="px-5 py-3 font-semibold text-[var(--clr-text-secondary)]">Type</th>
              <th className="px-5 py-3 font-semibold text-[var(--clr-text-secondary)]">Status</th>
              <th className="px-5 py-3 font-semibold text-[var(--clr-text-secondary)]">Price</th>
              <th className="px-5 py-3 font-semibold text-[var(--clr-text-secondary)]">Published</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p: PropertyModel) => (
              <tr key={p.id} className="border-b border-[var(--clr-border)] last:border-0 hover:bg-[var(--clr-surface)] transition-colors">
                <td className="px-5 py-3 font-medium text-[var(--clr-text)]">{p.title}</td>
                <td className="px-5 py-3 text-[var(--clr-text-secondary)]">{p.city}</td>
                <td className="px-5 py-3 text-[var(--clr-text-secondary)] capitalize">{p.type}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full ${
                    p.status === "sale" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-3 font-semibold text-[var(--clr-text)]">{formatPrice(p.priceAmount, p.currency)}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    p.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {p.isPublished ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="text-xs font-semibold text-[var(--clr-primary)] hover:underline"
                    >
                      Edit
                    </Link>
                    <DeletePropertyButton id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

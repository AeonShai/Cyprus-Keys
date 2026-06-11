import { notFound } from "next/navigation";
import db from "@/lib/db";
import PropertyDetailClient from "@/components/PropertyDetailClient";

export const dynamic = "force-dynamic";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = await db.property.findUnique({ where: { id: Number(id), isPublished: true } });

  if (!property) notFound();

  return <PropertyDetailClient property={property} />;
}

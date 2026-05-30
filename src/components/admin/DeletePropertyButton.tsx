"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePropertyButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    setLoading(true);
    await fetch(`/api/properties/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs font-semibold text-red-500 hover:underline disabled:opacity-50"
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}

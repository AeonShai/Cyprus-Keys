"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarkReadButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleMarkRead() {
    setLoading(true);
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead: true }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleMarkRead}
      disabled={loading}
      className="text-xs font-semibold text-[var(--clr-primary)] hover:underline disabled:opacity-50"
    >
      {loading ? "…" : "Mark as read"}
    </button>
  );
}

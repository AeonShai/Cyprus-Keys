import Link from "next/link";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [propertyCount, messageCount, unreadCount] = await Promise.all([
    db.property.count(),
    db.contactMessage.count(),
    db.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-black text-[var(--clr-text)] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Properties" value={propertyCount} href="/admin/properties" />
        <StatCard label="Total Messages" value={messageCount} href="/admin/messages" />
        <StatCard label="Unread Messages" value={unreadCount} href="/admin/messages?unread=true" accent />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: number;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-2xl p-6 border transition-shadow hover:shadow-md ${
        accent
          ? "bg-[var(--clr-accent)] text-white border-transparent"
          : "bg-[var(--clr-bg)] text-[var(--clr-text)] border-[var(--clr-border)]"
      }`}
    >
      <p className="text-4xl font-black mb-1">{value}</p>
      <p className={`text-sm ${accent ? "text-white/80" : "text-[var(--clr-text-secondary)]"}`}>{label}</p>
    </Link>
  );
}

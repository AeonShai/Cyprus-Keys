import db from "@/lib/db";
import MarkReadButton from "@/components/admin/MarkReadButton";
import type { ContactMessageModel } from "@/generated/prisma/models";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ unread?: string }>;
}) {
  const params = await searchParams;
  const unreadOnly = params.unread === "true";

  const messages = await db.contactMessage.findMany({
    where: unreadOnly ? { isRead: false } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-black text-[var(--clr-text)]">Messages</h1>
        <a
          href="/admin/messages"
          className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
            !unreadOnly
              ? "bg-[var(--clr-primary)] text-white border-transparent"
              : "text-[var(--clr-text-secondary)] border-[var(--clr-border)] hover:border-[var(--clr-primary)]"
          }`}
        >
          All
        </a>
        <a
          href="/admin/messages?unread=true"
          className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
            unreadOnly
              ? "bg-[var(--clr-primary)] text-white border-transparent"
              : "text-[var(--clr-text-secondary)] border-[var(--clr-border)] hover:border-[var(--clr-primary)]"
          }`}
        >
          Unread
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {messages.length === 0 && (
          <p className="text-[var(--clr-text-secondary)] text-sm">No messages.</p>
        )}
        {messages.map((msg: ContactMessageModel) => (
          <div
            key={msg.id}
            className={`bg-[var(--clr-bg)] rounded-2xl border p-5 ${
              !msg.isRead ? "border-[var(--clr-accent)]" : "border-[var(--clr-border)]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-[var(--clr-text)] text-sm">{msg.name}</p>
                <p className="text-[var(--clr-text-secondary)] text-xs">{msg.email}</p>
                {msg.phone && (
                  <p className="text-[var(--clr-text-secondary)] text-xs">{msg.phone}</p>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {!msg.isRead && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-[var(--clr-accent)] text-white px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
                <p className="text-[var(--clr-text-secondary)] text-xs">
                  {new Date(msg.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
            {msg.subject && (
              <p className="text-xs font-semibold text-[var(--clr-text)] mt-3">{msg.subject}</p>
            )}
            <p className="text-sm text-[var(--clr-text-secondary)] mt-1 leading-relaxed">{msg.message}</p>
            {!msg.isRead && (
              <div className="mt-3">
                <MarkReadButton id={msg.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

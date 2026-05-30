import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[var(--clr-surface)]">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-[var(--clr-primary)] text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="font-black text-lg tracking-tight">Cyprus Keys</p>
          <p className="text-white/50 text-xs mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          <NavLink href="/admin/properties">Properties</NavLink>
          <NavLink href="/admin/projects">Projects</NavLink>
          <NavLink href="/admin/messages">Messages</NavLink>
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <Link
            href="/api/auth/signout"
            className="block text-center text-sm text-white/70 hover:text-white transition-colors py-2 rounded-lg hover:bg-white/10"
          >
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
    >
      {children}
    </Link>
  );
}

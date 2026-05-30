"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--clr-surface)] px-4">
      <div className="w-full max-w-sm bg-[var(--clr-bg)] rounded-2xl border border-[var(--clr-border)] shadow-sm p-8">
        <h1 className="text-2xl font-black text-[var(--clr-text)] mb-1">Admin Login</h1>
        <p className="text-[var(--clr-text-secondary)] text-sm mb-6">Cyprus Keys</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--clr-text-secondary)] mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 text-sm text-[var(--clr-text)] focus:outline-none focus:border-[var(--clr-primary)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--clr-text-secondary)] mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 text-sm text-[var(--clr-text)] focus:outline-none focus:border-[var(--clr-primary)] transition-colors"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] text-white font-semibold text-sm py-3 rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

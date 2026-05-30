"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProjectFormData {
  title: string;
  location: string;
  description: string;
  coverPhoto: string;
  gallery: string[];
  status: string;
  totalUnits: number | null;
  deliveryDate: string;
  highlights: { text: string }[];
  isPublished: boolean;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData> & { id?: number };
  mode: "create" | "edit";
}

const defaultData: ProjectFormData = {
  title: "",
  location: "",
  description: "",
  coverPhoto: "",
  gallery: [],
  status: "upcoming",
  totalUnits: null,
  deliveryDate: "",
  highlights: [],
  isPublished: true,
};

const inputClass =
  "w-full border border-[var(--clr-border)] bg-[var(--clr-bg)] rounded-xl px-4 py-2.5 text-sm text-[var(--clr-text)] focus:outline-none focus:border-[var(--clr-primary)] transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

export default function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const [data, setData] = useState<ProjectFormData>({ ...defaultData, ...initialData });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function update(field: keyof ProjectFormData, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function uploadImage(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const json = await res.json();
    return json.url as string;
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      update("coverPhoto", url);
    } catch {
      setError("Cover photo upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadImage));
      update("gallery", [...data.gallery, ...urls]);
    } catch {
      setError("Gallery upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const url = mode === "create" ? "/api/projects" : `/api/projects/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <Field label="Title">
        <input required value={data.title} onChange={(e) => update("title", e.target.value)} className={inputClass} />
      </Field>

      <Field label="Location">
        <input required value={data.location} onChange={(e) => update("location", e.target.value)} placeholder="Girne, North Cyprus" className={inputClass} />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Status">
          <select value={data.status} onChange={(e) => update("status", e.target.value)} className={inputClass}>
            <option value="upcoming">Coming Soon</option>
            <option value="ongoing">Under Construction</option>
            <option value="completed">Completed</option>
          </select>
        </Field>
        <Field label="Total Units (optional)">
          <input
            type="number"
            value={data.totalUnits ?? ""}
            onChange={(e) => update("totalUnits", e.target.value ? Number(e.target.value) : null)}
            className={inputClass}
          />
        </Field>
        <Field label="Delivery Date (optional)">
          <input value={data.deliveryDate} onChange={(e) => update("deliveryDate", e.target.value)} placeholder="Q4 2026" className={inputClass} />
        </Field>
      </div>

      <Field label="Description">
        <textarea required rows={5} value={data.description} onChange={(e) => update("description", e.target.value)} className={`${inputClass} resize-none`} />
      </Field>

      {/* Highlights */}
      <div>
        <p className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide mb-2">Key Highlights</p>
        <div className="flex flex-col gap-2 mb-2">
          {data.highlights.map((h, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={h.text}
                onChange={(e) => {
                  const updated = [...data.highlights];
                  updated[i] = { text: e.target.value };
                  update("highlights", updated);
                }}
                placeholder="e.g. Sea view from every unit"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => update("highlights", data.highlights.filter((_, idx) => idx !== i))}
                className="text-red-500 hover:text-red-600 text-lg font-bold px-1"
              >×</button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => update("highlights", [...data.highlights, { text: "" }])}
          className="text-sm text-[var(--clr-primary)] hover:underline"
        >+ Add highlight</button>
      </div>

      {/* Cover Photo */}
      <Field label="Cover Photo">
        <input type="file" accept="image/*" onChange={handleCoverUpload} className="text-sm text-[var(--clr-text-secondary)]" />
        {data.coverPhoto && (
          <div className="mt-2 relative w-full h-40 rounded-xl overflow-hidden">
            <Image src={data.coverPhoto} alt="cover" fill className="object-cover" />
          </div>
        )}
        {!data.coverPhoto && (
          <Field label="Or paste URL">
            <input value={data.coverPhoto} onChange={(e) => update("coverPhoto", e.target.value)} placeholder="https://..." className={inputClass} />
          </Field>
        )}
      </Field>

      {/* Gallery */}
      <Field label="Gallery Images">
        <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="text-sm text-[var(--clr-text-secondary)]" />
        {data.gallery.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {data.gallery.map((url, i) => (
              <div key={i} className="relative w-24 h-16 rounded-lg overflow-hidden">
                <Image src={url} alt={`gallery-${i}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => update("gallery", data.gallery.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center leading-none"
                >×</button>
              </div>
            ))}
          </div>
        )}
      </Field>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={data.isPublished} onChange={(e) => update("isPublished", e.target.checked)} className="w-4 h-4" />
        <span className="text-sm font-medium text-[var(--clr-text)]">Published (visible on site)</span>
      </label>

      {uploading && <p className="text-sm text-[var(--clr-text-secondary)]">Uploading image…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-start bg-[var(--clr-primary)] hover:bg-[var(--clr-primary-hover)] disabled:opacity-60 text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors"
      >
        {loading ? "Saving…" : mode === "create" ? "Create project" : "Save changes"}
      </button>
    </form>
  );
}

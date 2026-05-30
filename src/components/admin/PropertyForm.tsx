"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NORTH_CYPRUS_CITIES } from "@/constants/locations";

interface PropertyFormData {
  title: string;
  location: string;
  city: string;
  type: string;
  status: string;
  priceAmount: number;
  currency: string;
  beds: number;
  baths: number;
  area: number;
  photo: string;
  gallery: string[];
  description: string;
  features: { label: string; value: string }[];
  yearBuilt: number;
  floor: number | null;
  totalFloors: number | null;
  isPublished: boolean;
}

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData> & { id?: number };
  mode: "create" | "edit";
}

const defaultData: PropertyFormData = {
  title: "",
  location: "",
  city: "",
  type: "villa",
  status: "sale",
  priceAmount: 0,
  currency: "GBP",
  beds: 1,
  baths: 1,
  area: 0,
  photo: "",
  gallery: [],
  description: "",
  features: [],
  yearBuilt: new Date().getFullYear(),
  floor: null,
  totalFloors: null,
  isPublished: true,
};

export default function PropertyForm({ initialData, mode }: PropertyFormProps) {
  const [data, setData] = useState<PropertyFormData>({ ...defaultData, ...initialData });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function update(field: keyof PropertyFormData, value: unknown) {
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

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      update("photo", url);
    } catch {
      setError("Photo upload failed");
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
      const url =
        mode === "create"
          ? "/api/properties"
          : `/api/properties/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      router.push("/admin/properties");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      {/* Title */}
      <Field label="Title">
        <input
          required
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          className={inputClass}
        />
      </Field>

      {/* Location + City */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="City">
          <select
            required
            value={data.city}
            onChange={(e) => {
              const city = e.target.value;
              update("city", city);
              if (!data.location || NORTH_CYPRUS_CITIES.some((c) => data.location.startsWith(c))) {
                update("location", city ? `${city}, North Cyprus` : "");
              }
            }}
            className={inputClass}
          >
            <option value="">Select city…</option>
            {NORTH_CYPRUS_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </Field>
        <Field label="Location (full address)">
          <input
            required
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Girne, North Cyprus"
            className={inputClass}
          />
        </Field>
      </div>

      {/* Type + Status */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Type">
          <select
            value={data.type}
            onChange={(e) => update("type", e.target.value)}
            className={inputClass}
          >
            {["villa", "apartment", "penthouse", "bungalow", "commercial"].map((t) => (
              <option key={t} value={t} className="capitalize">
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            value={data.status}
            onChange={(e) => update("status", e.target.value)}
            className={inputClass}
          >
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </Field>
      </div>

      {/* Price + Currency */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Price Amount">
          <input
            type="number"
            required
            min={0}
            value={data.priceAmount}
            onChange={(e) => update("priceAmount", Number(e.target.value))}
            className={inputClass}
          />
        </Field>
        <Field label="Currency">
          <select
            value={data.currency}
            onChange={(e) => update("currency", e.target.value)}
            className={inputClass}
          >
            <option value="GBP">GBP (£)</option>
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
          </select>
        </Field>
      </div>

      {/* Beds + Baths + Area */}
      <div className="grid grid-cols-3 gap-4">
        <Field label="Beds">
          <input
            type="number"
            min={1}
            value={data.beds}
            onChange={(e) => update("beds", Number(e.target.value))}
            className={inputClass}
          />
        </Field>
        <Field label="Baths">
          <input
            type="number"
            min={1}
            value={data.baths}
            onChange={(e) => update("baths", Number(e.target.value))}
            className={inputClass}
          />
        </Field>
        <Field label="Area (m²)">
          <input
            type="number"
            min={1}
            value={data.area}
            onChange={(e) => update("area", Number(e.target.value))}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Year Built + Floor */}
      <div className="grid grid-cols-3 gap-4">
        <Field label="Year Built">
          <input
            type="number"
            value={data.yearBuilt}
            onChange={(e) => update("yearBuilt", Number(e.target.value))}
            className={inputClass}
          />
        </Field>
        <Field label="Floor (optional)">
          <input
            type="number"
            value={data.floor ?? ""}
            onChange={(e) =>
              update("floor", e.target.value ? Number(e.target.value) : null)
            }
            className={inputClass}
          />
        </Field>
        <Field label="Total Floors (optional)">
          <input
            type="number"
            value={data.totalFloors ?? ""}
            onChange={(e) =>
              update("totalFloors", e.target.value ? Number(e.target.value) : null)
            }
            className={inputClass}
          />
        </Field>
      </div>

      {/* Description */}
      <Field label="Description">
        <textarea
          required
          rows={4}
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {/* Features */}
      <div>
        <p className="text-sm font-semibold text-[var(--clr-text)] mb-2">Property Details (features table)</p>
        <div className="flex flex-col gap-2 mb-2">
          {data.features.map((f, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={f.label}
                onChange={(e) => {
                  const updated = [...data.features];
                  updated[i] = { ...updated[i], label: e.target.value };
                  update("features", updated);
                }}
                placeholder="Label (e.g. Parking)"
                className={`${inputClass} flex-1`}
              />
              <input
                value={f.value}
                onChange={(e) => {
                  const updated = [...data.features];
                  updated[i] = { ...updated[i], value: e.target.value };
                  update("features", updated);
                }}
                placeholder="Value (e.g. Yes)"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => update("features", data.features.filter((_, idx) => idx !== i))}
                className="text-red-500 hover:text-red-600 text-lg font-bold px-1"
                aria-label="Remove"
              >×</button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => update("features", [...data.features, { label: "", value: "" }])}
          className="text-sm text-[var(--clr-primary)] hover:underline"
        >
          + Add row
        </button>
      </div>

      {/* Cover photo */}
      <Field label="Cover Photo">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="text-sm text-[var(--clr-text-secondary)]"
        />
        {data.photo && (
          <div className="mt-2 relative w-40 h-28 rounded-xl overflow-hidden">
            <Image src={data.photo} alt="cover" fill className="object-cover" />
          </div>
        )}
        {!data.photo && (
          <Field label="Or paste URL">
            <input
              value={data.photo}
              onChange={(e) => update("photo", e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </Field>
        )}
      </Field>

      {/* Gallery */}
      <Field label="Gallery Images">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryUpload}
          className="text-sm text-[var(--clr-text-secondary)]"
        />
        {data.gallery.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {data.gallery.map((url, i) => (
              <div key={i} className="relative w-24 h-16 rounded-lg overflow-hidden">
                <Image src={url} alt={`gallery-${i}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "gallery",
                      data.gallery.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </Field>

      {/* Published toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data.isPublished}
          onChange={(e) => update("isPublished", e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm font-medium text-[var(--clr-text)]">Published (visible on site)</span>
      </label>

      {uploading && (
        <p className="text-sm text-[var(--clr-text-secondary)]">Uploading image…</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading || uploading}
        className="self-start bg-[var(--clr-primary)] text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-[var(--clr-primary-hover)] transition-colors disabled:opacity-60"
      >
        {loading ? "Saving…" : mode === "create" ? "Create Property" : "Save Changes"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--clr-text)] focus:outline-none focus:border-[var(--clr-primary)] transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[var(--clr-text-secondary)] uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

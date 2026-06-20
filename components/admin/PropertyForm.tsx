"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export interface PropertyData {
  id?: string;
  slug?: string;
  title: string;
  price: number;
  pricePerMonth: boolean;
  location: string;
  beds: number;
  baths: number;
  area: number;
  images: string[];
  status: string;
  type: string;
  badge: string;
  isFeatured: boolean;
  description?: string;
  yearBuilt?: number | string;
  parking?: number;
  amenities?: string[];
}

interface PropertyFormProps {
  initialData?: PropertyData;
}

// The HTML template uses `hint-green` (mapped in globals.css as --color-hint-green)
// and `nordic` (mapped as --color-nordic-dark). We use the CSS var names here.
// Tailwind v4 CSS vars: bg-[var(--color-hint-green)], text-[var(--color-mosque)], etc.

const SectionHeader = ({
  icon,
  title,
  right,
  small = false,
}: {
  icon: string;
  title: string;
  right?: React.ReactNode;
  small?: boolean;
}) => (
  <div
    className={`${small ? "px-6 py-4" : "px-8 py-6"} border-b border-[var(--color-hint-green)]/30 flex ${right ? "justify-between" : ""} items-center gap-3 bg-gradient-to-r from-[var(--color-hint-green)]/10 to-transparent`}
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[var(--color-hint-green)] flex items-center justify-center text-[var(--color-nordic-dark)]">
        <span className="material-icons text-lg">{icon}</span>
      </div>
      <h2
        className={`${small ? "text-lg" : "text-xl"} font-bold text-[var(--color-nordic-dark)]`}
      >
        {title}
      </h2>
    </div>
    {right && <div>{right}</div>}
  </div>
);

const AMENITIES = [
  "Swimming Pool",
  "Garden",
  "Air Conditioning",
  "Smart Home",
  "Gym",
  "Security",
];

export default function PropertyForm({ initialData }: PropertyFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [formData, setFormData] = useState<PropertyData>({
    title: initialData?.title ?? "",
    price: initialData?.price ?? 0,
    pricePerMonth: initialData?.pricePerMonth ?? false,
    location: initialData?.location ?? "",
    beds: initialData?.beds ?? 0,
    baths: initialData?.baths ?? 0,
    area: initialData?.area ?? 0,
    images: initialData?.images ?? [],
    status: initialData?.status ?? "FOR SALE",
    type: initialData?.type ?? "House",
    badge: initialData?.badge ?? "",
    isFeatured: initialData?.isFeatured ?? false,
    description: initialData?.description ?? "",
    yearBuilt: initialData?.yearBuilt ?? "",
    parking: initialData?.parking ?? 0,
    amenities: initialData?.amenities ?? [],
  });

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((p) => ({ ...p, [id]: checked }));
    } else if (type === "number") {
      setFormData((p) => ({ ...p, [id]: value === "" ? "" : Number(value) }));
    } else {
      setFormData((p) => ({ ...p, [id]: value }));
    }
  };

  const handleAmenity = (amenity: string, checked: boolean) => {
    setFormData((p) => ({
      ...p,
      amenities: checked
        ? [...(p.amenities || []), amenity]
        : (p.amenities || []).filter((a) => a !== amenity),
    }));
  };

  const handleIncrement = (
    field: "beds" | "baths" | "parking",
    delta: number
  ) => {
    setFormData((p) => ({
      ...p,
      [field]: Math.max(0, ((p[field] as number) || 0) + delta),
    }));
  };

  const uploadFiles = async (files: FileList | File[]) => {
    setIsUploading(true);
    const newImages: string[] = [];
    try {
      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} exceeds the 5MB limit.`);
          continue;
        }
        const ext = file.name.split(".").pop();
        const path = `${Math.random().toString(36).slice(2)}_${Date.now()}.${ext}`;
        const { error } = await supabase.storage
          .from("properties")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (error) {
          alert(`Error uploading ${file.name}: ${error.message}`);
          continue;
        }
        const {
          data: { publicUrl },
        } = supabase.storage.from("properties").getPublicUrl(path);
        newImages.push(publicUrl);
      }
      setFormData((p) => ({ ...p, images: [...p.images, ...newImages] }));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) uploadFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files);
  };

  const removeImage = (idx: number) => {
    setFormData((p) => ({
      ...p,
      images: p.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const slug = initialData?.slug || generateSlug(formData.title);

      // Destructure out id & slug so we never accidentally send null id
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, slug: _slug, ...rest } = formData;

      const cleanPayload = {
        ...rest,
        slug,
        price: Number(formData.price),
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        area: Number(formData.area),
        yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : null,
        parking: Number(formData.parking ?? 0),
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from("properties")
          .update(cleanPayload)
          .eq("id", initialData.id);
        if (error) throw error;
      } else {
        // id will be auto-generated by the DB default (gen_random_uuid())
        const { error } = await supabase.from("properties").insert([cleanPayload]);
        if (error) throw error;
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving property:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-[var(--color-nordic-dark)] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-mosque)] focus:border-[var(--color-mosque)] transition-all text-base font-sf";
  const inputSm =
    "w-full px-3 py-2 rounded border border-gray-200 bg-gray-50 text-[var(--color-nordic-dark)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-mosque)] focus:border-[var(--color-mosque)] transition-all text-sm font-sf";
  const selectBase = inputBase + " cursor-pointer";

  return (
    <>
      {/* Desktop header actions — rendered OUTSIDE the form so we can trigger submit */}
      <div className="hidden md:flex gap-3 mb-8">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-[var(--color-nordic-dark)] hover:bg-gray-50 transition-colors font-medium font-sf text-sm disabled:opacity-60"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-lg bg-[var(--color-mosque)] hover:bg-[var(--color-nordic-dark)] text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-sf text-sm disabled:opacity-60"
        >
          <span className="material-icons text-sm">save</span>
          {isSaving ? "Saving…" : "Save Property"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start"
      >
        {/* ── Left column ─────────────────────── */}
        <div className="xl:col-span-8 space-y-8 pb-20 md:pb-0">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <SectionHeader icon="info" title="Basic Information" />
            <div className="p-8 space-y-6">
              {/* Title */}
              <div>
                <label
                  className="block text-sm font-medium text-[var(--color-nordic-dark)] mb-1.5 font-sf"
                  htmlFor="title"
                >
                  Property Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern Penthouse with Ocean View"
                  className={inputBase}
                />
              </div>

              {/* Price | Status | Type — 3-col matching HTML */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-[var(--color-nordic-dark)] mb-1.5 font-sf"
                    htmlFor="price"
                  >
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-sf text-sm">
                      $
                    </span>
                    <input
                      id="price"
                      type="number"
                      required
                      value={formData.price || ""}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full pl-7 pr-4 py-2.5 rounded-md border border-gray-200 bg-white text-[var(--color-nordic-dark)] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-mosque)] focus:border-[var(--color-mosque)] transition-all text-base font-medium font-sf"
                    />
                  </div>
                  {/* Price per month toggle under price */}
                  <label className="flex items-center gap-2 mt-2 cursor-pointer group">
                    <input
                      id="pricePerMonth"
                      type="checkbox"
                      checked={formData.pricePerMonth}
                      onChange={handleChange}
                      className="w-4 h-4 text-[var(--color-mosque)] border-gray-300 rounded focus:ring-[var(--color-mosque)]"
                    />
                    <span className="text-xs text-gray-500 font-sf group-hover:text-[var(--color-nordic-dark)] transition-colors">
                      Per month (rental)
                    </span>
                  </label>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-[var(--color-nordic-dark)] mb-1.5 font-sf"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={selectBase}
                  >
                    <option value="FOR SALE">For Sale</option>
                    <option value="FOR RENT">For Rent</option>
                    <option value="SOLD">Sold</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-[var(--color-nordic-dark)] mb-1.5 font-sf"
                    htmlFor="type"
                  >
                    Property Type
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={selectBase}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <SectionHeader icon="description" title="Description" />
            <div className="p-8">
              <div className="mb-3 flex gap-2 border-b border-gray-100 pb-2">
                <button
                  type="button"
                  className="p-1.5 text-gray-400 hover:text-[var(--color-nordic-dark)] hover:bg-gray-50 rounded transition-colors"
                >
                  <span className="material-icons text-lg">format_bold</span>
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-400 hover:text-[var(--color-nordic-dark)] hover:bg-gray-50 rounded transition-colors"
                >
                  <span className="material-icons text-lg">format_italic</span>
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-400 hover:text-[var(--color-nordic-dark)] hover:bg-gray-50 rounded transition-colors"
                >
                  <span className="material-icons text-lg">
                    format_list_bulleted
                  </span>
                </button>
              </div>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={2000}
                placeholder="Describe the property features, neighborhood, and unique selling points..."
                className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white text-[var(--color-nordic-dark)] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-mosque)] focus:border-[var(--color-mosque)] transition-all text-base font-sf leading-relaxed resize-y min-h-[200px]"
              />
              <div className="mt-2 text-right text-xs text-gray-400 font-sf">
                {formData.description?.length ?? 0} / 2000 characters
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <SectionHeader
              icon="image"
              title="Gallery"
              right={
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded font-sf">
                  JPG, PNG, WEBP
                </span>
              }
            />
            <div className="p-8">
              {/* Drop zone — file input covers the whole area, matching HTML exactly */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl bg-gray-50/50 p-10 text-center transition-colors cursor-pointer group ${
                  dragOver
                    ? "border-[var(--color-mosque)]/60 bg-[var(--color-hint-green)]/10"
                    : "border-gray-300 hover:bg-[var(--color-hint-green)]/10 hover:border-[var(--color-mosque)]/40"
                }`}
              >
                {/* Transparent full-area file input — matches the HTML template */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[var(--color-mosque)] group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-2xl">
                      {isUploading ? "hourglass_empty" : "cloud_upload"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-medium text-[var(--color-nordic-dark)] font-sf">
                      {isUploading ? "Uploading…" : "Click or drag images here"}
                    </p>
                    <p className="text-xs text-gray-400 font-sf">
                      Max file size 5MB per image
                    </p>
                  </div>
                </div>
              </div>

              {/* Image grid */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden relative group shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`Property image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[var(--color-nordic-dark)]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                        >
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </div>
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 bg-[var(--color-mosque)] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm font-sf uppercase tracking-wider">
                          Main
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Add More button */}
                  <label className="aspect-square rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-[var(--color-mosque)] hover:border-[var(--color-mosque)] hover:bg-[var(--color-hint-green)]/20 transition-all group cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    <span className="material-icons group-hover:scale-110 transition-transform">
                      add
                    </span>
                    <span className="text-xs mt-1 font-medium font-sf">
                      Add More
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right column ────────────────────── */}
        <div className="xl:col-span-4 space-y-8">
          {/* Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <SectionHeader icon="place" title="Location" small />
            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-[var(--color-nordic-dark)] mb-1.5 font-sf"
                  htmlFor="location"
                >
                  Address
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Street Address, City, Zip"
                  className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-[var(--color-nordic-dark)] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-mosque)] focus:border-[var(--color-mosque)] transition-all text-sm font-sf"
                />
              </div>
              <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS55FY7gfArnlTpNsdabJk9nBO5uQJgOwIsl8beO34JRZ9dMmjLoIkTuTUO72Y9L5tUmQqTReQWebUWadAWwLusGmRQiIict5sqY--yRaOxuYpTzfR4vv4RKh1ex6oxY64e0kbSeMudNO6pv-gG0WzVWs-pDfvQm5IoTQ1mT-tAV49LDkXAHZl317M1-D7eZw3N8o2ExKWTgg6oMAXOFVnkApIqnb7TZHekwSw8pWQxpJV2EKI8EQKQbQXJaSbjN8gB1n8b-ueWj8"
                  alt="Map preview"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="bg-white/90 text-[var(--color-nordic-dark)] px-3 py-1.5 rounded shadow-sm backdrop-blur-sm text-xs font-bold font-sf flex items-center gap-1">
                    <span className="material-icons text-sm text-[var(--color-mosque)]">
                      map
                    </span>{" "}
                    Preview
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visibility (badge + featured) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <SectionHeader icon="stars" title="Visibility" small />
            <div className="p-6 space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-[var(--color-nordic-dark)] mb-1.5 font-sf"
                  htmlFor="badge"
                >
                  Badge
                </label>
                <input
                  id="badge"
                  type="text"
                  value={formData.badge}
                  onChange={handleChange}
                  placeholder="e.g. Exclusive, New Arrival"
                  className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-[var(--color-nordic-dark)] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-mosque)] focus:border-[var(--color-mosque)] transition-all text-sm font-sf"
                />
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  id="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 text-[var(--color-mosque)] border-gray-300 rounded focus:ring-[var(--color-mosque)]"
                />
                <span className="text-sm text-gray-700 font-sf group-hover:text-[var(--color-nordic-dark)] transition-colors">
                  Mark as Featured Property
                </span>
              </label>
            </div>
          </div>

          {/* Details — sticky on desktop */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <SectionHeader icon="straighten" title="Details" small />
            <div className="p-6 space-y-6">
              {/* Area + Year Built */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-xs text-gray-500 font-medium font-sf mb-1 block"
                    htmlFor="area"
                  >
                    Area (m²)
                  </label>
                  <input
                    id="area"
                    type="number"
                    value={formData.area || ""}
                    onChange={handleChange}
                    placeholder="0"
                    className={inputSm}
                  />
                </div>
                <div>
                  <label
                    className="text-xs text-gray-500 font-medium font-sf mb-1 block"
                    htmlFor="yearBuilt"
                  >
                    Year Built
                  </label>
                  <input
                    id="yearBuilt"
                    type="number"
                    value={formData.yearBuilt || ""}
                    onChange={handleChange}
                    placeholder="YYYY"
                    className={inputSm}
                  />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Bedrooms / Bathrooms / Parking — stepper */}
              <div className="space-y-4">
                {(
                  [
                    { field: "beds", icon: "bed", label: "Bedrooms" },
                    { field: "baths", icon: "shower", label: "Bathrooms" },
                    { field: "parking", icon: "directions_car", label: "Parking" },
                  ] as const
                ).map(({ field, icon, label }) => (
                  <div key={field} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[var(--color-nordic-dark)] font-sf flex items-center gap-2">
                      <span className="material-icons text-gray-400 text-sm">
                        {icon}
                      </span>{" "}
                      {label}
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => handleIncrement(field, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={formData[field] ?? 0}
                        className="w-10 text-center border-none bg-transparent text-[var(--color-nordic-dark)] p-0 focus:ring-0 text-sm font-medium font-sf"
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement(field, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100" />

              {/* Amenities */}
              <div>
                <h3 className="font-sf font-bold text-[var(--color-nordic-dark)] mb-3 uppercase tracking-wider text-xs text-gray-500">
                  Amenities
                </h3>
                <div className="space-y-2">
                  {AMENITIES.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={(formData.amenities || []).includes(amenity)}
                        onChange={(e) => handleAmenity(amenity, e.target.checked)}
                        className="w-4 h-4 text-[var(--color-mosque)] border-gray-300 rounded focus:ring-[var(--color-mosque)]"
                      />
                      <span className="text-sm text-gray-700 font-sf group-hover:text-[var(--color-nordic-dark)] transition-colors">
                        {amenity}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-xl md:hidden z-40 flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/properties")}
            className="flex-1 py-3 rounded-lg border border-gray-300 bg-white text-[var(--color-nordic-dark)] font-medium font-sf"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 py-3 rounded-lg bg-[var(--color-mosque)] text-white font-medium font-sf flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}

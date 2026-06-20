import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PropertyForm, { PropertyData } from "@/components/admin/PropertyForm";

export const metadata = {
  title: "Edit Property | Admin",
  description: "Edit an existing property listing",
};

export default async function EditPropertyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .single();

  if (error || !property) {
    notFound();
  }

  // Map to the PropertyData format
  const initialData: PropertyData = {
    id: property.id,
    slug: property.slug,
    title: property.title || "",
    price: property.price || 0,
    pricePerMonth: property.pricePerMonth || false,
    location: property.location || "",
    beds: property.beds || 0,
    baths: property.baths || 0,
    area: property.area || 0,
    images: property.images || [],
    status: property.status || "FOR SALE",
    type: property.type || "House",
    badge: property.badge || "",
    isFeatured: property.isFeatured || false,
    description: property.description || "",
    yearBuilt: property.yearBuilt ?? "",
    parking: property.parking ?? 0,
    amenities: property.amenities ?? [],
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 font-medium font-sf">
              <li>
                <Link href="/admin/properties" className="hover:text-[var(--color-mosque)] transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <span className="material-icons text-xs text-gray-400">chevron_right</span>
              </li>
              <li aria-current="page" className="text-[var(--color-nordic-dark)]">
                Edit Property
              </li>
            </ol>
          </nav>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-nordic-dark)] tracking-tight mb-2">Edit Property</h1>
            <p className="text-base text-gray-500 max-w-2xl font-normal font-sf">
              Update the details for &quot;{property.title}&quot;.
            </p>
          </div>
        </div>
      </header>
      
      <PropertyForm initialData={initialData} />
    </main>
  );
}

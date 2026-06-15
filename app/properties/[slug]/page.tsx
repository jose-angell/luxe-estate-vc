import { notFound } from "next/navigation";
import { mockProperties, Property } from "../../../data/mockProperties";
import Navbar from "../../../components/Navbar";
import { supabase } from "../../../lib/supabase";
import PropertyDetailClient from "./PropertyDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let property = mockProperties.find(p => p.slug === slug || p.id === slug);
  
  if (!property) {
    const { data } = await supabase.from('properties').select('*').or(`slug.eq.${slug},id.eq.${slug}`).single();
    if (data) {
      property = { ...data, slug: data.slug || data.id, images: data.images || [] } as Property;
    }
  }

  if (!property) return { title: "Not Found" };
  
  return {
    title: `${property.title} | LuxeEstate`,
    description: `Real estate property located in ${property.location} for ${property.status}`,
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  let property = mockProperties.find(p => p.slug === slug || p.id === slug);

  if (!property) {
    const { data } = await supabase.from('properties').select('*').or(`slug.eq.${slug},id.eq.${slug}`).single();
    if (data) {
      property = { ...data, slug: data.slug || data.id, images: data.images || [] } as Property;
    }
  }

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background-light text-nordic-dark min-h-screen">
      <Navbar activeTab="Buy" />
      <PropertyDetailClient property={property} />
      <footer className="bg-white border-t border-slate-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-nordic-dark/50">
            © 2026 LuxeEstate Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

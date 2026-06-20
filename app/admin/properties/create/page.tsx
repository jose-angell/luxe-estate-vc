import React from "react";
import Link from "next/link";
import PropertyForm from "@/components/admin/PropertyForm";

export const metadata = {
  title: "Add New Property | Admin",
  description: "Create a new property listing",
};

export default function CreatePropertyPage() {
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
                Add New
              </li>
            </ol>
          </nav>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-nordic-dark)] tracking-tight mb-2">Add New Property</h1>
            <p className="text-base text-gray-500 max-w-2xl font-normal font-sf">
              Fill in the details below to create a new listing. Fields marked with * are mandatory.
            </p>
          </div>
        </div>
      </header>
      
      <PropertyForm />
    </main>
  );
}

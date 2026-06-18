import { mockProperties } from "../../data/mockProperties";
import Image from "next/image";

export default function AdminPropertiesPage() {
  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-nordic-dark dark:text-white tracking-tight">
            My Properties
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your portfolio and track performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white dark:bg-[#152e2a] border border-gray-200 dark:border-mosque/30 text-nordic-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-mosque/10 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2">
            <span className="material-icons text-base">filter_list</span> Filter
          </button>
          <button className="bg-mosque hover:bg-mosque/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
            <span className="material-icons text-base">add</span> Add New Property
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#152e2a] p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Listings</p>
            <p className="text-2xl font-bold text-nordic-dark dark:text-white mt-1">{mockProperties.length}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-mosque/10 flex items-center justify-center text-mosque">
            <span className="material-icons">apartment</span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#152e2a] p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Properties</p>
            <p className="text-2xl font-bold text-nordic-dark dark:text-white mt-1">
              {mockProperties.filter(p => p.status === 'FOR SALE' || p.status === 'FOR RENT').length}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-hint-green flex items-center justify-center text-mosque">
            <span className="material-icons">check_circle</span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#152e2a] p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Featured</p>
            <p className="text-2xl font-bold text-nordic-dark dark:text-white mt-1">
              {mockProperties.filter(p => p.isFeatured).length}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <span className="material-icons">star</span>
          </div>
        </div>
      </div>

      {/* Property List Container */}
      <div className="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-200 dark:border-mosque/20 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 dark:bg-mosque/5 border-b border-gray-100 dark:border-mosque/10 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <div className="col-span-6">Property Details</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* List Items */}
        {mockProperties.slice(0, 5).map((property) => (
          <div key={property.id} className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 dark:border-mosque/10 hover:bg-background-light dark:hover:bg-mosque/5 transition-colors items-center">
            {/* Property Details */}
            <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
              <div className="relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-nordic-dark dark:text-white group-hover:text-mosque transition-colors cursor-pointer">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{property.location}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bed</span> {property.beds} Beds</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bathtub</span> {property.baths} Baths</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{property.area} m²</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-6 md:col-span-2">
              <div className="text-base font-semibold text-nordic-dark dark:text-gray-200">
                ${property.price.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">
                {property.pricePerMonth ? "Monthly" : "Total Price"}
              </div>
            </div>

            {/* Status */}
            <div className="col-span-6 md:col-span-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                property.status === 'FOR SALE' || property.status === 'FOR RENT' 
                  ? "bg-hint-green text-mosque border-mosque/10"
                  : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                  property.status === 'FOR SALE' || property.status === 'FOR RENT'
                    ? "bg-mosque"
                    : "bg-orange-500"
                }`}></span>
                {property.status}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2">
              <button className="p-2 rounded-lg text-gray-400 hover:text-mosque hover:bg-hint-green/30 transition-all tooltip-trigger" title="Edit Property">
                <span className="material-icons text-xl">edit</span>
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all tooltip-trigger" title="Delete Property">
                <span className="material-icons text-xl">delete_outline</span>
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-mosque/20 flex items-center justify-between bg-gray-50/50 dark:bg-mosque/5">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-nordic-dark dark:text-white">1</span> to <span className="font-medium text-nordic-dark dark:text-white">{Math.min(5, mockProperties.length)}</span> of <span className="font-medium text-nordic-dark dark:text-white">{mockProperties.length}</span> results
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-200 dark:border-mosque/30 rounded-md text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-mosque/20 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 text-sm border border-gray-200 dark:border-mosque/30 rounded-md text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-mosque/20">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export default function FilterModal({ isOpen, onClose, onApplyFilters }: FilterModalProps) {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("Any Type");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [amenities, setAmenities] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      location,
      minPrice,
      maxPrice,
      propertyType,
      bedrooms,
      bathrooms,
      amenities,
    });
    onClose();
  };

  const handleClear = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setPropertyType("Any Type");
    setBedrooms(0);
    setBathrooms(0);
    setAmenities([]);
  };

  return (
    <>
      <div className="fixed inset-0 bg-nordic-dark/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <main className="pointer-events-auto relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <header className="px-8 py-6 border-b border-nordic-dark/5 flex justify-between items-center bg-white sticky top-0 z-30">
            <h1 className="text-2xl font-semibold tracking-tight text-nordic-dark">Filters</h1>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-nordic-dark/5 transition-colors text-nordic-muted">
              <span className="material-icons">close</span>
            </button>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto hide-scroll p-8 space-y-10">
            {/* Section 1: Location */}
            <section>
              <label className="block text-xs font-semibold text-nordic-muted uppercase tracking-wider mb-3">Location</label>
              <div className="relative group">
                <span className="material-icons absolute left-4 top-3.5 text-nordic-muted/60 group-focus-within:text-mosque transition-colors">location_on</span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-background-light border-0 rounded-lg text-nordic-dark placeholder-nordic-muted focus:ring-2 focus:ring-mosque focus:bg-white transition-all shadow-sm focus:outline-none"
                  placeholder="City, neighborhood, or address"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </section>

            {/* Section 2: Price Range */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <label className="block text-xs font-semibold text-nordic-muted uppercase tracking-wider">Price Range</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background-light p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                  <label className="block text-[10px] text-nordic-muted uppercase font-medium mb-1">Min Price</label>
                  <div className="flex items-center">
                    <span className="text-nordic-muted mr-1">$</span>
                    <input
                      className="w-full bg-transparent border-0 p-0 text-nordic-dark font-medium focus:ring-0 text-sm focus:outline-none"
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-background-light p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                  <label className="block text-[10px] text-nordic-muted uppercase font-medium mb-1">Max Price</label>
                  <div className="flex items-center">
                    <span className="text-nordic-muted mr-1">$</span>
                    <input
                      className="w-full bg-transparent border-0 p-0 text-nordic-dark font-medium focus:ring-0 text-sm focus:outline-none"
                      type="number"
                      placeholder="No max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Property Details */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Property Type */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-nordic-muted uppercase tracking-wider">Property Type</label>
                <div className="relative">
                  <select
                    className="w-full bg-background-light border-0 rounded-lg py-3 pl-4 pr-10 text-nordic-dark appearance-none focus:ring-2 focus:ring-mosque focus:outline-none cursor-pointer"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="Any Type">Any Type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                  <span className="material-icons absolute right-3 top-3 text-nordic-muted pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Rooms */}
              <div className="space-y-4">
                {/* Beds */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-nordic-dark">Bedrooms</span>
                  <div className="flex items-center space-x-3 bg-background-light rounded-full p-1">
                    <button onClick={() => setBedrooms(Math.max(0, bedrooms - 1))} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-nordic-muted hover:text-mosque disabled:opacity-50 transition-colors">
                      <span className="material-icons text-base">remove</span>
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{bedrooms === 0 ? "Any" : bedrooms + "+"}</span>
                    <button onClick={() => setBedrooms(bedrooms + 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors">
                      <span className="material-icons text-base">add</span>
                    </button>
                  </div>
                </div>

                {/* Baths */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-nordic-dark">Bathrooms</span>
                  <div className="flex items-center space-x-3 bg-background-light rounded-full p-1">
                    <button onClick={() => setBathrooms(Math.max(0, bathrooms - 1))} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-nordic-muted hover:text-mosque transition-colors">
                      <span className="material-icons text-base">remove</span>
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{bathrooms === 0 ? "Any" : bathrooms + "+"}</span>
                    <button onClick={() => setBathrooms(bathrooms + 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors">
                      <span className="material-icons text-base">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Amenities */}
            <section>
              <label className="block text-xs font-semibold text-nordic-muted uppercase tracking-wider mb-4">Amenities & Features</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: "pool", icon: "pool", label: "Swimming Pool" },
                  { id: "gym", icon: "fitness_center", label: "Gym" },
                  { id: "parking", icon: "local_parking", label: "Parking" },
                  { id: "ac", icon: "ac_unit", label: "Air Conditioning" },
                  { id: "wifi", icon: "wifi", label: "High-speed Wifi" },
                  { id: "patio", icon: "deck", label: "Patio / Terrace" }
                ].map((amenity) => {
                  const isSelected = amenities.includes(amenity.id);
                  return (
                    <label key={amenity.id} className="cursor-pointer group relative">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={isSelected}
                        onChange={() => handleToggleAmenity(amenity.id)}
                      />
                      <div className={`h-full px-4 py-3 rounded-lg border text-sm flex items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? "border-mosque bg-mosque/10 text-mosque font-medium"
                          : "border-nordic-dark/10 bg-white text-nordic-muted hover:border-nordic-dark/20"
                      }`}>
                        <span className={`material-icons text-lg ${isSelected ? "text-mosque" : "text-nordic-muted/70 group-hover:text-nordic-muted"}`}>
                          {amenity.icon}
                        </span>
                        {amenity.label}
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-mosque rounded-full opacity-100 transition-opacity"></div>
                      )}
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-nordic-dark/5 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
            <button onClick={handleClear} className="text-sm font-medium text-nordic-muted hover:text-nordic-dark transition-colors underline decoration-nordic-dark/20 underline-offset-4">
              Clear all filters
            </button>
            <button onClick={handleApply} className="bg-mosque hover:bg-mosque/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-mosque/30 transition-all hover:shadow-mosque/40 flex items-center gap-2 transform active:scale-95">
              Apply Filters
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          </footer>
        </main>
      </div>
    </>
  );
}

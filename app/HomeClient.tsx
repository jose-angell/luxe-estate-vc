"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import FeaturedCard from "../components/FeaturedCard";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../data/mockProperties";

interface HomeClientProps {
  featuredProperties: Property[];
  marketProperties: Property[];
  totalCount: number;
  page: number;
  limit: number;
}

export default function HomeClient({ featuredProperties, marketProperties, totalCount, page, limit }: HomeClientProps) {
  const router = useRouter();
  
  // Navigation active tab (Navbar)
  const [activeNavTab, setActiveNavTab] = useState("Buy");

  // Search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Category filter state (All, House, Apartment, Villa, Penthouse)
  const [activeCategory, setActiveCategory] = useState("All");

  // New in Market sub-tab state (All, Buy, Rent)
  const [marketFilter, setMarketFilter] = useState("All");

  // Favorites state (set of property IDs)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle favorite helper
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Filter properties based on search query, category, and navigation tab
  const filteredFeatured = featuredProperties.filter((p) => {
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeCategory !== "All" && p.type !== activeCategory) {
      return false;
    }
    if (activeNavTab === "Saved Homes") {
      return favorites.includes(p.id);
    }
    if (activeNavTab === "Buy" && p.status !== "FOR SALE") return false;
    if (activeNavTab === "Rent" && p.status !== "FOR RENT") return false;
    return true;
  });

  const filteredMarket = marketProperties.filter((p) => {
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeCategory !== "All" && p.type !== activeCategory) {
      return false;
    }
    if (activeNavTab === "Saved Homes") {
      return favorites.includes(p.id);
    }
    if (marketFilter === "Buy" && p.status !== "FOR SALE") return false;
    if (marketFilter === "Rent" && p.status !== "FOR RENT") return false;
    if (activeNavTab === "Buy" && p.status !== "FOR SALE") return false;
    if (activeNavTab === "Rent" && p.status !== "FOR RENT") return false;
    return true;
  });

  const totalPages = Math.ceil(totalCount / limit);

  const handleNextPage = () => {
    if (page < totalPages) {
      router.push(`/?page=${page + 1}&limit=${limit}`);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      router.push(`/?page=${page - 1}&limit=${limit}`);
    }
  };

  const categories = ["All", "House", "Apartment", "Villa", "Penthouse"];

  return (
    <div className="min-h-screen bg-background-light font-display">
      <Navbar activeTab={activeNavTab} onTabChange={setActiveNavTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
              Find your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium">sanctuary</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
              </span>
              .
            </h1>

            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">
                  search
                </span>
              </div>
              <input
                type="text"
                placeholder="Search by city, neighborhood, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-28 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:outline-none transition-all text-lg"
              />
              <button className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20">
                Search
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 -translate-y-0.5"
                        : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
              <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>
              <button className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors">
                <span className="material-icons text-base">tune</span> Filters
              </button>
            </div>
          </div>
        </section>

        {filteredFeatured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic-dark">Featured Collections</h2>
                <p className="text-nordic-muted mt-1 text-sm">Curated properties for the discerning eye.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredFeatured.map((property) => (
                <FeaturedCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark">
                {activeNavTab === "Saved Homes" ? "Saved Sanctuaries" : "New in Market"}
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                {activeNavTab === "Saved Homes"
                  ? "Your personal selection of dream properties."
                  : "Fresh opportunities added this week."}
              </p>
            </div>

            {activeNavTab !== "Saved Homes" && (
              <div className="hidden md:flex bg-white p-1 rounded-lg border border-nordic-dark/5 shadow-sm">
                {["All", "Buy", "Rent"].map((filterOpt) => {
                  const isActive = marketFilter === filterOpt;
                  return (
                    <button
                      key={filterOpt}
                      onClick={() => setMarketFilter(filterOpt)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                        isActive
                          ? "bg-nordic-dark text-white shadow-sm"
                          : "text-nordic-muted hover:text-nordic-dark"
                      }`}
                    >
                      {filterOpt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {filteredMarket.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMarket.map((property, idx) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={handleToggleFavorite}
                    className={idx === 4 ? "xl:flex" : idx === 5 ? "lg:flex" : "flex"}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="px-6 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-nordic-muted font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
                  className="px-6 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-card border border-nordic-dark/5">
              <span className="material-icons text-4xl text-nordic-muted/40 mb-3">
                gpp_maybe
              </span>
              <h3 className="text-lg font-medium text-nordic-dark">No properties found</h3>
              <p className="text-sm text-nordic-muted mt-1">
                Try modifying your filters or search terms.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

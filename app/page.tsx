"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FeaturedCard from "../components/FeaturedCard";
import PropertyCard from "../components/PropertyCard";
import { mockProperties, Property } from "../data/mockProperties";

export default function Home() {
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

  // Loaded properties limit
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Toggle favorite helper
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Filter properties based on search query, category, and navigation tab
  // (Navbar navigation tabs are Buy, Rent, Sell, Saved Homes. Let's make "Saved Homes" list favorited properties!)
  const filteredFeatured = mockProperties.filter((p) => {
    if (!p.isFeatured) return false;

    // Search query match
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Category filter match
    if (activeCategory !== "All" && p.type !== activeCategory) {
      return false;
    }

    // Saved Homes tab filter
    if (activeNavTab === "Saved Homes") {
      return favorites.includes(p.id);
    }

    // Buy/Rent nav tab filter
    if (activeNavTab === "Buy" && p.status !== "FOR SALE") return false;
    if (activeNavTab === "Rent" && p.status !== "FOR RENT") return false;

    return true;
  });

  const filteredMarket = mockProperties.filter((p) => {
    if (p.isFeatured) return false;

    // Search query match
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Category filter match
    if (activeCategory !== "All" && p.type !== activeCategory) {
      return false;
    }

    // Saved Homes tab filter
    if (activeNavTab === "Saved Homes") {
      return favorites.includes(p.id);
    }

    // "New in Market" sub-filter (All, Buy, Rent)
    if (marketFilter === "Buy" && p.status !== "FOR SALE") return false;
    if (marketFilter === "Rent" && p.status !== "FOR RENT") return false;

    // Buy/Rent main nav tab filter
    if (activeNavTab === "Buy" && p.status !== "FOR SALE") return false;
    if (activeNavTab === "Rent" && p.status !== "FOR RENT") return false;

    return true;
  });

  // Load more properties simulation
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 2);
      setIsLoadingMore(false);
    }, 600);
  };

  const categories = ["All", "House", "Apartment", "Villa", "Penthouse"];

  return (
    <div className="min-h-screen bg-background-light font-display">
      {/* Navigation bar */}
      <Navbar activeTab={activeNavTab} onTabChange={setActiveNavTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Section */}
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

            {/* Search Input Container */}
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

            {/* Category Filters Bar */}
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

        {/* Featured Collections Section */}
        {filteredFeatured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic-dark">Featured Collections</h2>
                <p className="text-nordic-muted mt-1 text-sm">Curated properties for the discerning eye.</p>
              </div>
              <a
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
                href="#"
              >
                View all <span className="material-icons text-sm">arrow_forward</span>
              </a>
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

        {/* New in Market Section */}
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

            {/* Sub-filters for Market properties (Only visible if not on Saved Homes tab) */}
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
                {filteredMarket.slice(0, visibleCount).map((property, idx) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={handleToggleFavorite}
                    className={
                      // Keep responsiveness from original template:
                      idx === 4
                        ? "xl:flex"
                        : idx === 5
                        ? "lg:flex"
                        : "flex"
                    }
                  />
                ))}
              </div>

              {/* Load more button */}
              {visibleCount < filteredMarket.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="min-w-[200px] px-8 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md disabled:opacity-50"
                  >
                    {isLoadingMore ? "Loading..." : "Load more properties"}
                  </button>
                </div>
              )}
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

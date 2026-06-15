"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import FeaturedCard from "../components/FeaturedCard";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../data/mockProperties";
import FilterModal from "../components/FilterModal";
import { useTranslation } from "../lib/i18n/LanguageContext";

interface HomeClientProps {
  featuredProperties: Property[];
  marketProperties: Property[];
  totalCount: number;
  page: number;
  limit: number;
}

export default function HomeClient({ featuredProperties, marketProperties, totalCount, page, limit }: HomeClientProps) {
  const router = useRouter();
  const { t } = useTranslation();

  // Navigation active tab (Navbar) — uses internal key, not translated label
  const [activeNavTab, setActiveNavTab] = useState("Buy");

  // URL Params
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";

  // Category filter state (All, House, Apartment, Villa, Penthouse)
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Search query state
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All");
    setSearchQuery(searchParams.get("q") || "");
    setSearchInput(searchParams.get("q") || "");
  }, [searchParams]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat !== "All") {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handleSearchClick = () => {
    setSearchQuery(searchInput);
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set("q", searchInput.trim());
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // New in Market sub-tab state (All, Buy, Rent)
  const [marketFilter, setMarketFilter] = useState("All");

  // Filter Modal state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<any>(null);

  // Favorites state (set of property IDs)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle favorite helper
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Filter properties based on search query, category, and navigation tab
  const applyFilters = (p: Property) => {
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeCategory !== "All" && p.type !== activeCategory) {
      return false;
    }
    if (activeNavTab === "Buy" && p.status !== "FOR SALE") return false;
    if (activeNavTab === "Rent" && p.status !== "FOR RENT") return false;

    if (filterCriteria) {
      if (filterCriteria.location && !p.location.toLowerCase().includes(filterCriteria.location.toLowerCase())) return false;
      if (filterCriteria.minPrice && p.price < parseInt(filterCriteria.minPrice)) return false;
      if (filterCriteria.maxPrice && p.price > parseInt(filterCriteria.maxPrice)) return false;
      if (filterCriteria.propertyType !== "Any Type" && p.type !== filterCriteria.propertyType) return false;
      if (filterCriteria.bedrooms > 0 && p.beds < filterCriteria.bedrooms) return false;
      if (filterCriteria.bathrooms > 0 && p.baths < filterCriteria.bathrooms) return false;
    }
    return true;
  };

  const isFiltering = searchQuery.trim() !== "" || activeCategory !== "All" || filterCriteria !== null || (activeNavTab !== "Saved Homes" && marketFilter !== "All");
  const showFeatured = !isFiltering && activeNavTab !== "Saved Homes";

  const filteredFeatured = featuredProperties.filter((p) => {
    if (activeNavTab === "Saved Homes") return favorites.includes(p.id);
    return true; // We do not apply filters to featured properties, we just hide the entire section instead
  });

  const filteredMarket = marketProperties.filter((p) => {
    if (activeNavTab === "Saved Homes") return favorites.includes(p.id);
    if (marketFilter === "Buy" && p.status !== "FOR SALE") return false;
    if (marketFilter === "Rent" && p.status !== "FOR RENT") return false;
    return applyFilters(p);
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

  // Categories use internal keys for filtering; labels are translated
  const categories = [
    { key: "All", label: t.categories.all },
    { key: "House", label: t.categories.house },
    { key: "Apartment", label: t.categories.apartment },
    { key: "Villa", label: t.categories.villa },
    { key: "Penthouse", label: t.categories.penthouse },
  ];

  const marketFilters = [
    { key: "All", label: t.home.filterAll },
    { key: "Buy", label: t.home.filterBuy },
    { key: "Rent", label: t.home.filterRent },
  ];

  return (
    <div className="min-h-screen bg-background-light font-display">
      <Navbar activeTab={activeNavTab} onTabChange={setActiveNavTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
              {t.hero.title1}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium">{t.hero.titleHighlight}</span>
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
                placeholder={t.hero.searchPlaceholder}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="block w-full pl-12 pr-28 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:outline-none transition-all text-lg"
              />
              <button
                onClick={handleSearchClick}
                className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20"
              >
                {t.hero.searchButton}
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryClick(cat.key)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 -translate-y-0.5"
                        : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
              <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors"
              >
                <span className="material-icons text-base">tune</span> {t.categories.filters}
              </button>
            </div>
          </div>
        </section>

        {showFeatured && filteredFeatured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic-dark">{t.home.featured}</h2>
                <p className="text-nordic-muted mt-1 text-sm">{t.home.featuredSub}</p>
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
                {activeNavTab === "Saved Homes" ? t.home.savedSanctuaries : t.home.newInMarket}
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                {activeNavTab === "Saved Homes"
                  ? t.home.savedSub
                  : t.home.newInMarketSub}
              </p>
            </div>

            {activeNavTab !== "Saved Homes" && (
              <div className="hidden md:flex bg-white p-1 rounded-lg border border-nordic-dark/5 shadow-sm">
                {marketFilters.map((filterOpt) => {
                  const isActive = marketFilter === filterOpt.key;
                  return (
                    <button
                      key={filterOpt.key}
                      onClick={() => setMarketFilter(filterOpt.key)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                        isActive
                          ? "bg-nordic-dark text-white shadow-sm"
                          : "text-nordic-muted hover:text-nordic-dark"
                      }`}
                    >
                      {filterOpt.label}
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
                  {t.home.previous}
                </button>
                <span className="text-nordic-muted font-medium">
                  {t.home.pageOf.replace("{page}", String(page)).replace("{total}", String(totalPages))}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
                  className="px-6 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md disabled:opacity-50"
                >
                  {t.home.next}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-card border border-nordic-dark/5">
              <span className="material-icons text-4xl text-nordic-muted/40 mb-3">
                gpp_maybe
              </span>
              <h3 className="text-lg font-medium text-nordic-dark">{t.home.noProperties}</h3>
              <p className="text-sm text-nordic-muted mt-1">
                {t.home.noPropertiesSub}
              </p>
            </div>
          )}
        </section>
      </main>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(filters) => setFilterCriteria(filters)}
      />
    </div>
  );
}

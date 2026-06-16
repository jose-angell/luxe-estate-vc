export type Locale = "en" | "es" | "ja";

export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "ja"];
export const DEFAULT_LOCALE: Locale = "en";
export const COOKIE_NAME = "luxe_lang";

export interface Translations {
  nav: {
    buy: string;
    rent: string;
    sell: string;
    savedHomes: string;
    signIn: string;
    signOut: string;
  };
  hero: {
    title1: string;
    titleHighlight: string;
    searchPlaceholder: string;
    searchButton: string;
  };
  categories: {
    all: string;
    house: string;
    apartment: string;
    villa: string;
    penthouse: string;
    filters: string;
  };
  home: {
    featured: string;
    featuredSub: string;
    newInMarket: string;
    newInMarketSub: string;
    savedSanctuaries: string;
    savedSub: string;
    noProperties: string;
    noPropertiesSub: string;
    previous: string;
    next: string;
    pageOf: string;
    filterAll: string;
    filterBuy: string;
    filterRent: string;
  };
  filter: {
    title: string;
    location: string;
    locationPlaceholder: string;
    priceRange: string;
    minPrice: string;
    maxPrice: string;
    noMax: string;
    propertyType: string;
    anyType: string;
    house: string;
    apartment: string;
    condo: string;
    townhouse: string;
    villa: string;
    penthouse: string;
    bedrooms: string;
    bathrooms: string;
    any: string;
    amenities: string;
    pool: string;
    gym: string;
    parking: string;
    ac: string;
    wifi: string;
    patio: string;
    clearAll: string;
    apply: string;
  };
  property: {
    beds: string;
    baths: string;
    perMonth: string;
    squareMeters: string;
    bedroomsLabel: string;
    bathroomsLabel: string;
    propertyType: string;
    scheduleVisit: string;
    contactAgent: string;
    viewAllPhotos: string;
    aboutHome: string;
    amenitiesTitle: string;
    estimatedPayment: string;
    startingFrom: string;
    withDown: string;
    calculateMortgage: string;
    topRatedAgent: string;
    viewOnMap: string;
    readMore: string;
    allRights: string;
    features: string;
    smartHome: string;
    premiumLocation: string;
    heating: string;
    appliances: string;
    secureParking: string;
    naturalLight: string;
  };
  language: {
    selector: string;
  };
}

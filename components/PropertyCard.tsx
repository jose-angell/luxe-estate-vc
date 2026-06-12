"use client";

import { Property } from "../data/mockProperties";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  className?: string;
}

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  className = "",
}: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={`bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group cursor-pointer h-full flex flex-col block ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={property.images[0]}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-mosque hover:text-white transition-colors text-nordic-dark shadow-sm flex items-center justify-center"
        >
          <span className="material-icons text-lg">
            {isFavorite ? "favorite" : "favorite_border"}
          </span>
        </button>
        <div
          className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${
            property.status === "FOR RENT" ? "bg-mosque/90" : "bg-nordic-dark/90"
          }`}
        >
          {property.status}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-lg text-nordic-dark">
            {formattedPrice}
            {property.pricePerMonth && (
              <span className="text-sm font-normal text-nordic-muted">/mo</span>
            )}
          </h3>
        </div>
        <h4 className="text-nordic-dark font-medium truncate mb-1">
          {property.title}
        </h4>
        <p className="text-nordic-muted text-xs mb-4">{property.location}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-nordic-muted text-xs font-medium">
            <span className="material-icons text-sm text-mosque/80">king_bed</span>{" "}
            {property.beds}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs font-medium">
            <span className="material-icons text-sm text-mosque/80">bathtub</span>{" "}
            {property.baths}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs font-medium">
            <span className="material-icons text-sm text-mosque/80">square_foot</span>{" "}
            {property.area}m²
          </div>
        </div>
      </div>
    </Link>
  );
}

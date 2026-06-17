import { mockProperties } from "../../data/mockProperties";
import Image from "next/image";

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-nordic-dark">
            Propiedades
          </h1>
          <p className="text-nordic-muted mt-1">
            Gestiona las propiedades activas en la plataforma.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-mosque text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-mosque/90 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(25,50,47,0.3)] hover:shadow-none hover:translate-y-0.5">
          <span className="material-icons text-sm">add</span>
          Nueva Propiedad
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProperties.map((property) => (
          <div
            key={property.id}
            className="group bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={property.imageUrl}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-mosque shadow-sm">
                ${property.price.toLocaleString()}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-nordic-dark truncate mb-1">
                {property.title}
              </h3>
              <p className="text-sm text-nordic-muted truncate flex items-center gap-1 mb-4">
                <span className="material-icons text-[14px]">location_on</span>
                {property.location}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex gap-4 text-xs text-nordic-muted font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[16px]">bed</span>
                    {property.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[16px]">shower</span>
                    {property.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[16px]">square_foot</span>
                    {property.sqft} sqft
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 text-nordic-muted hover:text-mosque bg-gray-50 hover:bg-hint-green/20 rounded-lg transition-colors">
                    <span className="material-icons text-sm">edit</span>
                  </button>
                  <button className="p-1.5 text-nordic-muted hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
                    <span className="material-icons text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

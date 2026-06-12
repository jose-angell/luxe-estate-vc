"use client";

import dynamic from "next/dynamic";

interface PropertyMapWrapperProps {
  title: string;
  locationString: string;
}

const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">
      <span className="material-icons text-mosque">map</span>
    </div>
  ),
});

export default function PropertyMapWrapper(props: PropertyMapWrapperProps) {
  return <PropertyMap {...props} />;
}

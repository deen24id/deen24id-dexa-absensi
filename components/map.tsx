"use client";

// eslint-disable-next-line import/order
import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

// const center = { lng: 103.6131203, lat: -1.6101229 };

export type MapProps = {
  center: {
    lat: number;
    lng: number;
  };
};

export default function Map({ center }: MapProps) {
  const mapContainer = useRef(null);
  const map = useRef<L.Map | null>(null);
  const [zoom] = useState(16);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new L.Map(mapContainer.current!, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    new MaptilerLayer({
      apiKey: "EJRmY8CkQEdCuz5NkOki",
    }).addTo(map.current);

    const divIcon = L.divIcon({
      className: "leaflet-data-marker",
      html: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#006fee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
    });

    L.marker([center.lat, center.lng], { icon: divIcon }).addTo(map.current);
  }, [zoom]);

  return (
    <div className="relative h-[42vh] aspect-square">
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}

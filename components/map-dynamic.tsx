"use client";
import type { MapProps } from "./map";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function MapDynamic(prop: MapProps) {
  return <Map {...prop} />;
}

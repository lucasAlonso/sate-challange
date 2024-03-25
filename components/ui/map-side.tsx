"use client";

import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useDataStore } from "@/store/data-store";
import { TileMapResponse } from "@/types/tileresponse";

interface Props {
  data: TileMapResponse | undefined;
}

export const MapSide = ({ data }: Props) => {
  const center: LatLngTuple = [
    (data?.bounds[1] + data?.bounds[3]) / 2,
    (data?.bounds[0] + data?.bounds[2]) / 2,
  ];
  return (
    <MapContainer
      center={center || [51.505, -0.09]}
      className="w-[700px] h-[600px] xl:w-[900px] xl:h-[650px]"
      zoom={9}
      scrollWheelZoom={false}
    >
      <TileLayer
        url={
          data?.tmsLayer || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />
    </MapContainer>
  );
};

export default MapSide;

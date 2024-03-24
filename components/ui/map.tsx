"use client";

import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useDataStore } from "@/store/data-store";

const Map = () => {
  const [coord, setCoord] = useState<LatLngTuple>([51.505, -0.09]);

  const purpleOptions = { color: "purple" };
  const mainPolygon = useDataStore((state) => state.mainPolygon);
  const center = L.PolyUtil.centroid(mainPolygon || []);
  useEffect(() => {
    if (center) {
      setCoord([center.lat, center.lng]);
    }
  }, [center]);

  return (
    <MapContainer
      className="w-[900px] h-[600px]"
      center={center || coord}
      zoom={6}
      scrollWheelZoom={false}
    >
      {mainPolygon && (
        <Polygon pathOptions={purpleOptions} positions={mainPolygon} />
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
export default Map;

"use client";

import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useDataStore } from "@/store/data-store";

interface Props {
  isSideMap?: boolean;
}
const Map = ({ isSideMap = false }: Props) => {
  const [coord, setCoord] = useState<LatLngTuple>([51.505, -0.09]);

  const purpleOptions = { color: "purple" };
  const mainPolygon = useDataStore((state) => state.mainPolygon);
  const center = useMemo(() => {
    if (mainPolygon) {
      return L.PolyUtil.centroid(mainPolygon);
    }
    return null;
  }, [mainPolygon]);

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
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};
export default Map;

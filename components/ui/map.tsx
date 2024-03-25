"use client";

import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useDataStore } from "@/store/data-store";

const Map = () => {
  const [coord, setCoord] = useState<LatLngTuple>([51.505, -0.09]);

  const purpleOptions = { color: "purple" };
  const redOptions = { color: "red" };
  const mainPolygon = useDataStore((state) => state.mainPolygon);
  const data = useDataStore((state) => state.data);

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

  function swapCoordinates(coordinatesArray: LatLngTuple[][]) {
    const swappedArray = coordinatesArray.map((pair) => {
      return [pair[1], pair[0]];
    });

    return swappedArray;
  }

  return (
    <MapContainer
      className="w-[900px] h-[650px]"
      center={center || coord}
      zoom={6}
      scrollWheelZoom={false}
    >
      <LayersControl position="topright">
        {" "}
        {data?.features.map((feature) => (
          <LayersControl.Overlay key={feature.id} checked name={feature.id}>
            <FeatureGroup key={feature.id}>
              <Polygon
                pathOptions={redOptions}
                positions={swapCoordinates(
                  feature.geometry
                    .coordinates[0][0] as unknown as LatLngTuple[][],
                )}
                key={feature.id}
              />
              <Marker
                key={feature.id}
                position={L.PolyUtil.centroid(
                  swapCoordinates(
                    feature.geometry
                      .coordinates[0][0] as unknown as LatLngTuple[][],
                  ),
                )}
              >
                <Popup>
                  <a href={`/landsat/${feature.id}`}>View details</a>
                </Popup>
              </Marker>
            </FeatureGroup>
          </LayersControl.Overlay>
        ))}
        {mainPolygon && (
          <Polygon pathOptions={purpleOptions} positions={mainPolygon} />
        )}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </LayersControl>
    </MapContainer>
  );
};
export default Map;

"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

// Local types
interface Island {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  image?: string;
}

const L = typeof window !== "undefined" ? require("leaflet") : null;

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });
const Load = dynamic(() => import("@/components/loader"), { ssr: false });

// Custom Pirate Marker Icon
const islandIcon = L
  ? new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    })
  : undefined;

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [map]);
  return null;
}

export default function MapPage() {
  const [viewMode, setViewMode] = useState<"2D" | "3D">("3D");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [islands, setIslands] = useState<Island[]>([]);
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchIslands() {
      try {
        const response = await fetch("/api/islands");
        if (!response.ok) throw new Error("Failed to fetch islands");
        const data = await response.json();
        setIslands(data);
      } catch (error) {
        console.error("Error fetching islands:", error);
      }
    }
    fetchIslands();
  }, []);

  return (
    <motion.div
      key={viewMode}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen w-full bg-black text-white flex items-center justify-center vintage-map-frame"
      style={{ background: "url('/parchment-bg.jpg') center/cover no-repeat" }}
    >
      <button
        className="absolute top-4 right-4 z-20 bg-[#8B4513] text-white px-4 py-2 rounded-md shadow-md border-2 border-yellow-600 hover:bg-yellow-700 transition"
        onClick={() => setViewMode(viewMode === "3D" ? "2D" : "3D")}
      >
        Toggle {viewMode === "3D" ? "2D" : "3D"}
      </button>

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black">
          <Load />
        </div>
      )}

      {!loading && viewMode === "2D" && (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            className="w-full h-screen vintage-map"
            style={{ height: "100vh", width: "100%" }}
            worldCopyJump={true}
            maxBounds={[
              [-90, -180],
              [90, 180],
            ]}
          >
            <MapResizer />
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" noWrap={true} />
            {islands.map(
              (island) =>
                island.latitude !== undefined &&
                island.longitude !== undefined && (
                  <Marker
                    key={island.id}
                    position={[island.latitude, island.longitude]}
                    icon={islandIcon}
                    eventHandlers={{
                      click: () => {
                        setSelectedIsland(island);
                      },
                    }}
                  >
                    <Popup>
                      <span className="pirate-font">{island.name}</span>
                    </Popup>
                  </Marker>
                )
            )}
          </MapContainer>

          {selectedIsland && (
            <div className="absolute top-20 right-10 p-5 bg-[#1a1a1a] text-white rounded-lg shadow-xl w-96 border border-yellow-600 animate-fade-in">
              <h2 className="text-2xl font-bold pirate-font text-yellow-400">{selectedIsland.name}</h2>
              <p className="mt-2 text-sm text-gray-300">{selectedIsland.description || "No description available."}</p>

              <div className="mt-3 text-sm text-gray-400">
                <p><strong>Latitude:</strong> {selectedIsland.latitude}</p>
                <p><strong>Longitude:</strong> {selectedIsland.longitude}</p>
                <p><strong>ID:</strong> {selectedIsland.id}</p>
              </div>

              <img
  src={`/assets/${selectedIsland.id}.jpg`}
  alt={selectedIsland.name}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "/assets/default.jpg"; // fallback image
  }}
  className="mt-4 rounded-lg max-h-40 object-cover"
/>


              <button
                onClick={() => setSelectedIsland(null)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && viewMode === "3D" && (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Globe islands={islands} />
        </div>
      )}
    </motion.div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { default as GlobeGl } from "globe.gl";

interface Reference {
  id: number;
  source_name: string;
  source_url: string;
  description?: string;
}

interface Discovery {
  id: number;
  discoverer: string;
  discovery_year?: number;
  notes?: string;
}

interface Island {
  id: number;
  name: string;
  latitude: string | number;
  longitude: string | number;
  description?: string;
  image?: string;
  references?: Reference[];
  discoveries?: Discovery[];
}

interface GlobeProps {
  islands: Island[];
}

const GlobeComponent: React.FC<GlobeProps> = ({ islands }) => {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const globeInstance = useRef<any>(null);
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);

  useEffect(() => {
    if (!globeRef.current) {
      console.error("❌ Globe container not found!");
      return;
    }

    if (globeInstance.current) {
      console.warn("⚠️ Globe instance already exists. Skipping re-initialization.");
      return;
    }

    // Initialize globe
    globeInstance.current = GlobeGl()(globeRef.current)
      .globeImageUrl("https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg")
      .bumpImageUrl("https://raw.githubusercontent.com/henry-jackson/react-globe-textures/master/earthbump1k.jpg")
      .backgroundColor("rgba(0,0,0,0)")
      .width(800)
      .height(800);

    // Lighting
    const scene = globeInstance.current.scene();
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    // Controls
    const controls = globeInstance.current.controls();
    controls.enableZoom = true;
    controls.zoomSpeed = 0.5;

    // Camera POV
    globeInstance.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });

    return () => {
      globeInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (globeInstance.current && islands.length > 0) {
      const validIslands = islands.filter((i) => {
        const lat = Number(i.latitude);
        const lng = Number(i.longitude);
        const isValid = !isNaN(lat) && !isNaN(lng);
        return isValid;
      });

      const POINT_RADIUS = 0.5;

      if (validIslands.length > 0) {
        globeInstance.current
          .pointsData(validIslands)
          .pointLat((d: Island) => Number(d.latitude))
          .pointLng((d: Island) => Number(d.longitude))
          .pointColor(() => "#FF6347")
          .pointRadius(POINT_RADIUS)
          .pointAltitude(() => 0.05)
          .onPointClick((island: Island) => {
            if (island?.name) {
              console.log(`Island clicked: ${island.name}`);
              setSelectedIsland(island);
            }
          });
      }
    }
  }, [islands]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
      <div ref={globeRef} className="relative" />

      {selectedIsland && (
        <div className="absolute top-10 right-10 p-6 bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white rounded-3xl shadow-2xl w-[28rem] transform transition-all duration-300 ease-in-out animate-fade-in z-50">
          <h2 className="text-3xl font-bold mb-2">{selectedIsland.name}</h2>
          <p className="text-sm text-gray-300 mb-4">{selectedIsland.description || "No description available."}</p>

          {selectedIsland.image && (
            <img
              src={selectedIsland.image}
              alt={selectedIsland.name}
              className="rounded-lg w-full h-48 object-cover mb-4 border border-gray-700"
            />
          )}

          {selectedIsland.discoveries && selectedIsland.discoveries.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-1">🧭 Discoveries</h3>
              <ul className="text-sm text-gray-300 list-disc list-inside">
                {selectedIsland.discoveries.map((discovery) => (
                  <li key={discovery.id}>
                    {discovery.discoverer} ({discovery.discovery_year || "Year unknown"})
                    {discovery.notes && ` — ${discovery.notes}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedIsland.references && selectedIsland.references.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-1">📚 References</h3>
              <ul className="text-sm text-blue-400 list-disc list-inside">
                {selectedIsland.references.map((ref) => (
                  <li key={ref.id}>
                    <a href={ref.source_url} target="_blank" rel="noopener noreferrer" className="underline">
                      {ref.source_name}
                    </a>
                    {ref.description && ` — ${ref.description}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => setSelectedIsland(null)}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-all duration-200 shadow-md transform hover:scale-105"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;

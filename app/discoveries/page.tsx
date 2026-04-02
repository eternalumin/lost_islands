"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const discoveries = [
  { year: "300 BC", event: "Pytheas' Voyage to Thule", description: "Greek explorer Pytheas embarks on a journey to a mysterious northern island." },
  { year: "1200 AD", event: "Vinland Expeditions", description: "Norse explorers led by Leif Erikson reach what is now North America." },
  { year: "1492 AD", event: "Columbus Reaches the New World", description: "Christopher Columbus lands in the Caribbean, believing he reached Asia." },
  { year: "1872 AD", event: "The Mystery of the Mary Celeste", description: "A ghost ship is found abandoned, with no sign of its crew." },
  { year: "1947 AD", event: "Roswell UFO Incident", description: "A mysterious crash in Roswell sparks alien conspiracy theories." },
];

export default function DiscoveriesPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-8 vintage-parchment"
      style={{ backgroundImage: "url('/aged-parchment.jpg')" }}
    >
      <h1 className="text-4xl text-center font-bold mb-6 old-script">Lost Discoveries</h1>
      <div className="w-full max-w-2xl bg-yellow-100 p-6 rounded-lg shadow-xl border-4 border-yellow-600 bg-opacity-90 parchment-texture">
  <ul className="space-y-4">
    {discoveries.map((item, index) => (
      <li
        key={index}
        className="p-4 bg-yellow-300 hover:bg-yellow-400 cursor-pointer rounded-lg transition duration-300 shadow-lg border-2 border-yellow-700 pirate-scroll"
        onClick={() => setSelectedYear((prev) => (prev === index ? null : index))}
      >
        <h2 className="text-2xl font-semibold text-brown-900 pirate-font">
          {item.year}: {item.event}
        </h2>
        {selectedYear === index && (
          <p className="mt-2 text-brown-800 italic">{item.description}</p>
        )}
      </li>
    ))}
  </ul>
</div>

    </motion.div>
  );
}

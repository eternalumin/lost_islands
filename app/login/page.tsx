'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const chests = new Array(12).fill(0).map((_, index) => ({
  id: index,
  x: Math.random() * 80 + 10, // Random X position
  y: Math.random() * 60 + 20, // Random Y position
}));

const correctChest = Math.floor(Math.random() * chests.length);

export default function PirateLogin() {
  const [attempts, setAttempts] = useState(3);
  const [locked, setLocked] = useState(false);
  const [hint, setHint] = useState('Find the chest with a golden glow at midnight.');
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (attempts === 0) {
      setLocked(true);
      setTimeout(() => setAttempts(3), 600000); // Unlock after 10 minutes
    }
  }, [attempts]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

function handleLogin() {
  setIsLoggedIn(true); 
  setTimeout(() => router.push('/admin'), 2000); // Redirect after showing success effect
}

function handleChestClick(index: number) {
  if (locked) return;
  setSelected(index); // Highlight selected chest

  if (index !== correctChest) {
    setAttempts((prev) => prev - 1);
  }
}


  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Gold Coins Falling Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 text-lg"
            initial={{ opacity: 1, y: -10 }}
            animate={{ opacity: 0, y: 800 }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            style={{ left: `${Math.random() * 100}%` }}
          >
            💰
          </motion.div>
        ))}
      </div>

      {/* Lightning Effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
      />

      {/* Pirate Hint */}
      <motion.div
        className="absolute top-5 left-1/2 transform -translate-x-1/2 text-lg font-bold text-yellow-300"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
      >
        {hint}
      </motion.div>

      {/* Treasure Chests */}
      {chests.map((chest, index) => (
  <motion.div
    key={index}
    className={`absolute w-20 h-20 cursor-pointer ${
      selected === index
        ? index === correctChest
          ? 'border-4 border-yellow-400'
          : 'border-4 border-red-600'
        : ''
    }`}
    style={{ left: `${chest.x}%`, top: `${chest.y}%` }}
    animate={
      selected === index && index !== correctChest
        ? { rotate: [-5, 5, -5, 5, 0] }
        : {}
    }
    onClick={() => handleChestClick(index)}
  >
    <Image
      src="/chest.png"
      alt="Treasure Chest"
      width={100}
      height={100}
    />
    
    {/* Small flickering light near the correct chest */}
    {index === correctChest && (
      <motion.div
        className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-80"
        style={{ top: "-10px", left: "50%" }}
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    )}
  </motion.div>
))}


      {/* Login Box Reveal */}
      {selected === correctChest && (
  <motion.div
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-700 p-6 rounded-xl text-white text-center shadow-lg"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
  >
    <h2 className="text-2xl font-bold">Enter the Pirate’s Cove</h2>
    <input
      type="text"
      placeholder="Username"
      className="block my-2 p-2 rounded bg-gray-800 border border-gray-500 w-full"
    />
    <input
      type="password"
      placeholder="Password"
      className="block my-2 p-2 rounded bg-gray-800 border border-gray-500 w-full"
    />
    <button
      onClick={handleLogin}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
    >
      Login
    </button>
  </motion.div>
)}

      {/* Lockout Message */}
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-red-500 text-2xl font-bold">
          You’ve been locked out! Wait 10 minutes.
        </div>
      )}
    </div>
  );
}

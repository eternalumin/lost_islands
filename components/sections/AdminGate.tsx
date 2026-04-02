'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';

export default function AdminShrine() {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <section
      id="admin-shrine"
      className="relative h-screen w-full flex flex-col items-center justify-center bg-[#03030a] overflow-hidden"
    >
      {/* Background gradients + fog shadows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-black to-[#020203] z-0" />
      <div className="absolute w-[150%] h-[150%] bg-[radial-gradient(#111_20%,transparent_70%)] blur-2xl opacity-30 z-0 animate-pulse-slow" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="z-10 text-5xl md:text-6xl font-bold text-white tracking-wide"
      >
        🕯️ Admin Shrine
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-gray-400 mt-3 z-10 text-center max-w-xl"
      >
        Only the chosen may unlock the chamber. Glyph awaits your touch.
      </motion.p>

      {/* Glyph Lock Button */}
      <motion.button
        onClick={handleClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative mt-12 z-10"
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: hovered ? 1.1 : 1,
          boxShadow: hovered
            ? '0 0 50px rgba(128,0,255,0.7)'
            : '0 0 20px rgba(255,255,255,0.1)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="p-6 rounded-full bg-black/70 border-2 border-purple-800 shadow-[0_0_60px_#400080] backdrop-blur-xl">
          <LockKeyhole className="w-16 h-16 text-purple-500 animate-pulse" />
        </div>
        {hovered && (
          <span className="absolute inset-0 animate-ping rounded-full bg-purple-700 opacity-30" />
        )}
      </motion.button>
    </section>
  );
}

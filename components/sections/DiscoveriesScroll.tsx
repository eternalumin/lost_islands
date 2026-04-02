'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

// Preload the model
useGLTF.preload('/assets/scroll.glb');

function ScrollModel() {
  const { scene } = useGLTF('/assets/scroll.glb');
  return <primitive object={scene} scale={0.25} position={[0, -0.5, 0]} />;
}

export default function DiscoveriesScroll() {
  return (
    <section
      id="discoveries"
      className="relative h-screen w-full bg-gradient-to-b from-[#2d3e53] to-[#1c2a38] text-white overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight intensity={1.5} position={[2, 4, 2]} />
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={1.5} floatIntensity={1.2}>
              <ScrollModel />
            </Float>
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground UI */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 bg-black bg-opacity-30 backdrop-blur-sm">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-blue-400"
        >
          Ancient Discoveries
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-w-xl text-lg text-gray-200 mb-6"
        >
          Pieces of forgotten scrolls flutter in time, each holding secrets of vanished islands.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 100 }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-10 rounded-xl shadow-xl hover:scale-105"
          onClick={() => window.location.href = "/map"}
        >
          Explore the Map →
        </motion.button>
      </div>
    </section>
  );
}

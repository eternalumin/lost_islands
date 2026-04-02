'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

function OrbModel() {  
  const { scene } = useGLTF('/assets/orb.glb');
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 1.5; // Increased reflections
        child.material.emissive = new THREE.Color(0x00bfff); // Brilliant blue glow
        child.material.emissiveIntensity = 0.5; // Stronger glow
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={3} />;  // Further increased orb size and zoomed-in focus
}

export default function SubmissionsShrine() {
  const [showForm, setShowForm] = useState(false);
  const sectionRef = useRef(null);
  const orbRef = useRef<THREE.Group>(null);

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <section
      ref={sectionRef}
      id="submission"
      className="h-screen bg-gradient-to-b from-[#05050d] to-[#000103] text-white relative overflow-hidden"
    >
      {/* 3D Orb Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }} shadows>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 5, 3]} intensity={1.8} castShadow />
          <spotLight position={[0, 5, 10]} angle={0.3} intensity={1.5} penumbra={1} />
          <Environment preset="sunset" />
          <Float speed={2.5} rotationIntensity={2}>
            <group ref={orbRef}>
              <OrbModel />
            </group>
          </Float>
          <OrbitControls enableZoom={true} maxDistance={10} minDistance={2} />
        </Canvas>
      </div>

      {/* Title and Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-7xl md:text-8xl font-bold mb-10 text-black-400 drop-shadow-[0_0_30px_rgba(0,191,255,0.8)]"
        >
          Discover the Lost!
        </motion.h2>

        {!showForm && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.5, type: 'spring', stiffness: 100 }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl md:text-2xl font-semibold py-5 px-12 rounded-xl shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
            onClick={() => setShowForm(true)}
          >
            Submit Your Theory →
          </motion.button>
        )}
      </div>

      {/* Submission Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6 text-blue-400 drop-shadow-[0_0_30px_rgba(0,191,255,0.8)]">
            Submit Your Theory
          </h2>
          <p className="max-w-xl mb-6 text-lg text-gray-300">
            Speak to the AI shrine. Share your whispers of the lost. Verify yourself through magic (OTP).
          </p>

          <form className="bg-[#121212]/70 backdrop-blur-md p-8 rounded-xl w-full max-w-md border border-gray-700 shadow-2xl">
            <label className="block text-left mb-3 font-semibold text-lg">Your Name</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-black border border-gray-600 text-white mb-5"
            />

            <label className="block text-left mb-3 font-semibold text-lg">Island Theory</label>
            <textarea
              rows={5}
              className="w-full p-3 rounded bg-black border border-gray-600 text-white mb-5"
            />

            <label className="block text-left mb-3 font-semibold text-lg">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 rounded bg-black border border-gray-600 text-white mb-5"
            />

            <div className="flex justify-between mt-6">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleCancel}
                className="bg-[#333333] hover:bg-[#444444] text-white text-xl font-bold py-4 px-4.5 rounded-xl shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
              >
                Cancel
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-4.5 rounded-xl shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
              >
                Submit to Shrine
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </section>
  );
}

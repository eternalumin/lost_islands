'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AboutPage = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const top = ref.current?.getBoundingClientRect().top;
      if (top && top < window.innerHeight * 0.75) {
        controls.start({ opacity: 1, y: 0 });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-serif">
      <div className="container mx-auto py-20 px-6">
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl text-center mb-10">
          About Lost Islands
        </motion.h1>

        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={controls} transition={{ duration: 1 }} className="bg-[#1a1a1a] p-8 rounded-xl shadow-lg">
          <p className="text-lg leading-relaxed">
            Lost Islands is an immersive project exploring the mysteries of islands that vanished over time. Combining technology with history, we bring their stories to life.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="mt-10 bg-[#1a1a1a] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl mb-4">Features</h2>
          <ul className="list-disc list-inside">
            <li>Interactive 3D globe and map</li>
            <li>Detailed island histories</li>
            <li>Dynamic discoveries and theories</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="mt-10 bg-[#1a1a1a] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl mb-4">Tech Stack</h2>
          <p>Next.js, Three.js, Tailwind CSS, PostgreSQL, Node.js, and more.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mt-10 bg-[#1a1a1a] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl mb-4">Contact</h2>
          <p>Reach out via email or follow on GitHub for updates.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;

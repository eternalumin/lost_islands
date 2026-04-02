'use client';
import './globals.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import HeroOcean from '@/components/sections/HeroOcean';
import DiscoveriesScroll from '@/components/sections/DiscoveriesScroll';
import SubmissionsShrine from '@/components/sections/SubmissionsShrine';
import AdminGate from '@/components/sections/AdminGate';
import LoreBook from '@/components/sections/LoreBook';

export default function Home() {
  useEffect(() => {
    gsap.from('.section', {
      opacity: 0,
      y: 80,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.section',
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <main className="bg-[#0a0f1e] text-white overflow-x-hidden">
      <HeroOcean />
      <DiscoveriesScroll />
      <SubmissionsShrine />
      <AdminGate />
      <LoreBook />
    </main>
  );
}

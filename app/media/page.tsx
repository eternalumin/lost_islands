'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon } from 'lucide-react';

const images = [
  {
    id: 1,
    title: 'Ancient Map of the Pacific',
    url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074',
    description: 'Historical navigation chart showing major Pacific islands',
  },
  {
    id: 2,
    title: "Explorer's Journal",
    url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2070',
    description: 'Detailed expedition notes from early voyages',
  },
  {
    id: 3,
    title: 'Navigation Tools',
    url: 'https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?q=80&w=2069',
    description: 'Traditional navigation instruments used by explorers',
  },
  {
    id: 4,
    title: 'Island Discovery',
    url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073',
    description: 'First documented sighting of a new island',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MediaPage() {
  return (
    <div className="container py-8 bg-[url('/parchment-texture.jpg')] bg-cover bg-center min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-5xl font-bold text-brown-900 drop-shadow-md font-serif">Media Gallery</h1>
        <p className="text-lg text-brown-700 italic">Explore historical images and artifacts from lost expeditions</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {images.map((image) => (
          <motion.div key={image.id} variants={item}>
            <Card className="overflow-hidden group cursor-pointer border-4 border-yellow-700 rounded-xl shadow-lg bg-yellow-100">
              <CardContent className="p-0 relative">
                <div
                  className="aspect-[4/3] bg-cover bg-center border-b-4 border-yellow-700"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <ImageIcon className="w-10 h-10 mx-auto mb-2 text-yellow-400" />
                    <h3 className="font-semibold mb-1 text-lg">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

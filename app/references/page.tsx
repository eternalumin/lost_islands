'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Link as LinkIcon, Globe, ScrollText } from 'lucide-react';
import Link from 'next/link';

const references = [
  {
    id: 1,
    title: 'Historical Navigation Journals',
    category: 'Primary Sources',
    description: 'Original expedition logs and journals from Pacific voyages',
    links: [
      {
        title: 'Captain Cook\'s Journal',
        url: '#',
      },
      {
        title: 'Roggeveen\'s Easter Island Account',
        url: '#',
      },
    ],
    icon: ScrollText,
  },
  {
    id: 2,
    title: 'Academic Publications',
    category: 'Research Papers',
    description: 'Peer-reviewed studies on Pacific exploration history',
    links: [
      {
        title: 'Pacific Navigation Techniques',
        url: '#',
      },
      {
        title: 'Island Discovery Timeline Analysis',
        url: '#',
      },
    ],
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'Cartographic Archives',
    category: 'Maps & Charts',
    description: 'Historical maps and navigation charts',
    links: [
      {
        title: 'Early Pacific Maps Collection',
        url: '#',
      },
      {
        title: 'Navigation Chart Database',
        url: '#',
      },
    ],
    icon: Globe,
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

export default function ReferencesPage() {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">References & Resources</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collection of historical documents, academic papers, and
          cartographic resources that detail Pacific exploration history.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {references.map((reference) => (
          <motion.div key={reference.id} variants={item}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <reference.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {reference.category}
                  </span>
                </div>
                <CardTitle className="text-xl">{reference.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {reference.description}
                </p>
                <div className="space-y-2">
                  {reference.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <LinkIcon className="h-4 w-4" />
                      {link.title}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
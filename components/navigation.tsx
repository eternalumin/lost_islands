'use client';

import {
  Compass,
  Map,
  BookOpen,
  Image,
  UserCircle,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { href: '/', icon: Compass, label: 'Home' },
  { href: '/map', icon: Map, label: 'Map' },
  { href: '/about', icon: BookOpen, label: 'About' },
  { href: '/login', icon: UserCircle, label: 'Login' },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-6 left-6 z-50"
    >
      <div className="flex items-start gap-3">
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a2744] to-[#0a0f1e] border-2 border-amber-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(212,168,87,0.3)]"
          onClick={() => setOpen((prev) => !prev)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Toggle Navigation"
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {open ? (
              <X className="text-amber-400 w-7 h-7" />
            ) : (
              <Compass className="text-amber-400 w-7 h-7" />
            )}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col gap-3 mt-1"
            >
              {navItems.map(({ href, icon: Icon, label }, index) => {
                const isActive = pathname === href;

                return (
                  <Link href={href} key={href} onClick={() => setOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.15, x: 5 }}
                      className={`w-12 h-12 flex items-center justify-center rounded-full border-2 shadow-lg cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-300 shadow-amber-500/30'
                          : 'bg-gradient-to-tr from-[#1a2744] to-[#0a0f1e] border-amber-600/50 hover:border-amber-400 hover:shadow-amber-400/20'
                      }`}
                      title={label}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? 'text-white' : 'text-amber-300'
                        }`}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

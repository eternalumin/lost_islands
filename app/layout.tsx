import './globals.css';
import type { Metadata } from 'next';
import { Pirata_One, Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const pirataOne = Pirata_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pirata',
});

export const metadata: Metadata = {
  title: 'Lost Islands | Explore Forgotten Realms',
  description:
    'Dive into the ocean of forgotten realms. Discover mysterious islands, ancient treasures, and lost civilizations.',
  keywords: ['islands', 'exploration', 'maps', 'treasure', 'adventure', 'vintage'],
  openGraph: {
    title: 'Lost Islands | Explore Forgotten Realms',
    description:
      'Dive into the ocean of forgotten realms. Discover mysterious islands, ancient treasures, and lost civilizations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${pirataOne.variable} font-sans`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
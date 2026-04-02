import { Anchor, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-amber-600/20 bg-[#0a0f1e]/80 backdrop-blur-sm py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          <Anchor className="h-5 w-5 text-amber-500" />
          <p className="text-sm leading-relaxed text-gray-400">
            Built with passion for vintage map exploration
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Lost Islands</span>
          <span className="text-amber-600">•</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-amber-500" />
          </span>
        </div>
      </div>
    </footer>
  );
}
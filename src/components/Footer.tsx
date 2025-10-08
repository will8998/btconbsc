"use client";

import { Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 h-12 bg-background/80 backdrop-blur border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-12 flex items-center justify-between text-xs text-white/60">
        <span>© {new Date().getFullYear()} BTC on BSC Strategy</span>
        <a
          href="https://x.com/btconbsc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-white"
        >
          <Twitter size={14} />
          <span className="hidden sm:inline">@btconbsc</span>
        </a>
      </div>
    </footer>
  );
}



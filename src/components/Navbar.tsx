"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

export function Navbar() {
  return (
    <div className="sticky top-0 z-40 bg-[#0b0e11] border-b border-white/10">
      <div className="w-full px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-wide text-white">
          <span className="text-2xl">BTC on BSC</span>
        </Link>

        {/* Primary nav */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] text-white/80">
          <a
            href="https://dexscreener.com/bsc/0x523d78f26B5674e509Ba79517Df9a778b1885BaE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Dexscreener
          </a>
          <a
            href="https://t.me/cbbtcstrategy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Community
          </a>
        </nav>

        {/* Far right: Open App */}
        <Link href="/dashboard" className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[--color-accent] text-black font-bold shadow-md hover:opacity-90">
          Open App
        </Link>
      </div>
    </div>
  );
}



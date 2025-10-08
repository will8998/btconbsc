"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

export function Navbar() {
  return (
    <div className="sticky top-0 z-40 bg-[--color-accent]">
      <div className="w-full px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-wide text-black">
          <span className="text-2xl">BTC on BSC</span>
        </Link>

        {/* Primary nav */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] text-black/90">
          <a
            href="https://dexscreener.com/base/0x156053D0F9d842149164C9a8A595D1E0E1c41eEA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            Dexscreener
          </a>
          <a
            href="https://t.me/cbbtcstrategy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            Community
          </a>
        </nav>

        {/* Far right: Open App */}
        <Link href="/dashboard" className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-black text-[--color-accent] font-medium">
          Open App
        </Link>
      </div>
    </div>
  );
}



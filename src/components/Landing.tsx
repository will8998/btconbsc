"use client";

import { ZkSection } from "@/components/ZkSection";
import Image from "next/image";

export function Landing() {
  return (
    <div>
      {/* Compact stats bar under navbar */}
      <section className="w-full border-b border-white/10 bg-background/60">
        <div className="app-container py-2 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex items-center justify-between rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
            <span className="text-xs text-white/70">ETH</span>
            <span className="text-sm font-semibold">0</span>
          </div>
          <div className="flex items-center justify-between rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
            <span className="text-xs text-white/70">BTC on BSC</span>
            <span className="text-sm font-semibold">0</span>
          </div>
          <div className="flex items-center justify-between rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
            <span className="text-xs text-white/70">Progress</span>
            <span className="text-sm font-semibold">0%</span>
          </div>
          <div className="flex items-center justify-between rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
            <span className="text-xs text-white/70">Rewards</span>
            <span className="text-sm font-semibold">0 ETH</span>
          </div>
        </div>
      </section>
      
      <section className="relative overflow-hidden min-h-screen parallax-hero with-overlay overlay-strong">
        <video
          className="hero-video absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          src="/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-center z-10">
          <Image src="/logo.png" alt="BTC on BSC Strategy" width={600} height={200} className="w-[70%] max-w-[680px] h-auto object-contain drop-shadow-lg" />
          <p className="mt-6 text-white/80 max-w-2xl mx-auto">
            Automated buys, smart profit-taking, and deflationary burns—on repeat.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="/dashboard" className="btn-primary px-5 py-3">Enter App</a>
            <a href="#story" className="px-5 py-3 rounded-md border border-white/10 hover:bg-white/5">How it works</a>
          </div>
        </div>
      </section>

      <ZkSection />

    
    
   
    </div>
  );
}



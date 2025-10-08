import Image from "next/image";
import Analytics from "@/components/Analytics";

export default function Home() {
  return (
    <>
      <section className="w-full bg-[--color-background]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-white font-bold leading-tight tracking-tight text-4xl md:text-6xl">
              BTC on BSC Strategy
              <br />
              <span className="text-white">Perpetual</span> bitcoin accumulation on BSC
            </h1>

            {/* How it works – short hero explainer */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70 mb-2">1st</div>
                <p className="text-white/90 text-sm">10% of each trade is taken as fees and saved in the protocol (minus rake).</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70 mb-2">2nd</div>
                <p className="text-white/90 text-sm">When fees are sufficient, the machine automatically buys <span className="font-semibold">$BTC</span> on BSC.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70 mb-2">3rd</div>
                <p className="text-white/90 text-sm">The position is listed for 1.2× entry (target +20%) using on-chain liquidity.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70 mb-2">4th</div>
                <p className="text-white/90 text-sm">When the target hits, received BNB is used to buy back and burn, reducing supply.</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="relative aspect-video w-full bg-white/5 rounded-md">
              <Image src="/BTC.png" alt="BTC on BSC" fill className="object-contain p-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Removed About section per request */}

      <Analytics />
    </>
  );
}

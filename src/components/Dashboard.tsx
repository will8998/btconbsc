"use client";

import { useState } from "react";
import { useOrders, useStrategyStatus, useBuyTrigger } from "@/lib/hooks";
import { formatEther } from "viem";
import { Coins, Wallet, Flame, CheckCircle2, ArrowRightLeft } from "lucide-react";

export function Dashboard() {
  const [progressPercent] = useState(8.6);
  const { data: status } = useStrategyStatus();
  const { data: orders } = useOrders();
  const { trigger } = useBuyTrigger();
  const [txState, setTxState] = useState<"idle"|"pending"|"success"|"error">("idle");
  const [activeChart, setActiveChart] = useState<"BNB"|"BTC_BSC">("BNB");
  const [tab, setTab] = useState<"active"|"sold">("active");

  return (
    <div className="py-8 sm:py-10 md:py-12">
      {/* Live holdings moved from Home */}
      <section className="app-container">
        <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-[--color-muted] border border-white/10 mb-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[--color-accent]"></span>
          Live holdings
        </div>
        <div className="card p-4 sm:p-5 md:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">BTC on BSC Strategy is currently holding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
            <div className="rounded-xl bg-[--color-muted] p-4 border border-white/10 h-full">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Wallet size={16} /> BNB
              </div>
              <div className="text-2xl font-semibold mt-1">0</div>
            </div>
            <div className="rounded-xl bg-[--color-muted] p-4 border border-white/10 h-full">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Coins size={16} /> BTC on BSC
              </div>
              <div className="text-2xl font-semibold mt-1">0</div>
            </div>
            <div className="rounded-xl bg-[--color-muted] p-4 border border-white/10 h-full">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>Progress to Next Purchase</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-black/30 overflow-hidden">
                <div className="h-2 bg-[--color-accent]" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-3 text-xs text-white/70">When the machine acquires the missing <b>0 BNB</b>, the contract autobuys BTC on BSC.</p>
            </div>
            <div className="rounded-xl bg-[--color-muted] p-4 border border-white/10 h-full">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="inline-flex items-center gap-1"><Flame size={14}/> Burned token</span>
                <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">0.73% of 1B</span>
              </div>
              <div className="text-2xl font-semibold mt-2">0</div>
            </div>
          </div>
        </div>
      </section>

      {/* Old header removed; consolidated into live holdings above */}

      <section className="card p-4 sm:p-5 md:p-6 mb-6 app-container">
        <div className="flex items-center justify-between text-xs text-white/70">
          <span>Progress to Next Purchase</span>
          <span>Current rewards: 0 BNB</span>
        </div>
        <div className="mt-3 h-12 rounded-lg bg-[--color-muted] border border-white/10 flex items-center px-3">
          <span className="text-xs text-white/70">When the machine acquires the missing <b>0 ETH</b>, the first entity to trigger the functions below will process the mechanism forward and earn a reward.</span>
        </div>
        <div className="mt-4">
          <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-2 bg-[--color-accent]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <button
            className="btn-primary mt-3 w-full py-3 disabled:opacity-50"
            disabled={txState === "pending"}
            onClick={async () => {
              try {
                setTxState("pending");
                const _hash = await trigger();
                setTxState("success");
              } catch (e) {
                console.error(e);
                setTxState("error");
              } finally {
                setTimeout(() => setTxState("idle"), 4000);
              }
            }}
          >
            {txState === "pending" ? "Processing…" : txState === "success" ? "Buy submitted" : txState === "error" ? "Failed - retry" : "Buy BTC"}
          </button>
        </div>
      </section>

      {/* Orders */}
      <section className="app-container mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-xs">
            <button className={`px-3 py-1 rounded-full ${tab === "active" ? "bg-[--color-accent] text-white" : "hover:bg-white/10"}`} onClick={() => setTab("active")}>Currently Holding</button>
            <button className={`px-3 py-1 rounded-full ${tab === "sold" ? "bg-[--color-accent] text-white" : "hover:bg-white/10"}`} onClick={() => setTab("sold")}>Sold</button>
          </div>
          <span className="text-xs text-white/60">Orders</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(tab === "active" ? orders?.active : orders?.completed)?.slice(0,3).map((o) => (
            <div key={o.id} className="card p-4">
              <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                <span>#{o.id}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-white/10 bg-white/5">{tab === "active" ? <>Open</> : <><CheckCircle2 size={12}/> Sold</>}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-[--color-muted] p-3 border border-white/10">
                  <div className="text-white/70 text-xs">ETH Spent</div>
                  <div className="font-semibold mt-1">{Number(formatEther(o.ethSpent)).toFixed(3)} Ξ</div>
                </div>
                <div className="rounded-lg bg-[--color-muted] p-3 border border-white/10">
                  <div className="text-white/70 text-xs">PEPE Bought</div>
                  <div className="font-semibold mt-1">{o.toshiBought.toString()}</div>
                </div>
                <div className="rounded-lg bg-[--color-muted] p-3 border border-white/10">
                  <div className="text-white/70 text-xs">Est. Value (now)</div>
                  <div className="font-semibold mt-1">—</div>
                </div>
                <div className="rounded-lg bg-[--color-muted] p-3 border border-white/10">
                  <div className="text-white/70 text-xs">Target to Sell</div>
                  <div className="font-semibold mt-1">—</div>
                </div>
              </div>
              {tab === "active" ? (
                <div className="mt-3">
                  <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                    <div className="h-2 bg-[--color-accent]" style={{ width: `82%` }} />
                  </div>
                  <button className="btn-secondary mt-3 w-full py-2 inline-flex items-center justify-center gap-1"><ArrowRightLeft size={14}/> Sell</button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="card p-3 md:p-4 app-container">
        <div className="flex items-center justify-between text-xs text-white/60 mb-3">
          <span>Market Chart</span>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              className={`px-3 py-1 rounded-full text-xs ${activeChart === "BNB" ? "bg-[--color-accent] text-white" : "hover:bg-white/10"}`}
              onClick={() => setActiveChart("BNB")}
            >
              BNB
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs ${activeChart === "BTC_BSC" ? "bg-[--color-accent] text-white" : "hover:bg-white/10"}`}
              onClick={() => setActiveChart("BTC_BSC")}
            >
              BTC on BSC
            </button>
          </div>
        </div>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-md border border-white/10">
          {activeChart === "BNB" ? (
            <iframe
              className="w-full h-full"
              src="https://www.tradingview.com/widgetembed/?symbol=BINANCE:BNBUSDT&interval=60&hidesidetoolbar=1&symboledit=1&saveimage=0&toolbarbg=rgba(0,0,0,0)&hideideas=1&studies=[]&theme=dark&style=1&timezone=Etc/UTC&withdateranges=1&allow_symbol_change=1#"
              title="BNB Chart"
            />
          ) : (
            <iframe
              className="w-full h-full"
              src="https://dexscreener.com/bsc/0x0000000000000000000000000000000000000000?embed=1&theme=dark"
              title="Dexscreener"
            />
          )}
        </div>
      </section>

      <div className="h-6" />
    </div>
  );
}



"use client";

import { useQuery } from "@tanstack/react-query";

type AnalyticsData = {
  btcUsd?: number;
  btcOnBscUsd?: number;
  bscBnbVol24hUsd?: number;
  updatedAt: number;
};

type DexToken = { symbol?: string };
type DexVolume = { h24?: number | string };
type DexPair = { priceUsd?: string; baseToken?: DexToken; quoteToken?: DexToken; volume?: DexVolume };
type DexSearchResponse = { pairs?: DexPair[] };

async function fetchAnalytics(): Promise<AnalyticsData> {
  // Public endpoints
  // - BTC USD via CoinGecko Simple Price
  // - BTC on BSC price via Dexscreener symbol search on BSC
  // - BSC BNB 24h volume via Dexscreener chain summary
  const [btc, btcBsc, bscSummary] = await Promise.allSettled([
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then((r) => r.json() as Promise<Record<string, { usd: number }>>),
    // Dexscreener BTC on BSC by symbol search (adjust if you have token address)
    fetch("https://api.dexscreener.com/latest/dex/search?q=btc%20bsc").then((r) => r.json() as Promise<DexSearchResponse>),
    fetch("https://api.dexscreener.com/latest/dex/chains/bsc").then((r) => r.json() as Promise<DexSearchResponse>),
  ]);

  const res: AnalyticsData = { updatedAt: Date.now() };

  if (btc.status === "fulfilled" && btc.value?.bitcoin?.usd) {
    res.btcUsd = Number(btc.value.bitcoin.usd);
  }

  if (btcBsc.status === "fulfilled" && Array.isArray((btcBsc.value as DexSearchResponse)?.pairs)) {
    const list = (btcBsc.value as DexSearchResponse).pairs as DexPair[];
    const pair = list.find((p) => (p?.priceUsd ?? null) && /btc/i.test(p?.baseToken?.symbol || "") && /bsc|wbnb|bnb/i.test(p?.quoteToken?.symbol || ""));
    if (pair?.priceUsd) res.btcOnBscUsd = Number(pair.priceUsd);
  }

  if (bscSummary.status === "fulfilled" && (bscSummary.value as DexSearchResponse)?.pairs) {
    const pairs = ((bscSummary.value as DexSearchResponse).pairs || []) as DexPair[];
    const vol = pairs
      .filter((p) => /bnb|wbnb/i.test(p?.quoteToken?.symbol || ""))
      .reduce((acc: number, p: DexPair) => acc + (Number(p?.volume?.h24) || 0), 0);
    if (Number.isFinite(vol)) res.bscBnbVol24hUsd = vol;
  }

  return res;
}

export default function Analytics() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    refetchInterval: 60_000, // 1 min polling
  });

  const fmt = (n?: number, opts: Intl.NumberFormatOptions = {}) =>
    n == null ? "--" : new Intl.NumberFormat("en-US", opts).format(n);

  return (
    <section className="w-full bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="text-white/70 text-sm">BTC Price</div>
          <div className="text-3xl font-semibold mt-1">${fmt(data?.btcUsd, { maximumFractionDigits: 0 })}</div>
        </div>
        <div>
          <div className="text-white/70 text-sm">BTC on BSC Price</div>
          <div className="text-3xl font-semibold mt-1">${fmt(data?.btcOnBscUsd, { maximumFractionDigits: 4 })}</div>
        </div>
        <div>
          <div className="text-white/70 text-sm">BSC BNB Vol (24h)</div>
          <div className="text-3xl font-semibold mt-1">${fmt(data?.bscBnbVol24hUsd, { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="self-end">
          <button onClick={() => refetch()} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm">Refresh</button>
          <div className="text-xs text-white/50 mt-2">{isLoading ? "Updating..." : isError ? "Error fetching data" : `Updated ${new Date(data?.updatedAt || Date.now()).toLocaleTimeString()}`}</div>
        </div>
      </div>
    </section>
  );
}



import { Dashboard } from "@/components/Dashboard";

export default function Page() {
  return (
    <div>
      <section className="app-container pt-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-3 text-white/80">We&rsquo;re putting the finishing touches on BTC on BSC Strategy. Join our Telegram to get updates and early access.</p>
        <a
          href="https://t.me/btconbsc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-4 py-2 rounded-md bg-white/10 border border-white/10 hover:bg-white/20 text-sm"
        >
          Join Telegram
        </a>
      </section>

      <Dashboard />
    </div>
  );
}



import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Samurai-style Japanese serif for brand look
const brandSerif = Noto_Serif_JP({
  variable: "--font-brand",
  weight: ["400","600","700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BTC on BSC Strategy",
  description: "Perpetual bitcoin accumulation on BNB Smart Chain (BSC)",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.jpg" },
      { rel: "shortcut icon", url: "/favicon.jpg" },
      { rel: "apple-touch-icon", url: "/favicon.jpg" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${brandSerif.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main className="w-full relative z-10 pb-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

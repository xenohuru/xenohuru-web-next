import type { Metadata, Viewport } from "next";
import "./globals.css";
import { EnhancedNavbar } from "@/components/EnhancedNavbar";
import { EnhancedFooter } from "@/components/EnhancedFooter";
import { BackToTop } from "@/components/BackToTop";
import { Preloader } from "@/components/Preloader";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Xenohuru — Explore Tanzania",
  description: "Discover Tanzania's wonders — from Mount Kilimanjaro to Zanzibar's beaches. GPS-accurate attractions, real-time weather, and open data.",
  keywords: ["Tanzania", "tourism", "safari", "Kilimanjaro", "Zanzibar", "Serengeti", "travel", "Africa"],
  manifest: "/manifest.json",
  openGraph: {
    title: "Xenohuru — Explore Tanzania",
    description: "Your open-source guide to Tanzania's wonders. Safari, hiking, cultural tours, beaches and more.",
    type: "website",
    url: "https://x.xenohuru.workers.dev/",
    images: [
      {
        url: "https://x.xenohuru.workers.dev/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Xenohuru - Explore Tanzania",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@xenohuru",
    title: "Xenohuru — Explore Tanzania",
    description: "Your open-source guide to Tanzania's wonders",
    images: ["https://x.xenohuru.workers.dev/images/og-image.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A4731",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#fafaf8]">
        <Providers>
          <Preloader />
          <EnhancedNavbar />
          <main className="flex-1 pt-16">{children}</main>
          <EnhancedFooter />
          <BackToTop />
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a4731',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

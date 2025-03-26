import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "./terminal.css";

export const metadata: Metadata = {
  title: "NostRinger - Anonymous Ring Signatures with Nostr Keys",
  description: "Create and verify ring signatures using Nostr keys - a demonstration of anonymous cryptographic proofs that prove group membership without revealing identity.",
  keywords: ["ring signatures", "nostr", "cryptography", "privacy", "anonymity", "blockchain", "crypto"],
  authors: [{ name: "NostRinger Team" }],
  creator: "NostRinger Team",
  publisher: "NostRinger",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nostringer.vercel.app/",
    title: "NostRinger - Anonymous Ring Signatures with Nostr Keys",
    description: "Create and verify ring signatures using Nostr keys - a demonstration of anonymous cryptographic proofs.",
    siteName: "NostRinger",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NostRinger - Anonymous Ring Signatures",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NostRinger - Anonymous Ring Signatures",
    description: "Create and verify ring signatures using Nostr keys",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-terminalBg text-neonGreen font-mono antialiased scanline">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

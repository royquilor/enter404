import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/** Browser chrome / PWA status bar; matches primary dark surfaces (hero, experiments). */
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://enter404.com"),
  title: "Enter404 — You're not lost. You're early.",
  description:
    "Not anti-AI. Not fully AI-native. Enter404 is for designers figuring out what good work looks like now.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Enter404 — You're not lost. You're early.",
    description:
      "Not anti-AI. Not fully AI-native. Enter404 is for designers figuring out what good work looks like now.",
    url: "https://enter404.com",
    siteName: "Enter404",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enter404 — You're not lost. You're early.",
    description:
      "Not anti-AI. Not fully AI-native. Enter404 is for designers figuring out what good work looks like now.",
    creator: "@RoyQuilor",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://enter404.com/#website",
      "url": "https://enter404.com",
      "name": "Enter404",
      "description": "Not anti-AI. Not fully AI-native. Enter404 is for designers figuring out what good work looks like now.",
    },
    {
      "@type": "Person",
      "@id": "https://enter404.com/#roy",
      "name": "Roy Quilor",
      "url": "https://enter404.com",
      "sameAs": [
        "https://x.com/RoyQuilor",
        "https://www.youtube.com/@404roy",
        "https://github.com/royquilor",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}


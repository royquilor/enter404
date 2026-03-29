import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://enter404.com"),
  title: "Enter404 — You're not lost. You're early.",
  description:
    "Enter404 is a place for unfinished ideas — before the roadmap, before the polish, before it all makes sense.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Enter404 — You're not lost. You're early.",
    description:
      "Enter404 is a place for unfinished ideas — before the roadmap, before the polish, before it all makes sense.",
    url: "https://enter404.com",
    siteName: "Enter404",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enter404 — You're not lost. You're early.",
    description:
      "Enter404 is a place for unfinished ideas — before the roadmap, before the polish, before it all makes sense.",
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
      "description": "Enter404 is a place for unfinished ideas — before the roadmap, before the polish, before it all makes sense.",
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
    <html lang="en">
      <body className={`${GeistMono.variable} font-mono antialiased`}>
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


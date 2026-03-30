import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { AgentationDev } from "@/components/agentation-dev";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", style: "normal" },
    { path: "./fonts/InterVariable-Italic.woff2", style: "italic" },
  ],
  display: "swap",
  variable: "--font-inter",
});

const departureMono = localFont({
  src: [{ path: "./fonts/DepartureMono-Regular.woff2", style: "normal" }],
  display: "swap",
  variable: "--font-display",
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
    <html
      lang="en"
      className={`${inter.variable} ${departureMono.variable}`}
    >
      <body className="font-sans antialiased">
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var t = localStorage.getItem('theme');
              if (t === 'dark') document.documentElement.classList.add('dark');
              if (t === 'light') document.documentElement.classList.remove('dark');
            } catch (e) {}
          })();
        `}</Script>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <AgentationDev />
      </body>
    </html>
  );
}


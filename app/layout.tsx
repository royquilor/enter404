import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Load Commit Mono variable font
// Variable font supports multiple weights in a single file
const commitMono = localFont({
  src: "../public/fonts/CommitMono VariableFont.woff2",
  variable: "--font-commit-mono",
  display: "swap",
  preload: true,
  fallback: ["monospace"],
  // Variable fonts can specify weight range (optional)
  weight: "100 900", // Full weight range for variable font
});

export const metadata: Metadata = {
  title: "Enter404 — You're not lost. You're early.",
  description:
    "Enter404 is a place for unfinished ideas — before the roadmap, before the polish, before it all makes sense.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${commitMono.variable} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}


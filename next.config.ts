import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      // Pages and public URLs only — do not attach security headers to `/_next/*` (chunks, HMR).
      // That avoids edge cases where nosniff + wrong Content-Type on a dev/proxy response blocks all CSS/JS.
      {
        source: "/((?!_next/).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;


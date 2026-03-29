import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Enter404 — Design inside the chaos.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// TTF paths inside the `geist` package (WOFF2 is not supported by Satori / `next/og`).
const geistMonoDir = join(
  process.cwd(),
  "node_modules/geist/dist/fonts/geist-mono"
);

const fontFamily = '"Geist Mono", ui-monospace, monospace';

export default async function Image() {
  const [fontRegular, fontBold] = await Promise.all([
    readFile(join(geistMonoDir, "GeistMono-Regular.ttf")),
    readFile(join(geistMonoDir, "GeistMono-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          fontFamily,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "520px",
            height: "100%",
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(180,30,20,0.45) 0%, rgba(140,20,15,0.2) 40%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.35)",
            fontSize: "15px",
            letterSpacing: "0.06em",
            fontFamily,
          }}
        >
          ⏎404
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              maxWidth: "680px",
              fontFamily,
            }}
          >
            Design inside the chaos.
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "22px",
              letterSpacing: "0.03em",
              fontFamily,
            }}
          >
            You&apos;re not lost. You&apos;re early.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.25)",
            fontSize: "14px",
            letterSpacing: "0.08em",
            fontFamily,
          }}
        >
          enter404.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist Mono",
          data: fontRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist Mono",
          data: fontBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}

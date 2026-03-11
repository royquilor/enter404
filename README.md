# Enter404 Landing Page

A minimal, philosophy-driven landing page for collecting emails from designers and builders who resonate with early, unfinished ideas.

## Features

- ✨ Text streaming animation (respects `prefers-reduced-motion`)
- 🎥 Video background with static fallback
- 📧 Email capture form with Server Actions
- 🎨 Responsive design (desktop, tablet, mobile)
- ♿ WCAG 2.1 AA accessible
- 🔒 Honeypot spam protection
- ⚡ Optimized for performance

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Button, Input)
- **Email Service:** Resend
- **Rate Limiting:** Vercel KV
- **Font:** Commit Mono

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Font File

Download **Commit Mono Regular** and place it in:
```
/public/fonts/CommitMono-Regular.woff2
```

You can download Commit Mono from [commitmono.com](https://commitmono.com) or use a similar monospace font.

### 3. Add Fallback Image

Add a fallback poster image for the video background:
```
/public/images/door-fallback.jpg
```

This should be a static image of the door scene (1920x1080 recommended).

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required:
- `RESEND_API_KEY` - Get from [resend.com](https://resend.com/api-keys)
- `RESEND_SEGMENT_ID` - (Recommended) Segment ID in Resend to group subscribers for broadcasts

Optional (for production rate limiting):
- `KV_REST_API_URL` - Vercel KV REST API URL (auto-set when KV is linked)
- `KV_REST_API_TOKEN` - Vercel KV REST API token (auto-set when KV is linked)
- `NEXT_PUBLIC_VIDEO_URL` - Cloudinary video URL for background

**Note:** Rate limiting uses Vercel KV. If not configured, rate limiting is disabled (works for local development). For production, link a Vercel KV database in your Vercel project settings.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /page.tsx              # Home page (Server Component)
  /layout.tsx            # Root layout + font
  /actions.ts            # Server Actions (email submission)
  /globals.css           # Global styles
/components
  /hero-section.tsx      # Main hero container
  /video-background.tsx  # Video element + fallback
  /text-stream.tsx       # Streaming text component
  /email-form.tsx        # Form (Client Component)
  /ui                    # shadcn components
    /button.tsx
    /input.tsx
/hooks
  /use-text-stream.ts    # Custom streaming hook
/lib
  /utils.ts              # shadcn utils
  /validation.ts         # Email validation
/public
  /fonts                 # Commit Mono font file
  /images                # Fallback poster image
```

## Development Phases

- ✅ Phase 1: Foundation (Next.js, shadcn, Tailwind, font)
- ✅ Phase 2: Video & Layout (video background, responsive layout)
- ✅ Phase 3: Animation (text streaming, reduced-motion support)
- ✅ Phase 4: Form & Backend (email form, Server Actions, Resend)
- ⏳ Phase 5: Polish & Testing (accessibility, Lighthouse)
- ⏳ Phase 6: Deploy (Vercel, environment variables)

## Notes

- The text streaming animation respects `prefers-reduced-motion` and will show text instantly if the user has this preference enabled.
- The video background falls back to a static image if `prefers-reduced-motion` is enabled or if no video URL is provided.
- Email submissions are protected by a honeypot field to prevent spam.
- Rate limiting is implemented using Vercel KV (3 submissions per IP per hour).
- Rate limiting gracefully falls back if KV is not configured (for local development).

## License

Private project - All rights reserved.


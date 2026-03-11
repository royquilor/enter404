# PRD — Enter404 Landing Page v2

**Goal:** Validate market interest by collecting emails  
**Status:** MVP / Market Test  
**Primary Metric:** Email signups  
**Secondary Metrics:** Time on page, scroll depth  
**Timeline:** 3-5 days to ship

---

## 1. Product Overview

**Enter404** is a single-page landing experience designed to test resonance with a philosophy-driven concept focused on early, unfinished ideas.

The page is intentionally minimal. It does not sell a product yet.

> If users leave their email, the idea has weight.

---

## 2. Goals & Non-Goals

### Goals
- Collect emails from designers and builders who resonate with the Enter404 concept
- Establish brand tone (calm, confident, narrative)
- Test visual language (threshold, red glow, liminal space)
- Validate positioning before building products or community features
- Maintain readability across all viewport sizes

### Non-Goals
- No authentication
- No dashboards
- No CMS
- No analytics-heavy tooling
- No multi-page flows
- No interactive door animations
- No parallax effects
- No social proof elements

---

## 3. Target Audience

- Designers
- Indie builders
- Vibe coders
- Early-stage creators
- People who value process, taste, and story over polish

---

## 4. User Journey

1. User lands on enter404.com
2. Sees calm cinematic hero with ambient video background
3. Reads streamed headline + intro copy (story unfolds gently)
4. Sees bullets and email form (appear instantly, no stream)
5. Understands concept without being sold to
6. Enters email
7. Receives subtle inline confirmation
8. Leaves feeling understood, not marketed to

**Target time on page:** 20+ seconds

---

## 5. Page Structure

### Hero Section (Full Viewport)

**Background Layer**
- Looping ambient video (10-15 seconds)
- Motion: Slow dolly or atmospheric movement (no door opening)
- Dark gradient overlay for text readability
  - Left side: darker (rgba(0,0,0,0.7))
  - Right side: lighter (rgba(0,0,0,0.3))
- Fallback: Static poster image

**Content Layer (Left-Aligned)**
- Logo mark: ⎔404 (top-left, fixed position)
- Headline (streams on load):
  ```
  You're not lost.
  You're early.
  ```
- Body intro (streams after headline):
  ```
  Most ideas don't start clear.
  They start unfinished, uncertain, and slightly wrong.
  
  Enter404 is a place for that phase —
  before the roadmap, before the polish,
  before it all makes sense.
  ```
- Bullet list (appears instantly after stream):
  ```
  If you're interested in:
  • unfinished ideas
  • naming systems
  • early concepts
  • tools before they're tools
  Leave your email.
  ```
- Email capture form (appears with bullets)
- Footer text: "Built in the 404 phase."

---

## 6. Responsive Behavior

### Desktop (1024px+)
- Current design as shown
- Text left-aligned, door right
- Full streaming animation

### Tablet (768-1023px)
- Reduce body copy to 2 paragraphs
- Maintain side-by-side layout
- Tighter spacing

### Mobile (<768px)
- **CRITICAL CHANGE:** Stack vertically
- Door image becomes full-width background
- Text overlaid on center
- Condensed copy:
  ```
  You're not lost. You're early.
  
  Enter404 is a place for unfinished ideas —
  before the roadmap, before the polish.
  
  If you're interested in early concepts
  and tools before they're tools:
  Leave your email.
  ```
- Faster streaming animation (20ms per char)

---

## 7. Animation Specifications

### Text Streaming
**What Streams:**
- Headline (50ms per character)
- Body intro paragraphs (30ms per character)

**What Appears Instantly:**
- Bullet list
- Email form
- Footer

**Total Stream Duration:** ~8-10 seconds

### Motion Accessibility
- Respect `prefers-reduced-motion`
- Fallback: Text appears instantly, video replaced with static image

---

## 8. Tech Stack

### Framework
- Next.js 15 (App Router)
- TypeScript
- React 19

### UI
- shadcn/ui components:
  - Button
  - Input
- Tailwind CSS
- Custom text streaming component

### Font
- **Commit Mono** (loaded via `next/font/local`)
- Preload font to prevent FOUC
- Font files in `/public/fonts/`

### Animation
- Custom React hook for text streaming
- CSS transitions for form states
- No external animation library needed

---

## 9. Video Implementation

### Source & Hosting
- **Storage:** Cloudinary (CDN-backed)
- **Format:** MP4 (primary) + WebM (fallback)
- **Duration:** 10-15 second seamless loop
- **File size:** <5MB optimized
- **Resolution:** 1920x1080 minimum

### Video Element
```typescript
<video
  autoPlay
  loop
  muted
  playsInline
  poster="/images/door-fallback.jpg"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src={cloudinaryURL} type="video/mp4" />
</video>
```

### Performance
- Lazy load below fold
- Preload poster image
- Disable for `prefers-reduced-motion`

---

## 10. Email Capture

### Form Components
- Single email input (shadcn Input)
- Submit button (shadcn Button): "Notify me"
- Secondary affordance: "Press Enter" hint text

### Validation
- Client-side: Basic email regex
- Server-side: Full email validation
- Show inline error for invalid format

### States
1. **Default:** Input + enabled button
2. **Submitting:** Button disabled + loading state
3. **Success:** Input replaced with confirmation message
4. **Error:** Show error message, allow retry

### Success State
```
✓ You're in. See you in the 404 phase.
```

### Honeypot Protection
- Hidden field: `website` (should remain empty)
- If filled, silently reject but show success to user

---

## 11. Server Actions & Email Handling

### Technology
- Next.js Server Actions (no separate API routes)
- Resend Contacts/Segments for subscriber storage

### Flow
1. User submits form
2. Server Action validates email
3. Server Action stores the email in Resend Contacts
4. (Optional) Server Action adds the contact to a Resend Segment for broadcasting
4. Return success/error to client
5. Client updates UI accordingly

### Environment Variables
```bash
RESEND_API_KEY=re_xxxxx
RESEND_SEGMENT_ID=78261eea-... # optional but recommended
```

### Rate Limiting
- Next.js middleware
- Max 3 submissions per IP per hour
- Returns 429 if exceeded

---

## 12. Security & Privacy

### Email Security
- Never expose emails to client
- Server-side handling only
- Environment variables for API keys

### Form Protection
- Honeypot field (hidden)
- Basic rate limiting
- Server-side validation

### Privacy
- No tracking pixels
- No third-party analytics (initially)
- No cookies

---

## 13. Testing Strategy

### Manual Testing Checklist
- [ ] Desktop: Text streams correctly
- [ ] Desktop: Email form submits successfully
- [ ] Mobile: Layout stacks properly
- [ ] Mobile: Video background works
- [ ] Reduced motion: Text appears instantly
- [ ] Reduced motion: Static image shows
- [ ] Error state: Invalid email shows error
- [ ] Success state: Confirmation message appears
- [ ] Honeypot: Spam submission silently rejected

### Unit Tests (Vitest)
**Priority: Medium** — Add after MVP ships if time allows

**Test Coverage:**
```typescript
// Email validation function
describe('validateEmail', () => {
  it('accepts valid email addresses')
  it('rejects invalid formats')
  it('trims whitespace')
})

// Server action
describe('submitEmail', () => {
  it('returns success for valid submission')
  it('returns error for invalid email')
  it('rejects honeypot submissions')
})

// Text streaming hook
describe('useTextStream', () => {
  it('respects prefers-reduced-motion')
  it('completes stream in expected time')
})
```

**Testing Library:** Vitest + React Testing Library

**Run Command:** `npm test`

### Integration Testing
- Form submission returns expected response
- Error handling doesn't break UI
- Success state persists correctly

**No E2E testing required for MVP.**

---

## 14. Performance Requirements

### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

### Optimization
- Lazy-load video
- Preload critical font
- Minimal JavaScript bundle
- Server Components by default
- Static generation where possible

### Core Web Vitals
- LCP: <2.5s (hero text)
- FID: <100ms (form interaction)
- CLS: <0.1 (no layout shift)

---

## 15. Accessibility

### WCAG 2.1 AA Compliance
- Sufficient contrast over video (gradient overlay)
- Keyboard-accessible form (tab, enter)
- Screen reader friendly labels
- Respect `prefers-reduced-motion`
- Semantic HTML throughout

### Focus States
- Visible focus indicators on input and button
- Logical tab order

### ARIA Labels
```html
<input aria-label="Email address" />
<button aria-label="Submit email">Notify me</button>
```

---

## 16. Content Strategy

### Copy Variants

**Desktop Full Copy:**
```
⎔404

You're not lost.
You're early.

Most ideas don't start clear.
They start unfinished, uncertain, and slightly wrong.

Enter404 is a place for that phase —
before the roadmap, before the polish,
before it all makes sense.

If you're interested in:
• unfinished ideas
• naming systems
• early concepts
• tools before they're tools
Leave your email.

[Email input] [Notify me]

Built in the 404 phase.
```

**Mobile Condensed Copy:**
```
⎔404

You're not lost. You're early.

Enter404 is a place for unfinished ideas —
before the roadmap, before the polish.

If you're interested in early concepts
and tools before they're tools:
Leave your email.

[Email input] [Notify me]

Built in the 404 phase.
```

---

## 17. Success Criteria

This MVP is successful if:
- Users submit emails without explanation
- Average time on page > 20 seconds
- Page feels confident to share publicly
- Zero critical accessibility issues
- Lighthouse scores hit targets

**Lack of signups is also a valid outcome** and informs repositioning.

---

## 18. Out of Scope (For Now)

Do NOT build these features:
- Community profiles
- Authentication
- Dashboards
- Products
- Content feeds
- Interactive door animations
- Social proof counters
- Analytics dashboard
- Multiple color themes
- Logo animations

This page is the door, not the building.

---

## 19. File Structure

```
/app
  /page.tsx                    # Home page (Server Component)
  /layout.tsx                  # Root layout + font
  /actions.ts                  # Server Actions (email submission)
/components
  /hero-section.tsx            # Main hero container
  /video-background.tsx        # Video element + fallback
  /text-stream.tsx             # Streaming text component
  /email-form.tsx              # Form (Client Component)
  /ui                          # shadcn components
    /button.tsx
    /input.tsx
/hooks
  /use-text-stream.ts          # Custom streaming hook
/lib
  /utils.ts                    # shadcn utils
  /validation.ts               # Email validation
/public
  /fonts
    /CommitMono-Regular.woff2
  /images
    /door-fallback.jpg         # Video poster
/styles
  /globals.css                 # Tailwind + custom styles
```

---

## 20. Development Phases

### Phase 1: Foundation (Day 1)
- [ ] Initialize Next.js project
- [ ] Install shadcn/ui (Button, Input)
- [ ] Add Commit Mono font
- [ ] Set up Tailwind config
- [ ] Create basic page layout

### Phase 2: Video & Layout (Day 2)
- [ ] Implement video background component
- [ ] Add gradient overlay
- [ ] Create responsive layout (desktop + mobile)
- [ ] Add static content (non-streaming)

### Phase 3: Animation (Day 2-3)
- [ ] Build text streaming hook
- [ ] Implement streaming on headline + intro
- [ ] Add reduced-motion fallback
- [ ] Test animation timing

### Phase 4: Form & Backend (Day 3)
- [ ] Build email form component
- [ ] Create Server Action for email submission
- [ ] Integrate Resend API
- [ ] Add honeypot field
- [ ] Implement rate limiting

### Phase 5: Polish & Testing (Day 4)
- [ ] Add loading and error states
- [ ] Test all responsive breakpoints
- [ ] Run accessibility audit
- [ ] Run Lighthouse audit
- [ ] Manual testing checklist

### Phase 6: Deploy (Day 5)
- [ ] Set up Vercel project
- [ ] Add environment variables
- [ ] Deploy to production
- [ ] Test live URL
- [ ] Monitor first submissions

---

## 21. Environment Setup

### Required Environment Variables
```bash
# .env.local
RESEND_API_KEY=your_resend_api_key
INTERNAL_EMAIL=your@email.com
NODE_ENV=development
```

### Deployment Checklist
- [ ] Add environment variables to Vercel
- [ ] Set up custom domain
- [ ] Configure edge functions (if needed)
- [ ] Enable speed insights (optional)

---

## 22. Monitoring & Iteration

### What to Track (Post-Launch)
- Email submission count
- Average time on page
- Bounce rate
- Mobile vs desktop conversion

### Quick Wins to Test Later
- Different headline copy
- Button text variations
- Video background alternatives
- Streaming speed adjustments

**Do not add tracking tools until MVP validates concept.**

---

## Product Truth

> Enter404 is not a landing page that sells.  
> It's a threshold you choose to step through.

**If this ships in 5 days and collects 10 emails, it's a win.**
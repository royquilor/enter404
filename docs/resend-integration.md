# Resend Integration: Issues & Solutions

## Overview

enter404.com uses Resend for a double opt-in email flow. When a user submits their email:

1. A contact is created in Resend (`unsubscribed: true`)
2. A confirmation email is sent with a signed token link
3. On click, the contact is updated to `unsubscribed: false`
4. If the user arrived via a known UTM source (e.g. `utm_source=clarity`), they are added to the matching Resend segment

---

## Issue 1: Duplicate contacts received no confirmation email

**Problem:** If a contact already existed in Resend (signed up previously but never confirmed), `resend.contacts.create` returned a duplicate error. The original code silently returned `{ success: true }` without sending any email, leaving the user stuck as Unsubscribed with no way to confirm.

**Solution:** On duplicate error, look up the existing contact via the Resend REST API and resend the confirmation email if they are still unsubscribed.

**Gotcha:** The Resend SDK's `contacts.get` does not URL-encode the `@` symbol when building the request path, causing a silent 404. Use a direct `fetch` with `encodeURIComponent` instead:

```ts
const lookupRes = await fetch(
  `https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`,
  { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } }
).catch(() => null);
const existing = lookupRes?.ok ? await lookupRes.json().catch(() => null) : null;
```

---

## Issue 2: UTM source → segment assignment used wrong endpoint and wrong field

**Problem:** Two wrong attempts were made before finding the correct Resend API:

| Attempt | Endpoint | Body | Result |
|---|---|---|---|
| 1st | `POST /audiences/{id}/contacts/{contactId}/segments/{segmentId}` | — | 404 (doesn't exist) |
| 2nd | `POST /segments/{segmentId}/contacts` | `{ contactId }` | 422 Missing `email` field |
| ✅ Correct | `POST /segments/{segmentId}/contacts` | `{ email }` | 200 OK |

The Resend SDK has no segment support — use the REST API directly.

**UTM → segment mapping** lives in `app/actions.ts` driven by env vars:

```ts
const UTM_SEGMENT_MAP: Record<string, string | undefined> = {
  clarity: process.env.RESEND_SEGMENT_CLARITY_ID,
};
```

To add a new source: create the segment in Resend, add its ID as a Vercel env var, and add an entry to this map.

---

## Issue 3: Resend rate limit (2 req/s) silently broke email sending

**Problem:** The server action made three Resend API calls in rapid succession:
1. `contacts.create`
2. `addContactToSegment`
3. `emails.send`

This exceeded Resend's 2 req/s limit, causing `emails.send` to return:
> _"Too many requests. You can only make 2 requests per second."_

The failure was originally silenced in production (`emailError` was only logged in development), so the form showed success but no email was ever sent.

**Solution:**
- Move segment assignment to **after** the email send
- Add a **600ms delay** before the segment call to respect the rate limit
- Surface `emailError` as a returned failure so it's never silently swallowed

```ts
// 1. contacts.create (req 1)
// 2. emails.send (req 2)
const { error: emailError } = await resend.emails.send({ ... });
if (emailError) {
  return { success: false, error: "Failed to send confirmation email." };
}
// 3. segment assignment — after a 600ms gap to stay under 2 req/s
if (segmentId) {
  await new Promise(r => setTimeout(r, 600));
  await addContactToSegment(normalizedEmail, segmentId, process.env.RESEND_API_KEY!);
}
```

**Note:** `next/server`'s `after()` was tested as an alternative (run code after response is sent) but did not execute reliably on Vercel serverless. The explicit delay is simpler and guaranteed.

---

## Environment Variables (enter404.com Vercel project)

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `RESEND_AUDIENCE_ID` | Audience all contacts are added to |
| `RESEND_FROM_EMAIL` | Sender address (`noreply@enter404.com`) |
| `RESEND_SEGMENT_CLARITY_ID` | Segment ID for `utm_source=clarity` contacts |
| `CONFIRM_SECRET` | HMAC secret for signing confirmation tokens |
| `NEXT_PUBLIC_BASE_URL` | Base URL for confirmation links (`https://enter404.com`) |

---

## Segment membership: General vs Clarity

Every contact in the Resend audience automatically appears in the **General** segment — this is Resend's default behaviour, not a bug. The **Clarity** segment is additive; contacts arriving via `clarity.enter404.com` (`?utm_source=clarity`) appear in both General and Clarity.

# Resend Setup Guide

This guide walks you through setting up Resend for capturing subscribers on your Enter404 landing page.

## Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Click **Sign Up** (top right)
3. Sign up with:
   - Email address, or
   - GitHub account (recommended - faster)
4. Verify your email if required

---

## Step 2: Get Your API Key

1. Once logged in, you'll be on the Resend dashboard
2. Click on **API Keys** in the left sidebar
3. Click **Create API Key** button
4. Give it a name (e.g., "Enter404 Landing Page")
5. Select permissions:
   - **Sending access** (needed if you plan to send opt-in / broadcast emails)
   - **Contacts access** (needed to store subscribers in Resend Contacts / Segments)
   - You can restrict to specific domains later if needed
6. Click **Add**
7. **IMPORTANT:** Copy the API key immediately - you won't be able to see it again!
   - It will look like: `re_123456789abcdefghijklmnopqrstuvwxyz`
   - Save it somewhere safe (password manager, notes app, etc.)

---

## Step 3: Set Up Email Domain

You have two options:

### Option A: Use Resend Test Domain (Quick Start - For Testing)

Resend provides a test domain you can use immediately:

1. Go to **Domains** in the left sidebar
2. You'll see a test domain like: `onboarding.resend.dev`
3. You can use this for testing without any setup!

**Update your code to use the test domain:**
- Change `from: "Enter404 <noreply@enter404.com>"` 
- To: `from: "Enter404 <onboarding@resend.dev>"` (or whatever test domain Resend gives you)

**Note:** Test domain emails might go to spam. For production, use Option B.

### Option B: Add Your Own Domain (Recommended for Production)

1. Go to **Domains** in the left sidebar
2. Click **Add Domain**
3. Enter your domain (e.g., `enter404.com`)
4. Click **Add**
5. Resend will show you DNS records to add:
   - **SPF record** (TXT record)
   - **DKIM record** (TXT record)
   - **DMARC record** (optional but recommended)

6. Add these DNS records to your domain's DNS settings:
   
   **Where to add records depends on where your nameservers point:**
   
   **If nameservers point to Vercel** (most common when domain is added to Vercel):
   - Go to **Vercel Dashboard → Your Project → Settings → Domains**
   - Click on your domain
   - Click **DNS Records** tab
   - Click **Add Record**
   - Add each TXT record exactly as Resend shows them
   - This is where you should add them if Vercel is managing your DNS
   
   **If nameservers still point to Namecheap** (less common):
   - Go to **Namecheap Dashboard → Domain List → Manage → Advanced DNS**
   - Add each TXT record exactly as Resend shows them
   - Only use this if you haven't changed nameservers to Vercel
   
   **How to check where your nameservers point:**
   - In Vercel: Go to Domains → Your domain → It will show if nameservers are configured
   - If Vercel shows nameservers (like `ns1.vercel-dns.com`), add records in Vercel
   - If Vercel shows "Nameservers not configured", add records in Namecheap

7. Wait for DNS propagation (usually 5-60 minutes, can take up to 48 hours)
8. Resend will automatically verify your domain when DNS records are detected
9. Once verified (green checkmark), you can use your domain!

**Update your code:**
- Use: `from: "Enter404 <noreply@yourdomain.com>"`

> If you're only collecting/storing subscribers (Contacts/Segments) and not sending emails yet,
> you can skip domain verification for now.

---

## Step 4: Configure Your Project

### For Local Development

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your API key:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   # Optional but recommended: add subscribers to a specific Segment
   # Create a Segment in the Resend dashboard (Contacts → Segments), then copy its ID.
   RESEND_SEGMENT_ID=your_segment_id_here
   ```
3. Save the file
4. Restart your dev server (`npm run dev`)

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Go to **Settings → Environment Variables**
3. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your API key (starts with `re_`)
   - **Environment:** Select all (Production, Preview, Development)
4. Add:
   - **Name:** `RESEND_SEGMENT_ID`
   - **Value:** Your Segment ID from Resend (optional but recommended)
   - **Environment:** Select all
5. Click **Save**
6. **Redeploy** your project (Vercel will prompt you)

---

## Step 5: Test It

### Local Testing

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000`
3. Submit the email form with a test email
4. In Resend, go to **Contacts** and confirm the contact appears
5. If you set `RESEND_SEGMENT_ID`, confirm the contact is in that Segment

### Production Testing

1. Deploy to Vercel
2. Visit your live site
3. Submit the form
4. Check Resend **Contacts** (and Segment membership if configured)

---

## Troubleshooting

### "Invalid API Key" Error
- Double-check you copied the full API key (starts with `re_`)
- Make sure there are no extra spaces
- Verify environment variable is set correctly

### "Domain not verified" Error
- Check that DNS records are added correctly
- Wait for DNS propagation (can take up to 48 hours)
- Verify records in Resend dashboard show as verified

### Emails Going to Spam
- If using test domain: This is normal, check spam folder
- If using your domain: 
  - Make sure SPF, DKIM records are verified
  - Add DMARC record
  - Warm up your domain (send gradually increasing volume)

### "From address must be verified"
- You can only send from domains you've added and verified in Resend
- Make sure the domain in your code matches a verified domain in Resend

### Not Receiving Emails
- If you're only collecting subscribers, there won't be any emails sent.
- Check Resend dashboard → **Contacts** to confirm the subscriber was stored.
- Check Vercel function logs for errors if submissions fail.

---

## Resend Free Tier Limits

Resend's free tier includes:
- **3,000 emails/month**
- **100 emails/day**
- Perfect for a landing page MVP!

If you exceed limits, you'll need to upgrade to a paid plan.

---

## Quick Reference

### Environment Variables Needed
```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_SEGMENT_ID=your_segment_id_here # optional but recommended
```

### Code Location
- API key usage: `app/actions.ts` (line 8)
- Subscriber creation: `app/actions.ts` (`resend.contacts.create(...)`)

### Resend Dashboard Links
- **API Keys:** https://resend.com/api-keys
- **Domains:** https://resend.com/domains
- **Logs:** https://resend.com/emails (see all sent emails)

---

## Next Steps

Once Resend is set up:
1. ✅ Test locally with `.env.local`
2. ✅ Deploy to Vercel with environment variables
3. ✅ Test on production site
4. ✅ Monitor Resend dashboard for sent emails
5. ✅ Continue with deployment checklist (see `DEPLOYMENT.md`)

---

**Need Help?**
- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com


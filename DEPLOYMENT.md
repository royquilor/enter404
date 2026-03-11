# Deployment Checklist for Enter404

This checklist covers everything you need to deploy your landing page to Vercel.

## Pre-Deployment

### 1. Code Preparation
- [ ] All code changes committed to git
- [ ] Run `npm run build` locally to ensure no build errors
- [ ] Test the form submission locally (if possible)
- [ ] Verify video file is in `/public/videos/` directory

### 2. Environment Variables (Local Reference)
Make sure you have these values ready:
- [ ] `RESEND_API_KEY` - From [resend.com/api-keys](https://resend.com/api-keys)
- [ ] `RESEND_SEGMENT_ID` - (Recommended) Segment ID in Resend to group subscribers for broadcasts

---

## Vercel Deployment

### 3. Initial Deployment
- [ ] Push your code to GitHub/GitLab/Bitbucket
- [ ] Go to [vercel.com](https://vercel.com) and sign in
- [ ] Click "Add New Project"
- [ ] Import your repository
- [ ] Vercel will auto-detect Next.js settings
- [ ] Click "Deploy"

### 4. Environment Variables Setup
After initial deployment, go to **Project Settings → Environment Variables**:

- [ ] Add `RESEND_API_KEY`
  - Value: Your Resend API key
  - Environment: Production, Preview, Development (select all)
  
- [ ] Add `RESEND_SEGMENT_ID` (recommended)
  - Value: Your Segment ID from Resend
  - Environment: Production, Preview, Development (select all)

- [ ] Verify variables are saved
- [ ] **Redeploy** after adding environment variables (Vercel will prompt you)

### 5. Vercel KV Setup (Rate Limiting)
- [ ] Go to your project dashboard in Vercel
- [ ] Click on the **Storage** tab
- [ ] Click **Create Database**
- [ ] Select **KV** (Key-Value)
- [ ] Name it (e.g., `enter404-kv` or `rate-limit-db`)
- [ ] Select your project to link it
- [ ] Click **Create**
- [ ] Vercel will automatically set these environment variables:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
- [ ] **Redeploy** your project after KV is created

**Note:** KV setup is optional for testing, but **highly recommended** for production to prevent spam.

---

## Post-Deployment Verification

### 6. Functionality Testing
- [ ] Visit your live URL
- [ ] Verify video background loads
- [ ] Check text streaming animation works
- [ ] Test email form submission:
  - [ ] Submit a valid email → Should see success message
  - [ ] Submit invalid email → Should see error message
  - [ ] Try submitting 4+ times quickly → Should see rate limit error (if KV is set up)
- [ ] Check Resend **Contacts** (and Segment membership if configured) for the signup
- [ ] Test on mobile device/responsive view

### 7. Security Checks
- [ ] Verify honeypot field works (fill hidden "website" field → should silently reject)
- [ ] Check that error messages don't expose sensitive info
- [ ] Verify rate limiting works (if KV is configured)

### 8. Performance Check
- [ ] Run Lighthouse audit on live site
- [ ] Target scores:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 100

---

## Optional: Custom Domain

### 9. Domain Setup (If Applicable)
- [ ] Go to **Project Settings → Domains**
- [ ] Add your custom domain
- [ ] Follow DNS configuration instructions
- [ ] Wait for DNS propagation (can take up to 48 hours)

---

## Monitoring

### 10. Post-Launch Monitoring
- [ ] Check Vercel Analytics (if enabled)
- [ ] Monitor email submissions in your inbox
- [ ] Check Vercel KV usage (if configured):
  - Go to **Storage → Your KV Database → Usage**
  - Should stay well within free tier (30,000 requests/month)
- [ ] Monitor Vercel function logs for errors:
  - Go to **Deployments → Click on deployment → Functions tab**

---

## Troubleshooting

### Common Issues

**Form not submitting:**
- Check `RESEND_API_KEY` is set correctly
- (Optional) Verify `RESEND_SEGMENT_ID` is set (contact is still stored even if not set)
- Check Vercel function logs for errors

**Rate limiting not working:**
- Verify KV database is created and linked
- Check `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set
- Redeploy after KV setup

**Video not loading:**
- Verify video file is in `/public/videos/` directory
- Check file size (should be <5MB for performance)
- Verify video format (MP4 recommended)

**Build errors:**
- Run `npm run build` locally to see errors
- Check that all dependencies are in `package.json`
- Verify TypeScript has no errors

---

## Quick Reference

### Environment Variables Summary
```
Required:
- RESEND_API_KEY
 
Recommended:
- RESEND_SEGMENT_ID

Auto-set by Vercel KV (if configured):
- KV_REST_API_URL
- KV_REST_API_TOKEN
```

### Vercel Dashboard Links
- **Project Settings:** `https://vercel.com/[your-username]/[project-name]/settings`
- **Storage:** `https://vercel.com/[your-username]/[project-name]/storage`
- **Deployments:** `https://vercel.com/[your-username]/[project-name]/deployments`

---

## Success Criteria

Your deployment is successful when:
- ✅ Site loads without errors
- ✅ Video background plays
- ✅ Text streaming works
- ✅ Email form submits successfully
- ✅ Subscriber appears in Resend Contacts (and Segment, if configured)
- ✅ Rate limiting works (if KV configured)
- ✅ No console errors in browser
- ✅ Lighthouse scores meet targets

---

**Last Updated:** 2024
**Project:** Enter404 Landing Page


# Vercel Deployment Guide

## Prerequisites
- GitHub repository: https://github.com/xenohuru/xenohuru-web-next.git
- Vercel account (free tier available)

## Deployment Steps

### 1. Push Latest Changes to GitHub
```bash
git push origin main
```

### 2. Connect to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/new
2. Import your GitHub repository: `xenohuru/xenohuru-web-next`
3. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Environment Variables

Add these environment variables in Vercel dashboard (Settings → Environment Variables):

```
NEXT_PUBLIC_API_URL=http://159.65.119.182:8000
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**Note:** After first deployment, update `NEXT_PUBLIC_SITE_URL` with your actual Vercel URL.

### 4. Configure API CORS

Update your Django API CORS settings to allow Vercel domain:

**File:** `/home/cleven/Private/cleven-github/xenohuru-api/.env`

Add your Vercel domain to `CORS_ALLOWED_ORIGINS`:
```
CORS_ALLOWED_ORIGINS=https://your-project.vercel.app,https://x.xenohuru.workers.dev
```

Or in Django settings:
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-project.vercel.app",
    "https://x.xenohuru.workers.dev",
    "http://localhost:3000",
]
```

### 5. Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain (e.g., `xenohuru.is-a.dev`)
3. Update DNS records as instructed by Vercel
4. Update environment variables with new domain

### 6. Automatic Deployments

Vercel automatically deploys:
- **Production:** Commits to `main` branch
- **Preview:** Pull requests and other branches

## Post-Deployment Checklist

- [ ] Verify homepage loads
- [ ] Check API connectivity (stats, attractions, regions)
- [ ] Test all navigation links
- [ ] Verify images load correctly
- [ ] Test sitemap: `https://your-project.vercel.app/sitemap.xml`
- [ ] Test robots.txt: `https://your-project.vercel.app/robots.txt`
- [ ] Check console for errors

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Connection Issues
- Check CORS settings on API server
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check API server is accessible from Vercel's servers

### Images Not Loading
- Ensure image URLs are absolute (not relative)
- Check Cloudinary/image host CORS settings

## Performance Tips

1. **Enable Vercel Analytics** (Settings → Analytics)
2. **Set up Speed Insights** for Core Web Vitals
3. **Configure Image Optimization** in `next.config.ts`
4. **Monitor Build Times** and optimize if needed

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Pull environment variables
vercel env pull
```

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Issue Tracker: https://github.com/xenohuru/xenohuru-web-next/issues

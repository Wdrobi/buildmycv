# 🚀 Deploy BuildMyCV to Vercel - Step-by-Step Guide

**Ready to go live?** This guide will walk you through deploying your fully functional CV builder to Vercel in minutes.

---

## Prerequisites

- ✅ GitHub account (https://github.com)
- ✅ Vercel account (free at https://vercel.com)
- ✅ MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
- ✅ Git installed on your computer

---

## Step 1: Create MongoDB Atlas Database (5 minutes)

MongoDB Atlas is a free cloud database - perfect for production.

### 1.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or Google
4. Verify email

### 1.2 Create a Cluster
1. Click "Create Deployment"
2. Choose "FREE" tier
3. Select region close to you (e.g., us-east-1)
4. Click "Create"
5. Wait 1-2 minutes for cluster to be ready

### 1.3 Create Database User
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username: `buildmycv`
5. Set password: (create strong password, save it!)
6. Click "Add User"

### 1.4 Get Connection String
1. Go to "Databases" in left menu
2. Click "Connect" on your cluster
3. Choose "Drivers" connection method
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string

**Example format**:
```
mongodb+srv://<username>:<password>@<cluster-host>/buildmycv?retryWrites=true&w=majority
```

⚠️ Replace `PASSWORD` with your actual password!

Save this connection string - you'll need it in Vercel.

---

## Step 2: Prepare Your Code (2 minutes)

### 2.1 Update Environment Variables

Edit `.env.local`:
```env
# Use MongoDB Atlas connection string
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-host>/buildmycv?retryWrites=true&w=majority"

# Production URLs
NEXTAUTH_URL="https://YOUR-DOMAIN.vercel.app"
NEXT_PUBLIC_API_URL="https://YOUR-DOMAIN.vercel.app"

# Generate new strong secrets for production
NEXTAUTH_SECRET="generate-32-char-random-string-here"
JWT_SECRET="generate-32-char-random-string-here"

NODE_ENV="production"
```

**To generate secrets**, use this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this twice - once for each secret.

### 2.2 Commit Your Code
```bash
git add -A
git commit -m "Ready for production deployment"
```

---

## Step 3: Push to GitHub (3 minutes)

### 3.1 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `buildmycv`
3. Description: "Professional CV Builder with ATS Scoring"
4. Choose "Public" or "Private"
5. Click "Create repository"

### 3.2 Push Your Code
```bash
# If you haven't initialized git yet
git init

# Add all files
git add -A

# Create initial commit
git commit -m "Initial commit - BuildMyCV application"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/buildmycv.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## Step 4: Deploy to Vercel (2 minutes)

### 4.1 Connect Vercel to GitHub
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste your GitHub URL or select from list
4. Click "Import"

### 4.2 Configure Project
**Framework Preset**: Next.js (auto-detected)
**Root Directory**: ./ (default)
**Build Command**: `npm run build` (default)
**Output Directory**: `.next` (default)

### 4.3 Add Environment Variables
Click "Environment Variables" section and add:

| Name | Value |
|------|-------|
| DATABASE_URL | `mongodb+srv://<username>:<password>@<cluster-host>/buildmycv?retryWrites=true&w=majority` |
| NEXTAUTH_SECRET | (your generated secret) |
| JWT_SECRET | (your generated secret) |
| NEXTAUTH_URL | `https://YOUR-VERCEL-DOMAIN.vercel.app` |
| NEXT_PUBLIC_API_URL | `https://YOUR-VERCEL-DOMAIN.vercel.app` |
| NODE_ENV | `production` |

⚠️ Replace placeholders with actual values!

### 4.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for deployment
3. ✅ You'll see "Congratulations! Your deployment is ready"

---

## Step 5: Test Your Production App (5 minutes)

### 5.1 Visit Your Site
Your app is live at: `https://YOUR-VERCEL-DOMAIN.vercel.app`

Vercel provides a domain like:
- `buildmycv-omega-two.vercel.app`

### 5.2 Test Key Features

**Test Home Page**
- Visit main URL
- See landing page
- Navigation working

**Test Registration**
1. Go to `/auth/register`
2. Enter email, password, name
3. Click Register
4. Should see confirmation

**Test Login**
1. Go to `/auth/login`
2. Enter credentials
3. Should redirect to dashboard

**Test CV Editor**
1. Go to `/editor`
2. Add personal information
3. Add experience
4. Check ATS score
5. Download PDF

**Test Export**
1. Click "Download PDF"
2. Should generate and download
3. Try JSON export
4. Try TXT export

---

## Step 6: Setup Custom Domain (Optional)

### 6.1 Add Domain in Vercel
1. Go to Vercel dashboard → Your project
2. Click "Settings" → "Domains"
3. Enter your domain (e.g., `mycvbuilder.com`)
4. Click "Add"

### 6.2 Update DNS Records
Your domain registrar should show:
- Record Type: `CNAME`
- Name: `@` or empty
- Value: `cname.vercel.com.`

### 6.3 Wait for Verification
Usually takes 5-30 minutes for DNS to propagate.

---

## Step 7: Setup Database (Important!)

### 7.1 Initialize Database Schema

After first deployment, you need to initialize the database schema:

**Option A: From Command Line**
```bash
npm run db:push
```

**Option B: From Vercel Environment**
1. Go to Vercel project settings
2. Create a deploy hook (optional)
3. Or run commands locally with production DB URL

### 7.2 Verify Database

Visit Prisma Studio:
```bash
VERCEL=1 npm run db:studio
```

Or check MongoDB Atlas directly:
1. Go to MongoDB Atlas
2. Click "Database Access"
3. View collections created

---

## Troubleshooting

### Deployment Failed

**Error: "Node version not compatible"**
- Solution: Vercel should auto-detect Node 18+
- Check Project Settings → Node.js Version

**Error: "DATABASE_URL is not set"**
- Solution: Ensure environment variable is in Vercel Settings
- Redeploy after adding variables

### Build Failed

**Error: "Prisma client not found"**
- Solution: Vercel runs `npm install` and `prisma generate` automatically

**Error: "Module not found"**
- Solution: Check `package.json` dependencies
- Run `npm install` locally and commit lock file

### Runtime Errors

**Error: "Cannot connect to database"**
- Solution: Check MongoDB Atlas IP whitelist
  1. Go to MongoDB Atlas
  2. Network Access → IP Whitelist
  3. Add `0.0.0.0/0` to allow all IPs

**Error: "API returning 500"**
- Solution: Check Vercel logs
  1. Go to Deployments
  2. Click latest deployment
  3. View logs for error details

---

## Performance Monitoring

### 1. Vercel Analytics
- Automatic in Vercel dashboard
- Shows performance metrics
- Identify slow pages/API routes

### 2. Monitor Database
```bash
npm run db:studio  # View live data
```

### 3. Check Logs
- Vercel dashboard → Deployments → Logs
- Real-time error tracking

---

## Continuous Deployment (Auto-Deploy)

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add -A
git commit -m "Update feature"

# Push to GitHub
git push origin main

# Vercel automatically deploys!
```

No manual deployment needed!

---

## Post-Deployment Checklist

- [ ] App loads at production URL
- [ ] Home page displays correctly
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can create CV
- [ ] Can edit all sections
- [ ] ATS score calculates
- [ ] Can download PDF
- [ ] Can export JSON/TXT
- [ ] Performance is fast (<3s load)
- [ ] Mobile responsive
- [ ] No console errors

---

## Monitoring & Maintenance

### Weekly
- Check Vercel analytics
- Review error logs
- Monitor database size

### Monthly
- Update dependencies: `npm update`
- Backup database (MongoDB Atlas auto-backups)
- Review user feedback

### Quarterly
- Security audit
- Performance optimization
- Feature planning

---

## API Endpoints Available in Production

All your APIs are live:

```
GET  https://your-domain.com/api/auth/me
POST https://your-domain.com/api/auth/login
POST https://your-domain.com/api/auth/register
GET  https://your-domain.com/api/cv
POST https://your-domain.com/api/cv
POST https://your-domain.com/api/cv/ats
POST https://your-domain.com/api/cv/export
```

---

## Next Steps

1. **Announce Your App**
   - Share with friends/family
   - Post on social media
   - Add to portfolio

2. **Gather Feedback**
   - Monitor analytics
   - Collect user feedback
   - Note feature requests

3. **Plan Improvements**
   - AI content suggestions
   - LinkedIn integration
   - Cover letter builder
   - Premium features

---

## Support & Troubleshooting

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Can't connect to DB | Check MongoDB Atlas IP whitelist |
| Can't register user | Ensure DATABASE_URL is set in Vercel |
| Slow response times | Check database query performance |
| 404 on API routes | Verify routes exist and are deployed |
| Styles not loading | Check Tailwind CSS compilation |

### Get Help

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Prisma Docs**: https://www.prisma.io/docs

---

## Congratulations! 🎉

Your BuildMyCV application is now **live in production**!

Share your success:
- Twitter/LinkedIn: "Just deployed my CV builder to production! #buildinpublic"
- GitHub: Star the repository
- Portfolio: Add to your projects

---

**Your app is live at**: `https://YOUR-VERCEL-DOMAIN.vercel.app`

**Need help?** Review the troubleshooting section above or check the logs in Vercel dashboard.

**Happy building!** 🚀

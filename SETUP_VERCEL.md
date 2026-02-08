# Vercel Deployment - Step by Step

Complete this after MongoDB Atlas and GitHub are ready.

## Prerequisites Checklist

Before starting:
- [ ] MongoDB Atlas account created
- [ ] Database user created (buildmycv / password)
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] GitHub account created
- [ ] Repository `buildmycv` created
- [ ] Code pushed to GitHub

---

## Step 1: Create Vercel Account (2 minutes)

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access GitHub
5. Complete signup

✅ Vercel account created and connected to GitHub!

## Step 2: Import Project (1 minute)

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Find and select **`buildmycv`**
5. Click **"Import"**

## Step 3: Configure Project (2 minutes)

Vercel will auto-detect settings. Verify:

- **Framework Preset**: `Next.js` ✓
- **Root Directory**: `.` ✓
- **Build Command**: `npm run build` ✓
- **Output Directory**: `.next` ✓
- **Node.js Version**: `20.x` or `18.x` ✓

All should be correct! Don't change anything.

## Step 4: Add Environment Variables (3 minutes)

**Important**: This is where you add your MongoDB connection string and secrets.

1. Still in the import screen, scroll to **"Environment Variables"**

2. Add these variables one by one:

### Variable 1: DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: Your MongoDB connection string from Step 5 of SETUP_MONGODB.md
  ```
  mongodb+srv://buildmycv:MySecure123Pass!@cluster0.xxxxx.mongodb.net/buildmycv?retryWrites=true&w=majority
  ```
- Click **"Add"**

### Variable 2: NEXTAUTH_SECRET
- **Name**: `NEXTAUTH_SECRET`
- **Value**: Generate random secret (see below)
- Click **"Add"**

### Variable 3: JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: Generate random secret (see below)
- Click **"Add"**

### Variable 4: NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://buildmycv.vercel.app`
  (Vercel will show you the actual domain after first deploy)
- Click **"Add"**

### Variable 5: NEXT_PUBLIC_API_URL
- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://buildmycv.vercel.app`
  (Same as NEXTAUTH_URL)
- Click **"Add"**

### Variable 6: NODE_ENV
- **Name**: `NODE_ENV`
- **Value**: `production`
- Click **"Add"**

### Generate Random Secrets

Run this command in PowerShell (or terminal):

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run it **twice** - once for NEXTAUTH_SECRET, once for JWT_SECRET.

Copy each output and paste into Vercel environment variables.

## Step 5: Deploy (1 minute)

1. Scroll to bottom
2. Click **"Deploy"**
3. Wait 3-5 minutes...

Vercel will:
- Pull code from GitHub
- Install dependencies
- Run `npm run build`
- Deploy to their servers

**Watch the deployment logs!** You'll see:
```
✓ Compiled successfully
✓ Generating static pages (15/15)
✓ Finalizing page optimization
✓ Deployment complete!
```

## Step 6: Get Your Live URL (Instant)

After deployment completes:

1. Vercel shows your live URL
   - Format: `https://buildmycv-xxx.vercel.app`
2. Click the link to visit your site
3. You should see your CV builder homepage!

✅ **Your app is now live!**

---

## Step 7: Test in Production (5 minutes)

Visit your Vercel URL and test:

- [ ] Home page loads
- [ ] Click "Editor" → page loads
- [ ] Click "Login" → login page works
- [ ] Click "Register" → registration page works

**Test Registration**:
1. Go to `/auth/register`
2. Create account with:
   - Email: `test@example.com`
   - Password: `Test123!@#`
   - Name: `Test User`
3. Should redirect to editor or dashboard
4. Check MongoDB Atlas to see user created

**Test Login**:
1. Go to `/auth/login`
2. Log in with credentials from above
3. Should work!

**Test CV Builder**:
1. After login, go to `/editor`
2. Add information to each section
3. Try drag-drop reordering
4. Export as PDF/JSON
5. Check ATS score

---

## Step 8: Update Environment Variables (If Needed)

After first deploy, Vercel assigns your actual domain. Update:

**NEXTAUTH_URL and NEXT_PUBLIC_API_URL**:

1. Go to Vercel dashboard
2. Select `buildmycv` project
3. Settings → Environment Variables
4. Edit both variables to your actual domain
5. Save

Then redeploy:
1. Go to Deployments tab
2. Click the three dots on latest deployment
3. Click **"Redeploy"**

---

## 🎯 What You Have Now:

✅ Vercel account created
✅ Project imported from GitHub
✅ Environment variables configured
✅ Application deployed to production
✅ Live URL: https://buildmycv-xxx.vercel.app
✅ Database connected (MongoDB Atlas)
✅ Authentication working
✅ All features live!

---

## Your Live Application

**Homepage**: https://your-domain.vercel.app
**Editor**: https://your-domain.vercel.app/editor
**Login**: https://your-domain.vercel.app/auth/login
**Register**: https://your-domain.vercel.app/auth/register

---

## Monitoring Your Deployment

### Vercel Dashboard
- Deployments: Check status and logs
- Analytics: See traffic and performance
- Settings: Manage environment variables
- Domains: Set custom domain

### GitHub Integration
- Any push to `main` branch auto-deploys
- See deployment status on GitHub
- Roll back to previous versions anytime

### Database Monitoring
- MongoDB Atlas dashboard
- Monitor connection count
- Check storage usage
- View recent operations

---

## Custom Domain (Optional)

To use your own domain:

1. Go to Vercel project Settings
2. Click **"Domains"**
3. Enter your domain
4. Update DNS records (instructions provided)
5. Point to Vercel nameservers
6. Wait for propagation (usually 5 mins - 24 hours)

Then update environment variables:
- NEXTAUTH_URL: `https://yourdomain.com`
- NEXT_PUBLIC_API_URL: `https://yourdomain.com`

---

## Troubleshooting

### Build Failed
1. Check deployment logs in Vercel
2. Look for error messages
3. Common issues:
   - Missing environment variables
   - Database connection string wrong
   - Node version incompatible

### App Opens but Shows Errors
1. Check browser console (F12)
2. Check Vercel deployment logs
3. Verify all environment variables set

### Database Connection Failed
1. Verify connection string is correct
2. Check MongoDB Atlas IP whitelist (0.0.0.0/0)
3. Test connection string locally first

### Users Can't Log In
1. Check DATABASE_URL environment variable
2. Verify MongoDB Atlas user created
3. Check password for special characters
4. Try registering new account first

---

## Success Indicators

Your deployment is successful when:

✅ Vercel shows "Ready" status
✅ URL loads without errors
✅ All pages accessible
✅ Navigation works
✅ Can register account
✅ Can log in
✅ Can create CV
✅ Database stores user data
✅ Can export PDF
✅ ATS score calculates
✅ No console errors

---

## Next Steps

Congratulations! Your app is live! Now:

1. **Test thoroughly** - Create test accounts, build CVs, check all features
2. **Share with users** - Send link to friends/family, post on social media
3. **Monitor** - Watch Vercel analytics and MongoDB usage
4. **Gather feedback** - Ask users what features they want
5. **Plan improvements** - Add new features based on feedback

---

## Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Prisma Docs**: https://www.prisma.io/docs

---

## 🎉 You Did It!

Your BuildMyCV application is now **LIVE ON THE INTERNET**! 

Share your success:
- Tweet: "Just launched my CV builder with @vercel! https://your-domain.vercel.app #buildinpublic"
- LinkedIn: Share the link with your network
- GitHub: Add to your portfolio

**Welcome to production!** ✨

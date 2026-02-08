# GitHub Setup - Step by Step

Complete this after MongoDB Atlas is ready.

## Step 1: Create GitHub Account (If Needed)

1. Go to https://github.com
2. Click **"Sign up"** (or log in if you have account)
3. Complete the steps
4. Verify your email

✅ You now have a GitHub account

## Step 2: Create Repository (2 minutes)

1. Go to https://github.com/new
2. Fill in the form:
   - **Repository name**: `buildmycv`
   - **Description**: `Professional CV Builder with ATS Scoring and PDF Export`
   - **Visibility**: Choose **Public** (so you can showcase it)
   - **Initialize repository**: Leave unchecked
3. Click **"Create repository"**

✅ Repository created!

## Step 3: Prepare Your Local Code (1 minute)

Open PowerShell in `E:\BuildMyCV`:

```powershell
cd E:\BuildMyCV
git status
```

You should see your modified files (in red).

## Step 4: Commit Your Code (2 minutes)

In PowerShell:

```powershell
# Stage all files
git add -A

# Commit with message
git commit -m "Initial commit - BuildMyCV application ready for production"

# Verify commit
git log --oneline -1
```

You should see your commit message.

## Step 5: Add Remote and Push (2 minutes)

In PowerShell, replace `YOUR-USERNAME` with your GitHub username:

```powershell
# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/buildmycv.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**If asked for password**: Use your GitHub Personal Access Token instead of password.

To create a Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: "BuildMyCV Deployment"
4. Select scopes: Check **repo**
5. Click **"Generate token"**
6. Copy the token (you won't see it again!)
7. Paste it when GitHub asks for password

## Step 6: Verify on GitHub (1 minute)

1. Go to https://github.com/YOUR-USERNAME/buildmycv
2. You should see all your files
3. Check the commits tab
4. Verify everything is there

✅ Your code is now on GitHub!

---

## 🎯 What You Have Now:

✅ GitHub account created
✅ Repository created
✅ Code committed locally
✅ Code pushed to GitHub
✅ Repository visible on GitHub.com

---

## Repository Structure

Your GitHub repo should show:
```
buildmycv/
├── src/
│   ├── app/
│   ├── components/
│   ├── store/
│   ├── types/
│   ├── utils/
│   └── lib/
├── prisma/
├── public/
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

⚠️ **Important**: Vercel will use this code for deployment.

---

## Troubleshooting

### "fatal: not a git repository"
```powershell
# Initialize git (if needed)
git init
```

### "Updates were rejected"
```powershell
# Force push (use carefully)
git push -u origin main --force
```

### "Could not read Username"
Use GitHub Personal Access Token instead of password (see Step 5).

---

## Next Step:

→ Set up Vercel deployment (see SETUP_VERCEL.md)

Your code is safely on GitHub. Ready to deploy!

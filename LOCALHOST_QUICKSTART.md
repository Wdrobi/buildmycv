# BuildMyCV - Localhost Quick Start (5 Minutes)

Get BuildMyCV running locally in 5 minutes with all features working!

## ⚡ Quick Start

### 1️⃣ Install Dependencies (First Time Only)
```powershell
cd E:\BuildMyCV
npm install
npm run db:generate
```

### 2️⃣ Set Up MongoDB (Choose ONE)

#### Option A: MongoDB Community Edition (Already Installed?)
```powershell
# Check if MongoDB is installed - should show version
mongod --version

# Start MongoDB (if not running as service)
mongod

# Verify in another terminal:
mongosh
# Show databases and exit
show databases
exit
```

#### Option B: MongoDB Atlas (Cloud - Easiest)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account → Create M0 cluster
3. Create user: `buildmycv` with a password
4. Get connection string: `mongodb+srv://buildmycv:PASSWORD@cluster.mongodb.net/buildmycv?retryWrites=true&w=majority`

### 3️⃣ Configure `.env.local`

Edit `E:\BuildMyCV\.env.local`:

```dotenv
# MongoDB Local:
DATABASE_URL="mongodb://localhost:27017/buildmycv"

# OR MongoDB Atlas (replace PASSWORD and cluster):
# DATABASE_URL="mongodb+srv://buildmycv:PASSWORD@cluster.mongodb.net/buildmycv?retryWrites=true&w=majority"

NEXT_PUBLIC_API_URL="http://localhost:3000"
JWT_SECRET="9c5f8e2b1a3d7c4f6e9b0a1c3d5e7f8b2a4c6d8e0f1a2b3c4d5e6f7a8b9c0"
```

### 4️⃣ Sync Database
```powershell
npm run db:push
```

### 5️⃣ Start Development Server
```powershell
npm run dev
```

You'll see:
```
▲ Next.js 14.2.35
- Local:        http://localhost:3000
✓ Ready in 3.8s
```

### 6️⃣ Test in Browser

1. Open http://localhost:3000
2. Click "Sign Up" → Create account
3. Login with your credentials
4. Add CV content and see it update in real-time
5. Test ATS Score, PDF export, etc.

---

## 🧪 Test All Features

| Feature | Test | Expected |
|---------|------|----------|
| **Registration** | Fill form & click Sign Up | Redirects to login, user in DB |
| **Login** | Enter credentials | Access to CV editor |
| **Add CV Info** | Fill personal info, save | Data persists after refresh |
| **Live Preview** | Type in editor | Preview updates instantly |
| **Add Sections** | Add Experience, Education, Skills | All appear in preview |
| **Drag Reorder** | Drag sections in sidebar | Order changes in preview |
| **ATS Score** | Click ATS Score button | See analysis & score |
| **PDF Export** | Click Download PDF | PDF downloads with CV |
| **JSON Export** | Click Export JSON | JSON file with CV data |
| **Auto-save** | Edit and wait 5s | Refresh, data still there |
| **Logout** | Click Logout | Logged out, redirected to home |

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Fix:**
- For local: Run `mongod` in separate terminal
- For Atlas: Copy correct connection string to .env.local

### Port 3000 Already in Use
```powershell
# Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
npm run dev -- -p 3001
```

### Build/Compilation Errors
```powershell
# Clear cache and reinstall
rm -r .next node_modules
npm install
npm run db:generate
npm run dev
```

### Database Not Syncing
```powershell
npm run db:push
```

---

## 📱 Test on Phone

```powershell
# Find your computer's IP
ipconfig

# On phone, visit: http://<YOUR_IP>:3000
# (Must be on same WiFi)
```

---

## 📊 Database Inspection

```powershell
# Open visual database editor
npm run db:studio

# View users, CVs, and all data in browser GUI
```

---

## 🟢 Status Check

All ✅ means you're ready!

- ✅ Node.js installed (`node --version` shows v18+)
- ✅ Dependencies installed (`npm list | grep bcrypt`)
- ✅ MongoDB running or Atlas connected
- ✅ `.env.local` configured with DATABASE_URL
- ✅ Prisma generated (`npm run db:generate`)
- ✅ Dev server starts (`npm run dev`)
- ✅ Browser opens http://localhost:3000
- ✅ Can register and login
- ✅ Can add and save CV content
- ✅ All exports work (PDF, JSON, TXT)

---

## 📚 Full Setup Guide

See [LOCALHOST_SETUP.md](./LOCALHOST_SETUP.md) for detailed setup with all configurations.

---

## 🚀 Next Steps

Once everything works locally:

1. **Deploy to Production**: See [SETUP_VERCEL.md](./SETUP_VERCEL.md)
2. **Test on Multiple Devices**: Use phone/tablet while dev server runs
3. **Review Code**: Check `src/` folder performance & style

---

**That's it! You have BuildMyCV fully working on localhost.** 🎉


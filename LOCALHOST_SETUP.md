# BuildMyCV - Localhost Development Setup Guide

Complete guide to run BuildMyCV locally with all features working.

## 📋 Prerequisites

### Required Software
- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Community Edition** OR **MongoDB Atlas Account**
- **Git** - [Download](https://git-scm.com/)

### Verify Installation
```powershell
# Check Node.js
node --version    # Should be v18 or higher

# Check npm
npm --version     # Should be v9 or higher

# Check MongoDB (if installed locally)
mongod --version  # For Windows: Check MongoDB installation
```

---

## 🗄️ Step 1: Set Up Database

Choose ONE option:

### Option A: MongoDB Community Edition (Local)

**For Windows:**

1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Run the installer (msi file)
3. Complete installation with default settings
4. MongoDB will run as a Windows Service automatically
5. Verify it's running:
   ```powershell
   # Open PowerShell and run:
   mongosh
   # Should show MongoDB shell prompt
   ```

6. Create the database:
   ```javascript
   // In mongosh shell
   use buildmycv
   db.createCollection("users")
   exit
   ```

**Useful MongoDB Commands:**
```powershell
# Start MongoDB (if not running as service)
mongod

# Open MongoDB shell (in another terminal)
mongosh

# View all databases
show databases

# Use buildmycv database
use buildmycv

# View collections
show collections

# View sample user
db.users.findOne()

# Exit shell
exit
```

### Option B: MongoDB Atlas (Cloud)

**Recommended for simplicity:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project (free tier M0)
4. Create a cluster with **3 nodes** (free tier)
5. Create database user:
   - Username: `buildmycv`
   - Password: Generate secure password (save it!)
   - Database: `buildmycv`
6. Get connection string:
   - Click "Connect"
   - Choose "Drivers"
   - Copy connection string: `mongodb+srv://buildmycv:<password>@<cluster-url>/buildmycv?retryWrites=true&w=majority`
7. Allow access from your IP (or use 0.0.0.0/0 for development)

---

## ⚙️ Step 2: Configure Environment Variables

### Update `.env.local` File

Edit `e:\BuildMyCV\.env.local` with your settings:

```dotenv
# Database Configuration
# Option A - Local MongoDB:
DATABASE_URL="mongodb://localhost:27017/buildmycv"

# Option B - MongoDB Atlas (replace with your credentials):
# DATABASE_URL="mongodb+srv://buildmycv:<password>@<cluster-url>/buildmycv?retryWrites=true&w=majority"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# JWT Configuration (IMPORTANT: Use a secure random string)
JWT_SECRET="your-32-character-random-string-here"
```

### Generate Secure JWT_SECRET

**Windows PowerShell:**
```powershell
$secret = [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
Write-Host $secret
```

**Or use Node.js:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your JWT_SECRET.

---

## 📦 Step 3: Install Dependencies

```powershell
# Navigate to project directory
cd E:\BuildMyCV

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Sync database schema
npm run db:push
```

**Expected Output:**
```
✓ Generated Prisma Client
✓ Database schema synchronized
✓ All dependencies installed
```

---

## 🚀 Step 4: Start Development Server

```powershell
# Terminal 1: Start Next.js development server
npm run dev

# Expected output:
# ▲ Next.js 14.2.35
# - Local:        http://localhost:3000
# - Environments: .env.local
# 
# ✓ Ready in 3.8s
```

Open your browser to: **http://localhost:3000**

---

## 🧪 Step 5: Test All Features

### Test Feature Checklist

- [ ] **Home Page**
  - Visit http://localhost:3000
  - See landing page with feature list

- [ ] **Registration**
  - Click "Sign Up" or go to http://localhost:3000/auth/register
  - Fill in form: Email, Password
  - Click "Create Account"
  - Should redirect to login page
  - Check MongoDB: `db.users.count()` should be 1

- [ ] **Login**
  - Go to http://localhost:3000/auth/login
  - Enter registered credentials
  - Click "Login"
  - Should redirect to CV editor

- [ ] **CV Editor**
  - See sidebar with all sections (Personal Info, Summary, Experience, etc.)
  - Add content to Personal Info section:
    - Full Name: Test User
    - Email: test@example.com
    - Phone: +1234567890
  - Click "Save" button
  - Refresh page - data should persist

- [ ] **Add Sections**
  - Add Experience section
  - Fill details: Job Title, Company, Start Date, End Date, Description
  - Add Education section
  - Add Skills (add 3-4 skills)
  - Add Projects section
  - Click Save after each section

- [ ] **Live Preview**
  - See right panel updating in real-time
  - Change text and see preview update instantly
  - Try different templates: Modern, Professional, Creative

- [ ] **Drag & Drop Reordering**
  - In sidebar, try dragging sections to reorder
  - Release and verify order change in preview

- [ ] **ATS Score Analysis**
  - Click "ATS Score" button
  - See detailed analysis:
    - Keyword matching
    - Formatting score
    - Industry relevance
    - Severity issues

- [ ] **PDF Export**
  - Click "Download PDF"
  - PDF should download with your CV content

- [ ] **JSON Export**
  - Click "Download JSON"
  - JSON file with CV data downloads

- [ ] **Auto-Save**
  - Edit CV content
  - Wait 5 seconds (no manual save)
  - Refresh page without saving manually
  - Data should still be there (stored in Zustand + database)

- [ ] **Logout**
  - Click "Logout" button
  - Should redirect to home page
  - Go to /auth/login (not auto-logged in)

---

## 🔧 Useful Development Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Start production build
npm run start

# Linting
npm run lint

# Database commands
npm run db:generate   # Generate Prisma client
npm run db:push       # Sync schema to DB
npm run db:studio     # Open Prisma Studio (visual DB editor)

# Generate new JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧭 Project Structure

```
src/
├── app/
│   ├── api/              # Backend API routes
│   │   ├── auth/         # Login, Register, Me endpoints
│   │   └── cv/           # CV CRUD, ATS, Export endpoints
│   ├── auth/             # Auth pages (login, register)
│   ├── editor/           # CV Editor page
│   ├── dashboard/        # Dashboard page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── editor/           # Editor components
│   │   ├── CVEditor.tsx  # Main editor
│   │   └── sections/     # 10 section editors
│   ├── preview/          # Preview components
│   └── ATSScorePanel.tsx # ATS analysis
├── store/                # Zustand state management
│   ├── authStore.ts      # Auth state
│   └── cvStore.ts        # CV editor state
├── lib/
│   ├── auth.ts           # JWT, bcrypt utilities
│   └── prisma.ts         # DB client
├── types/                # TypeScript interfaces
└── utils/                # Helper functions
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Make sure MongoDB is running (local or Atlas)
- Check DATABASE_URL in .env.local
- Restart MongoDB service: `net start MongoDB` (Windows)

### Module Not Found Errors
```
Can't resolve '@/store'
```
**Solution:**
```powershell
# Clear Next.js cache and reinstall
rm -r .next node_modules
npm install
npm run dev
```

### Port 3000 Already in Use
```
error: listen EADDRINUSE: address already in use :::3000
```
**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or start on different port
npm run dev -- -p 3001
```

### Prisma Schema Sync Issues
```
prisma error: schema.prisma is not synced with database
```
**Solution:**
```powershell
npm run db:push
```

### JWT_SECRET Not Set
```
error: JWT_SECRET environment variable is required
```
**Solution:**
- Edit .env.local
- Add: `JWT_SECRET="your-32-char-random-string"`

### Login/Register Not Working
**Check:**
1. Database is connected: `npm run db:studio`
2. JWT_SECRET is set in .env.local
3. Browser console for errors (F12)
4. Server terminal for error logs

---

## 📊 Testing Database

```powershell
# Open Prisma Studio (visual DB manager)
npm run db:studio

# Then in browser, view:
# - User table
# - CV table
# - All section data
```

---

## 🎯 What Works Locally

✅ **User Authentication**
- Registration with password hashing
- Login with JWT tokens
- Logout functionality
- Protected routes

✅ **CV Editor**
- Drag & drop section reordering
- Real-time preview
- Auto-save to database
- Multiple templates

✅ **All Section Types**
- Personal Info
- Summary
- Experience
- Education
- Skills
- Projects
- Certifications
- Languages
- Volunteering
- References

✅ **ATS Scoring**
- Keyword analysis
- Formatting evaluation
- Industry relevance scoring

✅ **Exports**
- PDF download
- JSON download
- TXT export

✅ **Data Persistence**
- Save to MongoDB
- Load on page refresh
- Auto-save after edits

---

## 📱 Responsive Design

Test on different screen sizes:
```powershell
# In browser DevTools:
# - Mobile: 375px width
# - Tablet: 768px width
# - Desktop: 1024px+ width
```

All features work responsively on mobile, tablet, and desktop.

---

## 📝 Next Steps

After verifying all features work:

1. **For Production:** Follow [SETUP_VERCEL.md](./SETUP_VERCEL.md) to deploy to Vercel
2. **For Custom Domain:** Update `NEXTAUTH_URL` and `NEXT_PUBLIC_API_URL` in Vercel environment
3. **For Database:** Use MongoDB Atlas for production (free tier included)

---

## 🆘 Need Help?

1. Check error logs in terminal where `npm run dev` is running
2. Check browser console: Press F12 → Console tab
3. Check database: `npm run db:studio`
4. Check network requests: F12 → Network tab
5. Review Prisma schema: `prisma/schema.prisma`

---

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**You're all set! Start developing locally and enjoy building CVs! 🚀**

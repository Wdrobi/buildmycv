# BuildMyCV - Localhost Working Checklist

## ✅ Pre-Flight Checklist

Before starting, verify all these items are checked:

### System Requirements
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v9+ installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] MongoDB installed locally OR MongoDB Atlas account ready
- [ ] Text editor/IDE (VS Code recommended)

### Project Setup
- [ ] Project cloned from GitHub or extracted
- [ ] Navigate to `E:\BuildMyCV` directory
- [ ] `.env.local` file exists
- [ ] `.env.local` has DATABASE_URL set (MongoDB connection)
- [ ] `.env.local` has JWT_SECRET configured
- [ ] All 111 npm packages installed (`npm list --depth=0`)

### Database Setup
- [ ] MongoDB running locally OR MongoDB Atlas connection string configured
- [ ] Database "buildmycv" exists (or will be auto-created)
- [ ] Prisma client generated (`npm run db:generate`)
- [ ] Database schema synced (`npm run db:push`)

---

## 🚀 How to Get Started

### Step 1: Open Terminal
```powershell
# Navigate to project
cd E:\BuildMyCV

# Verify dependencies
npm list bcrypt jsonwebtoken
# Should show: bcrypt@6.0.0 and jsonwebtoken@9.0.3
```

### Step 2: Start Development Server
```powershell
# Start the server
npm run dev

# You'll see:
# ▲ Next.js 14.2.35
# - Local:        http://localhost:3000
# - Environments: .env.local
# ✓ Ready in 3-5 seconds
```

### Step 3: Open Browser
```
http://localhost:3000
```

You should see the BuildMyCV home page with:
- Navigation bar with logo
- "Sign Up" and "Login" buttons
- Feature descriptions
- "Get Started" call-to-action button

---

## 🧪 Feature Testing Guide

### Test 1: User Registration ✅
```
1. Click "Sign Up" or go to http://localhost:3000/auth/register
2. Enter email: test@example.com
3. Enter password: Test123!@#
4. Click "Create Account"
5. Should redirect to login page
6. Check MongoDB: User should be created with hashed password
```

### Test 2: User Login ✅
```
1. Go to http://localhost:3000/auth/login
2. Enter: test@example.com / Test123!@#
3. Click "Login"
4. Should redirect to CV editor
5. Browser should store JWT token in localStorage
```

### Test 3: CV Editor - Personal Info ✅
```
1. In editor, scroll to "Personal Information" section
2. Fill in:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: +1-234-567-8900
   - Location: San Francisco, CA
3. Click "Save"
4. Right panel should update in real-time
5. Refresh page (Ctrl+R)
6. Data should persist from database
```

### Test 4: CV Editor - Add Sections ✅
```
1. Add "Professional Summary" section
   - Click add button
   - Write summary: "Experienced developer with 5 years..."
   - Save

2. Add "Work Experience" section
   - Job Title: Senior Developer
   - Company: Tech Corp
   - Start Date: 2020-01-01
   - End Date: Present
   - Description: Led team of 5 developers
   - Save

3. Add "Education" section
   - Degree: Bachelor of Science
   - Field: Computer Science
   - University: State University
   - Graduation: 2020
   - Save

4. Add "Skills" section
   - Skill 1: JavaScript
   - Skill 2: React
   - Skill 3: TypeScript
   - Skill 4: MongoDB
   - Save

5. Add "Projects" section
   - Project Name: BuildMyCV
   - Description: Full-stack CV builder app
   - Technologies: Next.js, React, MongoDB
   - Save
```

### Test 5: Live Preview ✅
```
1. In editor, modify any field
2. Right panel (preview) updates instantly
3. Change font size or spacing with templates
4. All changes sync in real-time without manual "Save"
```

### Test 6: Template Switching ✅
```
1. Click "Templates" button (top right)
2. Try "Modern" template - clean, minimal design
3. Try "Professional" template - corporate look
4. Try "Creative" template - colorful,artistic
5. All content transfers to new template
6. Preview updates instantly
```

### Test 7: Drag & Drop Reordering ✅
```
1. In sidebar, hover over section title
2. Drag "Work Experience" above "Education"
3. Release mouse
4. Section reorders in preview
5. Save
6. Refresh page
7. Order persists
```

### Test 8: ATS Score Analysis ✅
```
1. Click "ATS Score Analysis" button
2. Panel shows analysis including:
   - Score percentage (0-100)
   - Keywords found
   - Missing keywords
   - Formatting issues
   - Industry relevance
3. Scroll through recommendations
4. Update CV based on suggestions
5. ATS score should improve
```

### Test 9: PDF Export ✅
```
1. Click "Download PDF" button
2. Browser downloads file (BuildMyCV.pdf)
3. Open PDF - should have:
   - All CV content
   - Professional formatting
   - Correct template design
   - All sections included
4. PDF is readable and printable
```

### Test 10: JSON Export ✅
```
1. Click "Export JSON" button
2. File downloads (cv-data.json)
3. Open with text editor
4. JSON contains all CV data:
   - Personal info
   - All sections
   - Metadata
   - Timestamps
```

### Test 11: Auto-Save ✅
```
1. Edit CV (change name or add text)
2. Don't click Save button
3. Wait 5 seconds (auto-save triggers)
4. Refresh page (Ctrl+R)
5. Changes should still be there
6. Check MongoDB - data updated
```

### Test 12: Session Management ✅
```
1. Click user menu (top right)
2. Click "Logout"
3. Redirected to home page
4. Go to http://localhost:3000/editor
5. Should redirect to login (protected route)
6. Login again with credentials
7. Access editor again
```

### Test 13: Responsive Design ✅
```
1. Press F12 to open Developer Tools
2. Click device toolbar (mobile view)
3. Test on iPhone (375px) width
   - Navigation works
   - Editor sections stack properly
   - Preview visible on portrait
4. Test on iPad (768px) width
   - Two-column layout
   - Editor and preview visible
5. Test on Desktop (1920px)
   - Full three-panel layout
   - Sidebar + Editor + Preview
```

### Test 14: Error Handling ✅
```
1. Try registering with existing email
   - Should show error: "Email already exists"
2. Try login with wrong password
   - Should show error: "Invalid credentials"
3. Try PDF export with empty CV
   - Should generate minimal PDF
4. Disconnect internet
   - Offline errors handled gracefully
5. Clear browser cache
   - JWT token removed
   - Forces re-login
```

---

## 🛠️ Useful Commands During Development

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Lint code
npm run lint

# Database commands
npm run db:generate    # Regenerate Prisma client
npm run db:push        # Sync schema to database
npm run db:studio      # Open visual database editor

# Debug MongoDB connection
mongosh                # Compare local vs Atlas connection

# Generate new JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔍 Debugging Tips

### Check Logs
- **Browser Console**: Press F12 → Console tab (frontend errors)
- **Terminal**: Where `npm run dev` is running (server errors)
- **Network**: F12 → Network tab (API call debugging)

### Database Inspect
```powershell
# Open visual database editor
npm run db:studio

# Then in browser, see:
# - All users created
# - All CVs saved
# - All changes tracked
```

### API Testing
```powershell
# Test registration endpoint
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"Test123!@#"}'

# Test login endpoint
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"Test123!@#"}'

# Test current user endpoint
curl -X GET http://localhost:3000/api/auth/me `
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 Verification Checklist - Ready to Use ✅

Run through this to confirm everything works:

### Server Status
- [ ] Terminal shows "✓ Ready in X seconds"
- [ ] No errors in terminal where npm run dev runs
- [ ] Browser opens http://localhost:3000 without errors
- [ ] Page loads within 3 seconds

### Database Connection
- [ ] No "ECONNREFUSED" or connection errors
- [ ] Page loads (not stuck on loading)
- [ ] API calls log in Network tab appear successful
- [ ] Users can be created (check in mongodb)

### Features Working
- [ ] Sign up form works and creates user
- [ ] Login works with correct credentials
- [ ] CV editor loads after login
- [ ] Can type in editor fields
- [ ] Right side preview updates in real-time
- [ ] Save button works without errors
- [ ] Page refresh keeps data
- [ ] PDF download works
- [ ] JSON export works
- [ ] Logout button redirects to home

### No Errors
- [ ] Browser console (F12) has no red errors
- [ ] Terminal where dev server runs has no red errors
- [ ] Network tab (F12) shows API calls returning 200/201 status
- [ ] No JWT, database, or authentication errors

---

## 📱 Testing Remote Access

To test the app from another device on your network:

```powershell
# In terminal, find your computer's IP
ipconfig

# Look for "IPv4 Address" under your network adapter
# Example: 192.168.1.100

# On another device (phone/tablet), visit:
# http://192.168.1.100:3000
```

This lets you test mobile responsiveness while dev server runs.

---

## 🎯 All Features Status

✅ **Working Locally**
- User authentication (register, login, logout)
- CV data persistence (MongoDB)
- Real-time preview
- Multiple templates
- Drag & drop reordering
- ATS scoring
- PDF export
- JSON export
- Auto-save functionality
- Responsive design
- Error handling

---

## 📞 Still Having Issues?

1. **Check MongoDB is running**
   ```powershell
   # For local MongoDB:
   mongod --version
   # For Atlas: Verify connection string in .env.local
   ```

2. **Verify dependencies**
   ```powershell
   npm list bcrypt jsonwebtoken
   ```

3. **Regenerate Prisma**
   ```powershell
   rm -r node_modules/.prisma
   npm run db:generate
   ```

4. **Clear build cache**
   ```powershell
   rm -r .next
   npm run dev
   ```

5. **Check environment variables**
   ```powershell
   # .env.local should have:
   # DATABASE_URL=mongodb://localhost:27017/buildmycv
   # JWT_SECRET=<32-char-string>
   # NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

---

## 🎉 You're All Set!

The project is now fully configured for localhost development with all features working. 

**Next Steps:**
1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Test all features using the checklist above
4. Make any customizations you need
5. When ready, deploy to Vercel: See SETUP_VERCEL.md


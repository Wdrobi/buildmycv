# 🎯 BuildMyCV - Complete Command Reference

## Quick Command Cheat Sheet

### 🚀 Core Commands

```bash
# Development
npm run dev                 # Start development server on localhost:3000

# Production
npm run build              # Build for production
npm run start              # Start production server

# Code Quality
npm run lint               # Run ESLint checks
npm run format             # Format code with Prettier (if configured)

# Database
npm run db:generate        # Generate Prisma client
npm run db:push            # Push schema to database
npm run db:migrate         # Run database migrations
```

---

## 📍 Server Access

### Local Development
```
URL: http://localhost:3000
Status: Live reload enabled
Hot Module Replacement: Enabled
```

### Port Information
- **Default Port**: 3000
- **To Change**: Set `PORT` environment variable
```bash
PORT=3001 npm run dev
```

### Server URLs
| Page | URL | Purpose |
|------|-----|---------|
| Home | `http://localhost:3000` | Landing page |
| Editor | `http://localhost:3000/editor` | CV editor |
| Dashboard | `http://localhost:3000/dashboard` | CV management |
| Login | `http://localhost:3000/auth/login` | User login |
| Register | `http://localhost:3000/auth/register` | User signup |

---

## 📦 Package Management

### Install Dependencies
```bash
npm install                # Install all dependencies
npm install --legacy-peer-deps  # If peer dependency issues
npm install [package]      # Install specific package
npm install -D [package]   # Install as dev dependency
```

### Update Dependencies
```bash
npm update                 # Update to latest compatible
npm outdated              # Check for updates
```

### Check Dependencies
```bash
npm list                  # List all dependencies
npm list --depth=0       # Top-level only
npm list [package]       # Check specific package
```

---

## 🔧 Configuration Commands

### Environment Variables
```bash
# Copy template
cp .env.example .env.local

# Edit for your setup
# Required variables:
# - DATABASE_URL (MongoDB connection string)
# - NEXTAUTH_SECRET (for authentication)
# - NEXTAUTH_URL (production URL)
```

### TypeScript
```bash
npm run tsc --noEmit       # Check TypeScript without compiling
npm run tsc               # Compile TypeScript
```

### Next.js
```bash
next --help               # Show Next.js CLI options
next telemetry --disable  # Disable telemetry
```

---

## 📊 Building & Optimization

### Production Build
```bash
npm run build              # Full production build
npm run build -- --debug   # Build with debug info
```

### Bundle Analysis
```bash
# Install analyzer first
npm install --save-dev @next/bundle-analyzer

# Then run
ANALYZE=true npm run build
```

### Build Output
```
Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (15/15)
✓ Collecting build traces
✓ Finalizing page optimization
```

---

## 🧪 Testing & Quality

### ESLint
```bash
npm run lint               # Run linter
npm run lint -- --fix     # Auto-fix issues
npm run lint -- [file]    # Lint specific file
```

### TypeScript Checking
```bash
npm run tsc --noEmit       # Type check without compiling
npm run tsc               # Full type check and compile
```

### Format Code (if Prettier installed)
```bash
npm run format            # Format all files
npm run format [file]     # Format specific file
npm run format -- --check # Check without modifying
```

---

## 💾 Database Operations

### Prisma Operations
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (dev only)
npm run db:push

# Create migration
npm run db:migrate create --name [name]

# Run migrations
npm run db:migrate deploy

# Studio (visual database explorer)
npx prisma studio
```

### Database Connection
```bash
# Test connection
npx prisma db execute --stdin < query.sql

# Reset database (dev only)
npx prisma migrate reset
```

---

## 🗂️ File Operations

### Create New Component
```bash
# Template
touch src/components/[ComponentName].tsx

# Then add:
# - Import React
# - Component function
# - Export default
# - Add to parent imports
```

### Create New Page
```bash
# Next.js automatically creates route from file
mkdir -p src/app/[route]
touch src/app/[route]/page.tsx
```

### Create New API Route
```bash
# Automatic routing from file path
mkdir -p src/app/api/[endpoint]
touch src/app/api/[endpoint]/route.ts

# Export handlers
# export async function GET(request: Request) { ... }
# export async function POST(request: Request) { ... }
```

---

## 🔍 Debugging & Troubleshooting

### Common Issues & Solutions

#### Build Fails
```bash
# Clean and rebuild
rm -rf .next
npm run build

# Or if still failing
npm install --legacy-peer-deps
npm run build
```

#### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux
lsof -i :3000
kill -9 [PID]

# Or use different port
PORT=3001 npm run dev
```

#### TypeScript Errors
```bash
# Regenerate Prisma client
npm run db:generate

# Clear TypeScript cache
rm -rf .tsbuildinfo

# Reinstall dependencies
rm node_modules package-lock.json
npm install
```

#### Module Not Found
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

---

## 🚀 Deployment Commands

### Vercel Deployment
```bash
npm install -g vercel
vercel                     # Deploy to Vercel
vercel --prod             # Deploy to production
vercel env pull           # Download env vars
```

### Docker
```bash
# Build image
docker build -t buildmycv .

# Run container
docker run -p 3000:3000 buildmycv

# Docker compose
docker-compose up
```

### Self-Hosted
```bash
# Build
npm run build

# Start
npm run start

# In background (with process manager)
pm2 start npm --name "buildmycv" -- run start
pm2 save
```

---

## 📊 Monitoring & Logging

### Check Running Processes
```bash
# Windows
Get-Process | findstr node

# Mac/Linux
ps aux | grep node
```

### View Logs
```bash
# Development
npm run dev           # Logs appear in terminal

# Production
pm2 logs buildmycv   # If using PM2
docker logs [container] # If using Docker
```

### Performance Monitoring
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:3000

# Core Web Vitals
npm install web-vitals
```

---

## 🔐 Security Commands

### Environment Variables
```bash
# Never commit .env files
echo ".env.local" >> .gitignore

# Generate secrets
openssl rand -base64 32  # NEXTAUTH_SECRET

# Verify env vars loaded
echo $DATABASE_URL       # Check if set
```

### Dependency Audit
```bash
npm audit               # Check for vulnerabilities
npm audit fix          # Auto-fix issues
npm audit fix --force  # Force fix (may break)
```

---

## 📚 Documentation Commands

### View Help
```bash
npm --help             # NPM help
next --help            # Next.js help
npm run [script] --help # Script-specific help
```

### Read Documentation
```bash
# In your browser
# Next.js: https://nextjs.org/docs
# React: https://react.dev
# TypeScript: https://www.typescriptlang.org/docs
# Tailwind: https://tailwindcss.com/docs
```

---

## 🎯 Useful Combinations

### Fresh Install & Build
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
npm run start
```

### Development Workflow
```bash
npm run dev              # Terminal 1: Dev server
npm run lint -- --watch # Terminal 2: Watch linter
```

### Production Check
```bash
npm run build            # Build
npm run lint            # Check code quality
npm run start           # Test production build
```

### Full Deployment Prep
```bash
npm install             # Fresh dependencies
npm run format          # Format code
npm run lint            # Check quality
npm run build           # Test build
npm run start           # Test production
# Then deploy...
```

---

## 🛠️ Advanced Commands

### Git Operations
```bash
# Initialize repo (if needed)
git init

# Commit changes
git add .
git commit -m "message"

# Push to remote
git push origin main
```

### Terminal Shortcuts
```bash
# List running processes
ps aux

# Find process on port
lsof -i :3000

# Kill process
kill -9 [PID]

# Directory info
du -sh .                # Size of current directory
find . -type f | wc -l # Count files
```

---

## 📝 Script Reference

### package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev"
  }
}
```

### Running Custom Scripts
```bash
npm run [script]            # Run defined script
npm run [script] -- --flag  # With arguments
npm run [script] arg1 arg2  # Multiple arguments
```

---

## 🔗 Quick Links

### Local URLs
- **App**: http://localhost:3000
- **Editor**: http://localhost:3000/editor
- **API**: http://localhost:3000/api/

### Documentation
- **README.md**: Complete docs
- **DEPLOYMENT.md**: Deployment guides
- **SETUP.md**: Installation guide
- **QUICKSTART.md**: Get started quickly

### External Resources
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 💡 Pro Tips

1. **Use `npm ci` in CI/CD** instead of `npm install`
2. **Clean cache regularly**: `npm cache clean --force`
3. **Keep dependencies updated**: `npm update` monthly
4. **Use `npm audit fix`** for security
5. **Test before deploying**: `npm run build && npm run start`
6. **Monitor bundle size**: `ANALYZE=true npm run build`
7. **Use TypeScript strict mode** for better types
8. **Commit lock file** to repository
9. **Use environment variables** for secrets
10. **Keep Node version consistent** across environments

---

## 🆘 Getting Help

### Check Status
```bash
npm -v                 # NPM version
node -v               # Node.js version
next -v               # Next.js version (if installed)
```

### Debug Mode
```bash
DEBUG=* npm run dev    # Enable debug output
NODE_ENV=development npm run dev
```

### Report Issues
```bash
# Collect system info
npm list --depth=0
npm audit
node --version
npm --version

# Share with development team
# Include: error message, steps to reproduce, environment info
```

---

**BuildMyCV - Complete Command Reference**
**Always available for quick lookup**
**Bookmark this file for easy access!** 🔖

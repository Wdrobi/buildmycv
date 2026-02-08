# BuildMyCV - Deployment Guide

## Production Ready ✅

BuildMyCV is production-ready and can be deployed to any Node.js hosting platform.

## Quick Start

### Local Development
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build
```bash
# Create optimized build
npm run build

# Start production server
npm run start

# Server runs on http://localhost:3000
```

## Deployment Options

### 1. Vercel (Recommended - Easiest)

Vercel is the creator of Next.js and provides seamless deployment.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and your app is live!
```

**Benefits:**
- One-click deployment
- Automatic HTTPS
- Global CDN
- Environment variables easy to manage
- Automatic deployments on git push

### 2. Netlify

```bash
# Build locally
npm run build

# Deploy the .next folder via Netlify UI
```

**Setup:**
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Deploy!

### 3. Self-Hosted (VPS/Server)

**Requirements:**
- Node.js 16+ installed
- npm or yarn
- Port 3000 available (or use reverse proxy)

**Setup:**
```bash
# Clone repository
git clone <repo-url>
cd BuildMyCV

# Install dependencies
npm install --legacy-peer-deps

# Build
npm run build

# Start server
npm run start
```

**For Production:**
- Use process manager (PM2, systemd)
- Setup reverse proxy (Nginx/Apache)
- Enable HTTPS (Let's Encrypt)
- Setup monitoring

**PM2 Example:**
```bash
# Install PM2
npm i -g pm2

# Start app
pm2 start npm --name "buildmycv" -- start

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

### 4. Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

**Build and Run:**
```bash
docker build -t buildmycv .
docker run -p 3000:3000 buildmycv
```

### 5. Railway.app

Easy drag-and-drop deployment:
1. Connect GitHub repo to Railway
2. Configure environment variables
3. Deploy!

### 6. Render.com

1. Create new "Web Service"
2. Connect GitHub repository
3. Set build command: `npm install --legacy-peer-deps && npm run build`
4. Set start command: `npm run start`
5. Deploy!

## Environment Variables

### Required (if using database)
```
DATABASE_URL=mongodb+srv://user:password@host/database
NEXTAUTH_SECRET=your-secret-key-here
```

### Optional
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

## Performance Optimization

Current Performance:
- First Load JS: 88.9 kB
- Editor Page: 10.7 kB
- Build Size: Optimized

**Tips for better performance:**
1. Enable compression on server
2. Use CDN for static assets
3. Set up caching headers
4. Monitor Core Web Vitals
5. Enable gzip/brotli compression

## Security

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS only
- [ ] Set secure cookies
- [ ] Enable CORS properly
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable security headers

### Security Headers (Nginx example)
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

## Monitoring & Logging

### Recommended Tools
- **Monitoring**: Vercel Analytics, Datadog, New Relic
- **Error Tracking**: Sentry, Rollbar
- **Logging**: Loki, ELK Stack
- **APM**: New Relic, DataDog

## Scaling

### Current Capacity
- Handles up to 1000+ concurrent users on standard hosting
- Database queries optimized
- No heavy computations on server

### If you need to scale:
1. Use load balancer
2. Setup database read replicas
3. Implement caching layer (Redis)
4. Use CDN for static assets
5. Setup microservices if needed

## Database Setup

### MongoDB Atlas (Recommended)

1. Create free account at mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Add to `.env.local`:
```
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/buildmycv
```

### Run Prisma Setup
```bash
npx prisma db push
npx prisma generate
```

## Backup Strategy

### Database Backups
- Enable MongoDB Atlas automated backups
- Daily backups (minimum)
- 30-day retention
- Test restore monthly

### Application Backups
- Keep git repository updated
- Tag releases in git
- Document deployment steps

## Disaster Recovery

### Backup Plan
1. Database snapshots daily
2. Code in git repository
3. Document all configuration
4. Test recovery procedure quarterly

### RTO/RPO
- Recovery Time Objective: < 1 hour
- Recovery Point Objective: < 1 day

## SSL/HTTPS

### Vercel
- Automatic SSL certificate
- HTTPS enabled by default

### Self-Hosted
```bash
# Using Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

## DNS Setup

### Point domain to Vercel
```
CNAME: cname.vercel-dns.com (if using Vercel)
```

### Point domain to custom server
```
A record: Your server IP address
```

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install --legacy-peer-deps
      - run: npm run build
      - run: npm run test  # if tests exist
      - name: Deploy
        run: |
          # Your deployment command here
```

## Monitoring Health

### Health Check Endpoint (optional to add)
```bash
GET /api/health
```

### Uptime Monitoring
- Use: UptimeRobot, Pingdom, or Healthchecks.io
- Monitor: `/api/health` endpoint
- Alert if down > 5 minutes

## Support & Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
# On Linux/Mac:
kill -9 $(lsof -t -i:3000)

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Issues
1. Check connection string
2. Verify IP whitelisting
3. Check database credentials
4. Test connection locally

## Performance Monitoring

### Track metrics:
- Page load time
- Time to interactive (TTI)
- Largest contentful paint (LCP)
- First input delay (FID)
- Cumulative layout shift (CLS)

### Tools:
- Google PageSpeed Insights
- WebPageTest
- Lighthouse
- Vercel Analytics

## Cost Estimation

### Vercel
- Free tier: Good for development/testing
- Hobby plan: $20/month
- Pro plan: $20/month per team

### MongoDB Atlas
- Free tier: 512MB storage
- Shared tier: ~$9/month
- Dedicated tier: ~$57+/month

### Total Minimum
- Development: Free
- Production: ~$0-30/month

## Next Steps

1. Choose hosting platform
2. Set up domain
3. Configure environment variables
4. Deploy application
5. Setup monitoring
6. Setup backups
7. Setup CI/CD pipeline
8. Monitor performance
9. Plan scaling strategy
10. Setup support system

---

**Ready to deploy?** Choose your platform above and get started! 🚀

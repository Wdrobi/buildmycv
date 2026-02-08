# BuildMyCV Installation & Setup Guide

## Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher
- MongoDB (local or Atlas cloud)

## Step 1: Project Setup

```bash
cd BuildMyCV
npm install --legacy-peer-deps
```

## Step 2: Environment Configuration

Create `.env.local` file with:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/buildmycv"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"

# JWT
JWT_SECRET="your-secret-key-here-change-in-production"
```

## Step 3: Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Sync schema with MongoDB
npm run db:push

# Optional: View database in Prisma Studio
npm run db:studio
```

## Step 4: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Sync Prisma schema with database
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

## Project Features

### Core Features
✅ Multiple CV templates (Modern, Professional, Creative)
✅ Drag-and-drop section editor
✅ Real-time CV preview
✅ ATS score analysis with detailed suggestions
✅ PDF, JSON, and text export
✅ Auto-save functionality
✅ User authentication

### Technical Features
✅ TypeScript for type safety
✅ Zustand for state management
✅ Next.js 14 App Router
✅ Tailwind CSS for styling
✅ Prisma ORM for database
✅ MongoDB for data persistence
✅ Next.js API Routes for backend
✅ html2pdf/jsPDF for PDF generation

## Project Structure

```
BuildMyCV/
├── src/
│   ├── app/                 # Next.js pages and routes
│   │   ├── api/            # API endpoints
│   │   ├── auth/           # Auth pages
│   │   ├── editor/         # CV editor page
│   │   ├── dashboard/      # User dashboard
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── editor/         # Editor components
│   │   ├── preview/        # Preview components
│   │   ├── ATSScorePanel.tsx
│   │   ├── PDFDownload.tsx
│   │   └── TemplateSwitcher.tsx
│   ├── store/              # Zustand stores
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   └── lib/                # Library functions
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                 # Static assets
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
├── next.config.js          # Next.js config
├── .env.local              # Environment variables
└── README.md               # Documentation
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: string (unique),
  password: string (hashed),
  name: string,
  createdAt: Date,
  updatedAt: Date
}
```

### CVs Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  title: string,
  template: string,
  sections: CVSection[],
  atsScore: number,
  metadata: CVMetadata,
  createdAt: Date,
  updatedAt: Date
}
```

### Sections Collection
```javascript
{
  _id: ObjectId,
  cvId: ObjectId (ref: cvs),
  type: string,
  title: string,
  order: number,
  visible: boolean,
  content: JSON,
  createdAt: Date,
  updatedAt: Date
}
```

## API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### CV Operations
- `GET /api/cv` - List user's CVs
- `POST /api/cv` - Create new CV
- `POST /api/cv/ats` - Analyze ATS score
- `POST /api/cv/export` - Export CV

## Configuration

### Tailwind CSS
Customized with:
- Color scheme (indigo primary, pink accent)
- Custom animations (fade-in, slide-in)
- Form styling
- Responsive design

### TypeScript
Strict mode enabled with:
- Path aliases (@/ -> src/)
- Module resolution
- Type checking enabled

## Deployment

### Build Process
```bash
npm run build
npm run start
```

### Environment Variables for Production
```env
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/buildmycv
NEXT_PUBLIC_API_URL=https://yourdomain.com
JWT_SECRET=your-strong-secret-key
```

### Hosting Options
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Self-hosted (any Node.js host)

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Clear Build Cache
```bash
rm -rf .next
npm run build
```

### Reset Database
```bash
npm run db:push -- --skip-generate
```

### TypeScript Errors
```bash
npm run db:generate
npm run build
```

## Performance Optimization

- Image optimization enabled
- CSS minification
- JavaScript bundling
- Server-side rendering
- React 18 features

## Security Considerations

1. **Authentication**: Use JWT tokens (implement in production)
2. **Password**: Hash with bcrypt (implement in production)
3. **HTTPS**: Required in production
4. **CORS**: Configure for your domain
5. **Environment Variables**: Never commit .env.local
6. **SQL Injection**: Protected by Prisma
7. **XSS**: Protected by React

## Learning Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [React 18 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)

## Support & Contribution

For issues, suggestions, or contributions, please:
1. Check existing documentation
2. Review similar implementations
3. Test thoroughly before reporting
4. Provide detailed error messages

## License

MIT License - Feel free to use for personal or commercial projects

---

**Last Updated**: February 2026
**Version**: 1.0.0

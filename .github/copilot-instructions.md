<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# BuildMyCV - Development Instructions

## Project Overview
BuildMyCV is a full-stack CV builder application built with Next.js 14, React 18, TypeScript, and Tailwind CSS. It features a drag-and-drop editor, ATS scoring system, and PDF export capabilities.

## Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Database**: MongoDB with Prisma ORM
- **PDF Generation**: html2pdf.js, jsPDF, html2canvas
- **API**: Next.js API Routes

## Key Features
1. **Drag & Drop CV Editor** - Organize sections intuitively
2. **ATS Score Analysis** - Check CV compatibility with Applicant Tracking Systems
3. **Multiple Templates** - Modern, Professional, and Creative designs
4. **PDF Export** - Download CVs in multiple formats
5. **Live Preview** - Real-time CV preview while editing
6. **Auto-save** - Automatic state persistence

## Architecture

### File Structure
```
src/
├── app/                           # Next.js App Router
│   ├── api/                       # API Routes
│   ├── auth/                      # Authentication pages
│   ├── editor/                    # CV Editor page
│   ├── dashboard/                 # Dashboard page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── components/                    # React Components
│   ├── editor/                    # Editor components
│   │   ├── CVEditor.tsx          # Main editor component
│   │   └── sections/              # Section-specific editors
│   ├── preview/                   # CV Preview components
│   └── ATSScorePanel.tsx          # ATS analysis UI
├── store/                         # Zustand stores
│   ├── cvStore.ts                # CV state management
│   └── authStore.ts              # Authentication state
├── types/                         # TypeScript definitions
├── utils/                         # Utility functions
│   ├── atsAnalyzer.ts            # ATS scoring logic
│   ├── pdfGenerator.ts           # PDF export utilities
│   └── templates.ts              # Template configurations
└── lib/                           # Library utilities
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components focused and reusable

### State Management
- Use Zustand stores for global state
- `useCVStore` for CV editing state
- `useAuthStore` for authentication state
- Local state for component-specific data

### Component Organization
- Presentational components in `components/`
- Page components in `app/*/page.tsx`
- API handlers in `app/api/*/route.ts`
- Utility functions in `src/utils/`

### Database Schema
- Models defined in `prisma/schema.prisma`
- Use MongoDB as the database
- Generate Prisma client after schema changes

## Common Tasks

### Adding a New Section Type
1. Create a new interface in `src/types/cv.ts`
2. Create section editor in `src/components/editor/sections/[SectionName]Section.tsx`
3. Add rendering logic in `src/components/preview/CVPreview.tsx`
4. Update `SectionType` union in `src/types/cv.ts`
5. Add to `SECTION_TEMPLATES` in `src/utils/templates.ts`

### Creating API Endpoints
1. Create file in `src/app/api/[path]/route.ts`
2. Export HTTP method handlers (GET, POST, PUT, DELETE)
3. Return NextResponse with appropriate status codes
4. Handle errors gracefully

### Styling Components
1. Use Tailwind CSS classes
2. Define custom colors in `tailwind.config.ts`
3. Use responsive prefixes (sm:, md:, lg:, etc.)
4. Keep component-specific styles with the component

### Working with Forms
1. Use React Hook Form for complex forms
2. Use controlled inputs for simple cases
3. Validate on client and server
4. Provide clear error messages

## Important Patterns

### CV Store Usage
```typescript
const { currentCV, updateSectionContent, reorderSections } = useCVStore();
```

### Auth Store Usage
```typescript
const { user, isAuthenticated, login, logout } = useAuthStore();
```

### API Calls
```typescript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

## Performance Considerations
- Use React.memo for expensive components
- Lazy load components when appropriate
- Optimize images and assets
- Use server-side rendering where beneficial
- Minimize bundle size

## Testing
- Write unit tests for utilities
- Write integration tests for API routes
- Test components with React Testing Library
- Use proper mocking for external services

## Security
- Never expose sensitive data in client code
- Validate input on client and server
- Use HTTPS in production
- Hash passwords with bcrypt
- Implement rate limiting
- Use environment variables for secrets

## Deployment
- Build: `npm run build`
- Start: `npm run start`
- Environment variables must be set in deployment platform
- Database must be configured and accessible
- Consider using serverless functions for scalability

## Troubleshooting
- Clear `.next` folder if experiencing build issues
- Regenerate Prisma client: `npm run db:generate`
- Check environment variables are correctly set
- Review API responses in browser DevTools
- Use `console.log` for debugging (remove before commit)

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

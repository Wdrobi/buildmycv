/**
 * BuildMyCV - CV Builder
 * Quick Start Guide
 */

// 1. START THE DEVELOPMENT SERVER
// npm run dev
// Visit: http://localhost:3000

// 2. CREATE AN ACCOUNT
// Click "Get Started" on the home page
// Or navigate to /auth/register

// 3. START BUILDING YOUR CV
// Navigate to /editor
// - Fill in your personal information
// - Add work experience, education, skills
// - Customize the template

// 4. CHECK YOUR ATS SCORE
// Click the "ATS Score" button
// Follow suggestions to improve compatibility

// 5. EXPORT YOUR CV
// Click "Download PDF" to export

// FEATURES:
// ✓ Multiple professional templates
// ✓ Drag-and-drop editor for sections
// ✓ Real-time ATS score analysis
// ✓ Live preview of your CV
// ✓ PDF, JSON, and text export
// ✓ Auto-save functionality

// FOLDER STRUCTURE:
// src/
//   ├── app/          - Next.js pages and API routes
//   ├── components/   - React components
//   ├── store/        - Zustand state management
//   ├── types/        - TypeScript definitions
//   ├── utils/        - Utility functions
//   └── lib/          - Library utilities

// IMPORTANT FILES:
// - package.json      - Project dependencies
// - tsconfig.json     - TypeScript configuration
// - tailwind.config.ts - Tailwind CSS configuration
// - .env.local        - Environment variables
// - prisma/schema.prisma - Database schema

// API ENDPOINTS:
// POST   /api/auth/login       - User login
// POST   /api/auth/register    - User registration
// POST   /api/auth/logout      - User logout
// GET    /api/cv              - Get user's CVs
// POST   /api/cv              - Create new CV
// POST   /api/cv/ats          - Analyze for ATS
// POST   /api/cv/export       - Export CV

// TROUBLESHOOTING:
// 1. npm install not working:
//    npm install --legacy-peer-deps
//
// 2. TypeScript errors:
//    npm run db:generate
//
// 3. Port 3000 already in use:
//    npm run dev -- -p 3001
//
// 4. Clear Next.js cache:
//    rm -rf .next
//    npm run build

export {};

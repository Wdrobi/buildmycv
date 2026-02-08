# BuildMyCV - Complete CV Builder Application

A professional, feature-rich CV builder application built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Create, customize, and export your CV with ATS optimization scoring and professional templates.

## ✨ Features

- 🎨 **Multiple Professional Templates** - Modern, Professional, and Creative designs
- ✏️ **Drag & Drop Editor** - Easily rearrange and manage CV sections
- 📊 **ATS Score Analysis** - Check your CV's compatibility with Applicant Tracking Systems
- 📥 **Multiple Export Formats** - Download as PDF, JSON, or plain text
- 🏷️ **Skill Categories** - Organize skills by expertise area with proficiency levels
- 👁️ **Live Preview** - Real-time preview while editing
- 📱 **Responsive Design** - Works on all devices and browsers
- 💾 **Auto-save** - Changes automatically saved to browser storage

## 📚 Complete CV Sections

✅ Personal Information | ✅ Professional Summary | ✅ Work Experience | ✅ Education | ✅ Skills (Categorized) | ✅ Projects | ✅ Certifications | ✅ Languages | ✅ Volunteering | ✅ References
- 👁️ **Live Preview** - See your CV update in real-time
- 💾 **Auto-save** - Your changes are automatically saved
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **PDF Generation**: html2pdf.js, jsPDF, html2canvas
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS with customization

## 🚀 Quick Start - Get Running in 5 Minutes

Choose your path:

### ⚡ **For Experienced Developers** (5 min)
👉 See [LOCALHOST_QUICKSTART.md](./LOCALHOST_QUICKSTART.md) for rapid setup

### 📖 **For Detailed Setup** (15 min)
👉 See [COMPLETE_LOCALHOST_GUIDE.md](./COMPLETE_LOCALHOST_GUIDE.md) for comprehensive guide with all options

### ✅ **For Testing All Features**
👉 See [LOCALHOST_TESTING_CHECKLIST.md](./LOCALHOST_TESTING_CHECKLIST.md) to verify everything works

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
```bash
cd BuildMyCV
```

2. **Install dependencies**
```bash
npm install
npm run db:generate
```

3. **Setup MongoDB**
   - **Local**: Install MongoDB Community Edition
   - **Cloud**: Use MongoDB Atlas (free tier available)

4. **Configure environment variables**
Edit `.env.local`:
```bash
DATABASE_URL="mongodb://localhost:27017/buildmycv"
# OR for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-host>/buildmycv?retryWrites=true&w=majority"

NEXT_PUBLIC_API_URL="http://localhost:3000"
JWT_SECRET="your-32-character-random-string-here"
```

5. **Sync database**
```bash
npm run db:push
```

6. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser and start building CVs!

## Project Structure

```
src/
├── app/                    # Next.js pages and API routes
│   ├── api/               # Backend API endpoints
│   ├── auth/              # Authentication pages
│   ├── editor/            # CV editor page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── editor/            # Editor components
│   │   └── sections/      # Section-specific editors
│   ├── preview/           # CV preview components
│   └── ATSScorePanel.tsx  # ATS analysis component
├── store/                 # Zustand stores
│   ├── cvStore.ts        # CV state management
│   └── authStore.ts      # Auth state management
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
│   ├── atsAnalyzer.ts    # ATS scoring logic
│   ├── pdfGenerator.ts   # PDF export utilities
│   └── templates.ts      # Template data
└── lib/                   # Library utilities
```

## Usage

### Creating a CV

1. Register or login to your account
2. Navigate to the CV editor
3. Fill in your personal information
4. Add work experience, education, and skills
5. Customize the template and styling
6. Preview your CV in real-time

### Using the Editor

- **Add Section**: Click "+ Add [Section]" buttons
- **Remove Section**: Click the "Delete" button on any section
- **Toggle Visibility**: Click the visibility toggle to hide/show sections
- **Expand/Collapse**: Click on section headers to expand/collapse content

### Checking ATS Score

1. Click the "📊 ATS Score" button in the header
2. Review your score and suggestions
3. Address high-severity issues first
4. Recheck your score after making changes

### Exporting Your CV

1. Click the "⬇️ Download PDF" button
2. Choose your preferred format:
   - **PDF** - Professional document format
   - **JSON** - For data backup or importing to other tools
   - **TXT** - Plain text format

## ATS Analysis

The ATS analyzer checks your CV for:

- ✓ **Personal Information** (10 points) - Required contact details
- ✓ **Keywords** (20 points) - Industry-specific terminology
- ✓ **Formatting** (15 points) - Font sizes and margins
- ✓ **Structure** (15 points) - Recommended sections
- ✓ **Content Quality** (15 points) - Section completeness
- ✓ **ATS Compatibility** (10 points) - Avoids problematic elements
- ✓ **Date Formatting** (5 points) - Consistency

### Tips to Improve Your ATS Score

1. **Use clear section headings** - Standard titles like "Work Experience", "Education"
2. **Avoid tables and graphics** - Use bullet points instead
3. **Use standard fonts** - Arial, Calibri, Times New Roman
4. **Include relevant keywords** - Match job description keywords
5. **Use consistent formatting** - Same date formats throughout
6. **Maintain proper margins** - 10-30px recommended
7. **Clear, descriptive job titles** - Makes it easier for parsing

## Template Customization

### Styling Your CV

In the editor, you can customize:

- **Font Family** - Choose from standard, ATS-safe fonts
- **Font Size** - 9-14px recommended for ATS
- **Line Height** - Improve readability (1.5 recommended)
- **Margins** - 10-30px recommended
- **Color Theme** - Light or dark mode

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### CV Management
- `GET /api/cv` - List user's CVs
- `POST /api/cv` - Create new CV
- `GET /api/cv/:id` - Get specific CV
- `PUT /api/cv/:id` - Update CV
- `DELETE /api/cv/:id` - Delete CV

### Analysis & Export
- `POST /api/cv/ats` - Analyze CV for ATS
- `POST /api/cv/export` - Export CV in different formats

## Database Schema

### User
- id
- email (unique)
- password (hashed)
- name
- createdAt, updatedAt

### CV
- id
- userId (foreign key)
- title
- template
- sections (array)
- atsScore
- metadata (styling options)
- createdAt, updatedAt

### Section
- id
- cvId (foreign key)
- type (personal, experience, education, etc.)
- title
- order
- visible
- content (JSON)
- createdAt, updatedAt

## Environment Variables

```env
# Database
DATABASE_URL=mongodb://localhost:27017/buildmycv

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# JWT
JWT_SECRET=your-secret-key

# Optional: Cloud Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=
```

## Development

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
npm run start
```

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Sync schema with database
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@buildmycv.com or open an issue on GitHub.

## Roadmap

- [ ] Cloud storage integration (AWS S3)
- [ ] Multiple language support
- [ ] AI-powered content suggestions
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Video tutorials
- [ ] Integration with job boards
- [ ] Interview preparation features

## Acknowledgments

- Template designs inspired by modern CV builders
- ATS analysis based on industry best practices
- Icons and UI inspiration from Enhancv and similar platforms

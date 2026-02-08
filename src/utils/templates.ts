import { CV, Template } from '@/types/cv';

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Modern',
    slug: 'modern',
    description: 'Clean, modern design with a professional layout',
    preview: '/templates/modern-preview.png',
    sections: ['personal', 'summary', 'experience', 'education', 'skills', 'projects'],
    config: {
      colors: {
        primary: '#1f2937',
        secondary: '#6366f1',
        accent: '#ec4899',
      },
      fonts: {
        body: 'Arial, sans-serif',
        heading: 'Arial, sans-serif',
      },
      spacing: {
        sectionGap: '24px',
        itemGap: '16px',
      },
    },
    isPublic: true,
  },
  {
    id: '2',
    name: 'Professional',
    slug: 'professional',
    description: 'Traditional professional CV layout',
    preview: '/templates/professional-preview.png',
    sections: ['personal', 'summary', 'experience', 'education', 'skills', 'certifications', 'languages'],
    config: {
      colors: {
        primary: '#000000',
        secondary: '#333333',
        accent: '#0066cc',
      },
      fonts: {
        body: 'Calibri, sans-serif',
        heading: 'Calibri, sans-serif',
      },
      spacing: {
        sectionGap: '20px',
        itemGap: '12px',
      },
    },
    isPublic: true,
  },
  {
    id: '3',
    name: 'Creative',
    slug: 'creative',
    description: 'Creative design for creative professionals',
    preview: '/templates/creative-preview.png',
    sections: ['personal', 'summary', 'experience', 'education', 'projects', 'skills'],
    config: {
      colors: {
        primary: '#2d3748',
        secondary: '#4299e1',
        accent: '#38b2ac',
      },
      fonts: {
        body: 'Trebuchet MS, sans-serif',
        heading: 'Trebuchet MS, sans-serif',
      },
      spacing: {
        sectionGap: '28px',
        itemGap: '18px',
      },
    },
    isPublic: true,
  },
];

export const DEFAULT_CV: Partial<CV> = {
  title: 'My CV',
  template: 'modern',
  sections: [
    {
      id: '1',
      type: 'personal',
      title: 'Personal Information',
      order: 1,
      visible: true,
      content: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
      },
    },
    {
      id: '2',
      type: 'summary',
      title: 'Professional Summary',
      order: 2,
      visible: true,
      content: {
        text: '',
      },
    },
    {
      id: '3',
      type: 'experience',
      title: 'Work Experience',
      order: 3,
      visible: true,
      content: [],
    },
    {
      id: '4',
      type: 'education',
      title: 'Education',
      order: 4,
      visible: true,
      content: [],
    },
    {
      id: '5',
      type: 'skills',
      title: 'Skills',
      order: 5,
      visible: true,
      content: [],
    },
    {
      id: '6',
      type: 'projects',
      title: 'Projects',
      order: 6,
      visible: true,
      content: [],
    },
  ],
  metadata: {
    theme: 'light',
    fontSize: 11,
    fontFamily: 'Arial',
    lineHeight: 1.5,
    margin: 20,
  },
};

export const SECTION_TEMPLATES = {
  summary: {
    text: '',
  },
  experience: {
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
    location: '',
  },
  education: {
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
    description: '',
  },
  skill: {
    name: '',
    level: 'intermediate' as const,
    category: '',
    endorsements: 0,
  },
  project: {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    technologies: [],
    link: '',
    image: '',
  },
  certification: {
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
  },
  language: {
    name: '',
    proficiency: 'professional' as const,
  },
  volunteering: {
    role: '',
    organization: '',
    startDate: '',
    endDate: '',
    currentlyVolunteering: false,
    description: '',
    location: '',
  },
  reference: {
    name: '',
    position: '',
    company: '',
    email: '',
    phone: '',
    relationship: '',
  },
};

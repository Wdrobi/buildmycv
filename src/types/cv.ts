// Types for CV Sections
export type SectionType = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'volunteering' | 'references' | 'custom';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profileImage?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ProfessionalSummary {
  text: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  location?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  endorsements?: number;
}

export interface SkillsContent {
  skills: Skill[];
  categoryOrder?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
  link?: string;
  image?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'elementary' | 'limited' | 'professional' | 'fluent' | 'native';
}

export interface Volunteering {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate?: string;
  currentlyVolunteering: boolean;
  description: string;
  location?: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface CVSection {
  id: string;
  type: SectionType;
  title: string;
  order: number;
  visible: boolean;
  content: PersonalInfo | ProfessionalSummary | Experience[] | Education[] | Skill[] | Project[] | Certification[] | Language[] | Volunteering[] | Reference[] | Record<string, any>;
}

export interface CV {
  id: string;
  userId: string;
  title: string;
  template: string;
  sections: CVSection[];
  atsScore: number;
  metadata: CVMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CVMetadata {
  theme: 'light' | 'dark';
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  margin: number;
}

export interface ATSAnalysisResult {
  score: number;
  totalPoints: number;
  issues: ATSIssue[];
  suggestions: string[];
  strengths: string[];
}

export interface ATSIssue {
  category: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  suggestion?: string;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  preview: string;
  sections: SectionType[];
  config: Record<string, any>;
  isPublic: boolean;
}

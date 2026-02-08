import { ATSAnalysisResult, ATSIssue, CV, SectionType } from '@/types/cv';

const ATS_KEYWORD_DATABASE = {
  technical: ['python', 'javascript', 'typescript', 'react', 'nodejs', 'sql', 'mongodb', 'aws', 'docker', 'kubernetes', 'ci/cd', 'git', 'rest api', 'graphql'],
  soft_skills: ['leadership', 'communication', 'teamwork', 'problem-solving', 'project management', 'analytics', 'strategy'],
  tools: ['jira', 'confluence', 'slack', 'figma', 'adobe', 'office', 'salesforce', 'sap'],
  certifications: ['aws certified', 'azure certified', 'google cloud', 'scrum master', 'pmp', 'cissp'],
};

export class ATSAnalyzer {
  /**
   * Analyze CV for ATS compatibility
   */
  static analyzeCVForATS(cv: CV): ATSAnalysisResult {
    let totalPoints = 100;
    let currentScore = 0;
    const issues: ATSIssue[] = [];
    const suggestions: string[] = [];
    const strengths: string[] = [];

    // 1. Check personal info section (10 points)
    const personalSection = cv.sections.find(s => s.type === 'personal');
    if (!personalSection || !personalSection.visible) {
      issues.push({
        category: 'Personal Information',
        severity: 'high',
        message: 'Personal information section is missing or hidden',
        suggestion: 'Add a visible personal information section with contact details',
      });
    } else {
      const personalInfo = personalSection.content as any;
      const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
      const hasAllFields = requiredFields.every(field => personalInfo[field]);
      
      if (hasAllFields) {
        currentScore += 10;
        strengths.push('All required personal information fields are present');
      } else {
        issues.push({
          category: 'Personal Information',
          severity: 'high',
          message: 'Missing required contact information',
          suggestion: `Add missing fields: ${requiredFields.filter(f => !personalInfo[f]).join(', ')}`,
        });
      }
    }

    // 2. Check for keywords (20 points)
    const cvText = this.extractCVText(cv);
    const foundKeywords = this.findKeywords(cvText);
    
    if (foundKeywords.length >= 10) {
      currentScore += 20;
      strengths.push(`Strong technical keywords found (${foundKeywords.length})`);
    } else if (foundKeywords.length >= 5) {
      currentScore += 10;
      issues.push({
        category: 'Keywords',
        severity: 'medium',
        message: `Limited technical keywords (found ${foundKeywords.length}, recommended 10+)`,
        suggestion: 'Add more industry-relevant keywords and skills',
      });
    } else {
      issues.push({
        category: 'Keywords',
        severity: 'high',
        message: 'Few or no industry keywords detected',
        suggestion: 'Include relevant technical skills and industry-specific keywords',
      });
    }

    // 3. Check formatting (15 points)
    const formatIssues = this.checkFormatting(cv);
    if (formatIssues.length === 0) {
      currentScore += 15;
      strengths.push('Clean and ATS-friendly formatting');
    } else {
      formatIssues.forEach(issue => issues.push(issue));
      currentScore += Math.max(0, 15 - formatIssues.length * 3);
    }

    // 4. Check section structure (15 points)
    const structureScore = this.checkSectionStructure(cv);
    currentScore += structureScore;
    
    if (structureScore >= 12) {
      strengths.push('Well-organized section structure');
    } else {
      issues.push({
        category: 'Structure',
        severity: 'medium',
        message: 'Some recommended sections are missing',
        suggestion: 'Consider adding: education, experience, skills sections',
      });
    }

    // 5. Check content quality (15 points)
    const contentScore = this.checkContentQuality(cv);
    currentScore += contentScore;

    // 6. Check for ATS-unfriendly elements (10 points)
    const atsUnfriendlyIssues = this.checkATSUnfriendlyElements(cv);
    if (atsUnfriendlyIssues.length === 0) {
      currentScore += 10;
      strengths.push('No ATS-unfriendly elements detected');
    } else {
      atsUnfriendlyIssues.forEach(issue => issues.push(issue));
      currentScore += Math.max(0, 10 - atsUnfriendlyIssues.length * 2);
    }

    // 7. Check date formats and consistency (10 points)
    const dateIssues = this.checkDateFormatting(cv);
    if (dateIssues.length === 0) {
      currentScore += 10;
      strengths.push('Consistent date formatting');
    } else {
      dateIssues.forEach(issue => issues.push(issue));
    }

    // Normalize score to 0-100
    const finalScore = Math.min(100, Math.round((currentScore / totalPoints) * 100));

    // Add general suggestions based on score
    if (finalScore < 50) {
      suggestions.push('Consider restructuring your CV to improve ATS compatibility');
      suggestions.push('Focus on clarity and standard formatting');
    } else if (finalScore < 75) {
      suggestions.push('There are opportunities to improve your ATS score');
      suggestions.push('Incorporate more industry-specific keywords');
    } else {
      suggestions.push('Your CV is well-optimized for ATS systems');
    }

    return {
      score: finalScore,
      totalPoints: 100,
      issues: issues.slice(0, 10), // Limit to 10 issues
      suggestions: suggestions.slice(0, 5),
      strengths: strengths.slice(0, 5),
    };
  }

  /**
   * Extract all text from CV sections
   */
  private static extractCVText(cv: CV): string {
    return cv.sections
      .filter(s => s.visible)
      .map(section => {
        const content = section.content;
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) {
          return JSON.stringify(content);
        }
        return JSON.stringify(content);
      })
      .join(' ')
      .toLowerCase();
  }

  /**
   * Find keywords in CV text
   */
  private static findKeywords(text: string): string[] {
    const allKeywords = [
      ...ATS_KEYWORD_DATABASE.technical,
      ...ATS_KEYWORD_DATABASE.soft_skills,
      ...ATS_KEYWORD_DATABASE.tools,
      ...ATS_KEYWORD_DATABASE.certifications,
    ];

    return allKeywords.filter(keyword => text.includes(keyword.toLowerCase()));
  }

  /**
   * Check formatting issues
   */
  private static checkFormatting(cv: CV): ATSIssue[] {
    const issues: ATSIssue[] = [];

    // Check for reasonable font sizes
    const fontSize = cv.metadata?.fontSize || 11;
    if (fontSize < 9 || fontSize > 14) {
      issues.push({
        category: 'Formatting',
        severity: 'medium',
        message: `Font size ${fontSize}px is outside recommended range (9-14px)`,
        suggestion: 'Use font size between 9-14 pixels for better ATS readability',
      });
    }

    // Check margins
    const margin = cv.metadata?.margin || 20;
    if (margin < 10 || margin > 30) {
      issues.push({
        category: 'Formatting',
        severity: 'low',
        message: `Margins of ${margin}px may cause parsing issues`,
        suggestion: 'Use margins between 10-30 pixels',
      });
    }

    return issues;
  }

  /**
   * Check section structure
   */
  private static checkSectionStructure(cv: CV): number {
    let score = 0;
      const recommendedSections: SectionType[] = ['personal', 'experience', 'education', 'skills'] as const;
    const existingSectionTypes = cv.sections.filter(s => s.visible).map(s => s.type);

    recommendedSections.forEach(section => {
      if (existingSectionTypes.includes(section)) {
        score += 3.75; // 15 / 4
      }
    });

    return Math.round(score);
  }

  /**
   * Check content quality
   */
  private static checkContentQuality(cv: CV): number {
    let score = 0;

    cv.sections.forEach(section => {
      if (!section.visible) return;

      if (section.type === 'experience') {
        const experiences = section.content as any[];
        if (Array.isArray(experiences) && experiences.length > 0) {
          const hasDescriptions = experiences.some(e => e.description && e.description.length > 50);
          if (hasDescriptions) score += 5;
        }
      } else if (section.type === 'education') {
        const educations = section.content as any[];
        if (Array.isArray(educations) && educations.length > 0) {
          score += 5;
        }
      } else if (section.type === 'skills') {
        const skills = section.content as any[];
        if (Array.isArray(skills) && skills.length >= 5) {
          score += 5;
        }
      }
    });

    return Math.min(15, score);
  }

  /**
   * Check for ATS-unfriendly elements
   */
  private static checkATSUnfriendlyElements(cv: CV): ATSIssue[] {
    const issues: ATSIssue[] = [];

    // Check for tables (ATS doesn't handle well)
    const cvText = JSON.stringify(cv.sections);
    if (cvText.includes('<table') || cvText.includes('table')) {
      issues.push({
        category: 'Formatting',
        severity: 'high',
        message: 'Tables detected - ATS systems have difficulty parsing tables',
        suggestion: 'Convert tables to simple text lists or paragraphs',
      });
    }

    // Check for graphics or images in skills
    const skillsSection = cv.sections.find(s => s.type === 'skills');
    if (skillsSection && JSON.stringify(skillsSection.content).includes('image')) {
      issues.push({
        category: 'Formatting',
        severity: 'medium',
        message: 'Skill graphics detected - may not be parsed correctly',
        suggestion: 'Use text-based skill representation',
      });
    }

    // Check for unusual fonts
    const fontFamily = cv.metadata?.fontFamily || 'Arial';
    const atsUnsafeFonts = ['wingdings', 'symbol', 'webdings'];
    if (atsUnsafeFonts.some(f => fontFamily.toLowerCase().includes(f))) {
      issues.push({
        category: 'Formatting',
        severity: 'high',
        message: `Font "${fontFamily}" is not ATS-safe`,
        suggestion: 'Use standard fonts like Arial, Calibri, or Times New Roman',
      });
    }

    return issues;
  }

  /**
   * Check date formatting consistency
   */
  private static checkDateFormatting(cv: CV): ATSIssue[] {
    const issues: ATSIssue[] = [];
    const dateRegex = /^\d{4}-\d{2}-\d{2}$|^\d{1,2}\/\d{1,2}\/\d{4}$/;
    let dateFormatCount = 0;

    cv.sections.forEach(section => {
      if (Array.isArray(section.content)) {
        section.content.forEach((item: any) => {
          if (item.startDate || item.endDate) {
            if (!dateRegex.test(item.startDate) && !dateRegex.test(item.endDate)) {
              dateFormatCount++;
            }
          }
        });
      }
    });

    if (dateFormatCount > 0) {
      issues.push({
        category: 'Formatting',
        severity: 'low',
        message: 'Inconsistent date formatting detected',
        suggestion: 'Use consistent date format (YYYY-MM-DD or MM/DD/YYYY)',
      });
    }

    return issues;
  }
}

// Export main analysis function
export function analyzeATS(cv: CV): ATSAnalysisResult {
  return ATSAnalyzer.analyzeCVForATS(cv);
}

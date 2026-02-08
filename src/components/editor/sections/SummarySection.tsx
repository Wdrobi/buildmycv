'use client';

import { useCVStore } from '@/store/cvStore';
import { CVSection, ProfessionalSummary } from '@/types/cv';

interface SummarySectionProps {
  section: CVSection;
}

export default function SummarySection({ section }: SummarySectionProps) {
  const { updateSectionContent } = useCVStore();
  const summary = (section.content as ProfessionalSummary) || { text: '' };

  const handleChange = (value: string) => {
    updateSectionContent(section.id, { ...summary, text: value });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Professional Summary
      </label>
      <textarea
        value={summary.text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Brief overview of your professional background..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[120px]"
      />
    </div>
  );
}

'use client';

import { useCVStore } from '@/store/cvStore';
import { CVSection, Language } from '@/types/cv';

interface LanguageSectionProps {
  section: CVSection;
}

const PROFICIENCY_LEVELS = ['elementary', 'limited', 'professional', 'fluent', 'native'] as const;

export default function LanguageSection({ section }: LanguageSectionProps) {
  const { updateSectionContent } = useCVStore();
  const languages = (section.content as Language[]) || [];

  const handleAddLanguage = () => {
    const newLanguage: Language = {
      id: 'lang-' + Date.now(),
      name: '',
      proficiency: 'professional',
    };
    updateSectionContent(section.id, [...languages, newLanguage]);
  };

  const handleRemoveLanguage = (id: string) => {
    updateSectionContent(
      section.id,
      languages.filter(l => l.id !== id)
    );
  };

  const handleUpdateLanguage = (id: string, field: string, value: any) => {
    updateSectionContent(
      section.id,
      languages.map(l =>
        l.id === id ? { ...l, [field]: value } : l
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {languages.map(lang => (
          <div key={lang.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => handleUpdateLanguage(lang.id, 'name', e.target.value)}
                placeholder="Language (e.g., English, Spanish)"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => handleUpdateLanguage(lang.id, 'proficiency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              >
                {PROFICIENCY_LEVELS.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => handleRemoveLanguage(lang.id)}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddLanguage}
        className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition"
      >
        + Add Language
      </button>
    </div>
  );
}

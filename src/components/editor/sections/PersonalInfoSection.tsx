'use client';

import { useCVStore } from '@/store/cvStore';
import { CVSection, PersonalInfo } from '@/types/cv';

interface PersonalInfoSectionProps {
  section: CVSection;
}

export default function PersonalInfoSection({
  section,
}: PersonalInfoSectionProps) {
  const { updateSectionContent } = useCVStore();
  const personalInfo = section.content as PersonalInfo;

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    updateSectionContent(section.id, {
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="John"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={personalInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          value={personalInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          value={personalInfo.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="New York, NY"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            value={personalInfo.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            value={personalInfo.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          GitHub
        </label>
        <input
          type="url"
          value={personalInfo.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          placeholder="https://github.com/username"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
  );
}

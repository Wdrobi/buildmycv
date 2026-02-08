'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CVSection, Experience } from '@/types/cv';

interface ExperienceSectionProps {
  section: CVSection;
}

export default function ExperienceSection({ section }: ExperienceSectionProps) {
  const { updateSectionContent } = useCVStore();
  const experiences = (section.content as Experience[]) || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: 'exp-' + Date.now(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
      location: '',
    };
    updateSectionContent(section.id, [...experiences, newExperience]);
  };

  const handleRemoveExperience = (id: string) => {
    updateSectionContent(
      section.id,
      experiences.filter(e => e.id !== id)
    );
  };

  const handleUpdateExperience = (id: string, field: string, value: any) => {
    updateSectionContent(
      section.id,
      experiences.map(e =>
        e.id === id ? { ...e, [field]: value } : e
      )
    );
  };

  return (
    <div className="space-y-4">
      {experiences.map(exp => (
        <div key={exp.id} className="border border-gray-200 rounded-lg">
          <div
            className="bg-gray-50 p-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
            onClick={() =>
              setExpandedId(expandedId === exp.id ? null : exp.id)
            }
          >
            <div>
              <p className="font-medium text-gray-900">
                {exp.jobTitle || 'Job Title'}
              </p>
              <p className="text-sm text-gray-600">{exp.company || 'Company'}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveExperience(exp.id);
              }}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>

          {expandedId === exp.id && (
            <div className="p-4 border-t border-gray-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleUpdateExperience(exp.id, 'jobTitle', e.target.value)
                    }
                    placeholder="Senior Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleUpdateExperience(exp.id, 'company', e.target.value)
                    }
                    placeholder="Tech Company Inc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location || ''}
                  onChange={(e) =>
                    handleUpdateExperience(exp.id, 'location', e.target.value)
                  }
                  placeholder="New York, NY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleUpdateExperience(exp.id, 'startDate', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleUpdateExperience(exp.id, 'endDate', e.target.value)
                    }
                    disabled={exp.currentlyWorking}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exp.currentlyWorking}
                  onChange={(e) =>
                    handleUpdateExperience(
                      exp.id,
                      'currentlyWorking',
                      e.target.checked
                    )
                  }
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  I currently work here
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleUpdateExperience(
                      exp.id,
                      'description',
                      e.target.value
                    )
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleAddExperience}
        className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition"
      >
        + Add Experience
      </button>
    </div>
  );
}

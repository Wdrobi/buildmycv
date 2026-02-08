'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CVSection, Education } from '@/types/cv';

interface EducationSectionProps {
  section: CVSection;
}

export default function EducationSection({ section }: EducationSectionProps) {
  const { updateSectionContent } = useCVStore();
  const educations = (section.content as Education[]) || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: 'edu-' + Date.now(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      description: '',
    };
    updateSectionContent(section.id, [...educations, newEducation]);
  };

  const handleRemoveEducation = (id: string) => {
    updateSectionContent(
      section.id,
      educations.filter(e => e.id !== id)
    );
  };

  const handleUpdateEducation = (id: string, field: string, value: any) => {
    updateSectionContent(
      section.id,
      educations.map(e =>
        e.id === id ? { ...e, [field]: value } : e
      )
    );
  };

  return (
    <div className="space-y-4">
      {educations.map(edu => (
        <div key={edu.id} className="border border-gray-200 rounded-lg">
          <div
            className="bg-gray-50 p-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
            onClick={() =>
              setExpandedId(expandedId === edu.id ? null : edu.id)
            }
          >
            <div>
              <p className="font-medium text-gray-900">
                {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
              </p>
              <p className="text-sm text-gray-600">{edu.school || 'School'}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveEducation(edu.id);
              }}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>

          {expandedId === edu.id && (
            <div className="p-4 border-t border-gray-200 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School/University
                </label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) =>
                    handleUpdateEducation(edu.id, 'school', e.target.value)
                  }
                  placeholder="University Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleUpdateEducation(edu.id, 'degree', e.target.value)
                    }
                    placeholder="Bachelor's"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) =>
                      handleUpdateEducation(edu.id, 'field', e.target.value)
                    }
                    placeholder="Computer Science"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleUpdateEducation(edu.id, 'startDate', e.target.value)
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
                    value={edu.endDate}
                    onChange={(e) =>
                      handleUpdateEducation(edu.id, 'endDate', e.target.value)
                    }
                    disabled={edu.currentlyStudying}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={edu.currentlyStudying}
                  onChange={(e) =>
                    handleUpdateEducation(
                      edu.id,
                      'currentlyStudying',
                      e.target.checked
                    )
                  }
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  I currently study here
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={edu.description || ''}
                  onChange={(e) =>
                    handleUpdateEducation(
                      edu.id,
                      'description',
                      e.target.value
                    )
                  }
                  placeholder="Add any additional details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[80px]"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleAddEducation}
        className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition"
      >
        + Add Education
      </button>
    </div>
  );
}

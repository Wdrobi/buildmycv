'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CVSection, Education } from '@/types/cv';
import RichTextEditor from '@/components/RichTextEditor';

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

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newEducations = [...educations];
    [newEducations[index - 1], newEducations[index]] = [newEducations[index], newEducations[index - 1]];
    updateSectionContent(section.id, newEducations);
  };

  const handleMoveDown = (index: number) => {
    if (index === educations.length - 1) return;
    const newEducations = [...educations];
    [newEducations[index], newEducations[index + 1]] = [newEducations[index + 1], newEducations[index]];
    updateSectionContent(section.id, newEducations);
  };

  return (
    <div className="space-y-4">
      {educations.map((edu, index) => (
        <div key={edu.id} className="border border-gray-200 rounded-lg">
          <div className="bg-gray-50 p-3 hover:bg-gray-100 flex items-center justify-between">
            <div
              className="flex-1 cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === edu.id ? null : edu.id)
              }
            >
              <p className="font-medium text-gray-900">
                {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
              </p>
              <p className="text-sm text-gray-600">{edu.school || 'School'}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveUp(index);
                }}
                disabled={index === 0}
                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move up"
              >
                ▲
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveDown(index);
                }}
                disabled={index === educations.length - 1}
                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move down"
              >
                ▼
              </button>
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
                <RichTextEditor
                  value={edu.description || ''}
                  onChange={(value) =>
                    handleUpdateEducation(edu.id, 'description', value)
                  }
                  placeholder="Add any additional details..."
                  height="180px"
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

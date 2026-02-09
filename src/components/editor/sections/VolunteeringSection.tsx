'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CVSection, Volunteering } from '@/types/cv';
import RichTextEditor from '@/components/RichTextEditor';

interface VolunteeringSectionProps {
  section: CVSection;
}

export default function VolunteeringSection({ section }: VolunteeringSectionProps) {
  const { updateSectionContent } = useCVStore();
  const volunteering = (section.content as Volunteering[]) || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddVolunteering = () => {
    const newVolunteering: Volunteering = {
      id: 'vol-' + Date.now(),
      role: '',
      organization: '',
      startDate: '',
      endDate: '',
      currentlyVolunteering: false,
      description: '',
      location: '',
    };
    updateSectionContent(section.id, [...volunteering, newVolunteering]);
  };

  const handleRemoveVolunteering = (id: string) => {
    updateSectionContent(
      section.id,
      volunteering.filter(v => v.id !== id)
    );
  };

  const handleUpdateVolunteering = (id: string, field: string, value: any) => {
    updateSectionContent(
      section.id,
      volunteering.map(v =>
        v.id === id ? { ...v, [field]: value } : v
      )
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newVolunteering = [...volunteering];
    [newVolunteering[index - 1], newVolunteering[index]] = [newVolunteering[index], newVolunteering[index - 1]];
    updateSectionContent(section.id, newVolunteering);
  };

  const handleMoveDown = (index: number) => {
    if (index === volunteering.length - 1) return;
    const newVolunteering = [...volunteering];
    [newVolunteering[index], newVolunteering[index + 1]] = [newVolunteering[index + 1], newVolunteering[index]];
    updateSectionContent(section.id, newVolunteering);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {volunteering.map((vol, index) => (
          <div key={vol.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="w-full bg-gray-50 p-3 flex items-center justify-between hover:bg-gray-100 transition">
              <button
                onClick={() => setExpandedId(expandedId === vol.id ? null : vol.id)}
                className="flex-1 text-left"
              >
                <span className="font-medium text-gray-900">
                  {vol.role || 'New Volunteering'}
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  ▲
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === volunteering.length - 1}
                  className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  ▼
                </button>
                <span className="text-gray-400">
                  {expandedId === vol.id ? '▼' : '▶'}
                </span>
              </div>
            </div>

            {expandedId === vol.id && (
              <div className="p-4 space-y-3 bg-white border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role/Position
                  </label>
                  <input
                    type="text"
                    value={vol.role}
                    onChange={(e) => handleUpdateVolunteering(vol.id, 'role', e.target.value)}
                    placeholder="Volunteer Coordinator"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={vol.organization}
                    onChange={(e) => handleUpdateVolunteering(vol.id, 'organization', e.target.value)}
                    placeholder="Red Cross"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={vol.location || ''}
                    onChange={(e) => handleUpdateVolunteering(vol.id, 'location', e.target.value)}
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
                      value={vol.startDate}
                      onChange={(e) => handleUpdateVolunteering(vol.id, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={vol.endDate || ''}
                      onChange={(e) => handleUpdateVolunteering(vol.id, 'endDate', e.target.value)}
                      disabled={vol.currentlyVolunteering}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`currently-volunteering-${vol.id}`}
                    checked={vol.currentlyVolunteering}
                    onChange={(e) => handleUpdateVolunteering(vol.id, 'currentlyVolunteering', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`currently-volunteering-${vol.id}`} className="text-sm text-gray-700">
                    Currently volunteering here
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <RichTextEditor
                    value={vol.description}
                    onChange={(value) => handleUpdateVolunteering(vol.id, 'description', value)}
                    placeholder="Describe your volunteering activities and impact..."
                    height="180px"
                  />
                </div>

                <button
                  onClick={() => handleRemoveVolunteering(vol.id)}
                  className="w-full px-3 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove Volunteering Experience
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleAddVolunteering}
        className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition"
      >
        + Add Volunteering Experience
      </button>
    </div>
  );
}

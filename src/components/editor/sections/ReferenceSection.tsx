'use client';

import { useCVStore } from '@/store/cvStore';
import { CVSection, Reference } from '@/types/cv';

interface ReferenceSectionProps {
  section: CVSection;
}

export default function ReferenceSection({ section }: ReferenceSectionProps) {
  const { updateSectionContent } = useCVStore();
  const references = (section.content as Reference[]) || [];

  const handleAddReference = () => {
    const newReference: Reference = {
      id: 'ref-' + Date.now(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
      relationship: '',
    };
    updateSectionContent(section.id, [...references, newReference]);
  };

  const handleRemoveReference = (id: string) => {
    updateSectionContent(
      section.id,
      references.filter(r => r.id !== id)
    );
  };

  const handleUpdateReference = (id: string, field: string, value: any) => {
    updateSectionContent(
      section.id,
      references.map(r =>
        r.id === id ? { ...r, [field]: value } : r
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {references.map(ref => (
          <div key={ref.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={ref.name}
                onChange={(e) => handleUpdateReference(ref.id, 'name', e.target.value)}
                placeholder="John Smith"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position/Title
                </label>
                <input
                  type="text"
                  value={ref.position}
                  onChange={(e) => handleUpdateReference(ref.id, 'position', e.target.value)}
                  placeholder="Senior Manager"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Organization
                </label>
                <input
                  type="text"
                  value={ref.company}
                  onChange={(e) => handleUpdateReference(ref.id, 'company', e.target.value)}
                  placeholder="Tech Corp"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={ref.email}
                  onChange={(e) => handleUpdateReference(ref.id, 'email', e.target.value)}
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
                  value={ref.phone}
                  onChange={(e) => handleUpdateReference(ref.id, 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={ref.relationship}
                onChange={(e) => handleUpdateReference(ref.id, 'relationship', e.target.value)}
                placeholder="Former Manager"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <button
              onClick={() => handleRemoveReference(ref.id)}
              className="w-full px-3 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Remove Reference
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddReference}
        className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition"
      >
        + Add Reference
      </button>
    </div>
  );
}

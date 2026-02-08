'use client';

import { CV } from '@/types/cv';

interface TemplateSwitcherProps {
  cv: CV;
  onTemplateChange: (template: string) => void;
}

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional business style',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and creative layout',
  },
];

export default function TemplateSwitcher({
  cv,
  onTemplateChange,
}: TemplateSwitcherProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        CV Templates
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {TEMPLATES.map(template => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`p-4 rounded-lg border-2 transition text-left ${
              cv.template === template.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-semibold text-gray-900">{template.name}</h4>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

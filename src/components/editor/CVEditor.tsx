'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CV, CVSection } from '@/types/cv';
import PersonalInfoSection from './sections/PersonalInfoSection';
import SummarySection from './sections/SummarySection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import CertificationSection from './sections/CertificationSection';
import LanguageSection from './sections/LanguageSection';
import VolunteeringSection from './sections/VolunteeringSection';
import ReferenceSection from './sections/ReferenceSection';

interface CVEditorProps {
  cv: CV;
}

export default function CVEditor({ cv }: CVEditorProps) {
  const {
    updateCVTitle,
    addSection,
    removeSection,
    reorderSections,
    toggleSectionVisibility,
  } = useCVStore();

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [dragOverSection, setDragOverSection] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCVTitle(e.target.value);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, sectionId: string) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, sectionId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSection(sectionId);
  };

  const handleDragLeave = () => {
    setDragOverSection(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetSectionId: string) => {
    e.preventDefault();
    setDragOverSection(null);

    if (!draggedSection || draggedSection === targetSectionId) {
      setDraggedSection(null);
      return;
    }

    // Get sorted sections
    const sortedSections = cv.sections.sort((a, b) => a.order - b.order);
    const draggedIndex = sortedSections.findIndex(s => s.id === draggedSection);
    const targetIndex = sortedSections.findIndex(s => s.id === targetSectionId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedSection(null);
      return;
    }

    // Reorder sections
    const newSections = [...sortedSections];
    const [movedSection] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, movedSection);

    // Update order numbers
    const reorderedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    reorderSections(reorderedSections);
    setDraggedSection(null);
  };

  const handleAddSection = (type: string) => {
    const sectionContentMap: Record<string, any> = {
      summary: { text: '' },
      personal: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
      },
    };

    const newSection: CVSection = {
      id: 'section-' + Date.now(),
      type: type as any,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      order: cv.sections.length + 1,
      visible: true,
      content: sectionContentMap[type] ?? [],
    };
    addSection(newSection);
  };

  const handleRemoveSection = (sectionId: string) => {
    if (confirm('Are you sure you want to remove this section?')) {
      removeSection(sectionId);
    }
  };

  const renderSectionEditor = (section: CVSection) => {
    switch (section.type) {
      case 'personal':
        return <PersonalInfoSection section={section} />;
      case 'summary':
        return <SummarySection section={section} />;
      case 'experience':
        return <ExperienceSection section={section} />;
      case 'education':
        return <EducationSection section={section} />;
      case 'skills':
        return <SkillsSection section={section} />;
      case 'projects':
        return <ProjectsSection section={section} />;
      case 'certifications':
        return <CertificationSection section={section} />;
      case 'languages':
        return <LanguageSection section={section} />;
      case 'volunteering':
        return <VolunteeringSection section={section} />;
      case 'references':
        return <ReferenceSection section={section} />;
      default:
        return <div className="text-gray-500">Section editor not implemented</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Title Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CV Title
        </label>
        <input
          type="text"
          value={cv.title}
          onChange={handleTitleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="My CV"
        />
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">CV Sections</h3>

        {cv.sections
          .sort((a, b) => a.order - b.order)
          .map(section => (
            <div
              key={section.id}
              className={`border rounded-lg transition-all ${
                draggedSection === section.id ? 'opacity-50 border-indigo-400 bg-indigo-50' : 'border-gray-200'
              } ${dragOverSection === section.id && draggedSection !== section.id ? 'border-indigo-500 border-2 bg-indigo-50' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, section.id)}
              onDragOver={(e) => handleDragOver(e, section.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, section.id)}
            >
              {/* Section Header */}
              <div
                className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition flex items-center justify-between"
                onClick={() =>
                  setEditingSection(
                    editingSection === section.id ? null : section.id
                  )
                }
              >
                <div className="flex items-center space-x-3">
                  <div className="text-gray-400 cursor-move" title="Drag to reorder">
                    ⋮⋮
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionVisibility(section.id);
                    }}
                    className={`w-5 h-5 rounded flex items-center justify-center ${
                      section.visible
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {section.visible ? '✓' : '○'}
                  </button>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {section.title}
                    </h4>
                    <p className="text-sm text-gray-500">{section.type}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSection(section.id);
                    }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                  <span className="text-gray-400">
                    {editingSection === section.id ? '▼' : '▶'}
                  </span>
                </div>
              </div>

              {/* Section Content */}
              {editingSection === section.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  {renderSectionEditor(section)}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Add Section */}
      <div className="border-t pt-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Add Section</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            'summary',
            'experience',
            'education',
            'skills',
            'projects',
            'certifications',
            'languages',
            'volunteering',
            'references',
          ].map(type => (
            <button
              key={type}
              onClick={() => handleAddSection(type)}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-left"
            >
              + {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

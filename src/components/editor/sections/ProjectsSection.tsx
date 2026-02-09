'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CVSection, Project } from '@/types/cv';
import RichTextEditor from '@/components/RichTextEditor';

interface ProjectsSectionProps {
  section: CVSection;
}

export default function ProjectsSection({ section }: ProjectsSectionProps) {
  const { updateSectionContent } = useCVStore();
  const projects = (section.content as Project[]) || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddProject = () => {
    const newProject: Project = {
      id: 'proj-' + Date.now(),
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      technologies: [],
      link: '',
      image: '',
    };
    updateSectionContent(section.id, [...projects, newProject]);
  };

  const handleRemoveProject = (id: string) => {
    updateSectionContent(
      section.id,
      projects.filter(p => p.id !== id)
    );
  };

  const handleUpdateProject = (id: string, field: string, value: any) => {
    updateSectionContent(
      section.id,
      projects.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newProjects = [...projects];
    [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
    updateSectionContent(section.id, newProjects);
  };

  const handleMoveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const newProjects = [...projects];
    [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];
    updateSectionContent(section.id, newProjects);
  };

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div key={project.id} className="border border-gray-200 rounded-lg">
          <div className="bg-gray-50 p-3 hover:bg-gray-100 flex items-center justify-between">
            <div
              className="flex-1 cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === project.id ? null : project.id)
              }
            >
              <p className="font-medium text-gray-900">
                {project.title || 'Project Title'}
              </p>
              {project.technologies?.length > 0 && (
                <p className="text-sm text-gray-600">
                  {project.technologies.join(', ')}
                </p>
              )}
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
                disabled={index === projects.length - 1}
                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move down"
              >
                ▼
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProject(project.id);
                }}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>

          {expandedId === project.id && (
            <div className="p-4 border-t border-gray-200 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    handleUpdateProject(project.id, 'title', e.target.value)
                  }
                  placeholder="Project name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <RichTextEditor
                  value={project.description}
                  onChange={(value) =>
                    handleUpdateProject(project.id, 'description', value)
                  }
                  placeholder="Describe the project..."
                  height="180px"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={project.startDate}
                    onChange={(e) =>
                      handleUpdateProject(project.id, 'startDate', e.target.value)
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
                    value={project.endDate || ''}
                    onChange={(e) =>
                      handleUpdateProject(project.id, 'endDate', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={project.technologies?.join(', ') || ''}
                  onChange={(e) =>
                    handleUpdateProject(
                      project.id,
                      'technologies',
                      e.target.value.split(',').map(t => t.trim())
                    )
                  }
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Link
                </label>
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) =>
                    handleUpdateProject(project.id, 'link', e.target.value)
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleAddProject}
        className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition"
      >
        + Add Project
      </button>
    </div>
  );
}

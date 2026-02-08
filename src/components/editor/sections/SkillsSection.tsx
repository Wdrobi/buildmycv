'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CVSection, Skill } from '@/types/cv';

interface SkillsSectionProps {
  section: CVSection;
}

const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'] as const;

export default function SkillsSection({ section }: SkillsSectionProps) {
  const { updateSectionContent } = useCVStore();
  const skills = (section.content as Skill[]) || [];
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory).sort();

  const handleAddCategory = () => {
    const categoryName = prompt('Enter category name (e.g., Frontend, Backend, DevOps):');
    if (categoryName && categoryName.trim()) {
      const trimmedName = categoryName.trim();
      // Create a new skill with the category
      const newSkill: Skill = {
        id: 'skill-' + Date.now(),
        name: '',
        level: 'intermediate',
        category: trimmedName,
        endorsements: 0,
      };
      updateSectionContent(section.id, [...skills, newSkill]);
      setExpandedCategory(trimmedName);
    }
  };

  const handleAddSkill = (category: string) => {
    const newSkill: Skill = {
      id: 'skill-' + Date.now(),
      name: '',
      level: 'intermediate',
      category: category,
      endorsements: 0,
    };
    updateSectionContent(section.id, [...skills, newSkill]);
  };

  const handleRemoveSkill = (id: string) => {
    updateSectionContent(
      section.id,
      skills.filter(s => s.id !== id)
    );
  };

  const handleUpdateSkill = (id: string, field: string, value: any) => {
    updateSectionContent(
      section.id,
      skills.map(s =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  };

  const handleRenameCategory = (oldName: string) => {
    const newName = prompt('Enter new category name:', oldName);
    if (newName && newName.trim() && newName !== oldName) {
      const updatedSkills = skills.map(s =>
        s.category === oldName ? { ...s, category: newName.trim() } : s
      );
      updateSectionContent(section.id, updatedSkills);
      setExpandedCategory(newName.trim());
    }
  };

  const handleDeleteCategory = (category: string) => {
    if (confirm(`Delete category "${category}" and all its skills?`)) {
      updateSectionContent(
        section.id,
        skills.filter(s => s.category !== category)
      );
    }
  };

  return (
    <div className="space-y-4">
      {categories.map(category => (
        <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Category Header */}
          <button
            onClick={() =>
              setExpandedCategory(expandedCategory === category ? null : category)
            }
            className="w-full bg-indigo-50 p-4 flex items-center justify-between hover:bg-indigo-100 transition"
          >
            <span className="font-semibold text-gray-900">{category}</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                {skillsByCategory[category].length}
              </span>
              <span className="text-gray-400">
                {expandedCategory === category ? '▼' : '▶'}
              </span>
            </div>
          </button>

          {/* Category Content */}
          {expandedCategory === category && (
            <div className="p-4 space-y-3 bg-white border-t border-gray-200">
              {/* Category Actions */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => handleAddSkill(category)}
                  className="flex-1 px-3 py-2 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition font-medium"
                >
                  + Add Skill
                </button>
                <button
                  onClick={() => handleRenameCategory(category)}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                  title="Rename category"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDeleteCategory(category)}
                  className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                  title="Delete category"
                >
                  🗑
                </button>
              </div>

              {/* Skills in Category */}
              <div className="space-y-2">
                {skillsByCategory[category].map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) =>
                          handleUpdateSkill(skill.id, 'name', e.target.value)
                        }
                        placeholder="Skill name (e.g., React, Python)"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
                      />
                      <select
                        value={skill.level}
                        onChange={(e) =>
                          handleUpdateSkill(skill.id, 'level', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      >
                        {SKILL_LEVELS.map(level => (
                          <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleAddCategory}
        className="w-full px-4 py-2 border border-dashed border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50 transition"
      >
        + Add Category
      </button>
    </div>
  );
}

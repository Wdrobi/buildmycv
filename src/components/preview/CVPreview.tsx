'use client';

import { CV } from '@/types/cv';

interface CVPreviewProps {
  cv: CV;
}

export default function CVPreview({ cv }: CVPreviewProps) {
  const renderPersonalSection = () => {
    const personal = cv.sections.find(s => s.type === 'personal')?.content as any;
    if (!personal) return null;

    return (
      <div className="mb-6 pb-6 border-b-2 border-gray-200">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {personal.firstName} {personal.lastName}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personal.email && <span>📧 {personal.email}</span>}
          {personal.phone && <span>📱 {personal.phone}</span>}
          {personal.location && <span>📍 {personal.location}</span>}
        </div>
        {(personal.website || personal.linkedin || personal.github) && (
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
            {personal.website && (
              <a href={personal.website} className="text-indigo-600 hover:underline">
                Website
              </a>
            )}
            {personal.linkedin && (
              <a href={personal.linkedin} className="text-indigo-600 hover:underline">
                LinkedIn
              </a>
            )}
            {personal.github && (
              <a href={personal.github} className="text-indigo-600 hover:underline">
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderSection = (section: any) => {
    if (!section.visible) return null;

    return (
      <div key={section.id} className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
          {section.title}
        </h2>

        {section.type === 'summary' && (
          <div className="text-gray-700 text-sm whitespace-pre-wrap text-justify">
            {(section.content as any)?.text || ''}
          </div>
        )}

        {section.type === 'experience' && (
          <div className="space-y-4">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.jobTitle}
                      </h3>
                      <p className="text-gray-700">{item.company}</p>
                      {item.location && (
                        <p className="text-sm text-gray-600">{item.location}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {item.startDate}
                      {item.endDate && ` - ${item.endDate}`}
                      {item.currentlyWorking && ' - Present'}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-gray-700 text-sm mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'education' && (
          <div className="space-y-4">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.degree}
                        {item.field && ` in ${item.field}`}
                      </h3>
                      <p className="text-gray-700">{item.school}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {item.startDate}
                      {item.endDate && ` - ${item.endDate}`}
                      {item.currentlyStudying && ' - Present'}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-gray-700 text-sm mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'skills' && (
          <div className="space-y-4">
            {(() => {
              // Support both old format (Skill[]) and new format (SkillsContent)
              const content = section.content as any[] | { skills: any[]; categoryOrder?: string[] };
              const skills = Array.isArray(content) ? content : (content?.skills || []);
              const categoryOrder = Array.isArray(content) ? undefined : content?.categoryOrder;
              
              const skillsByCategory = skills.reduce(
                (acc, skill) => {
                  const cat = skill.category || 'Other Skills';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(skill);
                  return acc;
                },
                {} as Record<string, any[]>
              );

              // Get categories in order
              const allCategories = Object.keys(skillsByCategory);
              const orderedCategories = categoryOrder
                ? [...categoryOrder.filter(cat => allCategories.includes(cat)), ...allCategories.filter(cat => !categoryOrder.includes(cat))]
                : allCategories.sort();

              return orderedCategories.map((category) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory[category].map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill.name}
                        {skill.level && skill.level !== 'intermediate' && (
                          <span className="text-xs opacity-75 ml-1">
                            ({skill.level})
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        )}

        {section.type === 'projects' && (
          <div className="space-y-4">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    {item.link && (
                      <a
                        href={item.link}
                        className="text-indigo-600 text-sm hover:underline"
                      >
                        View
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mt-1">
                    {item.description}
                  </p>
                  {item.technologies?.length > 0 && (
                    <p className="text-gray-600 text-xs mt-2">
                      <span className="font-semibold">Tech:</span>{' '}
                      {item.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'certifications' && (
          <div className="space-y-3">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-700 text-sm">{item.issuer}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {item.issueDate}
                    </span>
                  </div>
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      className="text-indigo-600 text-xs hover:underline"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'languages' && (
          <div className="flex flex-wrap gap-3">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-sm text-gray-600">
                    ({item.proficiency})
                  </span>
                </div>
              ))}
          </div>
        )}

        {section.type === 'volunteering' && (
          <div className="space-y-4">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.role}</h3>
                      <p className="text-gray-700">{item.organization}</p>
                      {item.location && (
                        <p className="text-sm text-gray-600">{item.location}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {item.startDate}
                      {item.endDate && ` - ${item.endDate}`}
                      {item.currentlyVolunteering && ' - Present'}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-gray-700 text-sm mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'references' && (
          <div className="grid grid-cols-2 gap-4">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-700">{item.position}</p>
                  <p className="text-sm text-gray-700">{item.company}</p>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    {item.email && <p>📧 {item.email}</p>}
                    {item.phone && <p>📱 {item.phone}</p>}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id="cv-preview"
      className="bg-white rounded-lg shadow-md p-12 min-h-screen"
      style={{
        fontFamily: cv.metadata?.fontFamily || 'Arial',
        fontSize: `${cv.metadata?.fontSize || 11}pt`,
        lineHeight: cv.metadata?.lineHeight || 1.5,
      }}
    >
      {renderPersonalSection()}

      {cv.sections
        .filter(s => s.type !== 'personal')
        .sort((a, b) => a.order - b.order)
        .map(renderSection)}
    </div>
  );
}

'use client';

import { CV } from '@/types/cv';

interface CVPreviewProps {
  cv: CV;
}

const renderRichText = (html: string) => ({
  __html: html,
});

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
              <a href={personal.website} className="text-indigo-600 hover:underline flex items-center gap-1">
                🌐 Website
              </a>
            )}
            {personal.linkedin && (
              <a 
                href={`https://linkedin.com/in/${personal.linkedin}`} 
                className="text-indigo-600 hover:underline flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                {personal.linkedin}
              </a>
            )}
            {personal.github && (
              <a 
                href={`https://github.com/${personal.github}`} 
                className="text-indigo-600 hover:underline flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {personal.github}
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
                      <p className="italic text-gray-700">{item.company}</p>
                      {item.location && (
                        <p className="italic text-sm text-gray-600">{item.location}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {item.startDate}
                      {item.endDate && ` - ${item.endDate}`}
                      {item.currentlyWorking && ' - Present'}
                    </span>
                  </div>
                  {item.description && (
                    <div
                      className="text-gray-700 text-sm mt-2 rich-text-content text-justify"
                      dangerouslySetInnerHTML={renderRichText(item.description)}
                    />
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
                      <p className="italic text-gray-700">{item.school}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {item.startDate}
                      {item.endDate && ` - ${item.endDate}`}
                      {item.currentlyStudying && ' - Present'}
                    </span>
                  </div>
                  {item.description && (
                    <div
                      className="text-gray-700 text-sm mt-2 rich-text-content text-justify"
                      dangerouslySetInnerHTML={renderRichText(item.description)}
                    />
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'projects' && (
          <div className="space-y-4">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {item.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.technologies.map((tech: string, index: number) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          className="text-indigo-600 text-xs hover:underline mt-1 inline-block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🔗 {item.link}
                        </a>
                      )}
                    </div>
                    {(item.startDate || item.endDate) && (
                      <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                        {item.startDate}
                        {item.endDate && ` - ${item.endDate}`}
                        {item.currentlyWorking && ' - Present'}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <div
                      className="text-gray-700 text-sm mt-2 rich-text-content text-justify"
                      dangerouslySetInnerHTML={renderRichText(item.description)}
                    />
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

        {section.type === 'certifications' && (
          <div className="space-y-3">
            {Array.isArray(section.content) && (() => {
              // Sort certifications by issueDate in descending order (most recent first)
              const sortedCerts = [...section.content].sort((a: any, b: any) => {
                if (!a.issueDate || !b.issueDate) return 0;
                return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
              });
              return sortedCerts.map((item: any) => (
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
              ));
            })()}
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
                      <p className="italic text-gray-700">{item.organization}</p>
                      {item.location && (
                        <p className="italic text-sm text-gray-600">{item.location}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {item.startDate}
                      {item.endDate && ` - ${item.endDate}`}
                      {item.currentlyVolunteering && ' - Present'}
                    </span>
                  </div>
                  {item.description && (
                    <div
                      className="text-gray-700 text-sm mt-2 rich-text-content text-justify"
                      dangerouslySetInnerHTML={renderRichText(item.description)}
                    />
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
      <style>{`
        .rich-text-content * {
          margin: 0;
          text-align: justify;
        }
        .rich-text-content p {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        .rich-text-content h1,
        .rich-text-content h2,
        .rich-text-content h3 {
          font-weight: 600;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .rich-text-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
        }
        .rich-text-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
        }
        .rich-text-content li {
          margin-bottom: 0.25rem;
          line-height: 1.5;
        }
        .rich-text-content strong {
          font-weight: 600;
        }
        .rich-text-content em {
          font-style: italic;
        }
        .rich-text-content u {
          text-decoration: underline;
        }
        .rich-text-content blockquote {
          border-left: 4px solid rgb(209, 213, 219);
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          color: rgb(107, 114, 128);
          margin-bottom: 0.5rem;
        }
        .rich-text-content a {
          color: rgb(99, 102, 241);
          text-decoration: underline;
        }
        .rich-text-content code {
          background-color: rgb(243, 244, 246);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }
      `}</style>
      {renderPersonalSection()}

      {cv.sections
        .filter(s => s.type !== 'personal')
        .sort((a, b) => a.order - b.order)
        .map(renderSection)}
    </div>
  );
}

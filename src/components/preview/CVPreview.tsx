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
                    <div
                      className="text-gray-700 text-sm mt-2 rich-text-content"
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
                      <p className="text-gray-700">{item.school}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {item.startDate}
                      {item.endDate && ` - ${item.endDate}`}
                      {item.currentlyStudying && ' - Present'}
                    </span>
                  </div>
                  {item.description && (
                    <div
                      className="text-gray-700 text-sm mt-2 rich-text-content"
                      dangerouslySetInnerHTML={renderRichText(item.description)}
                    />
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'skills' && (
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
                  <div
                    className="text-gray-700 text-sm mt-1 rich-text-content"
                    dangerouslySetInnerHTML={renderRichText(item.description)}
                  />
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
                    <div
                      className="text-gray-700 text-sm mt-2 rich-text-content"
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
        .rich-text-content ul,
        .rich-text-content ol {
          margin-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .rich-text-content li {
          margin-bottom: 0.25rem;
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

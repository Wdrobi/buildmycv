'use client';

import { useEffect, useRef, useState } from 'react';
import { CV } from '@/types/cv';

interface CVPreviewProps {
  cv: CV;
}

const renderRichText = (html: string) => {
  // Decode HTML entities to ensure proper text rendering
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  const decoded = textarea.value;
  
  return {
    __html: decoded,
  };
};

export default function CVPreview({ cv }: CVPreviewProps) {
  const renderPersonalSection = () => {
    const personal = cv.sections.find(s => s.type === 'personal')?.content as any;
    if (!personal) return null;

    return (
      <div className="mb-0 pb-0.5 border-b-2 border-gray-200">
        <div className="text-center mb-0.5">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {personal.firstName} {personal.lastName}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
          {personal.email && <span>📧 {personal.email}</span>}
          {personal.phone && <span>📱 {personal.phone}</span>}
          {personal.location && <span>📍 {personal.location}</span>}
        </div>
        {(personal.website || personal.linkedin || personal.github) && (
          <div className="flex flex-wrap justify-center gap-2 mt-0.5 text-xs">
            {personal.website && (
              <a href={personal.website} className="text-indigo-600 hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                🌐 Website
              </a>
            )}
            {personal.linkedin && (
              <a 
                href={`https://linkedin.com/in/${personal.linkedin}`} 
                className="text-indigo-600 hover:underline inline-flex items-center gap-1 leading-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-3.5 h-3.5 social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                {personal.linkedin}
              </a>
            )}
            {personal.github && (
              <a 
                href={`https://github.com/${personal.github}`} 
                className="text-indigo-600 hover:underline inline-flex items-center gap-1 leading-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-3.5 h-3.5 social-icon" fill="currentColor" viewBox="0 0 24 24">
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
      <div key={section.id} className="section-block my-0">
        <h2 className="text-lg font-bold text-gray-900 mb-0 pb-4 border-b-2 border-indigo-600 mt-0">
          {section.title}
        </h2>

        {section.type === 'summary' && (
          <div className="text-gray-700 text-sm whitespace-pre-wrap text-justify mt-0.5">
            {(section.content as any)?.text || ''}
          </div>
        )}

        {section.type === 'experience' && (
          <div className="space-y-0.5 mt-0.5">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id} className="section-block">
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
                      className="text-gray-700 text-sm mt-1.5 rich-text-content text-justify"
                      dangerouslySetInnerHTML={renderRichText(item.description)}
                    />
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'education' && (
          <div className="space-y-0.5 mt-0.5">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id} className="section-block">
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
                      className="text-gray-700 text-sm mt-1.5 rich-text-content text-justify"
                      dangerouslySetInnerHTML={renderRichText(item.description)}
                    />
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'projects' && (
          <div className="space-y-0.5 mt-0.5">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id} className="section-block">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {item.technologies?.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1 text-justify">
                          <strong>Technologies:</strong> {item.technologies.join(', ')}
                        </p>
                      )}
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        className="text-indigo-600 text-sm hover:underline whitespace-nowrap ml-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🔗 View Project
                      </a>
                    )}
                  </div>
                  {item.description && (
                    <div
                      className="text-gray-700 text-sm mt-1.5 rich-text-content text-justify"
                      dangerouslySetInnerHTML={renderRichText(item.description)}
                    />
                  )}
                </div>
              ))}
          </div>
        )}

        {section.type === 'skills' && (
          <div className="space-y-0 mt-0.5">
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
                <p key={category} className="text-sm text-indigo-700 leading-snug section-block">
                  <span className="font-semibold text-gray-700">{category}:</span>{' '}
                  {skillsByCategory[category]
                    .map((skill) => {
                      if (skill.level && skill.level !== 'intermediate') {
                        return `${skill.name} (${skill.level})`;
                      }
                      return skill.name;
                    })
                    .join(', ')}
                </p>
              ));
            })()}
          </div>
        )}

        {section.type === 'certifications' && (
          <div className="space-y-0 mt-0.5">
            {Array.isArray(section.content) && (() => {
              // Sort certifications by issueDate in descending order (most recent first)
              const sortedCerts = [...section.content].sort((a: any, b: any) => {
                if (!a.issueDate || !b.issueDate) return 0;
                return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
              });
              return sortedCerts.map((item: any) => (
                <div key={item.id} className="section-block">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                        {item.issuer && (
                          <span className="text-gray-700 text-sm italic font-normal">
                            {`, ${item.issuer}`}
                          </span>
                        )}
                      </h3>
                    </div>
                    {item.credentialUrl && (
                      <a
                        href={
                          item.credentialUrl.startsWith('http://') || item.credentialUrl.startsWith('https://')
                            ? item.credentialUrl
                            : `https://${item.credentialUrl}`
                        }
                        className="text-indigo-600 text-xs hover:underline whitespace-nowrap"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
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
          <div className="space-y-0.5 mt-0.5">
            {Array.isArray(section.content) &&
              section.content.map((item: any) => (
                <div key={item.id} className="section-block">
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
                      className="text-gray-700 text-sm mt-1.5 rich-text-content text-justify"
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
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg section-block">
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

  const PAGE_WIDTH_MM = 210;
  const PAGE_HEIGHT_MM = 297;
  const PAGE_MARGIN_MM = 15.24;
  const CONTENT_WIDTH_MM = PAGE_WIDTH_MM - PAGE_MARGIN_MM * 2;
  const CONTENT_HEIGHT_MM = PAGE_HEIGHT_MM - PAGE_MARGIN_MM * 2;

  const personalBlock = renderPersonalSection();
  const sectionsToRender = cv.sections
    .filter(s => s.type !== 'personal')
    .sort((a, b) => a.order - b.order);

  const sectionBlocks = sectionsToRender
    .map(renderSection)
    .filter(Boolean) as JSX.Element[];

  const blocks = [personalBlock, ...sectionBlocks].filter(Boolean) as JSX.Element[];

  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pageHeightRef = useRef<HTMLDivElement | null>(null);
  const [pages, setPages] = useState<number[][]>([]);

  const paginateBlocks = () => {
    // Calculate actual page breaks based on A4 dimensions and content height
    const pageHeightPx = pageHeightRef.current?.getBoundingClientRect().height || 0;
    if (!pageHeightPx || blocks.length === 0) return;

    const heights = blocks.map((_, index) => {
      const el = blockRefs.current[index];
      return el ? el.getBoundingClientRect().height : 0;
    });

    // Create pages by fitting blocks based on height
    const pages: number[][] = [];
    let currentPageBlocks: number[] = [];
    let currentPageHeight = 0;

    for (let i = 0; i < blocks.length; i++) {
      const blockHeight = heights[i];
      
      // If adding this block would exceed page height, start a new page
      // Allow starting a new page if current page has content
      if (currentPageHeight + blockHeight > pageHeightPx && currentPageBlocks.length > 0) {
        pages.push(currentPageBlocks);
        currentPageBlocks = [i];
        currentPageHeight = blockHeight;
      } else {
        currentPageBlocks.push(i);
        currentPageHeight += blockHeight;
      }
    }

    // Don't forget the last page
    if (currentPageBlocks.length > 0) {
      pages.push(currentPageBlocks);
    }

    setPages(pages.length > 0 ? pages : [[...Array(blocks.length).keys()]]);
  };

  useEffect(() => {
    // Wait a tick to ensure DOM is painted and measured correctly
    const timer = setTimeout(() => {
      paginateBlocks();
    }, 0);

    const handleResize = () => paginateBlocks();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [blocks.length, cv]);

  const pagesToRender = pages.length > 0 ? pages : [blocks.map((_, index) => index)];

  return (
    <div
      className="cv-preview-root"
      style={{
        fontFamily: cv.metadata?.fontFamily || 'Arial',
        fontSize: `${cv.metadata?.fontSize || 11}pt`,
        lineHeight: cv.metadata?.lineHeight || 1.45,
      }}
    >
      <style>{`
        .cv-preview-root {
          position: relative;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Reduce text size for non-personal sections by 2pt */
        .cv-page-content .section-block,
        .cv-page-content .section-block * {
          font-size: 9pt;
          line-height: 1.45;
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        /* Override for h2 and h3 headings to maintain hierarchy */
        .cv-page-content .section-block h2 {
          font-size: 11pt;
          margin-top: 0;
          margin-bottom: 0.15rem;
          padding-bottom: 0.4rem;
        }

        .cv-page-content .section-block h3 {
          font-size: 9pt;
          margin-top: 0;
          margin-bottom: 0;
        }

        /* Remove gaps between sections and personal info */
        .cv-page-content > div {
          margin: 0;
          padding: 0;
          gap: 0;
          display: block;
        }

        /* Personal info section - minimal spacing */
        .cv-page-content > div:first-child {
          padding-bottom: 0.1rem !important;
          margin-bottom: 0 !important;
        }

        /* Ensure no spacing between consecutive sections */
        .section-block {
          margin: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        .cv-pages {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .cv-page {
          width: ${PAGE_WIDTH_MM}mm;
          height: ${PAGE_HEIGHT_MM}mm;
          padding: ${PAGE_MARGIN_MM}mm;
          background: #ffffff;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          border-radius: 6px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .cv-page-content {
          width: 100%;
        }

        .cv-preview-content {
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
        }

        .cv-preview-content * {
          max-width: 100%;
          box-sizing: border-box;
        }

        .cv-preview-print {
          position: absolute;
          left: -10000px;
          top: 0;
          width: ${CONTENT_WIDTH_MM}mm;
        }

        .cv-measure-wrapper {
          position: absolute;
          left: -10000px;
          top: 0;
          pointer-events: none;
          opacity: 0;
        }

        .cv-measure-height {
          height: ${CONTENT_HEIGHT_MM}mm;
        }

        .section-block {
          /* Allow sections to split across pages if needed */
          break-inside: auto;
          page-break-inside: auto;
        }

        /* Keep small items from breaking */
        .section-block > div {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .skill-category {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        h2 {
          break-after: avoid;
          page-break-after: avoid;
        }

        h3 {
          break-after: avoid;
          page-break-after: avoid;
        }

        .social-icon {
          display: inline-block;
          vertical-align: middle;
          position: relative;
          top: 1px;
          flex-shrink: 0;
        }

        @media print {
          .cv-pages {
            display: none;
          }

          #cv-preview {
            position: static;
            left: 0;
            top: 0;
            width: ${CONTENT_WIDTH_MM}mm;
          }

          /* Reduce font size for printed sections */
          #cv-preview .section-block,
          #cv-preview .section-block * {
            font-size: 9pt;
          }

          #cv-preview .section-block h2 {
            font-size: 11pt;
            margin-top: 0;
            margin-bottom: 0.3rem;
            padding-bottom: 0.5rem;
          }

          /* Remove gaps between sections */
          #cv-preview > div {
            margin: 0;
            padding: 0;
          }

          #cv-preview .section-block {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            padding-top: 0 !important;
          }

          @page {
            size: A4;
            margin: ${PAGE_MARGIN_MM}mm;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .section-block {
            page-break-inside: auto;
            break-inside: auto;
          }

          /* Keep small items from breaking */
          .section-block > div {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          h1, h2, h3 {
            page-break-after: avoid;
            break-after: avoid;
          }

          p {
            orphans: 3;
            widows: 3;
          }
        }

        .rich-text-content * {
          margin: 0;
          text-align: justify;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: normal;
        }
        .rich-text-content p {
          margin-bottom: 0.4rem;
          line-height: 1.45;
          word-spacing: normal;
          letter-spacing: normal;
        }
        .rich-text-content h1,
        .rich-text-content h2,
        .rich-text-content h3 {
          font-weight: 600;
          margin-top: 0.4rem;
          margin-bottom: 0.4rem;
        }
        .rich-text-content ul {
          list-style-type: disc;
          margin-left: 1.25rem;
          margin-bottom: 0.4rem;
          padding-left: 1.25rem;
        }
        .rich-text-content ol {
          list-style-type: decimal;
          margin-left: 1.25rem;
          margin-bottom: 0.4rem;
          padding-left: 1.25rem;
        }
        .rich-text-content li {
          margin-bottom: 0.2rem;
          line-height: 1.45;
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

      <div className="cv-pages">
        {pagesToRender.map((page, pageIndex) => (
          <div key={`page-${pageIndex}`} className="cv-page">
            <div className="cv-page-content cv-preview-content">
              {page.map((blockIndex) => (
                <div key={`block-${pageIndex}-${blockIndex}`}>
                  {blocks[blockIndex]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div id="cv-preview" className="cv-preview-print cv-preview-content">
        {blocks.map((block, index) => (
          <div key={`print-block-${index}`}>{block}</div>
        ))}
      </div>

      <div className="cv-measure-wrapper" aria-hidden>
        <div ref={pageHeightRef} className="cv-measure-height" />
        <div
          className="cv-page-content cv-preview-content"
          style={{ width: `${CONTENT_WIDTH_MM}mm` }}
        >
          {blocks.map((block, index) => (
            <div
              key={`measure-block-${index}`}
              ref={(el) => {
                blockRefs.current[index] = el;
              }}
            >
              {block}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

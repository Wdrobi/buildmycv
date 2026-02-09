'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CVSection, Certification } from '@/types/cv';

interface CertificationSectionProps {
  section: CVSection;
}

export default function CertificationSection({ section }: CertificationSectionProps) {
  const { updateSectionContent } = useCVStore();
  const certifications = (section.content as Certification[]) || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sort certifications by issueDate in descending order (most recent first)
  const sortedCertifications = [...certifications].sort((a, b) => {
    if (!a.issueDate || !b.issueDate) return 0;
    return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
  });

  const handleAddCertification = () => {
    const newCertification: Certification = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
    };
    updateSectionContent(section.id, [...certifications, newCertification]);
  };

  const handleRemoveCertification = (id: string) => {
    updateSectionContent(
      section.id,
      certifications.filter(c => c.id !== id)
    );
  };

  const handleUpdateCertification = (id: string, field: string, value: any) => {
    updateSectionContent(
      section.id,
      certifications.map(c =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {sortedCertifications.map(cert => (
          <div key={cert.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
              className="w-full bg-gray-50 p-3 flex items-center justify-between hover:bg-gray-100 transition"
            >
              <span className="font-medium text-gray-900">
                {cert.name || 'New Certification'}
              </span>
              <span className="text-gray-400">
                {expandedId === cert.id ? '▼' : '▶'}
              </span>
            </button>

            {expandedId === cert.id && (
              <div className="p-4 space-y-3 bg-white border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleUpdateCertification(cert.id, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleUpdateCertification(cert.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Date
                    </label>
                    <input
                      type="month"
                      value={cert.issueDate}
                      onChange={(e) => handleUpdateCertification(cert.id, 'issueDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date (Optional)
                    </label>
                    <input
                      type="month"
                      value={cert.expiryDate || ''}
                      onChange={(e) => handleUpdateCertification(cert.id, 'expiryDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credential ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId || ''}
                    onChange={(e) => handleUpdateCertification(cert.id, 'credentialId', e.target.value)}
                    placeholder="ABC123XYZ"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credential URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={cert.credentialUrl || ''}
                    onChange={(e) => handleUpdateCertification(cert.id, 'credentialUrl', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <button
                  onClick={() => handleRemoveCertification(cert.id)}
                  className="w-full px-3 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove Certification
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleAddCertification}
        className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition"
      >
        + Add Certification
      </button>
    </div>
  );
}

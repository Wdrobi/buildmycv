'use client';

import { useState } from 'react';
import { PDFGenerator } from '@/utils/pdfGenerator';
import { CV } from '@/types/cv';

interface PDFDownloadProps {
  cv: CV;
}

export default function PDFDownload({ cv }: PDFDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [format, setFormat] = useState<'pdf' | 'json' | 'txt'>('pdf');

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      if (format === 'pdf') {
        // PDF download must be done from client side due to DOM requirement
        await PDFGenerator.generatePDFFromHTML(
          'cv-preview',
          `${cv.title || 'CV'}.pdf`
        );
      } else {
        // JSON and TXT export
        const response = await fetch('/api/cv/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cv, format }),
        });

        if (!response.ok) throw new Error('Export failed');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${cv.title || 'CV'}.${format === 'json' ? 'json' : 'txt'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download CV');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
      >
        <span>⬇️</span>
        <span className="hidden sm:inline">{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
      </button>
    </div>
  );
}

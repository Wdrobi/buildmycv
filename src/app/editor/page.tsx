'use client';

import { useEffect, useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { CV } from '@/types/cv';
import { DEFAULT_CV } from '@/utils/templates';
import CVEditor from '@/components/editor/CVEditor';
import CVPreview from '@/components/preview/CVPreview';
import ATSScorePanel from '@/components/ATSScorePanel';

export default function EditorPage() {
  const { currentCV, setCurrentCV } = useCVStore();
  const [showATS, setShowATS] = useState(false);

  useEffect(() => {
    // Initialize with default CV if none exists
    if (!currentCV) {
      setCurrentCV({
        ...DEFAULT_CV,
        id: 'temp-' + Date.now(),
        userId: 'user-1',
        atsScore: 0,
      } as CV);
    }
  }, [currentCV, setCurrentCV]);

  if (!currentCV) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading CV Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white text-sm font-bold">
              CV
            </div>
            <span className="font-semibold text-gray-900">{currentCV.title}</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowATS(!showATS)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition font-medium"
            >
              <span>📊</span>
              <span>ATS Score</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium">
              <span>⬇️</span>
              <span>Download PDF</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium">
              <span>👤</span>
              <span>Profile</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Panel */}
          <div className="lg:col-span-1">
            <CVEditor cv={currentCV} />
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            {showATS ? (
              <ATSScorePanel cv={currentCV} />
            ) : (
              <CVPreview cv={currentCV} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

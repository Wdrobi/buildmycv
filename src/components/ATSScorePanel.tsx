'use client';

import { useMemo } from 'react';
import { CV } from '@/types/cv';
import { ATSAnalyzer } from '@/utils/atsAnalyzer';

interface ATSScorePanelProps {
  cv: CV;
}

export default function ATSScorePanel({ cv }: ATSScorePanelProps) {
  const atsResult = useMemo(() => ATSAnalyzer.analyzeCVForATS(cv), [cv]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
      {/* Score Header */}
      <div
        className={`border-2 rounded-lg p-8 text-center ${getScoreBgColor(
          atsResult.score
        )}`}
      >
        <div className="text-6xl font-bold mb-2">
          <span className={getScoreColor(atsResult.score)}>
            {atsResult.score}
          </span>
          <span className="text-gray-400 text-3xl">/100</span>
        </div>
        <p className="text-gray-700 font-semibold">ATS Compatibility Score</p>
        <p className="text-gray-600 text-sm mt-2">
          {atsResult.score >= 80
            ? "Excellent! Your CV is well-optimized for ATS systems."
            : atsResult.score >= 60
            ? "Good. There are some opportunities to improve your ATS score."
            : "Your CV needs improvement to be better recognized by ATS systems."}
        </p>
      </div>

      {/* Strengths */}
      {atsResult.strengths.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="text-green-600 text-2xl">✓</span>
            <span>Strengths</span>
          </h3>
          <ul className="space-y-2">
            {atsResult.strengths.map((strength, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <span className="text-green-600 font-bold mt-1">✓</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Issues */}
      {atsResult.issues.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="text-red-600 text-2xl">⚠️</span>
            <span>Issues Found</span>
          </h3>
          <div className="space-y-3">
            {atsResult.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-l-4 ${
                  issue.severity === 'high'
                    ? 'bg-red-50 border-red-400'
                    : issue.severity === 'medium'
                    ? 'bg-yellow-50 border-yellow-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {issue.category}
                    </h4>
                    <p className="text-gray-700 text-sm mt-1">{issue.message}</p>
                    {issue.suggestion && (
                      <p className="text-gray-600 text-sm mt-2 italic">
                        💡 {issue.suggestion}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                      issue.severity === 'high'
                        ? 'bg-red-200 text-red-800'
                        : issue.severity === 'medium'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-blue-200 text-blue-800'
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {atsResult.suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="text-indigo-600 text-2xl">💡</span>
            <span>Suggestions</span>
          </h3>
          <ul className="space-y-2">
            {atsResult.suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200"
              >
                <span className="text-indigo-600 font-bold mt-1">→</span>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Score Breakdown */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          How Your Score Is Calculated
        </h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span>Personal Information (10 points) - Contact details presence</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              2
            </span>
            <span>Keywords (20 points) - Industry-specific terminology</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              3
            </span>
            <span>Formatting (15 points) - Font size, margins consistency</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              4
            </span>
            <span>Structure (15 points) - Recommended sections present</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              5
            </span>
            <span>Content Quality (15 points) - Section completeness</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              6
            </span>
            <span>ATS Compatibility (10 points) - Tables, graphics detection</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

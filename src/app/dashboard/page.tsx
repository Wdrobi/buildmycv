'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                CV
              </div>
              <h1 className="text-3xl font-bold text-gray-900">My CVs</h1>
            </div>
            <button
              onClick={() => router.push('/editor')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              + Create New CV
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Empty State */}
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📄</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No CVs yet
          </h2>
          <p className="text-gray-600 mb-8">
            Get started by creating your first CV using our easy-to-use builder
          </p>
          <button
            onClick={() => router.push('/editor')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Create Your First CV
          </button>
        </div>

        {/* Quick Start Guide */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">✏️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              1. Create
            </h3>
            <p className="text-gray-600">
              Start with a template and fill in your professional information
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              2. Analyze
            </h3>
            <p className="text-gray-600">
              Check your ATS score and follow suggestions to improve
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">⬇️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              3. Export
            </h3>
            <p className="text-gray-600">
              Download as PDF or share in other formats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

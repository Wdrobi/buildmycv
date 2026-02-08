'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { CV } from '@/types/cv';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout, user } = useAuthStore();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loadingCVs, setLoadingCVs] = useState(true);

  // Check authentication
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Load CVs
  useEffect(() => {
    const loadCVs = async () => {
      if (!isAuthenticated) return;

      try {
        setLoadingCVs(true);
        const token = localStorage.getItem('token');
        
        const response = await fetch('/api/cv', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
          setCvs(result.data.cvs);
        }
      } catch (error) {
        console.error('Failed to load CVs:', error);
      } finally {
        setLoadingCVs(false);
      }
    };

    loadCVs();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const openCV = (cvId: string) => {
    router.push(`/editor?cvId=${cvId}`);
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading || loadingCVs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/')}
                className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold hover:bg-indigo-700 transition"
              >
                CV
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My CVs</h1>
                {user && <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/editor')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                + Create New CV
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {cvs.length === 0 ? (
          /* Empty State */
          <>
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
          </>
        ) : (
          /* CV List */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                onClick={() => openCV(cv.id)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-indigo-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {cv.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Updated {formatDate(cv.updatedAt)}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                      {cv.template}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    {cv.sections?.length || 0} sections
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    Edit →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

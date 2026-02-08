'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white bg-opacity-10 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-indigo-600">
            CV
          </div>
          <span className="text-2xl font-bold text-white">BuildMyCV</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/auth/login" className="text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition">
            Login
          </a>
          <a href="/auth/register" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Build Your Perfect CV
        </h1>
        <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
          Create a professional CV with our drag-and-drop editor, check your ATS score, and download in PDF format.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/auth/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
          >
            Start Building Now
          </a>
          <a
            href="#features"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl mb-4">
                ✏️
              </div>
              <h3 className="text-xl font-semibold mb-3">Drag & Drop Editor</h3>
              <p className="text-gray-600">
                Easily rearrange, add, or remove sections with intuitive drag-and-drop interface
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl mb-4">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-3">ATS Score Check</h3>
              <p className="text-gray-600">
                Analyze your CV for ATS compatibility and get actionable suggestions to improve
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl mb-4">
                📥
              </div>
              <h3 className="text-xl font-semibold mb-3">Download PDF</h3>
              <p className="text-gray-600">
                Export your CV as a professional PDF with multiple template options
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl mb-4">
                🎨
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Templates</h3>
              <p className="text-gray-600">
                Choose from professional templates designed for modern hiring practices
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl mb-4">
                👁️
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Preview</h3>
              <p className="text-gray-600">
                See your CV update in real-time as you make changes
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl mb-4">
                💾
              </div>
              <h3 className="text-xl font-semibold mb-3">Auto Save</h3>
              <p className="text-gray-600">
                Your CV is automatically saved to the cloud as you work
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build your perfect CV?
          </h2>
          <p className="text-white text-opacity-90 mb-8">
            Join thousands of professionals who have created their CVs with BuildMyCV
          </p>
          <a
            href="/auth/register"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
          >
            Get Started for Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">BuildMyCV</h4>
              <p className="text-gray-400">Create professional CVs with ease</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BuildMyCV. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

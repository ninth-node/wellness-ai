import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-center">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Wellness AI Platform
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          AI-First Wellness & Beauty Management Platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-3">🤖 AI-Powered</h2>
            <p className="text-gray-600">
              Intelligent agents for personalized recommendations and automation
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-3">📅 Smart Scheduling</h2>
            <p className="text-gray-600">
              Predictive scheduling with 40% reduction in no-shows
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-3">💄 Beauty Commerce</h2>
            <p className="text-gray-600">
              AI-driven product recommendations with AR try-on
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/api/docs"
            className="px-8 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            View API Docs
          </Link>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          <p>Built with Next.js 14, FastAPI, and LangGraph</p>
        </div>
      </div>
    </main>
  )
}

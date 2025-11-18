import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
            <p className="text-3xl font-bold mt-2">1,234</p>
            <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Appointments Today</h3>
            <p className="text-3xl font-bold mt-2">45</p>
            <p className="text-blue-600 text-sm mt-2">8 remaining</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Revenue (MTD)</h3>
            <p className="text-3xl font-bold mt-2">$28,450</p>
            <p className="text-green-600 text-sm mt-2">↑ 25% vs target</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">No-Show Rate</h3>
            <p className="text-3xl font-bold mt-2">8%</p>
            <p className="text-green-600 text-sm mt-2">↓ 40% improvement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/clients" className="block p-4 border rounded hover:bg-gray-50">
                <h3 className="font-semibold">👥 Manage Clients</h3>
                <p className="text-sm text-gray-600">View and manage client profiles</p>
              </Link>
              <Link href="/appointments" className="block p-4 border rounded hover:bg-gray-50">
                <h3 className="font-semibold">📅 Schedule Appointment</h3>
                <p className="text-sm text-gray-600">Book new appointments</p>
              </Link>
              <Link href="/treatments" className="block p-4 border rounded hover:bg-gray-50">
                <h3 className="font-semibold">💆 Treatment Catalog</h3>
                <p className="text-sm text-gray-600">View available treatments</p>
              </Link>
              <Link href="/products" className="block p-4 border rounded hover:bg-gray-50">
                <h3 className="font-semibold">🛍️ Product Inventory</h3>
                <p className="text-sm text-gray-600">Manage beauty products</p>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">AI Insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded">
                <h3 className="font-semibold text-purple-900">🤖 Recommendation</h3>
                <p className="text-sm text-purple-700 mt-1">
                  3 clients are due for follow-up treatments
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded">
                <h3 className="font-semibold text-blue-900">📊 Trend Alert</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Hydrating facials are trending this week
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <h3 className="font-semibold text-green-900">💡 Optimization</h3>
                <p className="text-sm text-green-700 mt-1">
                  Tuesday 2PM slot has 80% no-show prediction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

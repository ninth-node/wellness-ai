export default function AppointmentsPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Appointments</h1>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            + New Appointment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              <div className="flex items-center p-4 border-l-4 border-green-500 bg-green-50 rounded">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">Hydrating Facial</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Client: Emma Watson</p>
                  <p className="text-sm text-gray-600">Staff: Sarah (Esthetician)</p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold">9:00 AM</p>
                  <p className="text-sm text-gray-500">60 min</p>
                </div>
              </div>

              <div className="flex items-center p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">Deep Tissue Massage</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      Scheduled
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Client: John Smith</p>
                  <p className="text-sm text-gray-600">Staff: Mike (Therapist)</p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold">11:00 AM</p>
                  <p className="text-sm text-gray-500">90 min</p>
                </div>
              </div>

              {/* More appointments... */}
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">AI Insights</h2>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded">
                  <p className="text-sm font-semibold text-yellow-900">⚠️ High No-Show Risk</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    2:00 PM appointment has 75% no-show probability
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <p className="text-sm font-semibold text-green-900">✓ Optimal Scheduling</p>
                  <p className="text-xs text-green-700 mt-1">
                    Today's schedule is 95% optimized
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Today:</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-bold text-green-600">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-bold text-blue-600">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Utilization:</span>
                  <span className="font-bold">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

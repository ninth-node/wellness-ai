export default function ClientsPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Clients</h1>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            + New Client
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <input
              type="search"
              placeholder="Search clients..."
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Skin Type</th>
                  <th className="pb-3">Last Visit</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4">Sarah Johnson</td>
                  <td className="py-4">sarah@example.com</td>
                  <td className="py-4">(555) 123-4567</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      Combination
                    </span>
                  </td>
                  <td className="py-4">2024-01-15</td>
                  <td className="py-4">
                    <button className="text-purple-600 hover:underline mr-3">View</button>
                    <button className="text-gray-600 hover:underline">Edit</button>
                  </td>
                </tr>
                {/* More rows would be populated from API */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

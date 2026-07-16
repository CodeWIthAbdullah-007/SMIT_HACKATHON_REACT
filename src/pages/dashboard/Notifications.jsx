import { Bell, AlertCircle, CheckCircle } from 'lucide-react'

export default function Notifications() {
  const notifications = [
    { id: 1, type: 'alert', text: 'New high priority issue reported on Projector 01', time: '2 min ago' },
    { id: 2, type: 'success', text: 'HVAC Unit 4 maintenance resolved by John Doe', time: '1 hour ago' },
    { id: 3, type: 'alert', text: 'Asset AST-003 has been inactive for 30 days', time: '3 hours ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-500 mt-1">Recent updates and alerts.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card divide-y divide-gray-100">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
            <div className={`p-2 rounded-lg ${n.type === 'alert' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {n.type === 'alert' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{n.text}</p>
              <p className="text-xs text-gray-500">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
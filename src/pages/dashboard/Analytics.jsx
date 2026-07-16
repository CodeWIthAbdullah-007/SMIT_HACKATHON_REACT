import { Boxes, AlertCircle, CheckCircle2, Clock } from 'lucide-react'

export default function Analytics() {
  const stats = [
    { name: 'Total Assets', value: '142', icon: Boxes, color: 'text-blue-600 bg-blue-50' },
    { name: 'Active Issues', value: '8', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
    { name: 'Resolved (30d)', value: '45', icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
    { name: 'Avg. Resolution', value: '4.2h', icon: Clock, color: 'text-brand-600 bg-brand-50' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Insights into your organization's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-card">
            <div className={`p-2 rounded-lg ${stat.color} w-fit mb-4`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-6">Issues by Category</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1"><span>Hardware</span><span>45%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-brand-600 h-2.5 rounded-full" style={{width: '45%'}}></div></div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span>Software</span><span>25%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-brand-600 h-2.5 rounded-full" style={{width: '25%'}}></div></div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span>Climate Control</span><span>30%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-brand-600 h-2.5 rounded-full" style={{width: '30%'}}></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
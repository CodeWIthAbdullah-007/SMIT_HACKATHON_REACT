import { motion } from 'framer-motion'
import { Boxes, AlertCircle, CheckCircle2, Clock, TrendingUp, ArrowUpRight } from 'lucide-react'

export default function DashboardHome() {
  const stats = [
    { name: 'Total Assets', value: '142', change: '+12%', icon: Boxes, color: 'text-blue-600 bg-blue-50' },
    { name: 'Active Issues', value: '8', change: '-3%', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
    { name: 'Resolved (30d)', value: '45', change: '+8%', icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
    { name: 'Avg. Resolution', value: '4.2h', change: '-0.5h', icon: Clock, color: 'text-brand-600 bg-brand-50' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-card hover:shadow-soft transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" /> {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900">Recent Issues</h2>
            <button className="text-sm text-brand-600 font-medium hover:text-brand-700 flex items-center">
              View all <ArrowUpRight className="w-3 h-3 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { id: 'ISS-001', asset: 'HVAC Unit 4', status: 'High', desc: 'Cooling weak, making noise' },
              { id: 'ISS-002', asset: 'Projector 01', status: 'Medium', desc: 'HDMI signal loss' },
              { id: 'ISS-003', asset: 'Printer 03', status: 'Low', desc: 'Paper jam in tray 2' },
            ].map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-1 h-10 rounded-full ${issue.status === 'High' ? 'bg-red-500' : issue.status === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{issue.asset}</p>
                    <p className="text-xs text-gray-500">{issue.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400">{issue.id}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-6">Maintenance Timeline</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-brand-600 ring-4 ring-brand-100"></div>
                <div className="w-px h-full bg-gray-200 mt-1"></div>
              </div>
              <div className="pb-6">
                <p className="text-sm font-medium text-gray-900">Issue Reported</p>
                <p className="text-xs text-gray-500 mt-1">HVAC Unit 4 - 2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 ring-4 ring-gray-100"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Technician Assigned</p>
                <p className="text-xs text-gray-500 mt-1">John Doe - 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
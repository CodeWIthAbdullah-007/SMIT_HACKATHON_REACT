import { QrCode, BrainCircuit, Wrench, History, BarChart3, Bell } from 'lucide-react'

export default function Features() {
  const features = [
    { icon: QrCode, title: 'QR Asset Identity', desc: 'Generate unique QR codes for instant access to asset information and reporting.' },
    { icon: BrainCircuit, title: 'AI Issue Triage', desc: 'AI analyzes complaints to suggest priority, category, and diagnostic steps.' },
    { icon: Wrench, title: 'Maintenance Workflow', desc: 'Assign tasks to technicians and track progress from reported to resolved.' },
    { icon: History, title: 'Asset History Timeline', desc: 'Maintain a permanent, unalterable log of all activities, repairs, and issues.' },
    { icon: BarChart3, title: 'Advanced Analytics', desc: 'Get insights into asset health, recurring failures, and team performance.' },
    { icon: Bell, title: 'Real-time Notifications', desc: 'Receive instant alerts for new issues, assignments, and status updates.' },
  ]

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Powerful Features</h1>
          <p className="text-lg text-gray-600">Everything you need to manage asset maintenance in one platform.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-card hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
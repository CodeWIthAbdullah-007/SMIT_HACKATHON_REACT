import { Users, Target, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About MaintainIQ</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We are on a mission to transform how organizations manage physical assets, moving from reactive chaos to proactive intelligence.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
            <p className="text-sm text-gray-500">To give every physical asset a digital identity and a voice, ensuring nothing is ever left unattended.</p>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Our Team</h3>
            <p className="text-sm text-gray-500">Built by engineers and facility managers who understand the pain of scattered maintenance logs.</p>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Why Choose Us</h3>
            <p className="text-sm text-gray-500">Our AI-driven approach reduces downtime by up to 40% and extends asset lifecycles significantly.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
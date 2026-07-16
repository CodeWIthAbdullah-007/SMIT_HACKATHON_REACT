import { motion } from 'framer-motion'
import { Sparkles, AlertTriangle, Wrench } from 'lucide-react'

export default function AIShowcase() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">AI-Powered Issue Triage</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transform natural language complaints into structured, professional maintenance tickets instantly.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-xl shadow-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-medium">U</div>
              <div>
                <p className="font-medium text-gray-900 text-sm">User Report</p>
                <p className="text-xs text-gray-500">Classroom Projector 01</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
              <p className="text-gray-700 text-sm leading-relaxed">"The projector display is flickering and sometimes it completely loses the HDMI signal. It's been happening since yesterday afternoon."</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-xl shadow-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-100">
              <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-brand-900 text-sm">MaintainIQ AI</p>
                <p className="text-xs text-brand-600">Triage Result</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-xs font-medium text-brand-600 uppercase tracking-wider mb-1">Professional Title</p>
                <p className="text-gray-900 font-medium">Display Flickering & Intermittent HDMI Signal Loss</p>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs font-medium text-brand-600 uppercase tracking-wider mb-1">Category</p>
                  <span className="inline-block px-2.5 py-1 bg-white border border-brand-200 rounded text-xs text-brand-800">Display / Connectivity</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-brand-600 uppercase tracking-wider mb-1">Priority</p>
                  <span className="inline-flex items-center px-2.5 py-1 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                    <AlertTriangle className="w-3 h-3 mr-1" /> High
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-brand-600 uppercase tracking-wider mb-1">Initial Checks</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><Wrench className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" /> Verify HDMI cable integrity and port connections.</li>
                  <li className="flex items-start gap-2"><Wrench className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" /> Check projector lamp hours and cooling vents.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
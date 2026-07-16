import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const faqs = [
    { q: 'How does the QR code system work?', a: 'Every asset gets a unique QR code. Scanning it opens a public page where anyone can report an issue without needing an account.' },
    { q: 'Is the AI Triage accurate?', a: 'Our AI is trained on thousands of maintenance logs. It provides highly accurate suggestions, but a human always makes the final decision.' },
    { q: 'Can I use this for multiple locations?', a: 'Yes, the Pro and Enterprise plans support multiple locations and facilities under one account.' },
    { q: 'Do technicians need an account?', a: 'Yes, technicians get special accounts to view assigned tasks, update status, and log maintenance records.' }
  ]

  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Everything you need to know about the platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${open === index ? 'rotate-180' : ''}`} />
              </button>
              {open === index && (
                <div className="p-5 pt-0 text-gray-600 text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
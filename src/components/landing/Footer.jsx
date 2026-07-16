import { QrCode } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-brand-600 rounded-lg">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">MaintainIQ</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">AI Powered QR Maintenance & Asset History Platform for modern enterprises.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="text-gray-500 hover:text-gray-900">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-500 hover:text-gray-900">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-500 hover:text-gray-900">About</Link></li>
              <li><Link to="/login" className="text-gray-500 hover:text-gray-900">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">© 2024 MaintainIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
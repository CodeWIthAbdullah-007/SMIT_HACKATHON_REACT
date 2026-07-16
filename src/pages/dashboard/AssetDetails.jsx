import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, QrCode, Download, AlertCircle, History } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function AssetDetails() {
  const { id } = useParams()
  const publicUrl = `https://maintainiq.app/asset/${id}`

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/assets" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projector 01</h1>
          <p className="text-gray-500 text-sm font-mono">AST-002 • Classroom A</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Asset Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Category</p>
                <p className="font-medium text-gray-900">Electronics</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Condition</p>
                <p className="font-medium text-gray-900">Fair</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Last Service</p>
                <p className="font-medium text-gray-900">May 12, 2024</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Next Service</p>
                <p className="font-medium text-gray-900">Nov 12, 2024</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Maintenance History</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 border-l-2 border-brand-200 pl-4 pb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Issue Reported: Display Flickering</p>
                  <p className="text-xs text-gray-500 mt-1">Reported by User - 2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4 border-l-2 border-gray-200 pl-4 pb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Resolved: Lamp Replacement</p>
                  <p className="text-xs text-gray-500 mt-1">Fixed by Tech John - May 12, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: QR & Quick Actions */}
        <div className="space-y-6">
          <div className="card text-center">
            <h2 className="font-semibold text-gray-900 mb-4">Asset QR Code</h2>
            <div className="p-4 bg-white border border-gray-200 rounded-lg inline-block mb-4">
              <QRCodeSVG value={publicUrl} size={160} level="H" />
            </div>
            <p className="text-xs text-gray-500 mb-4 break-all">{publicUrl}</p>
            <div className="flex flex-col gap-2">
              <button className="btn-secondary justify-center">
                <Download className="w-4 h-4 mr-2" /> Download QR
              </button>
              <button className="btn-primary justify-center">
                <AlertCircle className="w-4 h-4 mr-2" /> Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
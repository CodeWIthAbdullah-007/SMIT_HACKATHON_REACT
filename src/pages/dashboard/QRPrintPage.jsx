import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import { QRCodeSVG } from 'qrcode.react'
import { QrCode } from 'lucide-react'

export default function QRPrintPage() {
  const { id } = useParams()
  const [asset, setAsset] = useState(null)

  useEffect(() => {
    async function fetchAsset() {
      const { data } = await supabase.from('assets').select('*').eq('id', id).single()
      setAsset(data)
    }
    fetchAsset()
  }, [id])

  if (!asset) return <div className="p-10 text-center">Loading asset details...</div>

  // URL jo QR code mein encode hoga
  const publicUrl = `${window.location.origin}/asset/${asset.id}`

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white p-10 rounded-xl shadow-soft border border-gray-200 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-2 bg-brand-600 rounded-lg">
            <QrCode className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{asset.name}</h1>
        <p className="text-sm text-gray-500 mb-6">Asset Code: {asset.code}</p>

        {/* Large QR Code */}
        <div className="p-4 bg-white border-4 border-gray-800 rounded-lg inline-block mb-6">
          <QRCodeSVG value={publicUrl} size={256} level="H" />
        </div>

        <div className="text-left bg-gray-50 p-4 rounded-lg space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium text-gray-900">{asset.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Location:</span>
            <span className="font-medium text-gray-900">{asset.location}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          Scan this QR code using your mobile phone camera to report an issue or view asset history.
        </p>

        <button onClick={() => window.print()} className="btn-primary w-full justify-center">
          Print Asset Label
        </button>
      </div>
    </div>
  )
}
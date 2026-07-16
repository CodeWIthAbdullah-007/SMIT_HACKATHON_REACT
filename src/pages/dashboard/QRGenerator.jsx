import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { QRCodeSVG } from 'qrcode.react'
import { Printer } from 'lucide-react'

export default function QRGenerator() {
  const [assets, setAssets] = useState([])

  useEffect(() => {
    async function fetchAssets() {
      const { data } = await supabase.from('assets').select('id, name, code')
      if (data) setAssets(data)
    }
    fetchAssets()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bulk QR Generator</h1>
        <p className="text-gray-500 mt-1">Print QR codes for all your assets at once.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-xl border border-gray-200 shadow-card">
        {assets.map((asset) => (
          <div key={asset.id} className="text-center border p-4 rounded-lg">
            <QRCodeSVG value={`${window.location.origin}/asset/${asset.id}`} size={120} />
            <p className="font-medium text-sm text-gray-900 mt-3 truncate">{asset.name}</p>
            <p className="text-xs text-gray-500 font-mono">{asset.code}</p>
          </div>
        ))}
      </div>

      <button onClick={() => window.print()} className="btn-primary">
        <Printer className="w-4 h-4 mr-2" /> Print All Labels
      </button>
    </div>
  )
}
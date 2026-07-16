import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { Search, Plus, Trash2, QrCode } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'

export default function Assets() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  // Code ko state se hata diya hai
  const [newAsset, setNewAsset] = useState({ name: '', category: '', location: '' })

  // Random Unique Code Generator Function
  const generateAssetCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomStr = '';
    for (let i = 0; i < 6; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `AST-${randomStr}`; // Example: AST-K9F2M1
  };

  // Fetch Assets from Supabase
  useEffect(() => {
    async function fetchAssets() {
      const { data, error } = await supabase.from('assets').select('*')
      if (!error) setAssets(data)
      setLoading(false)
    }
    fetchAssets()
  }, [])

  // Add Asset
  const handleAddAsset = async (e) => {
    e.preventDefault()
    
    // Yahan automatic code generate kar rahe hain
    const autoCode = generateAssetCode()
    
    const { data, error } = await supabase.from('assets').insert([{ 
      ...newAsset, 
      code: autoCode 
    }]).select()
    
    if (!error) {
      setAssets([...assets, ...data])
      setNewAsset({ name: '', category: '', location: '' })
      setShowForm(false)
    } else {
      alert('Error adding asset. Please try again.')
    }
  }

  // Delete Asset
  const handleDelete = async (id) => {
    const { error } = await supabase.from('assets').delete().eq('id', id)
    if (!error) setAssets(assets.filter(a => a.id !== id))
  }

  if (loading) return <div className="p-10 text-center text-gray-500">Loading assets...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="text-gray-500 mt-1">Manage and track all physical assets.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <Plus className="w-4 h-4 mr-1" /> Add Asset
        </button>
      </div>

      {/* Add Asset Form */}
      {showForm && (
        <div className="card bg-gray-50">
          <h3 className="font-medium mb-4">Register New Asset</h3>
          <form onSubmit={handleAddAsset} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" placeholder="Asset Name (e.g. Projector 01)" value={newAsset.name} onChange={(e) => setNewAsset({...newAsset, name: e.target.value})} required />
            {/* Code wala input yahan se hata diya gaya hai */}
            <input className="input" placeholder="Category (e.g. Electronics)" value={newAsset.category} onChange={(e) => setNewAsset({...newAsset, category: e.target.value})} />
            <input className="input" placeholder="Location (e.g. Class A)" value={newAsset.location} onChange={(e) => setNewAsset({...newAsset, location: e.target.value})} />
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="btn-primary">Save & Generate QR</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-3">Note: Asset code will be generated automatically.</p>
        </div>
      )}

      {/* Assets Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium">Auto Code</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium hidden md:table-cell">Location</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-center">QR Code</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-500">{asset.code}</td>
                  <td className="px-6 py-4">
                    <Link to={`/dashboard/assets/${asset.id}`} className="font-medium text-gray-900 hover:text-brand-600">
                      {asset.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-gray-600">{asset.location}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <div className="p-1 bg-white border border-gray-200 rounded">
                      <QRCodeSVG value={`${window.location.origin}/asset/${asset.id}`} size={40} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(asset.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
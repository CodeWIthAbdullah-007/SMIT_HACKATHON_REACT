import { useState } from 'react'
import { supabase } from "../../services/supabaseClient";
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AddAsset() {
  const navigate = useNavigate()
  const [asset, setAsset] = useState({ name: '', category: '', location: '', condition: 'Good' })

  const generateAssetCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomStr = '';
    for (let i = 0; i < 6; i++) randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    return `AST-${randomStr}`;
  };

  const handleAddAsset = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.from('assets').insert([{ 
      ...asset, 
      code: generateAssetCode() 
    }]).select()
    
    if (!error) navigate(`/dashboard/assets/${data[0].id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/assets" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Register New Asset</h1>
          <p className="text-gray-500 mt-1">Fill in the details below.</p>
        </div>
      </div>

      <div className="card max-w-2xl">
        <form onSubmit={handleAddAsset} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name *</label>
            <input type="text" required className="input" placeholder="e.g. Projector 01" onChange={(e) => setAsset({...asset, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <input type="text" required className="input" placeholder="e.g. Electronics" onChange={(e) => setAsset({...asset, category: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input type="text" required className="input" placeholder="e.g. Classroom A" onChange={(e) => setAsset({...asset, location: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select className="input" onChange={(e) => setAsset({...asset, condition: e.target.value})}>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
          <div className="pt-4">
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4 mr-2" /> Save & Generate QR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
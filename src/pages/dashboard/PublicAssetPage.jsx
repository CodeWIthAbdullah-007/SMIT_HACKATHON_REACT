import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import { AlertCircle, Send, Sparkles, Edit, CheckCircle } from 'lucide-react'
import { generateAiTriage } from '../../services/aiMock'

export default function PublicAssetPage() {
  const { id } = useParams()
  const [asset, setAsset] = useState(null)
  const [complaint, setComplaint] = useState('')
  const [triage, setTriage] = useState(null)
  const [loadingAi, setLoadingAi] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchAsset() {
      const { data } = await supabase.from('assets').select('*').eq('id', id).single()
      setAsset(data)
    }
    fetchAsset()
  }, [id])

  const handleAiTriage = async () => {
    setLoadingAi(true)
    const result = await generateAiTriage(complaint)
    setTriage(result)
    setLoadingAi(false)
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    // Insert Issue with AI suggested data
    await supabase.from('issues').insert([{ 
      asset_id: id, 
      title: triage.title,
      description: complaint, 
      priority: triage.priority
    }])
    
    // Update Asset Status to 'Issue Reported'
    await supabase.from('assets').update({ status: 'Issue Reported' }).eq('id', id)
    
    // Add to History
    await supabase.from('asset_history').insert([{ 
      asset_id: id, 
      action: `Issue Reported: ${triage.title}` 
    }])
    
    setSubmitted(true)
  }

  if (!asset) return <div className="p-10 text-center">Loading asset...</div>

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white w-full max-w-md shadow-card rounded-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">{asset.code} • {asset.location}</p>
          <span className="inline-block mt-4 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
            Status: {asset.status}
          </span>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900">Issue Reported!</h3>
            <p className="text-sm text-gray-500 mt-2">The maintenance team has been notified.</p>
          </div>
        ) : (
          <div>
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" /> Report an Issue
            </h2>
            
            <textarea 
              className="input min-h-[100px]" 
              placeholder="Describe the problem (e.g. Projector is flickering and losing HDMI)..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
            
            <button 
              onClick={handleAiTriage} 
              disabled={!complaint || loadingAi}
              className="btn-secondary w-full justify-center mt-2"
            >
              <Sparkles className="w-4 h-4 mr-2" /> {loadingAi ? 'Analyzing...' : 'Run AI Triage'}
            </button>

            {triage && (
              <div className="mt-6 bg-brand-50 border border-brand-100 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-medium text-brand-600 uppercase tracking-wider">AI Suggestions</p>
                  <span className="text-xs text-gray-400 flex items-center"><Edit className="w-3 h-3 mr-1" /> Editable</span>
                </div>
                
                <input 
                  className="input text-sm font-medium" 
                  value={triage.title} 
                  onChange={(e) => setTriage({...triage, title: e.target.value})}
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    className="input text-xs" 
                    value={triage.priority} 
                    onChange={(e) => setTriage({...triage, priority: e.target.value})}
                  >
                    <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                  </select>
                  <input 
                    className="input text-xs" 
                    value={triage.category} 
                    onChange={(e) => setTriage({...triage, category: e.target.value})}
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Possible Causes:</p>
                  <ul className="text-xs text-gray-700 list-disc list-inside">
                    {triage.causes.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {triage && (
              <button onClick={handleFinalSubmit} className="btn-primary w-full justify-center mt-4">
                <Send className="w-4 h-4 mr-2" /> Confirm & Submit Report
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
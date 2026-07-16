import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import { ArrowLeft, Sparkles, AlertTriangle, Wrench, CheckCircle2, Save } from 'lucide-react'

export default function IssueDetails() {
  const { id } = useParams()
  const [issue, setIssue] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [newLog, setNewLog] = useState({ notes: '', parts_replaced: '', cost: 0 })

  useEffect(() => {
    async function fetchData() {
      const { data: issueData } = await supabase
        .from('issues')
        .select('*, assets(name, code, location)')
        .eq('id', id).single()
      
      const { data: logsData } = await supabase
        .from('maintenance_logs')
        .select('*')
        .eq('issue_id', id)
        .order('created_at', { ascending: false })

      setIssue(issueData)
      setLogs(logsData || [])
      setLoading(false)
    }
    fetchData()
  }, [id])

  const updateStatus = async (newStatus) => {
    // Business Rule: Cannot resolve without maintenance note
    if (newStatus === 'Resolved' && logs.length === 0) {
      alert('Action Denied: Cannot resolve issue without adding a maintenance note.')
      return
    }

    const { data, error } = await supabase
      .from('issues')
      .update({ status: newStatus })
      .eq('id', id)
      .select('*, assets(name, code, location)')
    
    if (!error) {
      setIssue(data[0])
      
      // Add to History
      await supabase.from('asset_history').insert([{ 
        asset_id: issue.asset_id, 
        action: `Issue status changed to: ${newStatus}` 
      }])

      // Update Asset Status based on Issue Status
      let assetStatus = 'Issue Reported'
      if (newStatus === 'Inspection Started') assetStatus = 'Under Inspection'
      if (newStatus === 'Maintenance In Progress') assetStatus = 'Under Maintenance'
      if (newStatus === 'Resolved' || newStatus === 'Closed') assetStatus = 'Operational'
      
      await supabase.from('assets').update({ status: assetStatus }).eq('id', issue.asset_id)
      alert(`Issue status updated to: ${newStatus}`)
    }
  }

  const handleAddLog = async (e) => {
    e.preventDefault()
    if (newLog.cost < 0) {
      alert('Cost cannot be negative.')
      return
    }

    const { data, error } = await supabase
      .from('maintenance_logs')
      .insert([{ ...newLog, issue_id: id }])
      .select()
    
    if (!error) {
      setLogs([data[0], ...logs])
      setNewLog({ notes: '', parts_replaced: '', cost: 0 })
      
      await supabase.from('asset_history').insert([{ 
        asset_id: issue.asset_id, 
        action: `Maintenance Log Added: ${newLog.notes.substring(0, 20)}...` 
      }])
    }
  }

  if (loading) return <div className="p-10 text-center">Loading issue details...</div>
  if (!issue) return <div className="p-10 text-center">Issue not found.</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/issues" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
          <p className="text-gray-500 text-sm font-mono">
            {issue.issue_number} • {issue.assets?.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI & Maintenance Logs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Triage Box (Read Only) */}
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-xl shadow-card p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-brand-100">
              <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-brand-900">MaintainIQ AI Triage</p>
                <p className="text-xs text-brand-600">Original Analysis</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p><span className="text-gray-500">Description:</span> {issue.description}</p>
              <p><span className="text-gray-500">Priority:</span> <span className="font-medium text-red-600">{issue.priority}</span></p>
            </div>
          </div>

          {/* Add Maintenance Log Form */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-gray-400" /> Add Maintenance Record
            </h2>
            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Inspection Notes / Actions Performed *</label>
                <textarea required className="input min-h-[80px]" value={newLog.notes} onChange={(e) => setNewLog({...newLog, notes: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Parts Replaced</label>
                  <input className="input" value={newLog.parts_replaced} onChange={(e) => setNewLog({...newLog, parts_replaced: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Cost ($)</label>
                  <input type="number" min="0" className="input" value={newLog.cost} onChange={(e) => setNewLog({...newLog, cost: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn-secondary"><Save className="w-4 h-4 mr-2" /> Save Log</button>
            </form>
          </div>

          {/* Existing Logs */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Maintenance History</h2>
            {logs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No logs added yet.</p>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="border-l-2 border-brand-200 pl-4 pb-4">
                    <p className="text-sm font-medium text-gray-900">{log.notes}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Parts: {log.parts_replaced || 'None'} • Cost: ${log.cost}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Status Workflow */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Issue Status</h2>
            <div className="p-3 bg-gray-50 rounded-lg mb-4 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Current</span>
              <span className="text-sm font-bold text-gray-900">{issue.status}</span>
            </div>
            
            <p className="text-xs font-medium text-gray-700 mb-2">Update Workflow</p>
            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => updateStatus('Assigned')} className="btn-secondary text-xs justify-center">Mark as Assigned</button>
              <button onClick={() => updateStatus('Inspection Started')} className="btn-secondary text-xs justify-center">Start Inspection</button>
              <button onClick={() => updateStatus('Maintenance In Progress')} className="btn-secondary text-xs justify-center">Start Repair</button>
              <button onClick={() => updateStatus('Resolved')} className="btn-primary text-xs justify-center bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Mark as Resolved
              </button>
            </div>
            <p className="text-xs text-red-500 mt-4 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Note: Cannot resolve without adding a maintenance log.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
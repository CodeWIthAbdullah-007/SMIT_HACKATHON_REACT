import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { History, Wrench } from 'lucide-react'

export default function MaintenanceHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    // Mocking history with issues table for now
    async function fetchHistory() {
      const { data } = await supabase
        .from('issues')
        .select('*, assets(name, code)')
        .order('created_at', { ascending: false })
      if (data) setHistory(data)
    }
    fetchHistory()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Maintenance History</h1>
        <p className="text-gray-500 mt-1">A permanent timeline of all asset activities.</p>
      </div>

      <div className="card">
        <div className="space-y-6">
          {history.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-brand-600 ring-4 ring-brand-100"></div>
                <div className="w-px h-full bg-gray-200 mt-1"></div>
              </div>
              <div className="pb-6">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.assets?.name} ({item.assets?.code}) - Status: {item.status}
                </p>
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              No history records found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { Link } from 'react-router-dom'
import { AlertCircle, ArrowUpRight } from 'lucide-react'

export default function Issues() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIssues() {
      // Supabase query to get issues and join with assets table to get asset name
      const { data, error } = await supabase
        .from('issues')
        .select('*, assets(name, code)')
        .order('created_at', { ascending: false })
      
      if (!error) setIssues(data)
      setLoading(false)
    }
    fetchIssues()
  }, [])

  if (loading) return <div className="p-10 text-center text-gray-500">Loading issues...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
        <p className="text-gray-500 mt-1">Track and manage all reported maintenance issues.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium">Asset Code</th>
                <th className="px-6 py-3 font-medium">Asset Name</th>
                <th className="px-6 py-3 font-medium">Issue Title</th>
                <th className="px-6 py-3 font-medium">Priority</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">View Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-500">{issue.assets?.code || 'N/A'}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{issue.assets?.name || 'Unknown Asset'}</td>
                  <td className="px-6 py-4 text-gray-600">{issue.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      issue.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 
                      issue.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 
                      'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {issue.priority || 'Medium'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/dashboard/issues/${issue.id}`} className="text-brand-600 font-medium hover:text-brand-700 inline-flex items-center">
                      Open <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Link>
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
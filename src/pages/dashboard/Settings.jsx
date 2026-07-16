import { Building, Globe, Bell } from 'lucide-react'

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your organization and preferences.</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Building className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">Organization Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
            <input type="text" defaultValue="SMIT Institute" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Location</label>
            <input type="text" defaultValue="Karachi, Pakistan" className="input" />
          </div>
        </div>
        <button className="btn-primary mt-6">Save Changes</button>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500" />
            <span className="text-sm text-gray-700">Email me when a new issue is reported</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500" />
            <span className="text-sm text-gray-700">Email me when an issue is resolved</span>
          </label>
        </div>
      </div>
    </div>
  )
}
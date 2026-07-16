import { useAuth } from '../../context/AuthContext'
import { User, Mail, Shield } from 'lucide-react'

export default function UserProfile() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information.</p>
      </div>

      <div className="card flex items-center gap-6">
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-2xl font-bold">
          {user?.email?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user?.email || 'User Name'}</h2>
          <p className="text-sm text-gray-500">Administrator</p>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Account Details</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-700">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-700">Role: Reporter</span>
          </div>
        </div>
      </div>
    </div>
  )
}
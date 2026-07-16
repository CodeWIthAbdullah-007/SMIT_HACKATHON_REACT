import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Boxes, AlertCircle, History, BarChart3, Bell, User, Settings, QrCode, Wrench, PlusCircle } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Assets', path: '/dashboard/assets', icon: Boxes },
    { name: 'Add Asset', path: '/dashboard/assets/add', icon: PlusCircle },
    { name: 'QR Generator', path: '/dashboard/qr-generator', icon: QrCode },
    { name: 'Issues', path: '/dashboard/issues', icon: AlertCircle },
    { name: 'Maintenance', path: '/dashboard/maintenance', icon: Wrench },
    { name: 'History', path: '/dashboard/maintenance', icon: History },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ]

  // Remove duplicate History/Maintenance if needed, kept for visual structure
  const filteredNav = navItems.filter((item, index, self) => 
    index === self.findIndex((t) => t.path === item.path)
  )

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-col shrink-0 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-600 rounded-lg">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900">MaintainIQ</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
        {filteredNav.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
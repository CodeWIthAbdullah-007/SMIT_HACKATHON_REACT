import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { QrCode } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-600 rounded-lg">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">MaintainIQ</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/features" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}>Features</NavLink>
            <NavLink to="/pricing" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}>Pricing</NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}>About</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Sign in</Link>
            <Link to="/login" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Public Pages
import Home from './pages/landing/Home'
import About from './pages/landing/About'
import Features from './pages/landing/Features'
import Pricing from './pages/landing/Pricing'
import Contact from './pages/landing/Contact'
import FAQ from './pages/landing/FAQ'

// Auth Pages
import Login from './pages/auth/Login'

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome'
import Assets from './pages/dashboard/Assets'
import AssetDetails from './pages/dashboard/AssetDetails'
import AddAsset from './pages/dashboard/AddAsset'
import QRGenerator from './pages/dashboard/QRGenerator'
import PublicAssetPage from './pages/dashboard/PublicAssetPage'
import Issues from './pages/dashboard/Issues'
import IssueDetails from './pages/dashboard/IssueDetails'
import MaintenanceHistory from './pages/dashboard/MaintenanceHistory'
import Analytics from './pages/dashboard/Analytics'
import Notifications from './pages/dashboard/Notifications'
import UserProfile from './pages/dashboard/UserProfile'
import Settings from './pages/dashboard/Settings'

// QR Print Page (No Layout)
import QRPrintPage from './pages/dashboard/QRPrintPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/asset/:id" element={<PublicAssetPage />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Print Route */}
          <Route path="/qr/:id" element={<QRPrintPage />} />

          {/* Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/assets" element={<Assets />} />
            <Route path="/dashboard/assets/add" element={<AddAsset />} />
            <Route path="/dashboard/assets/:id" element={<AssetDetails />} />
            <Route path="/dashboard/qr-generator" element={<QRGenerator />} />
            <Route path="/dashboard/issues" element={<Issues />} />
            <Route path="/dashboard/issues/:id" element={<IssueDetails />} />
            <Route path="/dashboard/maintenance" element={<MaintenanceHistory />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/profile" element={<UserProfile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
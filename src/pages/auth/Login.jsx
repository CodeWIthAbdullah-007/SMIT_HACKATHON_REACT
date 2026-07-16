import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { Link, useNavigate } from 'react-router-dom'
import { QrCode, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (e) => {
    e.preventDefault()
    
    if (forgotPassword) {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (!error) alert('Password reset link sent to your email!')
      return
    }

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (!error) {
        // Create profile entry for new user with default role 'reporter'
        await supabase.from('profiles').insert([{ id: data.user.id, full_name: email.split('@')[0], role: 'reporter' }])
        alert('Signup successful! Please login.')
        setIsSignup(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error) navigate('/dashboard')
      else alert('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="p-1.5 bg-brand-600 rounded-lg">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">MaintainIQ</span>
        </Link>
        
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-xl sm:px-10 border border-gray-200">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
            {forgotPassword ? 'Reset Password' : isSignup ? 'Create Account' : 'Welcome back'}
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            {forgotPassword ? 'Enter your email to receive a reset link' : isSignup ? 'Sign up to get started' : 'Sign in to your dashboard'}
          </p>
          
          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-9" placeholder="you@company.com" />
              </div>
            </div>
            
            {!forgotPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-9" placeholder="••••••••" />
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary w-full justify-center py-2.5">
              {forgotPassword ? 'Send Reset Link' : isSignup ? 'Sign Up' : 'Sign In'} <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {!forgotPassword && (
              <button onClick={() => setIsSignup(!isSignup)} className="text-sm text-brand-600 font-medium hover:text-brand-700 block w-full">
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            )}
            <button onClick={() => setForgotPassword(!forgotPassword)} className="text-sm text-gray-500 hover:text-gray-700 block w-full">
              {forgotPassword ? 'Back to Login' : 'Forgot password?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabase'

export default function Login() {
  const { user, signIn, signUp } = useAuth()
  const navigate = useNavigate()

  // mode: 'signin' | 'signup' | 'forgot'
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Already logged in — send to dashboard
  if (user) return <Navigate to="/dashboard" replace />

  const reset = () => { setError(''); setSuccessMsg('') }

  const handleSubmit = async () => {
    reset()
    if (!email) { setError('Please enter your email.'); return }

    // Forgot password flow
    if (mode === 'forgot') {
      setLoading(true)
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      setLoading(false)
      if (err) { setError(err.message); return }
      setSuccessMsg('Password reset email sent! Check your inbox and follow the link.')
      return
    }

    if (!password) { setError('Please enter your password.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error: err } = await signUp(email, password)
        if (err) throw err
        setSuccessMsg('Account created! Check your email to confirm, then sign in.')
        setMode('signin')
      } else {
        const { error: err } = await signIn(email, password)
        if (err) throw err
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit() }

  const titles   = { signin: 'WELCOME BACK', signup: 'JOIN STRIDE', forgot: 'RESET PASSWORD' }
  const subs     = { signin: 'Sign in to track your runs and get AI coaching.', signup: 'Create your account to access your personal dashboard.', forgot: "Enter your email and we'll send you a reset link." }
  const badges   = { signin: 'Member Login', signup: 'Create Account', forgot: 'Forgot Password' }
  const btnLabels = { signin: 'Sign In', signup: 'Create Account', forgot: 'Send Reset Link' }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="badge">{badges[mode]}</div>
        <h2>{titles[mode]}</h2>
        <p className="sub">{subs[mode]}</p>

        {error && <div className="auth-error" style={{ marginBottom: 20 }}>{error}</div>}
        {successMsg && <div className="auth-success" style={{ marginBottom: 20 }}>{successMsg}</div>}

        <div className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>

          {mode !== 'forgot' && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Enter your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
            </div>
          )}

          {/* Forgot password link — only on sign in */}
          {mode === 'signin' && (
            <div style={{ textAlign: 'right', marginTop: -8 }}>
              <button
                onClick={() => { setMode('forgot'); reset() }}
                style={{
                  background: 'none', border: 'none', color: 'var(--light-gray)',
                  fontFamily: 'Archivo, sans-serif', fontSize: '0.78rem',
                  cursor: 'pointer', padding: 0, textDecoration: 'underline',
                }}
              >
                Forgot password?
              </button>
            </div>
          )}

          <button className="btn btn--gradient" onClick={handleSubmit} disabled={loading}>
            <span>{loading ? 'Please wait...' : btnLabels[mode]}</span>
          </button>
        </div>

        <div className="auth-switch">
          {mode === 'signin' && (
            <>Don't have an account? <button onClick={() => { setMode('signup'); reset() }}>Sign Up</button></>
          )}
          {mode === 'signup' && (
            <>Already have an account? <button onClick={() => { setMode('signin'); reset() }}>Sign In</button></>
          )}
          {mode === 'forgot' && (
            <>Remembered it? <button onClick={() => { setMode('signin'); reset() }}>Back to Sign In</button></>
          )}
        </div>
      </div>
    </div>
  )
}

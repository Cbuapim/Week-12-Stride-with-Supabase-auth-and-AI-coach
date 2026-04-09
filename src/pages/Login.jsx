import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function Login() {
  const { user, signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Already logged in — send to dashboard
  if (user) return <Navigate to="/dashboard" replace />

  const handleSubmit = async () => {
    setError('')
    setSuccessMsg('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    try {
      if (isSignUp) {
        const { error: err } = await signUp(email, password)
        if (err) throw err
        setSuccessMsg('Account created! Check your email to confirm, then sign in.')
        setIsSignUp(false)
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

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="badge">{isSignUp ? 'Create Account' : 'Member Login'}</div>
        <h2>{isSignUp ? 'JOIN STRIDE' : 'WELCOME BACK'}</h2>
        <p className="sub">{isSignUp ? 'Create your account to access your personal dashboard.' : 'Sign in to track your runs and get AI coaching.'}</p>

        {error && <div className="auth-error">{error}</div>}
        {successMsg && <div className="auth-success">{successMsg}</div>}

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
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder={isSignUp ? 'Min. 6 characters' : 'Enter your password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </div>
          <button className="btn btn--gradient" onClick={handleSubmit} disabled={loading}>
            <span>{loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}</span>
          </button>
        </div>

        <div className="auth-switch">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccessMsg('') }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}

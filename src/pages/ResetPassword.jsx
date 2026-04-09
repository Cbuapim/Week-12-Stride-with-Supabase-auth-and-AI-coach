import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [validSession, setValidSession] = useState(false)

  // Supabase puts the recovery token in the URL hash — we need to
  // let the client pick it up and establish a session before we render the form
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValidSession(true)
      }
    })
  }, [])

  const handleReset = async () => {
    setError('')
    if (!password || !confirm) { setError('Please fill in both fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }

    setLoading(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (err) { setError(err.message); return }

    setSuccessMsg('Password updated! Redirecting you to sign in...')
    setTimeout(() => {
      supabase.auth.signOut()
      navigate('/login')
    }, 2500)
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleReset() }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="badge">Reset Password</div>
        <h2>NEW PASSWORD</h2>
        <p className="sub">
          {validSession
            ? 'Choose a new password for your Stride account.'
            : 'Verifying your reset link...'}
        </p>

        {error && <div className="auth-error" style={{ marginBottom: 20 }}>{error}</div>}
        {successMsg && <div className="auth-success" style={{ marginBottom: 20 }}>{successMsg}</div>}

        {validSession && !successMsg && (
          <div className="auth-form">
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter your new password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="new-password"
              />
            </div>
            <button className="btn btn--gradient" onClick={handleReset} disabled={loading}>
              <span>{loading ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        )}

        {!validSession && !error && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="loader" style={{ margin: '0 auto' }} />
          </div>
        )}

        <div className="auth-switch">
          <button onClick={() => navigate('/login')}>Back to Sign In</button>
        </div>
      </div>
    </div>
  )
}

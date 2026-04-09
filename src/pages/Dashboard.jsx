import { useState, useEffect } from 'react'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabase'

// ─── AI Coach ────────────────────────────────────────────────────────────────
async function askCoach(question, runs) {
  const runSummary = runs.length
    ? runs.slice(0, 10).map(r =>
        `${r.run_date}: ${r.distance_miles} miles, type: ${r.run_type}${r.notes ? ', notes: ' + r.notes : ''}`
      ).join('\n')
    : 'No runs logged yet.'

  const systemPrompt = `You are an expert running coach for Stride Running Club in Orlando, FL. 
You give concise, specific, motivating advice. Keep replies under 120 words.
The member's recent run log:\n${runSummary}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: question }],
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.content?.[0]?.text ?? 'No response from coach.'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const RUN_TYPES = ['Easy', 'Tempo', 'Long Run', 'Speed Work', 'Recovery', 'Race']

const STARTER_QUESTIONS = [
  'How should I pace my long run this weekend?',
  'My legs feel heavy — should I still run today?',
  'What should I eat before a 10-mile run?',
  'How do I improve my 5K time?',
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, signOut } = useAuth()

  // Run log state
  const [runs, setRuns] = useState([])
  const [loadingRuns, setLoadingRuns] = useState(true)
  const [savingRun, setSavingRun] = useState(false)
  const [runError, setRunError] = useState('')

  // New run form
  const [newRun, setNewRun] = useState({
    run_date: new Date().toISOString().split('T')[0],
    distance_miles: '',
    run_type: 'Easy',
    notes: '',
  })

  // AI Coach state
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  // ── Fetch runs on mount ───────────────────────────────────────────────────
  useEffect(() => {
    fetchRuns()
  }, [user])

  async function fetchRuns() {
    setLoadingRuns(true)
    const { data, error } = await supabase
      .from('runs')
      .select('*')
      .eq('user_id', user.id)
      .order('run_date', { ascending: false })
    if (!error) setRuns(data || [])
    setLoadingRuns(false)
  }

  // ── Add run ───────────────────────────────────────────────────────────────
  async function handleAddRun() {
    setRunError('')
    const dist = parseFloat(newRun.distance_miles)
    if (!newRun.run_date || !dist || dist <= 0) {
      setRunError('Please enter a valid date and distance.')
      return
    }
    setSavingRun(true)
    const { error } = await supabase.from('runs').insert({
      user_id: user.id,
      run_date: newRun.run_date,
      distance_miles: dist,
      run_type: newRun.run_type,
      notes: newRun.notes.trim() || null,
    })
    if (error) {
      setRunError(error.message)
    } else {
      setNewRun({ run_date: new Date().toISOString().split('T')[0], distance_miles: '', run_type: 'Easy', notes: '' })
      await fetchRuns()
    }
    setSavingRun(false)
  }

  // ── Delete run ────────────────────────────────────────────────────────────
  async function handleDeleteRun(id) {
    await supabase.from('runs').delete().eq('id', id).eq('user_id', user.id)
    setRuns(prev => prev.filter(r => r.id !== id))
  }

  // ── AI Coach ──────────────────────────────────────────────────────────────
  async function handleAskCoach(question) {
    const q = question || aiQuestion
    if (!q.trim()) return
    setAiLoading(true)
    setAiError('')
    setAiResponse('')
    setAiQuestion(q)
    try {
      const answer = await askCoach(q, runs)
      setAiResponse(answer)
    } catch (err) {
      setAiError('Coach is unavailable right now. Check your API key or try again.')
    } finally {
      setAiLoading(false)
    }
  }

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalMiles = runs.reduce((s, r) => s + Number(r.distance_miles), 0)
  const totalRuns = runs.length
  const avgMiles = totalRuns ? (totalMiles / totalRuns).toFixed(1) : 0
  const longestRun = totalRuns ? Math.max(...runs.map(r => Number(r.distance_miles))) : 0

  const displayName = user.email.split('@')[0]

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <div>
            <div className="badge">Member Dashboard</div>
            <h1>HEY, {displayName.toUpperCase()}.</h1>
            <p className="sub">Track your runs. Get coached. Hit your PRs.</p>
          </div>
          <button className="btn btn--outline btn--sm" onClick={signOut}><span>Sign Out</span></button>
        </div>
      </div>

      <div className="dashboard-body">

        {/* Stats row */}
        <div className="dash-stats">
          <div className="dash-stat"><div className="ds-label">Total Runs</div><div className="ds-value">{totalRuns}</div></div>
          <div className="dash-stat"><div className="ds-label">Total Miles</div><div className="ds-value">{totalMiles.toFixed(1)}</div></div>
          <div className="dash-stat"><div className="ds-label">Avg Distance</div><div className="ds-value">{avgMiles}<span style={{ fontSize: '1rem', fontWeight: 400, WebkitTextFillColor: 'var(--light-gray)', color: 'var(--light-gray)' }}>mi</span></div></div>
          <div className="dash-stat"><div className="ds-label">Longest Run</div><div className="ds-value">{longestRun}<span style={{ fontSize: '1rem', fontWeight: 400, WebkitTextFillColor: 'var(--light-gray)', color: 'var(--light-gray)' }}>mi</span></div></div>
        </div>

        {/* Main grid: run log + add form */}
        <div className="dash-grid">

          {/* Run log */}
          <div className="panel">
            <div className="panel-header">
              <h3>RUN LOG</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--light-gray)' }}>{totalRuns} {totalRuns === 1 ? 'entry' : 'entries'}</span>
            </div>
            <div className="panel-body">
              {loadingRuns ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}><div className="loader" style={{ margin: '0 auto' }} /></div>
              ) : runs.length === 0 ? (
                <div className="empty-state">
                  <div className="icon">🏃</div>
                  <p>No runs logged yet. Add your first run to get started.</p>
                </div>
              ) : (
                <div className="run-list">
                  {runs.map(run => (
                    <div className="run-item" key={run.id}>
                      <div className="run-date">{formatDate(run.run_date)}</div>
                      <div className="run-info">
                        <h4>{run.run_type}</h4>
                        {run.notes && <p>{run.notes}</p>}
                      </div>
                      <div className="run-dist">{Number(run.distance_miles).toFixed(1)} mi</div>
                      <button className="run-delete" onClick={() => handleDeleteRun(run.id)} title="Delete run">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add run form */}
          <div className="panel">
            <div className="panel-header">
              <h3>LOG A RUN</h3>
            </div>
            <div className="panel-body">
              {runError && <div className="auth-error" style={{ marginBottom: 16 }}>{runError}</div>}
              <div className="add-run-form">
                <div>
                  <label>Date</label>
                  <input
                    type="date"
                    value={newRun.run_date}
                    onChange={e => setNewRun({ ...newRun, run_date: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div>
                    <label>Distance (miles)</label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      placeholder="6.2"
                      value={newRun.distance_miles}
                      onChange={e => setNewRun({ ...newRun, distance_miles: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Run Type</label>
                    <select value={newRun.run_type} onChange={e => setNewRun({ ...newRun, run_type: e.target.value })}>
                      {RUN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label>Notes (optional)</label>
                  <textarea
                    placeholder="How did it feel? Any PRs?"
                    value={newRun.notes}
                    onChange={e => setNewRun({ ...newRun, notes: e.target.value })}
                  />
                </div>
                <button className="btn btn--gradient" onClick={handleAddRun} disabled={savingRun}>
                  <span>{savingRun ? 'Saving...' : '+ Add Run'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Coach */}
        <div className="panel ai-panel">
          <div className="panel-header">
            <h3>AI RUNNING COACH</h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>POWERED BY CLAUDE</span>
          </div>
          <div className="panel-body">
            <p style={{ marginBottom: 24, fontSize: '0.85rem', maxWidth: 'none' }}>
              Ask your coach anything — pacing, nutrition, recovery, training plans. Your run log is shared automatically so advice is personalized to your data.
            </p>

            {/* Starter questions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {STARTER_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => { setAiQuestion(q); handleAskCoach(q) }}
                  style={{
                    background: 'var(--dark-gray)',
                    border: '1px solid var(--mid-gray)',
                    color: 'var(--light-gray)',
                    fontFamily: 'Archivo, sans-serif',
                    fontSize: '0.75rem',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--white)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--mid-gray)'; e.target.style.color = 'var(--light-gray)' }}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="ai-chat">
              <div className="ai-input-row">
                <input
                  type="text"
                  placeholder="Ask your running coach anything..."
                  value={aiQuestion}
                  onChange={e => setAiQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAskCoach()}
                />
                <button className="btn btn--gradient btn--sm" onClick={() => handleAskCoach()} disabled={aiLoading}>
                  <span>{aiLoading ? '...' : 'Ask'}</span>
                </button>
              </div>

              {(aiLoading || aiResponse || aiError) && (
                <div>
                  <div className="ai-label">Coach Response</div>
                  <div className={`ai-response${aiLoading ? ' loading' : ''}`}>
                    {aiError
                      ? <span style={{ color: '#ff8888' }}>{aiError}</span>
                      : aiLoading
                      ? 'Thinking...'
                      : aiResponse}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

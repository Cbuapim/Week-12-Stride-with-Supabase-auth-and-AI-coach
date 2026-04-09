import { useNavigate } from 'react-router-dom'
import { useReveal } from '../lib/useReveal'

export default function Home() {
  useReveal()
  const navigate = useNavigate()

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-img" />
        <div className="hero-content">
          <div className="badge">Orlando Running Club</div>
          <h1>RUN WITH<br />PURPOSE</h1>
          <p>Join Orlando's premier running community. Train harder, run faster, and push your limits with athletes who share your drive.</p>
          <div className="hero-btns">
            <button className="btn" onClick={() => navigate('/runs')}><span>View Schedule</span></button>
            <button className="btn btn--outline" onClick={() => navigate('/contact')}><span>Join Now</span></button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat-item"><div className="number">500+</div><div className="label">Active Members</div></div>
            <div className="stat-item"><div className="number">15K+</div><div className="label">Miles Per Week</div></div>
            <div className="stat-item"><div className="number">3X</div><div className="label">Weekly Runs</div></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container text-center">
          <div className="reveal" style={{ maxWidth: 700, margin: '0 auto 80px' }}>
            <div className="badge">Why Stride</div>
            <h2>BUILT FOR<br />PERFORMANCE</h2>
            <p>We're not just a running club. We're a community of driven athletes committed to pushing boundaries and achieving goals.</p>
          </div>
          <div className="feature-grid reveal">
            <div className="feature-card">
              <div className="icon">⚡</div>
              <h3>PACE GROUPS</h3>
              <p>Structured training groups for every level. From 8-minute miles to sub-6, find your pace and push your limits.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🎯</div>
              <h3>GOAL ORIENTED</h3>
              <p>Training plans designed for marathons, half marathons, and everything in between. Track progress, hit PRs.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🏆</div>
              <h3>COMPETE TOGETHER</h3>
              <p>Team races, local competitions, and group challenges. Represent Stride at events across Central Florida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Member Portal CTA */}
      <section className="section" style={{ background: 'var(--near-black)', textAlign: 'center' }}>
        <div className="container reveal">
          <div className="badge">Members</div>
          <h2 style={{ margin: '24px 0 32px' }}>TRACK YOUR<br />PROGRESS</h2>
          <p style={{ margin: '0 auto 48px' }}>Log your runs, track personal records, and get AI-powered coaching — all in your personal dashboard.</p>
          <button className="btn" onClick={() => navigate('/login')}><span>Access Dashboard</span></button>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container reveal">
          <div className="badge">Ready to Join</div>
          <h2 style={{ margin: '24px 0 32px' }}>START RUNNING<br />WITH US</h2>
          <p style={{ margin: '0 auto 48px' }}>First run is free. Show up, meet the crew, and experience the difference of training with a community.</p>
          <button className="btn" onClick={() => navigate('/contact')}><span>Get Started</span></button>
        </div>
      </section>
    </>
  )
}

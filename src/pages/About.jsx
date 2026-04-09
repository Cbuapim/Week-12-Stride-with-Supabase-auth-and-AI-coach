import { useReveal } from '../lib/useReveal'

export default function About() {
  useReveal()
  return (
    <>
      <section className="page-header">
        <div className="container reveal">
          <div className="badge">Our Story</div>
          <h1>ABOUT STRIDE</h1>
          <p style={{ margin: '24px auto 0', maxWidth: 700 }}>Founded by runners, for runners. We're building Orlando's strongest running community.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col reveal">
            <div>
              <div className="badge">Est. 2023</div>
              <h2 style={{ marginBottom: 32 }}>FROM 4 RUNNERS<br />TO 500+</h2>
              <p style={{ marginBottom: 24 }}>What started as a small group of friends meeting at Lake Eola has grown into Orlando's most active running community. We've logged over 750,000 miles together, completed hundreds of races, and built lasting friendships.</p>
              <p>Our mission is simple: create a space where runners of all levels can train hard, improve together, and achieve goals they never thought possible.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&q=80" alt="Urban runner" style={{ filter: 'saturate(0.8) brightness(0.8)' }} />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--near-black)' }}>
        <div className="container text-center">
          <div className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="badge">Mission</div>
            <h2 style={{ marginBottom: 32 }}>ELEVATE EVERY<br />RUNNER</h2>
            <p style={{ margin: '0 auto' }}>We believe running is more than exercise — it's discipline, community, and personal growth. Whether you're chasing a BQ or running your first 5K, Stride provides the structure, support, and competition to help you reach your peak.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <div className="reveal" style={{ marginBottom: 60 }}>
            <div className="badge">Our Values</div>
            <h2>WHAT DRIVES US</h2>
          </div>
          <div className="info-grid reveal">
            <div className="info-box">
              <div className="icon">💪</div>
              <h4>Performance</h4>
              <p>We train with purpose. Every run has intent. Every mile counts.</p>
            </div>
            <div className="info-box">
              <div className="icon">🤝</div>
              <h4>Community</h4>
              <p>Stronger together. We push each other to be better every single day.</p>
            </div>
            <div className="info-box">
              <div className="icon">🎯</div>
              <h4>Commitment</h4>
              <p>Show up. Put in the work. Achieve what you set out to accomplish.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

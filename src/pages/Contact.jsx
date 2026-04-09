import { useState } from 'react'
import { useReveal } from '../lib/useReveal'

export default function Contact() {
  useReveal()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ fname: '', lname: '', email: '', experience: '', message: '' })

  const handleSubmit = () => {
    if (!form.fname || !form.email) return
    setSubmitted(true)
  }

  return (
    <>
      <section className="page-header">
        <div className="container reveal">
          <div className="badge">Get Started</div>
          <h1>JOIN STRIDE</h1>
          <p style={{ margin: '24px auto 0', maxWidth: 700 }}>Ready to train with Orlando's best? Fill out the form below and we'll get you on the road.</p>
        </div>
      </section>

      <section className="section">
        <div className="contact-container">
          {!submitted ? (
            <div className="form-grid reveal">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" value={form.fname} onChange={e => setForm({ ...form, fname: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" value={form.lname} onChange={e => setForm({ ...form, lname: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })}>
                  <option value="" disabled>Select your level</option>
                  <option value="beginner">Beginner (New to running)</option>
                  <option value="intermediate">Intermediate (Regular runner)</option>
                  <option value="advanced">Advanced (Competitive runner)</option>
                  <option value="elite">Elite (Sub-3 marathon / Sub-1:25 half)</option>
                </select>
              </div>
              <div className="form-group full">
                <label>Tell Us About Your Goals</label>
                <textarea placeholder="What are you training for? What pace do you typically run?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <div className="full">
                <button className="btn" style={{ width: '100%' }} onClick={handleSubmit}><span>Submit Application</span></button>
              </div>
            </div>
          ) : (
            <div className="form-success reveal">
              <div style={{ fontSize: '4rem' }}>✓</div>
              <h3>APPLICATION RECEIVED</h3>
              <p>Thanks for your interest in Stride. A team member will reach out within 24 hours with next steps and run schedule details.</p>
            </div>
          )}

          <div className="info-grid reveal" style={{ marginTop: 80 }}>
            <div className="info-box"><div className="icon">📍</div><h4>Location</h4><p>Multiple meetup spots across Orlando. Primary location: Lake Eola Park.</p></div>
            <div className="info-box"><div className="icon">📧</div><h4>Email</h4><p>info@strideorlando.com<br />hello@strideorlando.com</p></div>
            <div className="info-box"><div className="icon">📱</div><h4>Follow</h4><p>@strideorlando on Instagram, Strava, and Facebook</p></div>
          </div>
        </div>
      </section>
    </>
  )
}

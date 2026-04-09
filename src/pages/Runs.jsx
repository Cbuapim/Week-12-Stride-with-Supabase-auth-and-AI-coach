import { useReveal } from '../lib/useReveal'

export default function Runs() {
  useReveal()
  return (
    <>
      <section className="page-header">
        <div className="container reveal">
          <div className="badge">Training Schedule</div>
          <h1>WEEKLY RUNS</h1>
          <p style={{ margin: '24px auto 0', maxWidth: 700 }}>Structured workouts designed to make you faster, stronger, and more resilient.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ marginBottom: 60, textAlign: 'center' }}>
            <div className="badge">This Week</div>
            <h2>TRAIN WITH US</h2>
          </div>
          <div className="schedule-list reveal">
            {[
              { day: 'Tuesday', num: '04', title: 'Speed Work', detail: '6:00 AM · Baldwin Park Track · 800m repeats with recovery jogs', tag: 'Tempo' },
              { day: 'Thursday', num: '06', title: 'Tempo Run', detail: '6:00 AM · Lake Eola Loop · 5-7 miles at threshold pace', tag: 'Threshold' },
              { day: 'Saturday', num: '08', title: 'Long Run', detail: '6:30 AM · Cady Way Trail · 10-15 miles progressive pace', tag: 'Endurance' },
              { day: 'Sunday', num: '09', title: 'Recovery Run', detail: '7:00 AM · Winter Park Village · Easy 3-5 miles conversational pace', tag: 'Recovery' },
            ].map(run => (
              <div className="schedule-item" key={run.day}>
                <div className="schedule-day">
                  <div className="day-name">{run.day}</div>
                  <div className="day-num">{run.num}</div>
                </div>
                <div className="schedule-info">
                  <h3>{run.title}</h3>
                  <p>{run.detail}</p>
                </div>
                <div className="schedule-tag">{run.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--near-black)' }}>
        <div className="container">
          <div className="reveal text-center" style={{ marginBottom: 60 }}>
            <div className="badge">First Time?</div>
            <h2>WHAT TO EXPECT</h2>
          </div>
          <div className="info-grid reveal">
            <div className="info-box"><div className="icon">🎽</div><h4>Gear Up</h4><p>Proper running shoes and moisture-wicking clothes. Bring water and fuel for long runs.</p></div>
            <div className="info-box"><div className="icon">⏱️</div><h4>Arrive Early</h4><p>Show up 10 minutes before start time. Introduce yourself and find your pace group.</p></div>
            <div className="info-box"><div className="icon">📱</div><h4>Track Progress</h4><p>Use your member dashboard to log runs. Join group challenges and compete weekly.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}

import { useNavigate } from 'react-router-dom'
import { useReveal } from '../lib/useReveal'

const photos = [
  { src: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=600&q=80', label: 'Urban Training' },
  { src: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=600&q=80', label: 'Early Morning Miles' },
  { src: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80', label: 'Night Sessions' },
  { src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80', label: 'Downtown Routes' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', label: 'All Weather Training' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', label: 'Bridge Intervals' },
  { src: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80', label: 'City Streets' },
  { src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80', label: 'Twilight Training' },
]

export default function Gallery() {
  useReveal()
  const navigate = useNavigate()
  return (
    <>
      <section className="page-header">
        <div className="container reveal">
          <div className="badge">Community</div>
          <h1>STRIDE IN<br />ACTION</h1>
          <p style={{ margin: '24px auto 0', maxWidth: 700 }}>Race days, training sessions, and the athletes who make this community legendary.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="gallery-grid reveal">
          {photos.map((p, i) => (
            <div className="gallery-item" key={i}>
              <img src={p.src} alt={p.label} />
              <div className="overlay"><span>{p.label}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--near-black)', textAlign: 'center' }}>
        <div className="container reveal">
          <h2 style={{ marginBottom: 24 }}>BE PART OF<br />THE STORY</h2>
          <p style={{ margin: '0 auto 48px' }}>Your next PR starts here. Join the fastest-growing running community in Orlando.</p>
          <button className="btn" onClick={() => navigate('/runs')}><span>View Schedule</span></button>
        </div>
      </section>
    </>
  )
}

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav id="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">STRIDE<span>.</span></Link>
        <ul className="nav-links">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')}>About</Link></li>
          <li><Link to="/runs" className={isActive('/runs')}>Runs</Link></li>
          <li><Link to="/gallery" className={isActive('/gallery')}>Gallery</Link></li>
          <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" className={isActive('/dashboard')}>My Dashboard</Link></li>
              <li>
                <button className="nav-btn outline" onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                <button className="nav-btn">Member Login</button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

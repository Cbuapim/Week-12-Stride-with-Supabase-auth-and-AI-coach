import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-logo">STRIDE<span>.</span></div>
          <p>Orlando's premier running community. Train harder. Run faster. Achieve more.</p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/runs">Runs</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a>Strava Group</a></li>
            <li><a>Instagram</a></li>
            <li><a>Facebook</a></li>
            <li><a>Join Slack</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a>Training Plans</a></li>
            <li><a>Race Calendar</a></li>
            <li><Link to="/dashboard">Member Portal</Link></li>
            <li><a>FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 Stride Running Club · Orlando, FL · All Rights Reserved
      </div>
    </footer>
  )
}

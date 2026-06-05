import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

const LINKS = {
  Product: [
    { label: 'Home', to: '/' },
    { label: 'Roadmap', to: '/roadmap' },
    { label: 'Success Stories', to: '/success-stories' },
    { label: 'About', to: '/about' },
  ],
  Learn: [
    { label: 'Curriculum', to: '/roadmap' },
    { label: 'Mentorship', to: '/' },
    { label: 'Projects', to: '/roadmap' },
    { label: 'Community', to: '/' },
  ],
  Company: [
    { label: 'Careers', to: '/' },
    { label: 'Contact', to: '/' },
    { label: 'Privacy', to: '/' },
    { label: 'Terms', to: '/' },
  ],
}

const SOCIAL = ['X', 'GitHub', 'LinkedIn', 'YouTube']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <NavLink to="/" className="footer__logo">
              <img src="/logo.png" alt="TechPathway logo" className="footer__logo-img" />
              <span>TechPathway</span>
            </NavLink>
            <p className="footer__tagline">
              The guided path from beginner to Cloud Engineer: roadmap, mentorship, and real projects.
            </p>
            <p className="footer__sub-tagline">Built for future engineers.</p>
          </div>

          <div className="footer__links">
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group} className="footer__link-group">
                <div className="footer__link-heading">{group.toUpperCase()}</div>
                <ul>
                  {items.map(item => (
                    <li key={item.label}>
                      <NavLink to={item.to} className="footer__link">{item.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2025 TechPathway LLC. All rights reserved.</span>
          <div className="footer__socials">
            {SOCIAL.map(s => (
              <a key={s} href="#" className="footer__social-link">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

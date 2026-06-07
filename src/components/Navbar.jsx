// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo">
          <img src="/logo.png" alt="TechPathway logo" className="navbar__logo-img" />
          <span className="navbar__logo-text">TechPathway</span>
        </NavLink>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/roadmap"
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Roadmap
          </NavLink>
          <NavLink
            to="/success-stories"
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Success Stories
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
        </div>

        <div className="navbar__actions">
          {/* <button className="navbar__btn-ghost">Sign in</button> */}
          <button className="navbar__btn-primary" onClick={() => window.open('https://quiz.techpathway.cloud/take-a-quiz', '_blank')}>
            Get Started
          </button>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

// src/components/CTA.jsx

import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CTA.css'

export default function CTA() {
  const navigate = useNavigate()

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-section__inner">
          <div className="cta-section__glow" />

          {/* Left: copy */}
          <div className="cta-section__content">
            <div className="section-label" style={{ display: 'flex' }}>
              Start Today
            </div>
            <h2 className="cta-section__title">
              Your cloud career starts<br />with one command
            </h2>
            <p className="cta-section__desc">
              Join 140+ engineers building real cloud skills with a roadmap, 
              mentors, and a community that has your back.
            </p>
            <div className="cta-section__actions">
              <button
                className="btn-primary cta-section__btn"
                onClick={() => navigate('/roadmap')}
              >
                Start Learning →
              </button>
            </div>
            <p className="cta-section__note">No credit card required · Cancel anytime</p>
          </div>

          {/* Right: terminal screenshot */}
          <div className="cta-section__terminals">
            <img src="/Terminal.png" alt="Terminal screenshot" className="cta-section__terminal-img" />
          </div>
        </div>
      </div>
    </section>
  )
}

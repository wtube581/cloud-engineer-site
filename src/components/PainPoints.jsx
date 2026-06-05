// src/components/PainPoints.jsx

import React from 'react'
import './PainPoints.css'

const BEFORE = [
  'Endless tutorials with no clear order',
  'Copy-pasting configs you don\'t understand',
  'No mentor, no feedback, no direction',
  'Dread before every technical interview',
]

const AFTER = [
  'A sequenced roadmap from zero to job-ready',
  'Real projects on live cloud infrastructure',
  'Weekly mentorship and real code review',
  'Confidence to own production systems',
]

export default function PainPoints() {
  return (
    <section className="pain">
      <div className="container">
        <div className="pain__header">
          <div className="section-label">THE TRANSFORMATION</div>
          <h2 className="section-title">
            From scattered tutorials to shipping<br />
            <span className="pain__title-accent">real infrastructure</span>
          </h2>
          <p className="section-subtitle">
            Most people don't lack effort, they lack a path. Here's the shift<br />
            TechPathway is built to create.
          </p>
        </div>

        <div className="pain__grid">
          <div className="pain__card pain__card--before">
            <div className="pain__card-label">
              <span className="pain__dot pain__dot--red" />
              Before
            </div>
            <h3 className="pain__card-title">Where most learners get stuck</h3>
            <ul className="pain__list">
              {BEFORE.map((item, i) => (
                <li key={i} className="pain__list-item pain__list-item--bad">
                  <span className="pain__icon">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pain__arrow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16H26M26 16L18 8M26 16L18 24" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="pain__card pain__card--after">
            <div className="pain__card-label">
              <span className="pain__dot pain__dot--green" />
              After
            </div>
            <h3 className="pain__card-title">Where TechPathway takes you</h3>
            <ul className="pain__list">
              {AFTER.map((item, i) => (
                <li key={i} className="pain__list-item pain__list-item--good">
                  <span className="pain__icon pain__icon--good">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

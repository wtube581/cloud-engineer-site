import React from 'react'
import './HowItWorks.css'

const PILLARS = [
  {
    num: '01',
    title: 'Membership that replies',
    desc: 'Get answers from real engineers within hours, not days. Ask anything — from AWS billing to career strategy.',
  },
  {
    num: '02',
    title: 'A roadmap, not a playlist',
    desc: 'Every lesson connects to the next. You always know exactly where you are and what to do next.',
  },
  {
    num: '03',
    title: 'Real projects, real cloud',
    desc: 'Deploy actual infrastructure. Not toy apps, not sandboxes — real AWS environments that go on your resume.',
  },
  {
    num: '04',
    title: 'Accountability by design',
    desc: 'Weekly check-ins, public progress tracking, and a cohort that keeps you honest.',
  },
]

export default function HowItWorks() {
  return (
    <section className="hiw">
      <div className="container">
        <div className="hiw__header">
          <div className="section-label">Built Different</div>
          <h2 className="section-title">
            Built like a system, not a course
          </h2>
          <p className="section-subtitle">
            Most online courses are just playlists. TechPathway is a system — 
            everything is designed to work together and get you hired.
          </p>
        </div>

        <div className="hiw__grid">
          {PILLARS.map((p, i) => (
            <div key={i} className="hiw__card">
              <div className="hiw__num">{p.num}</div>
              <h3 className="hiw__title">{p.title}</h3>
              <p className="hiw__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

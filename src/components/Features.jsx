import React from 'react'
import './Features.css'

const FEATURES = [
  {
    icon: '◈',
    title: 'Membership',
    desc: 'Full access to every module, project, and future updates. Learn at your own pace.',
    highlight: false,
  },
  {
    icon: '⬡',
    title: 'Real AWS Labs',
    desc: 'Hands-on labs using real AWS services. Build the same infrastructure used at top companies.',
    highlight: false,
  },
  {
    icon: '◉',
    title: 'Career Coaching',
    desc: "Resume reviews, mock interviews, and job search strategy from engineers who've been hired.",
    highlight: false,
  },
  {
    icon: '◇',
    title: 'Unique 1-on-1',
    desc: 'Get one-on-one feedback with an industry expert. Tailored advice for your specific background.',
    highlight: true,
  },
  {
    icon: '⬢',
    title: 'Build in Public',
    desc: 'Share your progress with the community. Get accountability, feedback, and encouragement.',
    highlight: false,
  },
  {
    icon: '◎',
    title: 'Lifetime Access',
    desc: 'Content updates forever. Cloud moves fast — we keep the curriculum current.',
    highlight: false,
  },
]

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <div className="features__header">
          <div className="section-label">What's Included</div>
          <h2 className="section-title">
            Turn your effort into<br />
            <span className="features__title-accent">real cloud skills.</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to go from beginner to confident cloud engineer. 
            Built around how engineers actually work, not how courses are usually taught.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`features__card ${f.highlight ? 'features__card--highlight' : ''}`}
            >
              <div className="features__card-icon">{f.icon}</div>
              <h3 className="features__card-title">{f.title}</h3>
              <p className="features__card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

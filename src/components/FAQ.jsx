import React, { useState } from 'react'
import './FAQ.css'

const FAQS = [
  {
    q: "I'm a complete beginner. Is this too advanced for me?",
    a: "Not at all. TechPathway is built specifically for people who are starting from zero. We begin with Linux and the command line and work our way up. The only requirement is a willingness to put in the work. Most of our members had no IT background when they started.",
  },
  {
    q: "How long does it take to get hired?",
    a: "Most students who commit 10–15 hours per week land their first cloud role within 6–12 months. Some get there faster, some take longer — it depends on your pace, prior experience, and job market. We give you a realistic roadmap and the tools to hit milestones consistently.",
  },
  {
    q: "Do I need a computer science degree?",
    a: "No. Many of our successful graduates have degrees in completely unrelated fields — or no degree at all. Cloud engineering values practical skills and demonstrated ability over credentials. Your portfolio and certifications will speak louder than your diploma.",
  },
  {
    q: "How do I actually get hired?",
    a: "We cover the full hiring pipeline: building a portfolio with real projects, writing a strong tech resume, passing technical phone screens, and navigating system design interviews. You'll also get access to our alumni network and job referral channels.",
  },
  {
    q: "What happens if I get stuck?",
    a: "You ask for help and get it — fast. Our Slack community has engineers at every level, and weekly live Q&A sessions let you get unstuck on anything from a broken Terraform config to negotiating a job offer.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq">
      <div className="container">
        <div className="faq__header">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Everything you're wondering</h2>
        </div>

        <div className="faq__list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}
            >
              <button
                className="faq__question"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq__chevron">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div className="faq__answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

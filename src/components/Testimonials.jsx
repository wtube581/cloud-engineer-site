// src/components/Testimonials.jsx
import React, { useState } from 'react'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    stars: 5,
    text: "I worked in Tech Support for 3 years and felt stuck with no growth and a capped salary. I tried learning cloud on my own but wasn't progressing until I got structure and mentorship. A Cloud Engineering video by Techpathway pushed me to take it seriously, and everything changed. I now work at Barclays as a Cloud Engineer.",
    name: "Umar F.",
    image: "/Umar Farouk Muftau.png",
  },
  {
    stars: 5,
    text: "I was juggling warehouse shifts and driving Uber on weekends when I found the program. What made me stay was that the first call felt human no sales pitch, just honest advice about the work ahead. Four months later, I'm working remotely, my income has improved, and I no longer deal with the physical strain that came with my old jobs.",
    name: "Chinedu O.",
    image: "/Tomás Hernández.png",
  },
  {
    stars: 5,
    text: "After nearly 9 years as an ICU nurse, I felt completely burned out and didn't think my skills could transfer into tech. The mentorship helped me see the value in the experience I already had. Today, I work remotely and no longer have to endure exhausting night shifts.",
    name: "Amara N.",
    image: "/Amara Johnson.png",
  },
  {
    stars: 5,
    text: "Previous courses made no difference. This community is unlike anything else. I get real answers from engineers who've done it, not just theory. The structured roadmap finally gave me a path I could follow consistently.",
    name: "Priya N.",
    image: "/Priya Nair.png",
  },
  {
    stars: 5,
    text: "The mentorship reviews changed how I talk about systems. I started sounding like an engineer and got into my dream company within months. The architecture walkthroughs were the turning point for me.",
    name: "Michael C.",
    image: "/Michael Chen.png",
  },
  {
    stars: 5,
    text: "No degree, no coding background. Just hard work and the TechPathway curriculum. I'm now mentoring others, which I never imagined a year ago. If you're on the fence, just start.",
    name: "Raj P.",
    image: "/Raj Patel.png",
  },
]

const VISIBLE = 3

function Stars({ count }) {
  return (
    <div className="t-stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [start, setStart] = useState(0)
  const total = TESTIMONIALS.length
  const canPrev = start > 0
  const canNext = start + VISIBLE < total

  const prev = () => { if (canPrev) setStart(s => s - 1) }
  const next = () => { if (canNext) setStart(s => s + 1) }

  const visible = TESTIMONIALS.slice(start, start + VISIBLE)

  return (
    <section className="t-section">
      <div className="container">
        {/* Header */}
        <div className="t-header">
          <div className="t-eyebrow">WALL OF LOVE</div>
          <h2 className="t-title">Real people. Real cloud careers.</h2>
          <p className="t-subtitle">
            Hundreds have walked this path from overwhelmed beginner to paid<br />
            cloud engineer.
          </p>
        </div>

        {/* Cards */}
        <div className="t-grid">
          {visible.map((t, i) => (
            <div key={start + i} className="t-card">
              {/* Avatar + name at top */}
              <div className="t-card__top">
                <img
                  src={t.image}
                  alt={t.name}
                  className="t-card__avatar"
                />
                <span className="t-card__name">{t.name}</span>
              </div>

              {/* Quote */}
              <p className="t-card__text">"{t.text}"</p>

              {/* Stars at bottom */}
              <Stars count={t.stars} />
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <div className="t-controls">
          <button
            className={`t-btn ${canPrev ? 't-btn--active-prev' : 't-btn--disabled'}`}
            onClick={prev}
            aria-label="Previous"
            disabled={!canPrev}
          >
            ‹
          </button>
          <button
            className={`t-btn ${canNext ? 't-btn--active' : 't-btn--disabled'}`}
            onClick={next}
            aria-label="Next"
            disabled={!canNext}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
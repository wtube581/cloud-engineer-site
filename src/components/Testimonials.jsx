// src/components/Testimonials.jsx
import React from 'react'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    stars: 5,
    text: "I went from spending a fortune on random Udemy courses to actually landing a DevOps role. The structured roadmap and the community made all the difference.",
    name: "Marcus Lee",
    role: "DevOps Engineer",
    tag: "Hired in 7 months",
    image: "/Marcus Lee.png",
  },
  {
    stars: 5,
    text: "Previous courses made no difference. This community is unlike anything else. I get real answers from engineers who've done it, not just theory.",
    name: "Priya Nair",
    role: "Cloud Engineer",
    tag: "Ex-retail manager",
    image: "/Priya Nair.png",
  },
  {
    stars: 5,
    text: "The mentorship reviews changed how I talk about systems. I started sounding like an engineer and got into my dream company within months.",
    name: "Michael Chen",
    role: "Site Reliability Engineer",
    tag: "No degree",
    image: "/Michael Chen.png",
  },
  {
    stars: 5,
    text: "The bootcamp gave me confidence and a clear path in interviews. I'm now doing what I love and earning more than I ever imagined possible.",
    name: "Tomás Hernández",
    role: "Infrastructure Engineer",
    tag: "3× income increase",
    image: "/Tomás Hernández.png",
  },
  {
    stars: 5,
    text: "No degree, no coding background. Just hard work and the TechPathway curriculum. I'm now mentoring others, which I never imagined a year ago.",
    name: "Raj Patel",
    role: "Platform Engineer",
    tag: "Now mentoring others",
    image: "/Raj Patel.png",
  },
  {
    stars: 5,
    text: "This bootcamp gave me the confidence to actually talk shop in interviews. The Terraform and Kubernetes modules are incredibly practical and real.",
    name: "Sophia Martinez",
    role: "Cloud Architect",
    tag: "$145K first offer",
    image: "/Sophia Martinez.png",
  },
]

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <div className="section-label">Success Stories</div>
          <h2 className="section-title">
            Real people. Real cloud careers.
          </h2>
          <p className="section-subtitle">
            Hundreds of engineers have used TechPathway to land their first cloud role —
            without a CS degree or prior coding experience.
          </p>
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <Stars count={t.stars} />
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__footer">
                <img src={t.image} alt={t.name} className="testimonial-card__avatar" />
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
                <div className="testimonial-card__tag">{t.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

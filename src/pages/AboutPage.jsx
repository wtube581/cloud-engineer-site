// src/pages/AboutPage.jsx
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AboutPage.css'

/* ─── Data ─────────────────────────────────────────────────── */

const STATS = [
  { value: '140+', label: 'Students Enrolled',    color: '#3b82f6' },
  { value: '94%',  label: 'Job Placement Rate',   color: '#4ade80' },
  { value: '$120K',label: 'Average Starting Salary', color: '#fbbf24' },
]

const VALUES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    iconColor: '#3b82f6',
    iconBg: 'rgba(59,130,246,0.12)',
    title: 'Mission-Driven',
    desc: 'We exist to democratize access to high-quality cloud education and help aspiring engineers break into tech.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10C7 10 8 13 10 13C12 13 13 10 13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="7.5" cy="7.5" r="1" fill="currentColor"/>
        <circle cx="12.5" cy="7.5" r="1" fill="currentColor"/>
      </svg>
    ),
    iconColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,0.12)',
    title: 'Community First',
    desc: 'Learning is better together. We foster a supportive community where students help each other succeed.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    iconColor: '#fbbf24',
    iconBg: 'rgba(251,191,36,0.12)',
    title: 'Excellence',
    desc: 'We maintain the highest standards in curriculum, instruction, and student outcomes.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3C10 3 4 6 4 11C4 14.3137 6.68629 17 10 17C13.3137 17 16 14.3137 16 11C16 6 10 3 10 3Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 11V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="13" r="0.75" fill="currentColor"/>
      </svg>
    ),
    iconColor: '#4ade80',
    iconBg: 'rgba(74,222,128,0.12)',
    title: 'Student Success',
    desc: 'Your success is our success. We measure our impact by the careers we help transform.',
  },
]

const FOUNDER_PARAS = [
  "I build pathways for those ready to transform their lives. My work is grounded in real-world experience rooted in resilience, discipline, and the belief that anyone can break into tech with the right guidance.",
  "Before tech, Shola worked long, exhausting shifts in a factory with limited opportunities for growth. Over time, that environment became a turning point, a realization that something had to change.",
  "Without a degree or technical background, he committed to learning cloud engineering from scratch. Late nights, weekends, and relentless consistency became his routine. What started as curiosity turned into a career-changing decision.",
  "After years of hands-on learning, he secured his first role in cloud engineering, doubling his income and gaining the freedom to work remotely. It was no longer about survival, but about building a life with intention.",
  "Today, Shola earns a six-figure income in tech and leads TechPathway, a platform designed to help others achieve the same transformation. His mission is simple: remove barriers, provide real-world skills, and help people take control of their future.",
]

/* ─── Counter animation hook ────────────────────────────────── */
function useCountUp(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    const steps = 40
    const increment = numeric / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numeric) {
        setCount(numeric)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [start])

  const prefix = target.match(/^\$/) ? '$' : ''
  const suffix = target.match(/%$/) ? '%' : target.match(/\+$/) ? '+' : target.match(/K$/) ? 'K' : ''
  return `${prefix}${count}${suffix}`
}

function StatItem({ stat, visible }) {
  const display = useCountUp(stat.value, 1000, visible)
  return (
    <div className={`about-stat ${visible ? 'about-stat--visible' : ''}`}>
      <div className="about-stat__bar" style={{ background: stat.color }} />
      <div>
        <div className="about-stat__value" style={{ color: stat.color }}>
          {visible ? display : '—'}
        </div>
        <div className="about-stat__label">{stat.label}</div>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function AboutPage() {
  const navigate = useNavigate()
  const statsRef = useRef(null)
  const valuesRef = useRef([])
  const [statsVisible, setStatsVisible] = useState(false)
  const [visibleValues, setVisibleValues] = useState(new Set())

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Stats counter trigger
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  // Values cards stagger
  useEffect(() => {
    const observers = valuesRef.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleValues(prev => new Set([...prev, i])), i * 100)
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <div className="about-page">
      {/* Background effects */}
      <div className="about-bg-glow about-bg-glow--1" />
      <div className="about-bg-glow about-bg-glow--2" />
      <div className="about-grid-bg" />

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero__title">
            We're building the{' '}
            <span className="about-hero__title-accent">path</span>{' '}
            we<br />wish we had
          </h1>
          <p className="about-hero__desc">
            Becoming a cloud engineer was harder than it needed to be, not because the work<br />
            is impossible, but because no one laid out the way. So we built it.
          </p>
        </div>
      </section>

      {/* ── Founder section ── */}
      <section className="about-founder">
        <div className="container">
          <div className="about-founder__inner">

            {/* Photo */}
            <div className="about-founder__photo-wrap">
              <div className="about-founder__photo">
                <img
                  src="/Shola.png"
                  alt="Shola Olujobi"
                  className="about-founder__photo-img"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="about-founder__bio">
              <h2 className="about-founder__name">Shola Olujobi</h2>
              <p className="about-founder__role">Founder, TechPathway</p>
              <div className="about-founder__paras">
                {FOUNDER_PARAS.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Our Story + Stats ── */}
      <section className="about-story">
        <div className="container">
          <div className="about-story__inner">

            {/* Left: story text */}
            <div className="about-story__text">
              <div className="about-story__eyebrow">How we started</div>
              <h2 className="about-story__title">Our Story</h2>
              <p>
                TechPathway was founded in 2023 by a team of senior cloud engineers who saw a gap in the market.
                Traditional education wasn't preparing students for real-world cloud roles, and bootcamps were
                too expensive and inflexible.
              </p>
              <p>
                We built TechPathway to be different. Our courses are project-based, our labs use real cloud
                infrastructure, and our mentors are actively working in the industry. We believe in learning
                by doing, not just watching videos.
              </p>
              <p>
                Since launching, we've helped over 140+ students transition into cloud and DevOps roles at
                companies like AWS, Microsoft, Netflix, and hundreds of startups.
              </p>
            </div>

            {/* Right: stats card */}
            <div className="about-story__stats-card" ref={statsRef}>
              <div className="about-story__stats-header">By The Numbers</div>
              <div className="about-story__stats-list">
                {STATS.map((s, i) => (
                  <StatItem key={i} stat={s} visible={statsVisible} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header">
            <div className="about-values__eyebrow">What we stand for</div>
            <h2 className="about-values__title">Our Values</h2>
          </div>

          <div className="about-values__grid">
            {VALUES.map((v, i) => (
              <div
                key={i}
                ref={el => valuesRef.current[i] = el}
                className={`about-value-card ${visibleValues.has(i) ? 'about-value-card--visible' : ''}`}
              >
                <div
                  className="about-value-card__icon"
                  style={{ background: v.iconBg, color: v.iconColor, border: `1px solid ${v.iconColor}33` }}
                >
                  {v.icon}
                </div>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta__card">
            <div className="about-cta__glow" />

            <div className="about-cta__content">
              <div className="about-cta__eyebrow">
                <span className="about-cta__dot" />
                Join us
              </div>
              <h2 className="about-cta__title">
                Come build your<br />path with us
              </h2>
              <p className="about-cta__desc">
                Whether you're starting from zero or leveling up, there's a place for you here,
                and a team that wants you to make it.
              </p>
              <div className="about-cta__actions">
                <button
                  className="about-cta__btn-primary"
                  onClick={() => window.open('https://techpathway.cloud/take-a-quiz', '_blank')}
                >
                  Get Started →
                </button>
              </div>
              <div className="about-cta__perks">
                <span>● Self-paced</span>
                <span>● Mentor support</span>
                <span>● Real cloud projects</span>
              </div>
            </div>

            {/* Right photo panel */}
            <div className="about-cta__visual">
              <img
                src="/Sarah.png"
                alt="Sarah H."
                className="about-cta__photo-img"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

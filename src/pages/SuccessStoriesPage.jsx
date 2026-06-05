// src/pages/SuccessStoriesPage.jsx

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SuccessStoriesPage.css'

/* ─── Data ─────────────────────────────────────────────────── */

const STATS = [
  { value: '94%',   label: 'Placed within 3-6 Months' },
  { value: '$120K', label: 'AVG. Starting Salary' },
  { value: '140+',  label: 'Graduates shipping production' },
  { value: '4.9★',  label: 'mentor rating', star: true },
]

const STORIES = [
  {
    id: 1,
    salary: '$128K',
    company: 'Barclays',
    companyColor: '#00aeef',
    name: 'Umar Farouk Muftau',
    role: 'Cloud Engineer · Barclays',
    avatarBg: '#0a2a4a',
    avatarText: 'UF',
    photo: 'Umar Farouk Muftau.png',
    watchUrl: 'https://www.youtube.com/watch?v=REPLACE_WITH_UMAR_STORY_URL',
    before: 'Hospitality Manager for 7 years. Watched a Cloud Engineering YouTube video at 2 AM and couldn\'t sleep.',
    during: 'The mentor calls kept me from quitting in week 6. We rebuilt my Terraform module from scratch in 40 minutes.',
    after: 'Three offers in five weeks. Took Barclays because they let me work on Atlas infrastructure on day one.',
  },
  {
    id: 2,
    salary: '$110K',
    company: 'Comcast',
    companyColor: '#cc0000',
    name: 'Sophia Martinez',
    role: 'DevOps Engineer · Comcast',
    avatarBg: '#3a1a4a',
    avatarText: 'SM',
    photo: 'Sophia Martinez.png',
    before: 'Civil engineer, burned out on projects that take 5 years to ship. Wanted to build things that deploy in 5 minutes.',
    during: 'The CI/CD phase clicked everything together. I rebuilt our family business deployment as my project.',
    after: 'Comcast hired me into a platform team. I ship to prod twice a day now.',
  },
  {
    id: 3,
    salary: '$135K',
    company: 'VMware',
    companyColor: '#607078',
    name: 'Michael Chen',
    role: 'Platform Engineer · VMware',
    avatarBg: '#1a2a3a',
    avatarText: 'MC',
    photo: 'Michael Chen.png',
    before: '10 years in IT support. Could fix anyone\'s laptop but couldn\'t get past the resume screen for cloud roles.',
    during: 'The architecture reviews changed how I talk about systems. I started sounding like an engineer.',
    after: 'VMware. Defending design decisions to staff engineers feels normal now.',
  },
  {
    id: 4,
    salary: '$128K',
    company: 'Capital One',
    companyColor: '#d03027',
    name: 'Marcus Lee',
    role: 'Cloud Engineer · Capital One',
    avatarBg: '#2a1a3a',
    avatarText: 'ML',
    photo: 'Marcus Lee.png',
    before: 'Sysadmin since the on-prem days. Knew I was being left behind every quarterly all-hands.',
    during: 'Translating my on-prem instincts to AWS-native took 8 weeks. The mentor accelerated it by 6 months.',
    after: 'Same paycheck doubled. Same kid asking what dad does, finally a clear answer.',
  },
  {
    id: 5,
    salary: '$138K',
    company: 'Shopify',
    companyColor: '#95bf47',
    name: 'Priya Nair',
    role: 'Platform Engineer · Shopify',
    avatarBg: '#1a3a2a',
    avatarText: 'PN',
    photo: 'Priya Nair.png',
    before: 'Product manager who got tired of asking engineers when things would be done. Decided to learn.',
    during: 'Shopify was a multi-tenant Kubernetes platform. Shipped it. Demoed it. Got hired off it.',
    after: 'Shopify Platform team. I\'m the PM-turned-engineer who can still talk to PMs.',
  },
  {
    id: 6,
    salary: '$123K',
    company: 'Twilio',
    companyColor: '#f22f46',
    name: 'Tomás Hernández',
    role: 'DevOps Engineer · Twilio',
    avatarBg: '#3a1a1a',
    avatarText: 'TH',
    photo: 'Tomás Hernández.png',
    before: 'Graphic designer for 9 years. Cloud engineering looked like the opposite — invisible, structural, durable.',
    during: 'My architecture decks went viral in our cohort Discord.',
    after: 'Twilio. Building things people don\'t see but everyone depends on.',
  },
  {
    id: 7,
    salary: '$124K',
    company: 'Fintech (stealth)',
    companyColor: '#3b82f6',
    name: 'Amara Johnson',
    role: 'AWS Cloud Engineer · Fintech (stealth)',
    avatarBg: '#1a2a1a',
    avatarText: 'AJ',
    photo: 'Amara Johnson.png',
    before: 'Nursing school dropout. Zero coding background. Saved $1,800 for the program and showed up every day.',
    during: 'Built a HIPAA-shaped audit tool as my capstone. The mentor connected me to a healthcare-adjacent fintech.',
    after: 'Running production AWS workloads eight months after I wrote my first Bash script.',
  },
  {
    id: 8,
    salary: '$142K',
    company: 'Datadog',
    companyColor: '#774aa4',
    name: 'Raj Patel',
    role: 'SRE · Datadog',
    avatarBg: '#2a1a3a',
    avatarText: 'RP',
    photo: 'Raj Patel.png',
    before: 'Mechanical engineer at an auto OEM. Wanted to work somewhere code shipped faster than yearly model refreshes.',
    during: 'The observability phase felt like coming home. SLOs, error budgets, all of it just clicked.',
    after: 'Datadog. I get paid to think about systems failing.',
  },
  {
    id: 9,
    salary: '$98K',
    company: 'Stripe (contract)',
    companyColor: '#635bff',
    name: 'Elena Rossi',
    role: 'Junior DevOps Engineer · Stripe (contract)',
    avatarBg: '#1a1a3a',
    avatarText: 'ER',
    photo: 'Elena Rossi.png',
    before: 'Recent CS grad — too much theory, no infrastructure experience. Couldn\'t explain what a VPC was.',
    during: 'Pair-programmed with my mentor every week. The Terraform module library is now my GitHub pinned repo.',
    after: 'Started as a contractor at Stripe, full-time conversion in 4 months.',
  },
]

/* ─── Sub-components ──────────────────────────────────────── */

function Stars({ count = 5 }) {
  return (
    <div className="ss-stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  )
}

function StoryCard({ story, visible }) {
  return (
    <div className={`story-card ${visible ? 'story-card--visible' : ''}`}>
      {/* Top bar */}
      <div className="story-card__topbar">
        <span className="story-card__salary">{story.salary}</span>
        <span
          className="story-card__company"
          style={{ color: story.companyColor }}
        >
          {story.company}
        </span>
      </div>

      {/* Avatar + watch */}
      <div className="story-card__media">
        <div
          className="story-card__avatar"
          style={{ background: story.avatarBg }}
        >
          {story.photo ? (
            <img src={`/${encodeURI(story.photo)}`} alt={story.name} />
          ) : (
            <span>{story.avatarText}</span>
          )}
        </div>
        {story.watchUrl ? (
          <button
            className="story-card__watch"
            onClick={() => window.open(story.watchUrl, '_blank', 'noopener,noreferrer')}
          >
            <span className="story-card__play">▶</span>
            Watch story
          </button>
        ) : null}
      </div>

      {/* Identity */}
      <div className="story-card__identity">
        <h3 className="story-card__name">{story.name}</h3>
        <p className="story-card__role">{story.role}</p>
      </div>

      {/* Journey */}
      <div className="story-card__journey">
        <div className="story-card__segment">
          <span className="story-card__seg-label story-card__seg-label--before">↑ Before</span>
          <p>{story.before}</p>
        </div>
        <div className="story-card__segment">
          <span className="story-card__seg-label story-card__seg-label--during">↑ During</span>
          <p>{story.during}</p>
        </div>
        <div className="story-card__segment">
          <span className="story-card__seg-label story-card__seg-label--after">↑ After</span>
          <p>{story.after}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="story-card__footer">
        <Stars />
        <span className="story-card__verified">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeOpacity="0.4" strokeWidth="0.8"/>
            <path d="M4 6.5L6 8.5L9 5" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Verified alum
        </span>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function SuccessStoriesPage() {
  const navigate = useNavigate()
  const [visibleCards, setVisibleCards] = useState(new Set())
  const cardRefs = useRef([])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // stagger by column position
            const col = i % 3
            setTimeout(() => {
              setVisibleCards(prev => new Set([...prev, i]))
            }, col * 80)
          }
        },
        { threshold: 0.1 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <div className="ss-page">
      {/* Background */}
      <div className="ss-bg-glow ss-bg-glow--1" />
      <div className="ss-bg-glow ss-bg-glow--2" />
      <div className="ss-grid-bg" />

      {/* ── Hero ── */}
      <section className="ss-hero">
        <div className="container">
          <h1 className="ss-hero__title">
            Real students. Real offers.<br />
            <span className="ss-hero__title-accent">$90K–$142K</span> starting<br />
            salaries.
          </h1>
          <p className="ss-hero__desc">
            We don't measure success in completed modules. We measure it in offers signed,<br />
            systems shipped, and lives that look meaningfully different on the other side.
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="ss-stats">
        <div className="container">
          <div className="ss-stats__inner">
            {STATS.map((s, i) => (
              <div key={i} className="ss-stat">
                <div className={`ss-stat__value ${s.star ? 'ss-stat__value--star' : ''}`}>
                  {s.value}
                </div>
                <div className="ss-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story grid ── */}
      <section className="ss-grid-section">
        <div className="container">
          <div className="ss-grid">
            {STORIES.map((story, i) => (
              <div
                key={story.id}
                ref={el => cardRefs.current[i] = el}
              >
                <StoryCard story={story} visible={visibleCards.has(i)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="ss-cta">
        <div className="container">
          <div className="ss-cta__card">
            <div className="ss-cta__glow" />

            <div className="ss-cta__content">
              <div className="ss-cta__eyebrow">
                <span className="ss-cta__dot" />
                Your next step starts now
              </div>
              <h2 className="ss-cta__title">
                Your cloud career<br />starts with one<br />command
              </h2>
              <p className="ss-cta__desc">
                Join 2,400+ engineers building real cloud skills with a roadmap, mentors, and a community that has your back.
              </p>
              <div className="ss-cta__actions">
                <button
                  className="ss-cta__btn-primary"
                  onClick={() => navigate('/roadmap')}
                >
                  View roadmap →
                </button>
              </div>
              <div className="ss-cta__perks">
                <span>● Self-paced</span>
                <span>● Mentor support</span>
                <span>● Real cloud projects</span>
              </div>
            </div>

            <div className="ss-cta__image-wrap">
              <div className="ss-cta__image-inner">
                {/* Simulated photo placeholder — replace with <img> when real asset is available */}
               <div className="about-cta__visual">
              <img
                src="/Sarah.png"
                alt="Sarah H."
                className="about-cta__photo-img"
              />
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

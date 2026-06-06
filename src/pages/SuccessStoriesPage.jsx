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
    watchUrl: 'https://www.youtube.com/watch?v=7M4sBffKjY8',
    background: 'Umar spent nearly three years working in Tech Support, helping users solve technical issues while building early exposure to IT systems.',
    challenge: 'He felt stuck in his role with a clear salary ceiling and limited growth opportunities. Although he had started self-learning cloud engineering, he lacked direction, structure, and a clear path to break into the field.',
    journey: 'Everything shifted after watching a Cloud Engineering video about TechPathway that sparked a strong interest in cloud technologies. He transitioned from random self-learning into a structured program with mentorship and hands-on guidance, which helped him finally understand real-world cloud concepts and stop learning in isolation.',
    outcome: 'Umar now works as a Cloud Engineer at Barclays, having successfully transitioned from support roles into a global infrastructure environment.',
  },
  {
    id: 2,
    salary: '$115K',
    company: 'Comcast',
    companyColor: '#cc0000',
    name: 'Amara N.',
    role: 'DevOps Engineer · Comcast',
    avatarBg: '#1a1a2a',
    avatarText: 'AN',
    photo: 'Amara Johnson.png',
    background: 'Amara spent nearly nine years working as an ICU nurse. Although she excelled in her role, the constant pressure and demanding shifts left her exhausted and searching for a different future.',
    challenge: 'Like many healthcare professionals, she believed her skills wouldn\'t transfer into the tech industry. The idea of starting over felt intimidating.',
    journey: 'Through mentorship and career coaching, Amara learned how qualities she had developed in nursing — attention to detail, problem-solving, communication, and calmness under pressure — were highly valuable in cloud operations and support environments. She worked through certification studies and technical projects with support from mentors who reviewed her progress and answered questions.',
    outcome: 'Amara successfully transitioned into a remote role, replacing stressful night shifts with a healthier and more flexible work schedule.',
  },
  {
    id: 3,
    salary: '$133K',
    company: 'VMware',
    companyColor: '#607078',
    name: 'Joseph M.',
    role: 'DevOps Engineer · Comcast',
    avatarBg: '#1a2a1a',
    avatarText: 'JM',
    photo: 'Michael Chen.png',
    background: 'After moving from Ghana to Canada, Joseph struggled to gain recognition for his previous education and spent six years working overnight security jobs.',
    challenge: 'He believed that his immigrant background, lack of Canadian experience, and non-traditional path would prevent him from entering the tech industry.',
    journey: 'Joseph committed to the training program while continuing to work. Through practical projects, mentorship, and consistent accountability, he gradually built both technical skills and confidence.',
    outcome: 'Within five months, Joseph transitioned into a remote DevOps role and began attracting recruiter interest for the first time in his career.',
  },
  {
    id: 4,
    salary: '$133K',
    company: 'MongoDB',
    companyColor: '#00ed64',
    name: 'Reyna P.',
    role: 'DevOps Engineer · Comcast',
    avatarBg: '#2a1a0a',
    avatarText: 'RP',
    photo: 'Priya Nair.png',
    background: 'Reyna worked in a care home and had very limited technical experience. She considered herself "non-technical" and doubted she could ever build a career in technology.',
    challenge: 'Learning cloud concepts felt overwhelming at first, and she nearly quit more than once.',
    journey: 'The supportive learning environment allowed her to ask questions freely without feeling judged. With encouragement from mentors and consistent practice, she gradually gained confidence and developed new skills.',
    outcome: 'Reyna now works remotely and enjoys greater flexibility, allowing her to be present for her children after school.',
  },
  {
    id: 5,
    salary: '$128K',
    company: 'Shopify',
    companyColor: '#95bf47',
    name: 'Tunde A.',
    role: 'DevOps Engineer · Comcast',
    avatarBg: '#1a2a3a',
    avatarText: 'TA',
    photo: 'Raj Patel.png',
    background: 'Tunde spent years working factory jobs and living paycheck to paycheck. Unexpected expenses created constant financial stress for his family.',
    challenge: 'Like many career changers, he was skeptical about online programs and worried about investing money into something that might not work.',
    journey: 'Instead of quitting his job, Tunde learned alongside his factory work. Following a structured roadmap, he focused on building skills steadily rather than chasing shortcuts.',
    outcome: 'Today, Tunde holds two remote positions and has achieved a level of financial security that once seemed out of reach.',
  },
  {
    id: 6,
    salary: '$121K',
    company: 'Twilio',
    companyColor: '#f22f46',
    name: 'Chinedu O.',
    role: 'Cloud Engineer · Comcast',
    avatarBg: '#2a1a2a',
    avatarText: 'CO',
    photo: 'Tomás Hernández.png',
    background: 'When Chinedu joined the program, he was balancing warehouse night shifts and weekend Uber driving to make ends meet. Having previously invested in an online course that delivered little value, he was skeptical about another career-transition program.',
    challenge: 'Long working hours were taking a toll on both his health and quality of life. He wanted a sustainable career path but wasn\'t sure whether cloud engineering was realistic for someone with his background.',
    journey: 'During his first consultation, the focus wasn\'t on selling a dream; it was about understanding his situation and creating a realistic plan. Over the next four months, Chinedu studied consistently while continuing to work. Whenever he faced technical challenges, mentors provided guidance and accountability.',
    outcome: 'Today, Chinedu works remotely in a cloud-related role, enjoys better work-life balance, and no longer experiences the physical strain that came with his previous jobs.',
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

      {/* Journey — 4-section narrative format */}
      <div className="story-card__journey">
        <div className="story-card__segment">
          <span className="story-card__seg-label story-card__seg-label--background">// BACKGROUND</span>
          <p>{story.background}</p>
        </div>
        <div className="story-card__segment">
          <span className="story-card__seg-label story-card__seg-label--challenge">// THE CHALLENGE</span>
          <p>{story.challenge}</p>
        </div>
        <div className="story-card__segment">
          <span className="story-card__seg-label story-card__seg-label--journey">// THE JOURNEY</span>
          <p>{story.journey}</p>
        </div>
        <div className="story-card__segment">
          <span className="story-card__seg-label story-card__seg-label--outcome">// THE OUTCOME</span>
          <p>{story.outcome}</p>
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
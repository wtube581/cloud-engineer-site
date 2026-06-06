// src/pages/RoadmapPage.jsx
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBan, FaChartLine, FaClock, FaLinkedinIn, FaFileAlt, FaFolderOpen, FaMicrophone, FaChalkboardTeacher, FaBullseye, FaBriefcase, FaComments, FaGlobe, FaRocket, FaUsers, FaHandshake, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import './RoadmapPage.css'

/* ─── Data ──────────────────────────────────────────────── */

const PHASES = [
  { id:1, phase:'Phase 01', duration:'1 week',  title:'Cloud & Linux Fundamentals',    desc:'Build a solid understanding of cloud concepts and Linux CLI skills essential for any DevOps role.',                                    tags:['Networking','Linux CLI'],              side:'left'  },
  { id:2, phase:'Phase 02', duration:'1 week',  title:'AWS Core Services',              desc:'Deep dive into EC2, S3, VPC, RDS, and the foundational services powering modern cloud infrastructure.',                               tags:['EC2','S3','VPC','RDS'],                side:'right' },
  { id:3, phase:'Phase 03', duration:'1 week',  title:'Infrastructure as Code',         desc:'Automate cloud infrastructure provisioning and management using Terraform best practices.',                                            tags:['Terraform','HCL'],                     side:'left'  },
  { id:4, phase:'Phase 04', duration:'1 week',  title:'CI/CD Pipeline Engineering',     desc:'Design and implement robust CI/CD pipelines using GitHub Actions and Jenkins.',                                                        tags:['GitHub Actions','Jenkins'],            side:'right' },
  { id:5, phase:'Phase 05', duration:'2 weeks', title:'DevOps Leadership & Projects',   desc:'Work on real-world projects and learn how to operate like a senior DevOps engineer.',                                                  tags:['Architecture','Team Workflows'],       side:'left'  },
  { id:6, phase:'Phase 06', duration:'2 week',  title:'System Design',                  desc:'Design highly scalable, fault-tolerant systems in AWS with best practices for architecture.',                                          tags:['Multi Cloud','System Design'],         side:'right' },
  { id:7, phase:'Phase 07', duration:'2 weeks', title:'Observability & SRE',            desc:'Implement monitoring, alerting, logging and practices used at top-tier orgs.',                                                         tags:['Prometheus','Grafana'],                side:'left'  },
  { id:8, phase:'Phase 08', duration:'2 weeks', title:'Kubernetes & Orchestration',     desc:'Master Kubernetes deployments, scaling, and production cluster management on EKS.',                                                    tags:['Kubernetes','EKS'],                    side:'right' },
]

const PILLARS = [
  { icon: FaClock, label:'Self Paced Learning',   sub:'Learn when you can, at your schedule.' },
  { icon: FaChartLine, label:'Job Focused Progress',  sub:'Every module moves you closer to employment.' },
  { icon: FaBan, label:'No Fixed Deadline',     sub:'Advance only when you are genuinely confident.' },
]

const HIRING_STEPS = [
  { icon: FaLinkedinIn, label:'Optimize LinkedIn',    desc:'Build a profile that recruiters find.' },
  { icon: FaFileAlt,    label:'Build Your Resume',    desc:'Craft a resume that gets past ATS.' },
  { icon: FaFolderOpen, label:'Create Portfolio Projects', desc:'Ship real cloud projects to showcase.' },
  { icon: FaMicrophone, label:'Mock Interviews',       desc:'Practice technical and behavioural rounds.' },
  { icon: FaChalkboardTeacher, label:'Interview Coaching',  desc:'1-on-1 feedback from hiring engineers.' },
  { icon: FaBullseye,   label:'Apply Strategically',  desc:'Target the right roles at the right time.' },
]

const CAREER_LEVELS = ['Cloud Engineer','DevOps Engineer','Platform Engineer','SRE']

const AFTER_ITEMS = [
  { icon: FaBriefcase, title:'Job-Ready Portfolio',       desc:'Real projects your recruiter can review.'               },
  { icon: FaComments,  title:'Interview Confidence',      desc:'Practise until real interviews feel familiar.'           },
  { icon: FaGlobe,     title:'Professional Presence',     desc:'Polished LinkedIn and resume.'                           },
  { icon: FaRocket,    title:'Career Readiness',          desc:'Apply with confidence.'                                  },
  { icon: FaUsers,     title:'Community Support',         desc:'Mentors and peers to guide you.'                        },
  { icon: FaHandshake, title:'Hiring Opportunities',      desc:'Access to career opportunities and referrals.'           },
]

/* ─── Sub-components ─────────────────────────────────── */

function PhaseNode({ active }) {
  return (
    <div className={`phase-node ${active ? 'phase-node--active' : ''}`}>
      <div className="phase-node__ring"/>
      <div className="phase-node__core"/>
    </div>
  )
}

function PhaseCard({ phase, index, visible, active }) {
  const isLeft = phase.side === 'left'
  const card = (
    <div className={`phase-card ${active ? 'phase-card--active' : ''}`}>
      <div className="phase-card__meta">
        <span className="phase-card__label">{phase.phase}</span>
        <span className="phase-card__duration"><FaClock />{phase.duration}</span>
      </div>
      <h3 className="phase-card__title">{phase.title}</h3>
      <p className="phase-card__desc">{phase.desc}</p>
      <div className="phase-card__tags">
        {phase.tags.map(t => <span key={t} className="phase-card__tag">{t}</span>)}
      </div>
    </div>
  )

  return (
    <div className={`phase-row ${isLeft?'phase-row--left':'phase-row--right'} ${visible?'phase-row--visible':''}`}>
      <div className="phase-slot phase-slot--left">{isLeft && card}</div>
      <div className="phase-center"><PhaseNode active={active} /></div>
      <div className="phase-slot phase-slot--right">{!isLeft && card}</div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────── */

export default function RoadmapPage() {
  const navigate = useNavigate()
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [activeLevel, setActiveLevel] = useState(0)
  const [activePhase, setActivePhase] = useState(0)
  const cardRefs = useRef([])

  useEffect(() => { window.scrollTo(0,0) }, [])

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, i]))
            setActivePhase(i)
          }
        },
        { threshold: 0.35, rootMargin: '0px 0px -40% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <div className="roadmap-page">
      <div className="roadmap-page__bg-glow roadmap-page__bg-glow--1"/>
      <div className="roadmap-page__bg-glow roadmap-page__bg-glow--2"/>
      <div className="roadmap-page__grid"/>

      {/* ── Hero ── */}
      <section className="roadmap-hero">
        <div className="container">
          <h1 className="roadmap-hero__title">
            A focused pathway from<br/>
            <span className="roadmap-hero__title-gradient">curious</span>{' '}to{' '}
            <span className="roadmap-hero__title-gradient">hireable</span>
          </h1>
          <p className="roadmap-hero__desc">
            Follow our structured AWS & DevOps roadmap, designed from the<br/>
            ground up to take you from a tech enthusiast to a Cloud Master.
          </p>
        </div>
      </section>

      {/* ── Disclaimer banner ── */}
      <section className="rm-disclaimer">
        <div className="container">
          <div className="rm-disclaimer__card">
            <div className="rm-disclaimer__eyebrow"><FaExclamationTriangle className="rm-disclaimer__eyebrow-icon" /> Important Disclaimer</div>
            <p className="rm-disclaimer__body">
              This roadmap is milestone-based, not time-based. The estimated durations beside each phase are learning references only.
              There is no rush to finish in 12 weeks. Some learners complete the roadmap in a few months, others take longer depending on their schedule.
            </p>
            <p className="rm-disclaimer__body">
              Our goal isn't speed. Our goal is helping you become job-ready and confident enough to land a Cloud or DevOps role.
            </p>
            <div className="rm-disclaimer__pillars">
              {PILLARS.map((p,i) => (
                <div key={i} className="rm-pillar">
                  <p.icon className="rm-pillar__icon" />
                  <div>
                    <div className="rm-pillar__label">{p.label}</div>
                    <div className="rm-pillar__sub">{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="roadmap-timeline">
        <div className="container">
          <div className="roadmap-timeline__track">
            <div className="roadmap-timeline__line"/>
            {PHASES.map((phase, i) => (
              <div key={phase.id} ref={el => cardRefs.current[i] = el}>
                <PhaseCard phase={phase} index={i} visible={visibleCards.has(i)} active={activePhase === i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── From Learning to Hiring ── */}
      <section className="rm-hiring">
        <div className="container">
          <div className="rm-hiring__eyebrow">Career Pipeline</div>
          <h2 className="rm-hiring__title">
            From <span className="rm-hiring__title-plain">Learning</span> to{' '}
            <span className="rm-hiring__title-accent">Hiring.</span>
          </h2>
          <p className="rm-hiring__desc">
            The roadmap doesn't end when you finish studying, it ends when you get hired.
          </p>

          {/* Step strip */}
          <div className="rm-hiring__steps">
            {HIRING_STEPS.map((step, i) => (
              <div key={i} className="rm-hiring__step">
                <step.icon className="rm-hiring__step-icon" />
                <div className="rm-hiring__step-label">{step.label}</div>
                <div className="rm-hiring__step-desc">{step.desc}</div>
                {i < HIRING_STEPS.length - 1 && <div className="rm-hiring__step-arrow">→</div>}
              </div>
            ))}
          </div>

          {/* Career level selector */}
          <div className="rm-hiring__levels-wrap">
            <div className="rm-hiring__levels-label">GET HIRED AS</div>
            <div className="rm-hiring__levels">
              {CAREER_LEVELS.map((lvl, i) => (
                <button
                  key={i}
                  className={`rm-hiring__level ${activeLevel === i ? 'rm-hiring__level--active' : ''}`}
                  onClick={() => setActiveLevel(i)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What happens after the roadmap ── */}
      <section className="rm-after">
        <div className="container">
          <div className="rm-after__eyebrow">Beyond the Roadmap</div>
          <h2 className="rm-after__title">
            What happens after{' '}
            <span className="rm-after__title-accent">the roadmap?</span>
          </h2>
          <div className="rm-after__grid">
            {AFTER_ITEMS.map((item, i) => (
              <div key={i} className="rm-after__card">
                <item.icon className="rm-after__card-icon" />
                <div className="rm-after__card-title">{item.title}</div>
                <div className="rm-after__card-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="roadmap-cta">
        <div className="container">
          <div className="roadmap-cta__card">
            <div className="roadmap-cta__glow"/>

            <div className="roadmap-cta__content">
              <div className="roadmap-cta__eyebrow">
                <span className="roadmap-cta__dot"/>
                It all starts at Phase 01
              </div>
              <h2 className="roadmap-cta__title">
                Master the skills.<br/>
                Build the proof.<br/>
                <span className="roadmap-cta__title-accent">Land the job.</span>
              </h2>
              <p className="roadmap-cta__desc">
                Whether it takes 3 months or 12 months, your goal isn't to finish faster. Your goal is to become a Cloud Engineer employers want to hire. Follow the roadmap, build projects, prepare for interviews, and launch your cloud career. Own it.
              </p>
              <div className="roadmap-cta__actions">
                <button className="roadmap-cta__btn-primary" onClick={() => window.open('https://techpathway.cloud/take-a-quiz', '_blank')}>
                  Get Started
                </button>
                <button className="roadmap-cta__btn-ghost" onClick={() => navigate('/success-stories')}>
                  See graduate outcomes →
                </button>
              </div>
              <div className="roadmap-cta__perks">
                <div className="roadmap-cta__perk"><FaCheckCircle /> Self-paced</div>
                <div className="roadmap-cta__perk"><FaCheckCircle /> Mentor support</div>
                <div className="roadmap-cta__perk"><FaCheckCircle /> Real cloud projects</div>
              </div>
            </div>

            <div className="roadmap-cta__visual">
              <img src="/Terminal.png" alt="Terminal screenshot" className="roadmap-cta__terminal-img" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

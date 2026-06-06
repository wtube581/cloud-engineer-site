// src/components/Hero.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

const TERMINAL_LINES = [
  { cmd: 'terraform apply --auto-approve', status: 'Creating', color: '#fbbf24' },
  { cmd: 'aws_s3_bucket.static[0]',        status: 'Created',  color: '#4ade80' },
  { cmd: 'aws_subnet.public[1]',           status: 'Created',  color: '#4ade80' },
  { cmd: 'aws_cluster.ecs_prod',           status: 'Created',  color: '#4ade80' },
  { cmd: 'eks_app (ecs)',                  status: 'Created',  color: '#4ade80' },
]

function FloatingTerminal() {
  const [completedLines, setCompletedLines] = useState([])
  const [typingText, setTypingText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  const timeouts = React.useRef([])

  useEffect(() => {
    // blink cursor
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    // start typing process
    if (currentIndex >= TERMINAL_LINES.length) {
      setShowSummary(true)
      return
    }

    const line = TERMINAL_LINES[currentIndex].cmd
    setTypingText('')

    // type characters one by one
    for (let i = 0; i <= line.length; i++) {
      const t = setTimeout(() => {
        setTypingText(line.slice(0, i))
        // when finished typing the line
        if (i === line.length) {
          // small delay then mark as completed (reveal status)
          const done = setTimeout(() => {
            setCompletedLines(prev => [...prev, TERMINAL_LINES[currentIndex]])
            setCurrentIndex(idx => idx + 1)
          }, 350)
          timeouts.current.push(done)
        }
      }, i * 40 + 200)
      timeouts.current.push(t)
    }

    return () => {
      // clear timeouts for this render
      timeouts.current.forEach(t => clearTimeout(t))
      timeouts.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  useEffect(() => {
    return () => {
      // cleanup on unmount
      timeouts.current.forEach(t => clearTimeout(t))
      timeouts.current = []
    }
  }, [])

  return (
    <div className="hero-terminal__wrap">
      <div className="hero-terminal">
        <div className="hero-terminal__header">
          <div className="hero-terminal__dots">
            <span className="hdot hdot--red" />
            <span className="hdot hdot--yellow" />
            <span className="hdot hdot--green" />
          </div>
          <span className="hero-terminal__title">~/tech-pathway/ideate · Safe</span>
          <span className="hero-terminal__status-bar">● 100% Complete</span>
        </div>

        <div className="hero-terminal__content">
          <div className="hero-terminal__panel hero-terminal__panel--left">
            <div className="hero-terminal__body">
              {completedLines.map((line, i) => (
                <div key={`c-${i}`} className="hero-terminal__line">
                  <span className="hero-terminal__prompt">$</span>
                  <span className="hero-terminal__cmd">{line.cmd}</span>
                  <span className="hero-terminal__status" style={{ color: line.color }}>{line.status}</span>
                </div>
              ))}

              {currentIndex < TERMINAL_LINES.length && (
                <div className="hero-terminal__line">
                  <span className="hero-terminal__prompt">$</span>
                  <span className="hero-terminal__cmd">{typingText}</span>
                  <span className={`hero-terminal__cursor ${cursorVisible ? 'hero-terminal__cursor--on' : ''}`}>▋</span>
                </div>
              )}

              {showSummary && (
                <div className="hero-terminal__summary">
                  <span className="hero-terminal__summary-status">Apply complete!</span>
                  <span className="hero-terminal__summary-text">Resources: <b>13 added</b>, 0 destroyed.</span>
                </div>
              )}
            </div>
          </div>

          <div className="hero-terminal__panel hero-terminal__panel--right">
            <div className="hero-terminal__sidecard">
              <div className="hero-terminal__side-label">IDEA → PLAN → LAUNCH</div>
              <div className="hero-terminal__side-title">Highly Available Web App on EKS</div>
              <ul className="hero-terminal__side-list">
                <li className="hero-terminal__side-item"><span className="hero-terminal__side-bullet">✓</span><span>VPC with Multi-AZ Subnets</span></li>
                <li className="hero-terminal__side-item"><span className="hero-terminal__side-bullet">✓</span><span>EKS Cluster in multiple AZs</span></li>
                <li className="hero-terminal__side-item"><span className="hero-terminal__side-bullet">✓</span><span>ALB +</span></li>
                <li className="hero-terminal__side-item"><span className="hero-terminal__side-bullet">✓</span><span>CI/CD with GitHub Actions</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="hero__grid-bg" />

      <div className="container hero__inner">

        {/* ── Left: copy ── */}
        <div className="hero__content">
          

          <h1 className="hero__title">
            Break into Cloud<br />
            Engineering{' '}
            <span className="hero__title-highlight">With<br />out a Degree or<br />Coding Experience</span>
          </h1>

          <p className="hero__desc">
            A mentor-led roadmap that turns scattered tutorials into real job-ready cloud skills, Linux, AWS, Docker, Kubernetes, and the production projects that get you hired.
          </p>

          <div className="hero__cta">
            <button className="btn-primary" onClick={() => window.open('https://techpathway.cloud/take-a-quiz', '_blank')}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={() => navigate('/roadmap')}>
              View roadmap →
            </button>
          </div>
        </div>

        <div className="about-founder__photo-wrap">
              <div className="about-founder__photo">
                <img
                  src="/Shola.png"
                  alt="Shola Olujobi"
                  className="about-founder__photo-img"
                />
              </div>
            </div>
      </div>

      {/* Terminal below / overlapping bottom */}
      <div className="hero__float hero__float--terminal">
        <FloatingTerminal />
      </div>

      {/* Tech logos bar */}
      <div className="hero__logos">
        <div className="container">
          <div className="hero__logos-inner">
            {['AWS', 'Linux', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'].map(logo => (
              <div key={logo} className="hero__logo-item">{logo}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="hero__stats">
        <div className="container">
          <div className="hero__stats-inner">
            {[
              { value: '140+',  label: 'Active members',   accent: true },
              { value: '$120K+',label: 'Avg. first salary', accent: false },
              { value: '11',    label: 'Modules',          accent: false },
              { value: null,    label: 'Student rating',   stars: true },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="hero__stat-divider" />}
                <div className="hero__stat">
                  {s.stars ? (
                    <>
                      <div className="hero__stat-value">
                        <span className="hero__stars">★★★★★</span>4.9
                      </div>
                    </>
                  ) : (
                    <div className="hero__stat-value">{s.value}</div>
                  )}
                  <div className="hero__stat-label">{s.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

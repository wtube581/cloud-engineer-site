import React, { useState } from 'react'
import './Roadmap.css'

const STEPS = [
  { id: 1, label: 'Linux & CLI', desc: 'Master the terminal, file system, and shell scripting fundamentals.', done: true },
  { id: 2, label: 'Networking', desc: 'TCP/IP, DNS, VPCs, subnets, routing — the backbone of cloud.', done: true },
  { id: 3, label: 'AWS Core', desc: 'EC2, S3, IAM, RDS — the foundational services every engineer uses.', done: true },
  { id: 4, label: 'Docker', desc: 'Containerize applications and understand image layering and registries.', done: false },
  { id: 5, label: 'Kubernetes', desc: 'Deploy and manage containerized apps at scale with EKS.', done: false },
  { id: 6, label: 'Terraform', desc: 'Infrastructure as code — build repeatable, version-controlled infra.', done: false },
  { id: 7, label: 'CI/CD', desc: 'GitHub Actions pipelines that build, test, and deploy automatically.', done: false },
  { id: 8, label: 'Monitoring', desc: 'CloudWatch, Prometheus, Grafana — know when things break.', done: false },
  { id: 9, label: 'Security', desc: 'IAM policies, security groups, secrets management, compliance.', done: false },
  { id: 10, label: 'Get Hired', desc: 'Portfolio review, resume polish, and interview prep.', done: false, isGoal: true },
]

export default function Roadmap() {
  const [active, setActive] = useState(4)

  return (
    <section className="roadmap">
      <div className="container">
        <div className="roadmap__header">
          <div className="section-label">The Path</div>
          <h2 className="section-title">
            Your route from first command<br />to Cloud Engineer
          </h2>
          <p className="section-subtitle">
            Always know exactly where you are and what's next. No guessing, no skipping.
          </p>
        </div>

        <div className="roadmap__track-wrap">
          <div className="roadmap__track">
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                className={`roadmap__node ${step.done ? 'roadmap__node--done' : ''} ${active === step.id ? 'roadmap__node--active' : ''} ${step.isGoal ? 'roadmap__node--goal' : ''}`}
                onClick={() => setActive(step.id)}
                title={step.label}
              >
                <div className="roadmap__node-circle">
                  {step.done ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : step.isGoal ? (
                    <span>★</span>
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <span className="roadmap__node-label">{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active step detail */}
        {STEPS.find(s => s.id === active) && (
          <div className="roadmap__detail">
            <div className="roadmap__detail-num">Step {active}</div>
            <div className="roadmap__detail-title">{STEPS.find(s => s.id === active).label}</div>
            <div className="roadmap__detail-desc">{STEPS.find(s => s.id === active).desc}</div>
          </div>
        )}

        <div className="roadmap__cta">
          <button className="btn-secondary">Explore the full roadmap →</button>
        </div>
      </div>
    </section>
  )
}

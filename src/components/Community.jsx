// src/components/Community.jsx

import React from 'react'
import './Community.css'

const COMMUNITY_ITEMS = [
  'Weekly live mentor office hours',
  'Cohort channels that keep you moving',
  'Code reviews from working engineers',
  'Blockers unblocked in hours, not weeks',
]

const CHAT_MESSAGES = [
  {
    avatar: 'SM',
    name: 'Sam',
    role: 'mentor',
    time: '2m',
    msg: 'Nice work on the VPC, Maya. Tighten the SG ingress rules, want to pair for 10 min?',
    color: '#3b82f6',
  },
  {
    avatar: 'MY',
    name: 'Maya',
    time: '5m',
    msg: 'My first EKS cluster is live and serving traffic. I genuinely can\'t believe it.',
    color: '#a78bfa',
    reply: true,
  },
  {
    avatar: 'LE',
    name: 'Leo',
    time: '14m',
    msg: 'Signed a DevOps offer today. This room carried me through every blocker. Thank you all.',
    color: '#22d3ee',
  },
]

export default function Community() {
  return (
    <section className="community">
      <div className="container">
        <div className="community__inner">
          <div className="community__content">
            <div className="section-label">THE COMMUNITY</div>
            <h2 className="section-title">
              You won't be learning alone
            </h2>
            <p className="section-subtitle">
              Cloud engineering is hard in isolation. Inside TechPathway you get mentors who've shipped, a cohort moving with you, and a room that celebrates every win.
            </p>

            <ul className="community__list">
              {COMMUNITY_ITEMS.map((item, i) => (
                <li key={i} className="community__list-item">
                  <span className="community__check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </div>

          <div className="community__chat">
            <div className="community__chat-header">
              <div className="community__chat-dot" />
              <span># cloud-help</span>
              <span className="community__chat-live">142 online</span>
            </div>
            <div className="community__chat-body">
              {CHAT_MESSAGES.map((msg, i) => (
                <div key={i} className={`community__msg ${msg.reply ? 'community__msg--reply' : ''}`}>
                  <div
                    className="community__msg-avatar"
                    style={{ background: `${msg.color}22`, border: `1px solid ${msg.color}44`, color: msg.color }}
                  >
                    {msg.avatar}
                  </div>
                  <div className="community__msg-content">
                    <div className="community__msg-meta">
                      <span className="community__msg-name">{msg.name}</span>
                      {msg.role && <span className="community__msg-role">{msg.role}</span>}
                      <span className="community__msg-time">{msg.time}</span>
                    </div>
                    <div className="community__msg-text">{msg.msg}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { MapPin, Clock, Briefcase, Calendar, Eye, Building2, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function initials(text = '') {
  return text
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

export default function ResultCard({ item, mode }) {
  const navigate = useNavigate()

  if (mode === 'Jobs') {
    return (
      <article className="result-card job">
        <div className="logo-box">
          {initials(item.company)}
        </div>
        <div className="job-content">
          <div className="job-head">
            <div>
              <p className="company">{item.company}</p>
              <h3>{item.title}</h3>
            </div>
            <span className="comp-badge">{item.salary}</span>
          </div>

          <div className="job-meta-row">
            <Meta icon={MapPin} label={item.location} />
            <Meta icon={Clock} label={item.duration} />
            <Meta icon={Briefcase} label={item.mode} />
          </div>

          <div className="tags">
            {(item.tags || []).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="job-footer">
            <Meta icon={Calendar} label={item.deadline} />
            <Meta icon={Eye} label={`${item.impressions} views`} />
            <div style={{ flex: 1 }} />
            <button
              onClick={() => navigate(`/schedule/${item.id}`)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Schedule Interview
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="result-card profile">
      <div className="logo-box">
        {initials(item.name)}
      </div>
      <div className="job-content">
        <div className="job-head">
          <div>
            <p className="company">{item.role}</p>
            <h3>{item.name}</h3>
          </div>
          <span className="comp-badge">{item.availability}</span>
        </div>

        <div className="job-meta-row">
          <Meta icon={Briefcase} label={`${item.years} yrs exp`} />
          <Meta icon={MapPin} label={item.location} />
          <Meta icon={Calendar} label={`Active ${item.lastActive}`} />
        </div>

        <p className="experience-line" style={{ marginTop: '8px' }}>
          <span style={{ color: 'var(--text)' }}>Current: </span> {item.currentCompany} · <span style={{ color: 'var(--text)' }}>Prev: </span> {item.previousCompany}
        </p>

        <ul className="highlights">
          {(item.highlights || []).map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="tags">
          {(item.skills || []).map(skill => (
            <span key={skill} className="tag">{skill}</span>
          ))}
        </div>

        <div className="job-footer">
          <div style={{ flex: 1 }} />
          <button
            onClick={() => navigate(`/schedule/${item.id}`)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Schedule Interview
          </button>
        </div>
      </div>
    </article>
  )
}

function Meta({ label, icon: Icon }) {
  if (!label) return null
  return (
    <span className="meta-chip">
      <Icon size={14} />
      {label}
    </span>
  )
}

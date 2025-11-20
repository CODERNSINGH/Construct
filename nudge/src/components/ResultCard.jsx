import React from 'react'

const metaIcons = {
  applied: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 8h12M6 12h8M6 16h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  duration: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  remote: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function initials(text = '') {
  return text
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

export default function ResultCard({ item, mode }) {
  if (mode === 'Jobs') {
    return (
      <article className="result-card job">
        <div className="logo-box">
          <div className="logo-mark-secondary">{initials(item.company)}</div>
        </div>
        <div className="job-content">
          <div className="job-head">
            <div>
              <p className="company">{item.company}</p>
              <h3>{item.title}</h3>
            </div>
            <span className="comp-badge">{item.salary}</span>
          </div>
          <p className="location-line">{item.location}</p>
          <div className="job-meta-row">
            <Meta label={`${item.applied} Applied`} icon={metaIcons.applied} />
            <Meta label={item.duration} icon={metaIcons.duration} />
            <Meta label={item.mode} icon={metaIcons.remote} />
          </div>
          <p className="experience-line">{item.experience}</p>
          <div className="tags">
            {(item.tags || []).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="job-footer">
            <span>{item.deadline}</span>
            <span>{item.impressions} impressions</span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="result-card profile">
      <div className="logo-box">
        <div className="logo-mark-secondary">{initials(item.name)}</div>
      </div>
      <div className="job-content">
        <div className="job-head">
          <div>
            <p className="company">{item.role}</p>
            <h3>{item.name}</h3>
          </div>
          <span className="comp-badge">{item.availability}</span>
        </div>
        <div className="profile-info">
          <span>{item.years} yrs experience</span>
          <span>{item.location}</span>
          <span>Last active {item.lastActive}</span>
        </div>
        <p className="experience-line">
          Current: {item.currentCompany} · Previous: {item.previousCompany} · {item.college}
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
      </div>
    </article>
  )
}

function Meta({ label, icon }) {
  return (
    <span className="meta-chip">
      {icon}
      {label}
    </span>
  )
}

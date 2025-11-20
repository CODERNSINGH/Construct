import React from 'react'

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Remote frontend internship in tech industry using React', variant = 'hero' }) {
  return (
    <form className={`prompt-form ${variant}`} onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      <div className="prompt-field">
        <span className="sparkle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#1de5d1" strokeWidth="1.2" opacity=".4" />
            <path d="M12 6l1.4 3.7L17 11l-3.6 1.3L12 16l-1.4-3.7L7 11l3.6-1.3L12 6z" fill="#1de5d1" />
          </svg>
        </span>
        <div className="prompt-copy">
          {variant === 'hero' && <p className="prompt-label">What are you looking for?</p>}
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </div>
        <span className="input-hint">Press ↵ Enter</span>
      </div>
      <button className="prompt-submit" type="submit" aria-label="Run search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 12h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  )
}

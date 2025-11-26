import React from 'react'
import { Search, ArrowRight, Upload, Sparkles } from 'lucide-react'
import '../index.css'

export default function SearchBar({ value, onChange, onSubmit, placeholder = '...', variant = 'hero' }) {
  if (variant === 'hero') {
    return (
      <div className="search-hero-container">
        <div className="search-tabs-row">
          <div className="search-tab active">
            <Sparkles size={16} />
            <span>What are you looking for?</span>
          </div>
          <button className="resume-upload-btn">
            <Upload size={16} />
            <span>Upload Resume</span>
          </button>
        </div>

        <form
          className="search-input-box"
          onSubmit={e => { e.preventDefault(); onSubmit(); }}
        >
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
          <button type="submit" className="search-submit-btn" disabled={!value.trim()}>
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    )
  }

  // Results variant (compact)
  return (
    <form className="search-bar-compact" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      <Search size={18} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Ask anything..."
      />
    </form>
  )
}

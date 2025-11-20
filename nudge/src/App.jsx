import React, { useEffect, useMemo, useRef, useState } from 'react'
import './index.css'
import { examplePrompts, jobs, profiles } from './data/dummyProfiles'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import Loader from './components/Loader'

const statusScripts = {
  Jobs: [
    'Collecting latest internship boards and HR feeds',
    'Ranking listings based on stipend & location fit',
    'Polishing cards and adding visual insights'
  ],
  Profiles: [
    'Scanning profiles for overlap with your prompt',
    'Scoring experience vs. skills & availability',
    'Formatting talent cards for quick review'
  ]
}

const navLinks = [
  { label: 'Applied Jobs' },
  { label: 'Saved Opportunities' },
  { label: 'Resume Score' },
  { label: 'Settings' }
]

function fuzzyFilter(list, query) {
  if (!query || !query.trim()) return list
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  return list.filter(item => {
    const haystack = JSON.stringify(item).toLowerCase()
    return tokens.every(token => haystack.includes(token))
  })
}

export default function App() {
  const [mode, setMode] = useState('Jobs')
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState(examplePrompts.slice(0, 4))
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('home')
  const [activeStep, setActiveStep] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), [])

  useEffect(() => {
    if (!loading) {
      setActiveStep(0)
      return
    }
    const steps = statusScripts[mode]
    const interval = setInterval(() => {
      setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 900)
    return () => clearInterval(interval)
  }, [loading, mode])

  useEffect(() => {
    if (view !== 'results') return
    if (!query.trim()) {
      setResults(mode === 'Jobs' ? jobs.slice(0, 3) : profiles.slice(0, 6))
    } else {
      handleSearch(query, { skipHistory: true, silent: true })
    }
  }, [mode])

  const handleSearch = (prompt = query, options = {}) => {
    const clean = prompt.trim()
    if (!clean) return

    setQuery(prompt)
    if (!options.silent) {
      setLoading(true)
      setResults([])
      setView('results')
    }

    const dataset = mode === 'Jobs' ? jobs : profiles
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const filtered = fuzzyFilter(dataset, clean) || []
      setResults(filtered)
      setLoading(false)
    }, 1100 + Math.random() * 700)

    if (!options.skipHistory) {
      setHistory(prev => {
        const next = [prompt, ...prev.filter(item => item !== prompt)]
        return next.slice(0, 6)
      })
    }
  }

  const handleHistorySelect = prompt => {
    setQuery(prompt)
    setView('results')
    handleSearch(prompt, { skipHistory: true })
  }

  const summary = useMemo(() => {
    if (!query.trim()) {
      return `Showing curated ${mode.toLowerCase()} for you`
    }
    const label = mode === 'Jobs' ? 'jobs' : 'profiles'
    return `${results.length} ${label} for “${query}”`
  }, [mode, query, results.length])

  return (
    <div className="nudge-shell">
      <aside className="nav-panel">
        <div className="brand-block">
          <div className="brand-mark">
            <span />
          </div>
          <div>
            <p className="brand-name">Nudge</p>
            <p className="brand-tagline">Prompt based job scout</p>
          </div>
        </div>

        <label className="sidebar-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11 4a7 7 0 015.6 11.2l3.1 3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <input placeholder="Search..." readOnly value="Remote frontend internships" />
        </label>

        <div className="history-list">
          {history.map(item => (
            <button key={item} className="history-row" onClick={() => handleHistorySelect(item)}>
              {item}
            </button>
          ))}
        </div>

        <nav className="nav-links">
          {navLinks.map(link => (
            <button key={link.label} className="nav-link">
              {link.label}
            </button>
          ))}
        </nav>

        <div className="profile-card">
          <div className="avatar-small">PS</div>
          <div>
            <p className="profile-name">Pranav Singh</p>
            <span className="profile-meta">Workspace</span>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        {view === 'home' ? (
          <section className="hero-screen">
            <div className="hero-logo">
              <div />
            </div>
            <h1>Hello! What can I help you find today?</h1>
            <div className="prompt-card">
              <div className="prompt-tabs">
                <button className="prompt-tab active">What are you looking for?</button>
                <button className="prompt-tab">Upload Resume</button>
              </div>
              <SearchBar value={query} onChange={setQuery} onSubmit={() => handleSearch()} />
              <div className="prompt-filters">
                {['Location', 'Industry', 'Title', 'Skills'].map(pill => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="results-screen">
            <div className="results-bar">
              <button className="filter-btn">Filters</button>
              <SearchBar variant="results" value={query} onChange={setQuery} onSubmit={() => handleSearch()} />
              <button className="refresh-btn" onClick={() => handleSearch(query || history[0])} aria-label="Refresh search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 12a8 8 0 10-2.3 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M20 8v4h-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mode-toggle">
              {['Jobs', 'Profiles'].map(opt => (
                <button
                  key={opt}
                  className={opt === mode ? 'active' : ''}
                  onClick={() => setMode(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="status-board">
              {loading ? (
                <Loader steps={statusScripts[mode]} activeStep={activeStep} />
              ) : (
                <div>
                  <p className="status-title">{summary}</p>
                  <p className="status-sub">Dummy data · fetching animation only</p>
                </div>
              )}
            </div>

            <div className="cards-column">
              {loading && (
                <div className="placeholder-stack">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="placeholder-card" />
                  ))}
                </div>
              )}

              {!loading && results.length === 0 && (
                <div className="empty-panel">
                  <h3>No matches yet</h3>
                  <p>Try detailing skills, city or experience to get closer to the mocks.</p>
                </div>
              )}

              {!loading && results.map(item => (
                <ResultCard key={item.id || item.title} item={item} mode={mode} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

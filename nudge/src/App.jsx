import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import { examplePrompts, jobs, profiles, trendingPrompts, aiInsights } from './data/dummyProfiles'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import Loader from './components/Loader'
import Pricing from './pages/Pricing'
import ScheduleInterview from './pages/ScheduleInterview'
import AdminDashboard from './pages/AdminDashboard'
import { analyzeQuery } from './services/gemini'

const statusScripts = {
  Jobs: [
    'Analyzing your request with Gemini...',
    'Matching roles & skills...',
    'Ranking top opportunities...'
  ],
  Profiles: [
    'Understanding talent requirements...',
    'Scanning candidate pool...',
    'Identifying best matches...'
  ]
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function LibraryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function CreditCardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}

function smartFilter(list, criteria) {
  if (!criteria) return list

  return list.map(item => {
    let score = 0
    const itemStr = JSON.stringify(item).toLowerCase()

    // Role Match (High Weight)
    if (criteria.role && itemStr.includes(criteria.role.toLowerCase())) score += 10

    // Skills Match (Medium Weight)
    if (criteria.skills && criteria.skills.length) {
      criteria.skills.forEach(skill => {
        if (itemStr.includes(skill.toLowerCase())) score += 5
      })
    }

    // Location Match (Medium Weight)
    if (criteria.location && itemStr.includes(criteria.location.toLowerCase())) score += 5

    // Experience Match (Low Weight)
    if (criteria.experience && itemStr.includes(criteria.experience.toLowerCase())) score += 3

    return { item, score }
  })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.item)
}

function shuffle(list) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildInsight({ mode, query, results, criteria }) {
  if (!results.length) return aiInsights[0]

  const top = results[0]
  const count = results.length

  let title = `Found ${count} matches`
  if (criteria) {
    if (criteria.role) title += ` for ${criteria.role}`
    if (criteria.location) title += ` in ${criteria.location}`
  }

  const bullets = [
    `Top result: ${mode === 'Jobs' ? top.title : top.name} (${mode === 'Jobs' ? top.company : top.role})`,
    `Skills matched: ${criteria?.skills?.join(', ') || 'Relevance based'}`,
    `AI Confidence: High based on your query`
  ]

  return { title, bullets }
}

function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Discover', icon: <CompassIcon />, path: '/discover' },
    { label: 'Library', icon: <LibraryIcon />, path: '/library' },
    { label: 'Pricing', icon: <CreditCardIcon />, path: '/pricing' },
    { label: 'Admin', icon: <ShieldIcon />, path: '/admin' }
  ]

  return (
    <div className="nudge-shell">
      <aside className="nav-panel">
        <div className="brand-block">
          <div className="brand-mark">N</div>
          <p className="brand-name">Nudge</p>
        </div>

        <nav className="nav-links">
          {navLinks.map(link => (
            <button
              key={link.label}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => navigate(link.path)}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        <div className="profile-card">
          <div className="avatar-small">TK</div>
          <div>
            <p className="profile-name">Tarandeep Kaur</p>
            <p className="profile-meta">Pro Plan</p>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/discover" element={<HomeView initialMode="Profiles" />} />
          <Route path="/library" element={<div className="empty-panel"><h3>Library</h3><p>Your saved items will appear here.</p></div>} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/schedule/:id" element={<ScheduleInterview />} />
        </Routes>
      </main>
    </div>
  )
}

function HomeView({ initialMode = 'Jobs' }) {
  const [mode, setMode] = useState(initialMode)
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState(examplePrompts.slice(0, 4))
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('home')
  const [activeStep, setActiveStep] = useState(0)
  const [aiSummary, setAiSummary] = useState(aiInsights[0])
  const [suggestions, setSuggestions] = useState(trendingPrompts.slice(0, 3))
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
    }, 800)
    return () => clearInterval(interval)
  }, [loading, mode])

  // Initial load
  useEffect(() => {
    if (view !== 'results') return
    if (!query.trim()) {
      setResults(mode === 'Jobs' ? jobs.slice(0, 10) : profiles.slice(0, 10))
    }
  }, [mode])

  const handleSearch = async (prompt = query, options = {}) => {
    const clean = prompt.trim()
    if (!clean) return

    setQuery(prompt)
    if (!options.silent) {
      setLoading(true)
      setResults([])
      setView('results')
    }

    const dataset = mode === 'Jobs' ? jobs : profiles

    // Call Gemini
    const criteria = await analyzeQuery(clean)

    if (timerRef.current) clearTimeout(timerRef.current)

    // Simulate a bit of delay for the "thinking" effect if API is too fast
    setTimeout(() => {
      const filtered = smartFilter(dataset, criteria)
      setResults(filtered)
      setLoading(false)
      setAiSummary(buildInsight({ mode, query: clean, results: filtered, criteria }))
      setSuggestions(trendingPrompts.filter(p => p !== clean).slice(0, 3))
    }, 1000)

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

  if (view === 'home') {
    return (
      <section className="hero-screen">
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '80px', height: '80px',
            background: 'conic-gradient(from 180deg at 50% 50%, #2dd4bf 0deg, #0f766e 180deg, #2dd4bf 360deg)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            opacity: 0.5,
            position: 'absolute',
            zIndex: 0
          }} />
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)', position: 'relative', zIndex: 1 }}>
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5l7 7" />
            <path d="M15.5 8.5l-7 7" />
          </svg>
        </div>

        <h1 style={{ fontSize: '42px', fontWeight: '600', marginBottom: '40px', textAlign: 'center' }}>
          Hello! What can I help you find today?
        </h1>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => handleSearch()}
          placeholder="eg. Remote frontend internship in tech industry using React..."
        />

        <div className="prompt-filters" style={{ marginTop: '32px' }}>
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => handleHistorySelect(s)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                padding: '8px 16px',
                borderRadius: '12px',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(255,255,255,0.08)'
                e.target.style.color = 'var(--text)'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255,255,255,0.03)'
                e.target.style.color = 'var(--muted)'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="results-screen">
      <div className="results-bar">
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
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => handleSearch()}
        variant="results"
      />

      {loading ? (
        <Loader steps={statusScripts[mode]} activeStep={activeStep} />
      ) : (
        <div className="ai-panel">
          <div className="ai-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            </svg>
            <span>AI Summary</span>
          </div>
          <h3 className="ai-title">{aiSummary.title}</h3>
          <ul className="ai-list">
            {aiSummary.bullets.map(line => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="cards-column">
        {!loading && results.map(item => (
          <ResultCard key={item.id || item.title} item={item} mode={mode} />
        ))}

        {!loading && results.length === 0 && (
          <div className="empty-panel">
            <p>No results found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  )
}

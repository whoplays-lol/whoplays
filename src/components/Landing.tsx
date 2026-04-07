import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import type { Language } from '../i18n/translations'

const valorantLogo = '/images/Valorant-LOGO.png'
const lolLogo = '/images/LeagueOfLegends-LOGO.png'
const cs2Logo = '/images/Cs2-LOGO.webp'
const fortniteLogo = '/images/Fortnite-LOGO.png'

interface LandingProps {
  onFindTeammates: () => void
}

const GAMES = [
  { name: 'Valorant',          logo: valorantLogo },
  { name: 'League of Legends', logo: lolLogo },
  { name: 'CS2',               logo: cs2Logo },
  { name: 'Fortnite',          logo: fortniteLogo },
]

const LANGUAGE_OPTIONS: { value: Language; label: string; flag: string }[] = [
  { value: 'es', label: 'Español',   flag: '🇦🇷' },
  { value: 'en', label: 'English',   flag: '🇬🇧' },
  { value: 'pt', label: 'Português', flag: '🇧🇷' },
  { value: 'zh', label: '中文',       flag: '🇨🇳' },
  { value: 'ja', label: '日本語',     flag: '🇯🇵' },
  { value: 'ru', label: 'Русский',   flag: '🇷🇺' },
  { value: 'it', label: 'Italiano',  flag: '🇮🇹' },
  { value: 'fr', label: 'Français',  flag: '🇫🇷' },
  { value: 'ko', label: '한국어',     flag: '🇰🇷' },
]

function WhoPlaysLogo() {
  const [hoveredFig, setHoveredFig] = useState<number | null>(null)

  return (
    <div className="flex items-center select-none cursor-default" style={{ height: '60px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        @keyframes pulse-fig-1 { 0%,100%{opacity:0.5;fill:#f97316} 50%{opacity:0.7;fill:#ef4444} }
        @keyframes pulse-fig-2 { 0%,100%{opacity:0.65;fill:#f97316} 50%{opacity:0.85;fill:#ef4444} }
        @keyframes pulse-fig-3 { 0%,100%{opacity:0.85;fill:#ef4444} 50%{opacity:1;fill:#f97316} }
        @keyframes pulse-fig-4 { 0%,100%{opacity:0.65;fill:#f97316} 50%{opacity:0.85;fill:#ef4444} }
        @keyframes pulse-fig-5 { 0%,100%{opacity:0.5;fill:#f97316} 50%{opacity:0.7;fill:#ef4444} }
        @keyframes neon-flicker {
          0%,95%,100%{opacity:1} 96%{opacity:0.85} 97%{opacity:1} 98%{opacity:0.9} 99%{opacity:1}
        }
        .fig-1{animation:pulse-fig-1 2.4s ease-in-out infinite 0s}
        .fig-2{animation:pulse-fig-2 2.4s ease-in-out infinite 0.4s}
        .fig-3{animation:pulse-fig-3 2.4s ease-in-out infinite 0.8s}
        .fig-4{animation:pulse-fig-4 2.4s ease-in-out infinite 1.2s}
        .fig-5{animation:pulse-fig-5 2.4s ease-in-out infinite 1.6s}
        .who-text{animation:neon-flicker 5s infinite}
      `}</style>

      <div className="logo-wrap relative" style={{ width: '220px', height: '60px' }}>
        <svg viewBox="0 0 220 60" width="220" height="60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-soft">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-strong">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="og-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316"/>
              <stop offset="100%" stopColor="#ef4444"/>
            </linearGradient>
          </defs>

          {/* Figure 1 - leftmost small */}
          <g
            className="fig-1"
            filter="url(#glow-soft)"
            onMouseEnter={() => setHoveredFig(0)}
            onMouseLeave={() => setHoveredFig(null)}
            style={hoveredFig === 0 ? { fill: '#ef4444', filter: 'drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #ef4444)', transition: 'all 0.2s' } : { transition: 'all 0.2s' }}
          >
            <circle cx="8" cy="15" r="4" />
            <path d="M4 21 Q8 18 12 21 L11 33 L8 30.5 L5 33 Z"/>
          </g>

          {/* Figure 2 */}
          <g
            className="fig-2"
            filter="url(#glow-soft)"
            onMouseEnter={() => setHoveredFig(1)}
            onMouseLeave={() => setHoveredFig(null)}
            style={hoveredFig === 1 ? { fill: '#ef4444', filter: 'drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #ef4444)', transition: 'all 0.2s' } : { transition: 'all 0.2s' }}
          >
            <circle cx="20" cy="12" r="5" />
            <path d="M15 20 Q20 16.5 25 20 L23.5 35 L20 32 L16.5 35 Z"/>
          </g>

          {/* Figure 3 - center tallest brightest */}
          <g
            className="fig-3"
            filter="url(#glow-strong)"
            onMouseEnter={() => setHoveredFig(2)}
            onMouseLeave={() => setHoveredFig(null)}
            style={hoveredFig === 2 ? { fill: '#ef4444', filter: 'drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #ef4444)', transition: 'all 0.2s' } : { transition: 'all 0.2s' }}
          >
            <circle cx="34" cy="9" r="6.5" />
            <path d="M27.5 19 Q34 14.5 40.5 19 L38.5 38 L34 34 L29.5 38 Z"/>
          </g>

          {/* Figure 4 */}
          <g
            className="fig-4"
            filter="url(#glow-soft)"
            onMouseEnter={() => setHoveredFig(3)}
            onMouseLeave={() => setHoveredFig(null)}
            style={hoveredFig === 3 ? { fill: '#ef4444', filter: 'drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #ef4444)', transition: 'all 0.2s' } : { transition: 'all 0.2s' }}
          >
            <circle cx="48" cy="12" r="5" />
            <path d="M43 20 Q48 16.5 53 20 L51.5 35 L48 32 L44.5 35 Z"/>
          </g>

          {/* Figure 5 - rightmost small */}
          <g
            className="fig-5"
            filter="url(#glow-soft)"
            onMouseEnter={() => setHoveredFig(4)}
            onMouseLeave={() => setHoveredFig(null)}
            style={hoveredFig === 4 ? { fill: '#ef4444', filter: 'drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #ef4444)', transition: 'all 0.2s' } : { transition: 'all 0.2s' }}
          >
            <circle cx="60" cy="15" r="4" />
            <path d="M56 21 Q60 18 64 21 L63 33 L60 30.5 L57 33 Z"/>
          </g>

          {/* WHO text */}
          <text
            className="who-text"
            x="70" y="35"
            fontFamily="'Fredoka One', cursive"
            fontWeight="900"
            fontSize="28"
            fill="url(#og-red)"
            filter="url(#glow-strong)"
            letterSpacing="-1"
            style={{ fontStyle: 'normal' }}
          >WHO</text>

          {/* PLAYS text - rounder feel */}
          <text
            x="72" y="54"
            fontFamily="'Trebuchet MS', 'Gill Sans', 'Century Gothic', sans-serif"
            fontWeight="700"
            fontSize="15"
            fill="white"
            letterSpacing="5"
            style={{ filter: 'drop-shadow(0 0 4px #ef4444)' }}
          >PLAYS</text>
        </svg>
      </div>
    </div>
  )
}

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [open])

  const current = LANGUAGE_OPTIONS.find(o => o.value === language)!

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="btn-secondary text-sm flex items-center gap-2"
        aria-label={t.langSwitcher.label}
        aria-expanded={open}
      >
        <span style={{ pointerEvents: 'none' }} className="text-lg leading-none">{current.flag}</span>
        <span style={{ pointerEvents: 'none' }} className="font-semibold tracking-wide text-sm">{current.label}</span>
        <svg
          style={{ pointerEvents: 'none' }}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-gray-900/90 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-sm">
          {LANGUAGE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onMouseDown={e => {
                e.preventDefault()
                setLanguage(opt.value)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                language === opt.value
                  ? 'bg-brand-500/15 text-brand-400 font-semibold'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-base leading-none">{opt.flag}</span>
              {opt.label}
              {language === opt.value && (
                <svg style={{ pointerEvents: 'none' }} className="ml-auto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Landing({ onFindTeammates }: LandingProps) {
  const { t } = useLanguage()
  const tl = t.landing

  const [queueStats, setQueueStats] = useState<Record<string, number>>({})

  const fetchStats = useCallback(() => {
    fetch('/api/matchmaking/stats')
      .then(r => r.json())
      .then(data => {
        setQueueStats(data.stats)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 10000)
    return () => clearInterval(interval)
  }, [fetchStats])

  return (
    <div className="relative min-h-screen flex flex-col">

        {/* Nav */}
        <header className="relative z-10 flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
          <WhoPlaysLogo />
          <LanguageSwitcher />
        </header>

        {/* Main — all content in one compact column */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8 gap-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            {tl.badge}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            {tl.hero.line1}
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {tl.hero.line2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-300 max-w-md leading-relaxed">
            {tl.hero.subtitle}
          </p>

          {/* CTA */}
          <button
            onClick={onFindTeammates}
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold px-8 py-3 text-base rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
          >
            {tl.hero.cta}
          </button>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="text-center">
              <div className="text-xl font-bold text-white">0s</div>
              <div className="text-xs">{tl.stats.regLabel}</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-xl font-bold text-white">100%</div>
              <div className="text-xs">{tl.stats.freeLabel}</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-xl font-bold text-white">Real-time</div>
              <div className="text-xs">{tl.stats.mmLabel}</div>
            </div>
          </div>

          {/* Live queue stats */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">{tl.searchingNow}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.entries(queueStats).map(([game, count]) =>
                count > 0 && (
                  <div key={game} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-gray-300">{game}</span>
                    <span className="text-xs text-orange-400 font-semibold">{count}</span>
                  </div>
                )
              )}
              {Object.values(queueStats).every(v => v === 0) && (
                <p className="text-xs text-gray-600">{tl.searchingFirst}</p>
              )}
            </div>
          </div>

          {/* How it works */}
          <div className="w-full max-w-2xl">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
              {tl.howItWorks.title}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {tl.howItWorks.steps.map(item => (
                <div
                  key={item.step}
                  className="bg-gray-950/90 border border-gray-800/60 border-t-2 border-t-orange-500/60 rounded-xl p-3 text-left backdrop-blur-sm"
                >
                  <div className="text-2xl font-black text-orange-500/30 mb-1">{item.step}</div>
                  <h3 className="text-xs font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="relative z-10 py-4 text-center">
          <p className="text-xs text-gray-600">{tl.footer}</p>
        </footer>
    </div>
  )
}

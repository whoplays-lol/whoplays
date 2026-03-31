import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import type { Language } from '../i18n/translations'

interface LandingProps {
  onFindTeammates: () => void
}

const GAME_BADGES = [
  { name: 'League of Legends', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  { name: 'Valorant', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  { name: 'CS2', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  { name: 'Fortnite', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { name: 'Apex Legends', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { name: 'Rocket League', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
]

const LANGUAGE_OPTIONS: { value: Language; label: string; flag: string }[] = [
  { value: 'es', label: 'Español', flag: 'ES' },
  { value: 'en', label: 'English', flag: 'EN' },
]

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on click outside — using click (not mousedown) to avoid racing with option clicks
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
        {/* pointer-events-none on SVGs so the full button area stays clickable */}
        <svg style={{ pointerEvents: 'none' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span style={{ pointerEvents: 'none' }} className="font-semibold tracking-wide">{current.flag}</span>
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
        <div className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
          {LANGUAGE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              // onMouseDown + preventDefault keeps the outside-click handler from firing
              // before this click is processed, fixing the race condition
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
              <span className="text-xs font-bold text-gray-500 w-5">{opt.flag}</span>
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

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-brand-700/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">WannaFill</span>
        </div>

        <LanguageSwitcher />
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-500 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          {tl.badge}
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
          {tl.hero.line1}
          <br />
          <span className="bg-gradient-to-r from-brand-500 to-purple-400 bg-clip-text text-transparent">
            {tl.hero.line2}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-4 leading-relaxed">
          {tl.hero.subtitle}
        </p>
        <p className="text-base text-gray-500 max-w-lg mb-12">
          {tl.hero.description}
        </p>

        <button
          onClick={onFindTeammates}
          className="btn-primary text-lg px-10 py-4 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-shadow"
        >
          {tl.hero.cta}
        </button>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-12 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">0s</div>
            <div>{tl.stats.regLabel}</div>
          </div>
          <div className="w-px h-10 bg-gray-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100%</div>
            <div>{tl.stats.freeLabel}</div>
          </div>
          <div className="w-px h-10 bg-gray-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Real-time</div>
            <div>{tl.stats.mmLabel}</div>
          </div>
        </div>

        {/* Game badges */}
        <div className="mt-16">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-widest mb-4">
            {tl.gamesTitle}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {GAME_BADGES.map(game => (
              <span
                key={game.name}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${game.color}`}
              >
                {game.name}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* How it works */}
      <section className="relative z-10 max-w-4xl mx-auto w-full px-6 pb-20">
        <h2 className="text-center text-2xl font-bold text-white mb-10">
          {tl.howItWorks.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tl.howItWorks.steps.map(item => (
            <div key={item.step} className="card flex flex-col gap-3">
              <div className="text-4xl font-extrabold text-gray-800">{item.step}</div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-900 py-6 text-center">
        <p className="text-sm text-gray-600">{tl.footer}</p>
      </footer>
    </div>
  )
}

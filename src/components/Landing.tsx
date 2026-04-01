import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import type { Language } from '../i18n/translations'
import logoImg from '../../assets/images/logo.png'
import valorantLogo from '../../assets/images/Valorant-LOGO.png'
import lolLogo from '../../assets/images/LeagueOfLegends-LOGO.png'
import cs2Logo from '../../assets/images/Cs2-LOGO.webp'
import fortniteLogo from '../../assets/images/Fortnite-LOGO.png'

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
  { value: 'es', label: 'Español', flag: 'ES' },
  { value: 'en', label: 'English', flag: 'EN' },
]

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
        <div className="absolute right-0 mt-2 w-36 bg-gray-900/90 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-sm">
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
    <div className="relative min-h-screen flex flex-col">

        {/* Nav */}
        <header className="relative z-10 flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
          <img src={logoImg} alt="WhoPlays" className="h-14 w-auto" />
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

          {/* Games */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              {tl.gamesTitle}
            </p>
            <div className="flex gap-4 flex-wrap justify-center items-center">
              {GAMES.map(game => (
                <div
                  key={game.name}
                  className="p-2 rounded-xl border border-white/15 bg-white/5 hover:border-orange-500/40 hover:bg-white/10 transition-all"
                >
                  <img
                    src={game.logo}
                    alt={game.name}
                    className="h-10 w-10 object-contain"
                  />
                </div>
              ))}
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

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import translations, { type Language, type Translations } from '../i18n/translations'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const SUPPORTED: Language[] = ['es', 'en', 'pt', 'zh', 'ja', 'ru', 'it', 'fr', 'ko']

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('wf_lang') as Language | null
  if (stored && SUPPORTED.includes(stored)) return stored
  const browser = navigator.language.toLowerCase()
  return SUPPORTED.find(l => browser.startsWith(l)) ?? 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('wf_lang', lang)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}

import { useMemo } from 'react'

function generateAlias(): string {
  const adjectives = ['Swift', 'Brave', 'Fierce', 'Neon', 'Shadow', 'Thunder', 'Iron', 'Golden', 'Frost', 'Blaze']
  const nouns = ['Wolf', 'Eagle', 'Dragon', 'Phoenix', 'Titan', 'Viper', 'Hawk', 'Ghost', 'Storm', 'Nova']
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const num = Math.floor(Math.random() * 999)
  return `${adj}${noun}${num}`
}

function generateSessionId(): string {
  return crypto.randomUUID()
}

export function useSession() {
  const sessionId = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const stored = sessionStorage.getItem('wf_session_id')
    if (stored) return stored
    const id = generateSessionId()
    sessionStorage.setItem('wf_session_id', id)
    return id
  }, [])

  const defaultAlias = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const stored = sessionStorage.getItem('wf_alias')
    if (stored) return stored
    const alias = generateAlias()
    sessionStorage.setItem('wf_alias', alias)
    return alias
  }, [])

  return { sessionId, defaultAlias }
}

import { useEffect, useRef, useState, useCallback } from 'react'
import { matchmakingApi } from '../services/api'
import { ensureConnected, getConnection } from '../services/signalr'
import { useLanguage } from '../contexts/LanguageContext'
import type { MessageDto } from '../types'

interface ChatProps {
  matchGroupId: string
  sessionId: string
  alias: string
  onPlayerLeft?: () => void
}

function formatTime(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
}

export default function Chat({ matchGroupId, sessionId, alias, onPlayerLeft }: ChatProps) {
  const { t, language } = useLanguage()
  const tc = t.chat
  const locale = language === 'es' ? 'es-AR' : 'en-US'

  const [messages, setMessages] = useState<MessageDto[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playerLeftMsg, setPlayerLeftMsg] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const onPlayerLeftRef = useRef(onPlayerLeft)
  useEffect(() => { onPlayerLeftRef.current = onPlayerLeft }, [onPlayerLeft])

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Load messages and setup SignalR
  useEffect(() => {
    let cleanedUp = false

    const init = async () => {
      try {
        const existing = await matchmakingApi.getMessages(matchGroupId)
        if (!cleanedUp) {
          setMessages(existing)
          setLoading(false)
        }
      } catch {
        if (!cleanedUp) setLoading(false)
      }

      try {
        const conn = await ensureConnected()
        if (!cleanedUp) {
          conn.on('ParticipantLeft', (leftAlias: string) => {
            setPlayerLeftMsg(leftAlias)
            setTimeout(() => {
              onPlayerLeftRef.current?.()
            }, 3000)
          })
          conn.on('NewMessage', (message: MessageDto) => {
            setMessages(prev => {
              if (prev.some(m => m.id === message.id)) return prev
              if (message.alias !== alias) {
                new Audio('/sounds/msg-in.mp3').play().catch(() => {})
              }
              return [...prev, message]
            })
          })
          await conn.invoke('JoinMatchGroup', matchGroupId)
        }
      } catch (err) {
        console.warn('SignalR chat setup failed', err)
      }
    }

    init()

    return () => {
      cleanedUp = true
      try {
        const conn = getConnection()
        conn.off('ParticipantLeft')
        conn.off('NewMessage')
      } catch {
        // ignore
      }
    }
  }, [matchGroupId])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = async () => {
    const content = input.trim()
    if (!content || sending) return

    setSending(true)
    setError(null)
    setInput('')

    try {
      const sent = await matchmakingApi.sendMessage(matchGroupId, sessionId, content)
      setMessages(prev => {
        if (prev.some(m => m.id === sent.id)) return prev
        return [...prev, sent]
      })
      new Audio('/sounds/msg-out.mp3').play().catch(() => {})
    } catch {
      setError(tc.sendError)
      setInput(content)
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="card flex flex-col h-96">
      {/* Chat header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h3 className="text-sm font-semibold text-white">{tc.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-gray-500">{tc.live}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm gap-2">
            <span className="w-4 h-4 border-2 border-gray-700 border-t-orange-500 rounded-full animate-spin" />
            {tc.loading}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-sm">{tc.empty}</p>
          </div>
        ) : (
          messages.map(msg => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMe={msg.alias === alias}
              locale={locale}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Player left toast */}
      {playerLeftMsg && (
        <div className="mx-1 mb-3 px-4 py-3 rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-sm text-center shrink-0">
          ⚠️ <strong>{playerLeftMsg}</strong> abandonó el lobby. Volviendo a buscar equipo...
        </div>
      )}

      {/* Error */}
      {error && <div className="text-red-400 text-xs px-1 mt-1 shrink-0">{error}</div>}

      {/* Input */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-800 mt-4 shrink-0">
        <input
          ref={inputRef}
          type="text"
          className="form-input flex-1 py-2.5 text-sm"
          placeholder={tc.placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
          maxLength={500}
          autoComplete="off"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || sending}
          className="btn-primary py-2.5 px-4 flex items-center gap-1.5 text-sm shrink-0"
        >
          {sending ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
          {tc.send}
        </button>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  isMe,
  locale,
}: {
  message: MessageDto
  isMe: boolean
  locale: string
}) {
  return (
    <div className={`flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
      {!isMe && (
        <span className="text-xs text-gray-500 px-1 font-medium">{message.alias}</span>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isMe
            ? 'bg-orange-500 text-white rounded-tr-sm'
            : 'bg-gray-800/80 text-gray-100 rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
      <span className="text-xs text-gray-600 px-1">{formatTime(message.sentAt, locale)}</span>
    </div>
  )
}

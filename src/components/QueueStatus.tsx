import { useEffect, useRef, useState, useCallback } from 'react'
import { matchmakingApi } from '../services/api'
import { ensureConnected, getConnection } from '../services/signalr'
import { useLanguage } from '../contexts/LanguageContext'
import type { MatchGroupDto, QueueRequestDto } from '../types'

interface QueueStatusProps {
  queueRequest: QueueRequestDto
  onMatchFound: (match: MatchGroupDto) => void
  onCancel: () => void
}

function useElapsedTime(since: string) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = new Date(since).getTime()
    const tick = () => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [since])

  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

export default function QueueStatus({ queueRequest, onMatchFound, onCancel }: QueueStatusProps) {
  const elapsed = useElapsedTime(queueRequest.createdAt)
  const { t } = useLanguage()
  const tq = t.queue
  const [cancelling, setCancelling] = useState(false)
  const [cancelError, setCancelError] = useState<string | null>(null)
  const matchFoundRef = useRef(false)

  const handleMatchFound = useCallback(
    async (matchGroupId: string) => {
      if (matchFoundRef.current) return
      matchFoundRef.current = true
      try {
        const match = await matchmakingApi.getMatch(matchGroupId)
        onMatchFound(match)
      } catch {
        matchFoundRef.current = false
      }
    },
    [onMatchFound]
  )

  // SignalR setup + polling fallback
  useEffect(() => {
    let cleanedUp = false
    let pollInterval: ReturnType<typeof setInterval> | null = null

    const setup = async () => {
      try {
        const conn = await ensureConnected()

        if (!cleanedUp) {
          conn.on('MatchFound', (matchGroupId: string) => {
            handleMatchFound(matchGroupId)
          })
          await conn.invoke('JoinQueueGroup', queueRequest.id)
        }
      } catch (err) {
        console.warn('SignalR setup failed, relying on polling', err)
      }

      // Polling fallback every 3 seconds
      pollInterval = setInterval(async () => {
        if (matchFoundRef.current || cleanedUp) return
        try {
          const updated = await matchmakingApi.getQueueRequest(queueRequest.id)
          if (updated.status === 'Matched' && updated.matchGroupId) {
            handleMatchFound(updated.matchGroupId)
          } else if (updated.status === 'Cancelled') {
            onCancel()
          }
        } catch {
          // ignore poll errors
        }
      }, 3000)
    }

    setup()

    return () => {
      cleanedUp = true
      if (pollInterval) clearInterval(pollInterval)
      try {
        const conn = getConnection()
        conn.off('MatchFound')
      } catch {
        // ignore
      }
    }
  }, [queueRequest.id, handleMatchFound, onCancel])

  const handleCancel = async () => {
    setCancelling(true)
    setCancelError(null)
    try {
      await matchmakingApi.cancel(queueRequest.id, queueRequest.sessionId)
      onCancel()
    } catch {
      setCancelError(tq.cancelError)
      setCancelling(false)
    }
  }

  const playersNeeded = queueRequest.playersNeeded

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Animated background pulse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-gray-800 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-500 animate-spin" />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{tq.title}</h1>
          <p className="text-gray-500 mt-1 text-sm">{tq.subtitle(playersNeeded)}</p>
        </div>

        {/* Elapsed time */}
        <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-5 py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-sm text-gray-400 font-mono">{elapsed}</span>
          <span className="text-xs text-gray-600">{tq.elapsed}</span>
        </div>

        {/* Queue details card */}
        <div className="card w-full">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            {tq.details}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <DetailItem label={tq.labels.game} value={queueRequest.gameName} />
            <DetailItem label={tq.labels.server} value={queueRequest.server} />
            <DetailItem label={tq.labels.mode} value={queueRequest.mode} />
            {queueRequest.teamFormat && (
              <DetailItem label={tq.labels.format} value={queueRequest.teamFormat} />
            )}
            {queueRequest.rank && (
              <DetailItem label={tq.labels.rank} value={queueRequest.rank} />
            )}
            <DetailItem
              label={tq.labels.myGroup}
              value={`${queueRequest.currentGroupSize} / ${queueRequest.totalRequired}`}
            />
            <DetailItem
              label={tq.labels.seeking}
              value={tq.seekingValue(playersNeeded)}
              highlight
            />
          </div>
        </div>

        {/* Waiting dots animation */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-brand-500/60"
              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>

        {/* Cancel error */}
        {cancelError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 w-full text-center">
            {cancelError}
          </div>
        )}

        {/* Cancel button */}
        <button
          onClick={handleCancel}
          disabled={cancelling}
          className="btn-secondary flex items-center gap-2"
        >
          {cancelling ? (
            <>
              <span className="w-4 h-4 border-2 border-gray-500 border-t-gray-300 rounded-full animate-spin" />
              {tq.cancelling}
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              {tq.cancel}
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function DetailItem({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-3">
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className={`text-sm font-semibold ${highlight ? 'text-brand-400' : 'text-white'}`}>
        {value}
      </div>
    </div>
  )
}

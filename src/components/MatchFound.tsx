import { useEffect, useState } from 'react'
import Chat from './Chat'
import { useLanguage } from '../contexts/LanguageContext'
import { ensureConnected } from '../services/signalr'
import type { MatchGroupDto, ParticipantDto } from '../types'
import matchSound from '../../assets/sounds/team-found-notification.wav'

interface MatchFoundProps {
  matchGroup: MatchGroupDto
  mySessionId: string
  myAlias: string
  onLeave: () => void
}

export default function MatchFound({ matchGroup, mySessionId, myAlias, onLeave }: MatchFoundProps) {
  const { t } = useLanguage()
  const tm = t.match
  const [showCelebration, setShowCelebration] = useState(true)

  const handleLeave = async () => {
    try {
      const conn = await ensureConnected()
      await conn.invoke('LeaveMatch', matchGroup.id, myAlias)
    } catch {
      // ignore — leave anyway
    }
    onLeave()
  }

  useEffect(() => {
    // Play notification sound when match is found
    const audio = new Audio(matchSound)
    audio.play().catch(() => {
      // Browsers may block autoplay if there was no prior user interaction — silent fail
    })

    const timer = setTimeout(() => setShowCelebration(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Celebration banner */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-celebration bg-orange-500/20 border border-orange-500/40 backdrop-blur-md rounded-2xl px-10 py-8 text-center shadow-2xl">
            <div className="text-5xl font-extrabold text-white mb-2">{tm.celebration}</div>
            <div className="text-orange-400 text-lg">{tm.celebrationSub}</div>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
              <h1 className="text-2xl font-bold text-white">{tm.title}</h1>
            </div>
            <p className="text-gray-500 text-sm">
              {matchGroup.gameName} — {matchGroup.server} — {matchGroup.mode}
              {matchGroup.teamFormat ? ` — ${matchGroup.teamFormat}` : ''}
              {matchGroup.rank ? ` — ${matchGroup.rank}` : ''}
            </p>
          </div>
          <button onClick={handleLeave} className="btn-secondary text-sm">
            {tm.leave}
          </button>
        </div>

        {/* Match details */}
        <div className="card">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            {tm.matchInfo}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <InfoBadge label={tm.labels.game} value={matchGroup.gameName} />
            <InfoBadge label={tm.labels.server} value={matchGroup.server} />
            <InfoBadge label={tm.labels.mode} value={matchGroup.mode} />
            <InfoBadge label={tm.labels.players} value={String(matchGroup.totalPlayers)} />
          </div>

          {/* Participants */}
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
            {tm.participants}
          </h3>
          <div className="flex flex-col gap-2">
            {matchGroup.participants.map((p, idx) => (
              <ParticipantRow
                key={p.sessionId || idx}
                participant={p}
                isMe={p.sessionId === mySessionId}
                totalRequired={matchGroup.totalPlayers}
                youLabel={tm.you}
                groupLabel={tm.group}
                groupOfFn={tm.groupOf}
              />
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 min-h-0">
          <Chat matchGroupId={matchGroup.id} sessionId={mySessionId} alias={myAlias} onPlayerLeft={onLeave} />
        </div>
      </div>

      <style>{`
        @keyframes celebration {
          0% { opacity: 0; transform: scale(0.8) translateY(-20px); }
          20% { opacity: 1; transform: scale(1.05) translateY(0); }
          80% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.95) translateY(-10px); }
        }
        .animate-celebration {
          animation: celebration 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
}

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-800/60 rounded-xl p-3">
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  )
}

function ParticipantRow({
  participant,
  isMe,
  totalRequired,
  youLabel,
  groupLabel,
  groupOfFn,
}: {
  participant: ParticipantDto
  isMe: boolean
  totalRequired: number
  youLabel: string
  groupLabel: string
  groupOfFn: (n: number) => string
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 border transition-colors ${
        isMe ? 'bg-orange-500/10 border-orange-500/30' : 'bg-gray-800/40 border-gray-700/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
            isMe ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-700 text-gray-300'
          }`}
        >
          {participant.alias.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${isMe ? 'text-orange-300' : 'text-white'}`}>
              {participant.alias}
            </span>
            {isMe && (
              <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded-md font-medium">
                {youLabel}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-400">
          {groupLabel}{' '}
          <span className="text-white font-medium">{participant.currentGroupSize}</span>
        </div>
        <div className="text-xs text-gray-600">{groupOfFn(totalRequired)}</div>
      </div>
    </div>
  )
}

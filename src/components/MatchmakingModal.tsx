import { useState, useCallback, useEffect } from 'react'
import { gamesApi, matchmakingApi } from '../services/api'
import { useSession } from '../hooks/useSession'
import type { GameDefinition, QueueRequestDto } from '../types'

interface MatchmakingModalProps {
  onClose: () => void
  onEnqueued: (req: QueueRequestDto) => void
}

const DESCRIPTION_EXAMPLES: Record<string, string> = {
  'League of Legends': 'Support main Gold, juego flex de noche, busco ADC paciente',
  'Valorant': 'Duelist Platino, busco IGL o Sentinel para ranked, LATAM',
  'CS2': 'Rifler nivel 10 Faceit, busco entry o AWPer para stack',
  'Fortnite': 'Construyo bien, busco squad para torneos, juego tarde',
  'Apex Legends': 'Pathfinder main Diamond, busco squad coordinado',
  'Rocket League': 'Champ 1 en 2v2, busco duo rankear a GC',
  'Dota 2': 'Mid/Carry Ancient, busco stack para Divine',
  'Overwatch 2': 'Tank main Gold, busco DPS y Support para comp',
  'Rainbow Six Siege': 'Attacker main Platinum, busco equipo organizado',
  'EA FC 25': 'Division 3 FUT, busco Pro Clubs para ligas',
  default: 'Describite: tu rol, nivel, horario y qué buscás en un compañero...',
}

export default function MatchmakingModal({ onClose, onEnqueued }: MatchmakingModalProps) {
  const { sessionId, defaultAlias } = useSession()

  const [alias, setAlias] = useState(defaultAlias || '')
  const [games, setGames] = useState<GameDefinition[]>([])
  const [selectedGameId, setSelectedGameId] = useState<string>('')
  const [selectedServer, setSelectedServer] = useState<string>('')
  const [descripcion, setDescripcion] = useState('')
  const [groupSize, setGroupSize] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedGame = games.find(g => String(g.id) === selectedGameId)
  const placeholder = selectedGame
    ? DESCRIPTION_EXAMPLES[selectedGame.name] || DESCRIPTION_EXAMPLES.default
    : DESCRIPTION_EXAMPLES.default

  useEffect(() => {
    gamesApi.getAll().then(setGames).catch(() => {})
  }, [])

  // Reset server when game changes
  useEffect(() => {
    setSelectedServer('')
  }, [selectedGameId])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  const handleSubmit = async () => {
    if (alias.trim().length < 2) {
      setError('Tu alias debe tener al menos 2 caracteres.')
      return
    }
    if (!selectedGameId) {
      setError('Seleccioná un juego.')
      return
    }
    if (!selectedServer) {
      setError('Seleccioná un servidor.')
      return
    }
    if (descripcion.trim().length < 10) {
      setError('Describite un poco más para encontrar el mejor match.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const result = await matchmakingApi.enqueue({
        alias: alias.trim(),
        sessionId,
        gameId: Number(selectedGameId),
        server: selectedServer,
        mode: 'Semantic',
        currentGroupSize: groupSize,
        descripcion: descripcion.trim(),
      })
      onEnqueued(result)
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Error al buscar. Intentá de nuevo.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-950/95 border border-orange-800/30 rounded-2xl w-full max-w-lg
                      shadow-2xl shadow-orange-900/20 backdrop-blur-md">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/60">
          <div>
            <h2 className="text-xl font-bold text-white">Find your match</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              La IA encuentra tu compañero ideal
            </p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl
                       bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">

          {/* Alias */}
          <div>
            <label className="label">Tu nombre en el juego</label>
            <input
              className="form-input"
              placeholder="Ej: SwiftWolf123"
              value={alias}
              onChange={e => setAlias(e.target.value)}
              maxLength={32}
              autoComplete="off"
            />
          </div>

          {/* Juego + Servidor en la misma fila */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Juego</label>
              <select
                className="form-select"
                value={selectedGameId}
                onChange={e => setSelectedGameId(e.target.value)}
              >
                <option value="">Seleccioná</option>
                {games.map(g => (
                  <option key={g.id} value={String(g.id)}>{g.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Servidor</label>
              <select
                className="form-select"
                value={selectedServer}
                onChange={e => setSelectedServer(e.target.value)}
                disabled={!selectedGame}
              >
                <option value="">
                  {selectedGame ? 'Seleccioná' : '— elegí juego'}
                </option>
                {selectedGame?.servers.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción libre */}
          <div>
            <label className="label">
              Describite y contá qué buscás
            </label>
            <textarea
              className="form-input resize-none"
              style={{ minHeight: '100px' }}
              placeholder={placeholder}
              value={descripcion}
              onChange={e => setDescripcion(e.target.value.slice(0, 300))}
              autoComplete="off"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-600">
                Rol, cuántos son / cuántos buscan, división
              </p>
              <p className={`text-xs ${descripcion.length >= 280 ? 'text-orange-400' : 'text-gray-600'}`}>
                {descripcion.length}/300
              </p>
            </div>
          </div>

          {/* Group size */}
          <div>
            <label className="label">¿Cuántos son en tu grupo?</label>
            <div className="mt-3 bg-gray-800/60 border border-gray-700/50 rounded-xl p-3 flex items-center justify-between">
              <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setGroupSize(i + 1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                      i < groupSize
                        ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                        : 'bg-gray-700/40 border-gray-700 text-gray-600'
                    }`}
                  >
                    {i < groupSize ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {groupSize} / 5 — Buscando {5 - groupSize} jugadores
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400
                            text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="btn-secondary flex-1" disabled={submitting}>
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !selectedGameId || !selectedServer || descripcion.trim().length < 10}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50
                         disabled:cursor-not-allowed text-white font-semibold px-6 py-3
                         rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white
                                   rounded-full animate-spin" />
                  Buscando...
                </>
              ) : 'Find teammates ✨'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

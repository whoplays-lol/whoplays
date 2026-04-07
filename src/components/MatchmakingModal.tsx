import { useState, useCallback, useEffect } from 'react'
import { gamesApi, matchmakingApi } from '../services/api'
import { useSession } from '../hooks/useSession'
import { useLanguage } from '../contexts/LanguageContext'
import type { GameDefinition, QueueRequestDto } from '../types'

interface MatchmakingModalProps {
  onClose: () => void
  onEnqueued: (req: QueueRequestDto) => void
}

const DESCRIPTION_EXAMPLES: Record<string, string> = {
  'League of Legends': 'Support main, busco ADC en ORO, juego en las noches',
  'Valorant': 'Duelist Platino, busco IGL o Sentinel para ranked',
  'CS2': 'Rifler nivel 10 Faceit, busco entry o AWPer para stack',
  'Fortnite': 'Construyo bien, busco squad para torneos, juego tarde',
  'Apex Legends': 'Pathfinder main Diamond, busco squad coordinado',
  'Rocket League': 'Champ 1 en 2v2, busco duo rankear a GC',
  'Dota 2': 'Mid/Carry Ancient, busco stack para Divine',
  'Overwatch 2': 'Tank main Gold, busco DPS y Support para comp',
  'Rainbow Six Siege': 'Attacker main Platinum, busco equipo organizado',
  default: 'Describite: tu rol, nivel, horario y qué buscás en un compañero...',
}

export default function MatchmakingModal({ onClose, onEnqueued }: MatchmakingModalProps) {
  const { sessionId, defaultAlias } = useSession()
  const { t } = useLanguage()

  const [alias, setAlias] = useState(defaultAlias || '')
  const [games, setGames] = useState<GameDefinition[]>([])
  const [selectedGameId, setSelectedGameId] = useState<string>('')
  const [selectedServer, setSelectedServer] = useState<string>('')
  const [descripcion, setDescripcion] = useState('')
  const [groupSize, setGroupSize] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [mode, setMode] = useState<'ia' | 'manual'>('ia')
  const [manualMode, setManualMode] = useState('')
  const [manualRank, setManualRank] = useState('')
  const [manualTeamFormat, setManualTeamFormat] = useState('')

  const selectedGame = games.find(g => String(g.id) === selectedGameId)
  const placeholder = selectedGame
    ? DESCRIPTION_EXAMPLES[selectedGame.name] || DESCRIPTION_EXAMPLES.default
    : DESCRIPTION_EXAMPLES.default

  const selectedModeObj = selectedGame?.modes.find(m => m.key === manualMode)
  const isFortnite = selectedGame?.teamFormats != null
  const rankRequired = selectedModeObj?.rankRequired === true && !isFortnite

  const maxSlots = (() => {
    if (mode === 'ia') return 5
    if (!selectedGame || !manualMode) return 5
    const modeDef = selectedGame.modes.find(m => m.key === manualMode)
    if (!modeDef) return 5
    if (modeDef.teamSize > 0) return modeDef.teamSize
    // teamSize === 0 means depends on teamFormat (Fortnite)
    if (manualTeamFormat && selectedGame.teamFormats) {
      const fmt = selectedGame.teamFormats.find(f => f.key === manualTeamFormat)
      if (fmt) return fmt.teamSize
    }
    return 5
  })()

  useEffect(() => {
    gamesApi.getAll().then(setGames).catch(() => {})
  }, [])

  // Reset server when game changes
  useEffect(() => {
    setSelectedServer('')
    setManualMode('')
    setManualRank('')
    setManualTeamFormat('')
  }, [selectedGameId])

  // Reset rank and team format when manual mode changes
  useEffect(() => {
    setManualRank('')
    setManualTeamFormat('')
  }, [manualMode])

  // Clamp groupSize to maxSlots - 1 when maxSlots changes (always need 1 open slot)
  useEffect(() => {
    setGroupSize(g => Math.min(g, maxSlots - 1))
  }, [maxSlots])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  const handleSubmit = async () => {
    if (alias.trim().length < 2) {
      setError(t.modal.validation.aliasMin)
      return
    }
    if (!selectedGameId) {
      setError(t.modal.validation.gameRequired)
      return
    }
    if (!selectedServer) {
      setError(t.modal.validation.serverRequired)
      return
    }

    if (mode === 'ia') {
      if (descripcion.trim().length < 10) {
        setError(t.modal.descriptionMin)
        return
      }
    } else {
      if (!manualMode) {
        setError(t.modal.validation.modeRequired)
        return
      }
      if (rankRequired && !manualRank) {
        setError(t.modal.validation.rankRequired)
        return
      }
      if (isFortnite && !manualTeamFormat) {
        setError(t.modal.validation.teamFormatRequired)
        return
      }
    }

    setSubmitting(true)
    setError(null)

    try {
      if (mode === 'manual') {
        const result = await matchmakingApi.enqueue({
          alias: alias.trim(),
          sessionId,
          gameId: Number(selectedGameId),
          server: selectedServer,
          mode: manualMode,
          teamFormat: manualTeamFormat || undefined,
          rank: manualRank || undefined,
          currentGroupSize: groupSize,
        })
        onEnqueued(result)
      } else {
        const parseResult = await matchmakingApi.parseDescription(descripcion.trim(), Number(selectedGameId))
        if (!parseResult.isValid) {
          setError(parseResult.warnings.join(' · '))
          setSubmitting(false)
          return
        }
        const result = await matchmakingApi.enqueue({
          alias: alias.trim(),
          sessionId,
          gameId: Number(selectedGameId),
          server: selectedServer,
          mode: 'Semantic',
          currentGroupSize: parseResult.profile?.tamañoGrupoActual ?? 1,
          descripcion: descripcion.trim(),
          perfilParseado: parseResult.profile,
        })
        onEnqueued(result)
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        t.modal.submitError
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
            <h2 className="text-xl font-bold text-white">{t.modal.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {t.modal.subtitle}
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
            <label className="label">{t.modal.fields.alias}</label>
            <input
              className="form-input"
              placeholder={t.modal.fields.aliasPlaceholder}
              value={alias}
              onChange={e => setAlias(e.target.value)}
              maxLength={32}
              autoComplete="off"
            />
          </div>

          {/* Juego + Servidor en la misma fila */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">{t.modal.fields.game}</label>
              <select
                className="form-select"
                value={selectedGameId}
                onChange={e => setSelectedGameId(e.target.value)}
              >
                <option value="">{t.modal.fields.gamePlaceholder}</option>
                {games.map(g => (
                  <option key={g.id} value={String(g.id)}>{g.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">{t.modal.fields.server}</label>
              <select
                className="form-select"
                value={selectedServer}
                onChange={e => setSelectedServer(e.target.value)}
                disabled={!selectedGame}
              >
                <option value="">
                  {selectedGame ? t.modal.fields.serverPlaceholder : t.modal.fields.gamePlaceholder}
                </option>
                {selectedGame?.servers.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción libre / Manual */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="label mb-0">{t.modal.descLabel}</label>
              <div className="flex gap-1">
                {(['ia', 'manual'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full border transition-colors ${
                      mode === m
                        ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                        : 'bg-gray-800 border-transparent text-gray-500 hover:text-gray-400'
                    }`}
                  >
                    {m === 'ia' ? t.modal.inputModeIA : t.modal.inputModeManual}
                  </button>
                ))}
              </div>
            </div>

            {mode === 'ia' ? (
              <>
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
                    {t.modal.descHint}
                  </p>
                  <p className={`text-xs ${descripcion.length >= 280 ? 'text-orange-400' : 'text-gray-600'}`}>
                    {descripcion.length}/300
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-1">
                {/* MODO */}
                {selectedGame && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wide">{t.modal.modoLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedGame.modes.map(m => (
                        <button
                          key={m.key}
                          type="button"
                          onClick={() => setManualMode(m.key)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
                            manualMode === m.key
                              ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                              : 'bg-gray-800/60 border-gray-700 text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* RANGO */}
                {rankRequired && selectedGame?.ranks && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wide">{t.modal.rangoLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedGame.name === 'CS2'
                        ? manualMode === 'Premier'
                          ? selectedGame.ranks.filter(r => r.startsWith('Premier:'))
                          : selectedGame.ranks.filter(r => !r.startsWith('Premier:'))
                        : selectedGame.ranks
                      ).map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setManualRank(r)}
                          className={`px-2.5 py-1 font-medium rounded-lg border transition-colors ${
                            selectedGame.name === 'CS2' ? 'text-[10px]' : 'text-xs'
                          } ${
                            manualRank === r
                              ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                              : 'bg-gray-800/60 border-gray-700 text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TEAM FORMAT (Fortnite) */}
                {isFortnite && manualMode && selectedGame?.teamFormats && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wide">{t.modal.formatoLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedGame.teamFormats.map(tf => (
                        <button
                          key={tf.key}
                          type="button"
                          onClick={() => setManualTeamFormat(tf.key)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
                            manualTeamFormat === tf.key
                              ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                              : 'bg-gray-800/60 border-gray-700 text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {tf.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!selectedGame && (
                  <p className="text-xs text-gray-600">{t.modal.fields.gamePlaceholder}</p>
                )}
              </div>
            )}
          </div>

          {/* Group size — only shown in manual mode; IA mode infers it from description */}
          {mode === 'manual' && <div>
            <label className="label">{t.modal.groupSizeLabel}</label>
            {maxSlots === 1 ? (
              <div className="mt-3 bg-gray-800/60 border border-gray-700/50 rounded-xl p-3 flex items-center justify-between opacity-60">
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border bg-brand-500/20 border-brand-500/50 text-brand-400"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-gray-500">{t.modal.modoIndividual}</span>
              </div>
            ) : (
              <div className="mt-3 bg-gray-800/60 border border-gray-700/50 rounded-xl p-3 flex items-center justify-between">
                <div className="flex gap-2">
                  {Array.from({ length: maxSlots }, (_, i) => {
                    const isLast = i === maxSlots - 1
                    const filled = i < groupSize
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={isLast ? undefined : () => setGroupSize(i + 1)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                          isLast
                            ? 'bg-gray-700/40 border-gray-700 text-gray-600 opacity-40 cursor-not-allowed'
                            : filled
                              ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                              : 'bg-gray-700/40 border-gray-700 text-gray-600'
                        }`}
                      >
                        {filled && !isLast ? (
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
                    )
                  })}
                </div>
                <span className="text-xs text-gray-500">
                  {groupSize} / {maxSlots} — {t.modal.seekingPlayers(maxSlots - groupSize)}
                </span>
              </div>
            )}
          </div>}

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
              {t.modal.cancel}
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                submitting ||
                !selectedGameId ||
                !selectedServer ||
                (mode === 'ia'
                  ? descripcion.trim().length < 10
                  : !manualMode ||
                    (rankRequired && !manualRank) ||
                    (isFortnite && !manualTeamFormat))
              }
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50
                         disabled:cursor-not-allowed text-white font-semibold px-6 py-3
                         rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white
                                   rounded-full animate-spin" />
                  {t.modal.submitting}
                </>
              ) : mode === 'manual' ? t.modal.buscarCompañeros : t.modal.findTeammatesIA}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

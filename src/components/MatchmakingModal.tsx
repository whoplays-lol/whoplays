import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { gamesApi, matchmakingApi } from '../services/api'
import { useSession } from '../hooks/useSession'
import { useLanguage } from '../contexts/LanguageContext'
import type { GameDefinition, QueueRequestDto, ModeDefinition, TeamFormatDefinition } from '../types'

interface MatchmakingModalProps {
  onClose: () => void
  onEnqueued: (req: QueueRequestDto) => void
}

interface FormValues {
  alias: string
  gameId: string
  server: string
  mode: string
  teamFormat: string
  rank: string
  currentGroupSize: number
}

function computeTeamSize(
  mode: ModeDefinition | undefined,
  teamFormat: TeamFormatDefinition | undefined
): number {
  if (!mode) return 1
  if (mode.teamSize === 0 && teamFormat) return teamFormat.teamSize
  return mode.teamSize || 1
}

export default function MatchmakingModal({ onClose, onEnqueued }: MatchmakingModalProps) {
  const { sessionId, defaultAlias } = useSession()
  const { t } = useLanguage()
  const tm = t.modal

  const [games, setGames] = useState<GameDefinition[]>([])
  const [loadingGames, setLoadingGames] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      alias: defaultAlias,
      gameId: '',
      server: '',
      mode: '',
      teamFormat: '',
      rank: '',
      currentGroupSize: 1,
    },
  })

  const watchGameId = watch('gameId')
  const watchMode = watch('mode')
  const watchTeamFormat = watch('teamFormat')
  const watchGroupSize = watch('currentGroupSize')

  const selectedGame = games.find(g => String(g.id) === watchGameId)
  const selectedMode = selectedGame?.modes.find(m => m.key === watchMode)
  const selectedTeamFormat = selectedGame?.teamFormats?.find(f => f.key === watchTeamFormat)
  const teamSize = computeTeamSize(selectedMode, selectedTeamFormat)
  const needsTeamFormat =
    selectedGame?.teamFormats && selectedGame.teamFormats.length > 0 && selectedMode?.teamSize === 0
  const needsRank = selectedMode?.rankRequired ?? false
  const maxGroupSize = Math.max(1, teamSize - 1)

  useEffect(() => {
    gamesApi
      .getAll()
      .then(data => setGames(data))
      .catch(() => setGames([]))
      .finally(() => setLoadingGames(false))
  }, [])

  // Reset downstream fields when game changes
  useEffect(() => {
    setValue('server', '')
    setValue('mode', '')
    setValue('teamFormat', '')
    setValue('rank', '')
    setValue('currentGroupSize', 1)
  }, [watchGameId, setValue])

  // Reset dependent fields when mode changes
  useEffect(() => {
    setValue('teamFormat', '')
    setValue('rank', '')
    setValue('currentGroupSize', 1)
  }, [watchMode, setValue])

  // Reset rank and groupSize when teamFormat changes
  useEffect(() => {
    setValue('rank', '')
    setValue('currentGroupSize', 1)
  }, [watchTeamFormat, setValue])

  // Clamp group size when teamSize changes
  useEffect(() => {
    const currentVal = Number(watchGroupSize)
    if (currentVal > maxGroupSize) {
      setValue('currentGroupSize', maxGroupSize)
    }
  }, [teamSize, maxGroupSize, watchGroupSize, setValue])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  const onSubmit = async (values: FormValues) => {
    if (!selectedGame) return
    setSubmitting(true)
    setSubmitError(null)

    try {
      const result = await matchmakingApi.enqueue({
        alias: values.alias.trim(),
        sessionId,
        gameId: selectedGame.id,
        server: values.server,
        mode: values.mode,
        teamFormat: needsTeamFormat && values.teamFormat ? values.teamFormat : undefined,
        rank: needsRank && values.rank ? values.rank : undefined,
        currentGroupSize: Number(values.currentGroupSize),
      })
      onEnqueued(result)
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data
          ?.error ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data
          ?.message ||
        tm.submitError
      setSubmitError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const playersNeededDisplay = teamSize - Number(watchGroupSize)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-950/95 border border-orange-800/30 rounded-2xl backdrop-blur-md ring-1 ring-orange-600/10 shadow-2xl shadow-orange-900/20 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/60">
          <div>
            <h2 className="text-xl font-bold text-white">{tm.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{tm.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            aria-label={tm.close}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-5">
          {/* Alias */}
          <div>
            <label className="label">{tm.fields.alias}</label>
            <input
              className="form-input"
              placeholder={tm.fields.aliasPlaceholder}
              {...register('alias', {
                required: tm.validation.aliasRequired,
                minLength: { value: 2, message: tm.validation.aliasMin },
                maxLength: { value: 32, message: tm.validation.aliasMax },
              })}
            />
            {errors.alias && <p className="text-red-400 text-xs mt-1">{errors.alias.message}</p>}
          </div>

          {/* Game */}
          <div>
            <label className="label">{tm.fields.game}</label>
            {loadingGames ? (
              <div className="form-select flex items-center gap-2 text-gray-500">
                <span className="w-4 h-4 border-2 border-gray-600 border-t-brand-500 rounded-full animate-spin" />
                {tm.loadingGames}
              </div>
            ) : (
              <select
                className="form-select"
                {...register('gameId', { required: tm.validation.gameRequired })}
              >
                <option value="">{tm.fields.gamePlaceholder}</option>
                {games.map(g => (
                  <option key={g.id} value={String(g.id)}>
                    {g.name}
                  </option>
                ))}
              </select>
            )}
            {errors.gameId && <p className="text-red-400 text-xs mt-1">{errors.gameId.message}</p>}
          </div>

          {/* Server */}
          {selectedGame && (
            <div>
              <label className="label">{tm.fields.server}</label>
              <select
                className="form-select"
                {...register('server', { required: tm.validation.serverRequired })}
              >
                <option value="">{tm.fields.serverPlaceholder}</option>
                {selectedGame.servers.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.server && (
                <p className="text-red-400 text-xs mt-1">{errors.server.message}</p>
              )}
            </div>
          )}

          {/* Mode */}
          {selectedGame && (
            <div>
              <label className="label">{tm.fields.mode}</label>
              <select
                className="form-select"
                {...register('mode', { required: tm.validation.modeRequired })}
              >
                <option value="">{tm.fields.modePlaceholder}</option>
                {selectedGame.modes.map(m => (
                  <option key={m.key} value={m.key}>
                    {m.name}
                  </option>
                ))}
              </select>
              {errors.mode && <p className="text-red-400 text-xs mt-1">{errors.mode.message}</p>}
            </div>
          )}

          {/* Team Format (only for games/modes that need it, e.g. Fortnite) */}
          {needsTeamFormat && selectedGame?.teamFormats && (
            <div>
              <label className="label">{tm.fields.teamFormat}</label>
              <select
                className="form-select"
                {...register('teamFormat', { required: tm.validation.teamFormatRequired })}
              >
                <option value="">{tm.fields.teamFormatPlaceholder}</option>
                {selectedGame.teamFormats.map(tf => (
                  <option key={tf.key} value={tf.key}>
                    {tm.teamFormatOption(tf.name, tf.teamSize)}
                  </option>
                ))}
              </select>
              {errors.teamFormat && (
                <p className="text-red-400 text-xs mt-1">{errors.teamFormat.message}</p>
              )}
            </div>
          )}

          {/* Rank */}
          {needsRank && selectedGame?.ranks && (
            <div>
              <label className="label">{tm.fields.rank}</label>
              <select
                className="form-select"
                {...register('rank', { required: tm.validation.rankRequired })}
              >
                <option value="">{tm.fields.rankPlaceholder}</option>
                {selectedGame.ranks.map(r => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.rank && <p className="text-red-400 text-xs mt-1">{errors.rank.message}</p>}
            </div>
          )}

          {/* Group size */}
          {selectedMode && (needsTeamFormat ? !!watchTeamFormat : true) && teamSize > 1 && (
            <div>
              <label className="label">{tm.fields.groupSize}</label>
              <input
                type="number"
                className="form-input"
                min={1}
                max={maxGroupSize}
                {...register('currentGroupSize', {
                  required: tm.validation.groupSizeRequired,
                  min: { value: 1, message: tm.validation.groupSizeMin },
                  max: {
                    value: maxGroupSize,
                    message: tm.validation.groupSizeMax(maxGroupSize),
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.currentGroupSize && (
                <p className="text-red-400 text-xs mt-1">{errors.currentGroupSize.message}</p>
              )}

              {/* Visual player slots */}
              <div className="mt-3 bg-gray-800/60 border border-gray-700/50 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {Array.from({ length: teamSize }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${
                        i < Number(watchGroupSize)
                          ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                          : 'bg-gray-700/40 border-gray-700 text-gray-600'
                      }`}
                    >
                      {i < Number(watchGroupSize) ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">
                    {watchGroupSize} / {teamSize}
                  </div>
                  <div className="text-xs text-gray-500">
                    {playersNeededDisplay > 0
                      ? tm.seekingPlayers(playersNeededDisplay)
                      : tm.groupComplete}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit error */}
          {submitError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              {submitError}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={submitting}
            >
              {tm.cancel}
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={submitting || loadingGames}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {tm.submitting}
                </>
              ) : (
                tm.submit
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

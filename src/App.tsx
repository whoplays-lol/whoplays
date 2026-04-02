import { useState, useCallback, useEffect, useRef } from 'react'
import { matchmakingApi } from './services/api'
import videoSrc from '../assets/videos/video-loop.mp4'
import Landing from './components/Landing'
import MatchmakingModal from './components/MatchmakingModal'
import QueueStatus from './components/QueueStatus'
import MatchFound from './components/MatchFound'
import { LanguageProvider } from './contexts/LanguageContext'
import type { QueueRequestDto, MatchGroupDto } from './types'

type AppView = 'landing' | 'modal' | 'queue' | 'match'

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [view, setView] = useState<AppView>('landing')
  const [queueRequest, setQueueRequest] = useState<QueueRequestDto | null>(null)
  const [matchGroup, setMatchGroup] = useState<MatchGroupDto | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleOpenModal = useCallback(() => setView('modal'), [])
  const handleCloseModal = useCallback(() => setView('landing'), [])

  const handleEnqueued = useCallback((req: QueueRequestDto) => {
    setQueueRequest(req)
    setView('queue')
  }, [])

  const handleMatchFound = useCallback((match: MatchGroupDto) => {
    setMatchGroup(match)
    setView('match')
  }, [])

  const handleCancel = useCallback(() => {
    setQueueRequest(null)
    setMatchGroup(null)
    setView('landing')
  }, [])

  const handleRequeue = useCallback(async (excludedSessionIds: string[] = []) => {
    if (!queueRequest) {
      setMatchGroup(null)
      setQueueRequest(null)
      setView('modal')
      return
    }

    const prev = queueRequest
    setMatchGroup(null)
    setQueueRequest(null)

    try {
      const result = await matchmakingApi.enqueue({
        alias: prev.alias,
        sessionId: prev.sessionId,
        gameId: prev.gameId,
        server: prev.server,
        mode: prev.mode,
        teamFormat: prev.teamFormat ?? undefined,
        rank: prev.rank ?? undefined,
        currentGroupSize: prev.currentGroupSize,
        excludedSessionIds: excludedSessionIds.length > 0 ? excludedSessionIds : undefined,
      })
      setQueueRequest(result)
      setView('queue')
    } catch {
      setView('modal')
    }
  }, [queueRequest])

  const handleLeaveMatch = useCallback((excludedSessionIds: string[]) => {
    handleRequeue(excludedSessionIds)
  }, [handleRequeue])

  const handlePlayerLeft = useCallback(() => {
    handleRequeue()
  }, [handleRequeue])

  return (
    <LanguageProvider>
      {/* Global fixed video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src={videoSrc}
      />
      <div className="fixed inset-0 bg-black/50 -z-10" />

    <div className="min-h-screen">
      {(view === 'landing' || view === 'modal') && (
        <>
          <Landing onFindTeammates={handleOpenModal} />
          {view === 'modal' && (
            <MatchmakingModal
              onClose={handleCloseModal}
              onEnqueued={handleEnqueued}
            />
          )}
        </>
      )}

      {view === 'queue' && queueRequest && (
        <QueueStatus
          queueRequest={queueRequest}
          onMatchFound={handleMatchFound}
          onCancel={handleCancel}
        />
      )}

      {view === 'match' && matchGroup && queueRequest && (
        <MatchFound
          matchGroup={matchGroup}
          mySessionId={queueRequest.sessionId}
          myAlias={queueRequest.alias}
          onLeave={handleLeaveMatch}
          onPlayerLeft={handlePlayerLeft}
        />
      )}
    </div>
    </LanguageProvider>
  )
}

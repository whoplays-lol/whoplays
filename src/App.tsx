import { useState, useCallback } from 'react'
import Landing from './components/Landing'
import MatchmakingModal from './components/MatchmakingModal'
import QueueStatus from './components/QueueStatus'
import MatchFound from './components/MatchFound'
import { LanguageProvider } from './contexts/LanguageContext'
import type { QueueRequestDto, MatchGroupDto } from './types'

type AppView = 'landing' | 'modal' | 'queue' | 'match'

export default function App() {
  const [view, setView] = useState<AppView>('landing')
  const [queueRequest, setQueueRequest] = useState<QueueRequestDto | null>(null)
  const [matchGroup, setMatchGroup] = useState<MatchGroupDto | null>(null)

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

  return (
    <LanguageProvider>
    <div className="min-h-screen bg-gray-950">
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
          onLeave={handleCancel}
        />
      )}
    </div>
    </LanguageProvider>
  )
}

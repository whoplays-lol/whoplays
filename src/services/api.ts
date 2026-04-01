import axios from 'axios'
import type { CreateQueueRequest, GameDefinition, MatchGroupDto, MessageDto, QueueRequestDto } from '../types'
import { API_URL } from '../config'

const api = axios.create({ baseURL: API_URL + '/api' })

export const gamesApi = {
  getAll: (): Promise<GameDefinition[]> => api.get('/games').then(r => r.data)
}

export const matchmakingApi = {
  enqueue: (dto: CreateQueueRequest): Promise<QueueRequestDto> =>
    api.post('/matchmaking/queue', dto).then(r => r.data),

  getQueueRequest: (id: string): Promise<QueueRequestDto> =>
    api.get(`/matchmaking/queue/${id}`).then(r => r.data),

  cancel: (id: string, sessionId: string): Promise<void> =>
    api.delete(`/matchmaking/queue/${id}`, {
      headers: { 'X-Session-Id': sessionId }
    }).then(),

  getMatch: (matchGroupId: string): Promise<MatchGroupDto> =>
    api.get(`/matchmaking/match/${matchGroupId}`).then(r => r.data),

  getMessages: (matchGroupId: string): Promise<MessageDto[]> =>
    api.get(`/matchmaking/match/${matchGroupId}/messages`).then(r => r.data),

  sendMessage: (matchGroupId: string, sessionId: string, content: string): Promise<MessageDto> =>
    api.post(`/matchmaking/match/${matchGroupId}/messages`, { sessionId, content }).then(r => r.data)
}

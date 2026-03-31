export interface GameDefinition {
  id: number
  name: string
  slug: string
  servers: string[]
  modes: ModeDefinition[]
  teamFormats?: TeamFormatDefinition[]
  ranks?: string[]
}

export interface ModeDefinition {
  key: string
  name: string
  teamSize: number // 0 = depends on teamFormat
  rankRequired: boolean
}

export interface TeamFormatDefinition {
  key: string
  name: string
  teamSize: number
}

export interface CreateQueueRequest {
  alias: string
  sessionId: string
  gameId: number
  server: string
  mode: string
  teamFormat?: string
  rank?: string
  currentGroupSize: number
}

export interface QueueRequestDto {
  id: string
  alias: string
  sessionId: string
  gameId: number
  gameName: string
  server: string
  mode: string
  teamFormat?: string
  rank?: string
  currentGroupSize: number
  totalRequired: number
  playersNeeded: number
  status: 'Pending' | 'Matched' | 'Cancelled'
  matchGroupId?: string
  createdAt: string
}

export interface MatchGroupDto {
  id: string
  gameId: number
  gameName: string
  server: string
  mode: string
  teamFormat?: string
  rank?: string
  totalPlayers: number
  participants: ParticipantDto[]
  createdAt: string
}

export interface ParticipantDto {
  alias: string
  currentGroupSize: number
  sessionId: string
}

export interface MessageDto {
  id: string
  matchGroupId: string
  alias: string
  content: string
  sentAt: string
}

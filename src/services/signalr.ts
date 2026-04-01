import * as signalR from '@microsoft/signalr'
import { API_URL } from '../config'

let connection: signalR.HubConnection | null = null

export function getConnection(): signalR.HubConnection {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(API_URL + '/hubs/matchmaking')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build()
  }
  return connection
}

export async function ensureConnected(): Promise<signalR.HubConnection> {
  const conn = getConnection()
  if (conn.state === signalR.HubConnectionState.Disconnected) {
    await conn.start()
  }
  return conn
}
